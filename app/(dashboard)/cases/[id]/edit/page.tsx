"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
}

interface Lawyer {
  id: string;
  name: string;
}

export default function EditCasePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const pathname = usePathname() || "/";
  const isEn = pathname.startsWith("/en");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'CIVIL',
    status: 'PENDING',
    filingDate: '',
    closingDate: '',
    courtReference: '',
    estimatedBudget: '',
    actualCost: '',
    clientId: '',
    assignedLawyerId: '',
    notes: '',
  });

  useEffect(() => {
    if (id) {
      fetchCase();
      fetchClients();
      fetchLawyers();
    }
  }, [id]);

  const fetchCase = async () => {
    try {
      const res = await fetch(`/api/cases/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || (isEn ? 'Failed to fetch case' : '載入案件資料失敗')
        );
      }

      setFormData({
        title: data.title || '',
        description: data.description || '',
        category: data.category || 'CIVIL',
        status: data.status || 'PENDING',
        filingDate: data.filingDate ? data.filingDate.split('T')[0] : '',
        closingDate: data.closingDate ? data.closingDate.split('T')[0] : '',
        courtReference: data.courtReference || '',
        estimatedBudget: data.estimatedBudget?.toString() || '',
        actualCost: data.actualCost?.toString() || '',
        clientId: data.clientId || '',
        assignedLawyerId: data.assignedLawyerId || '',
        notes: data.notes || '',
      });

      setPageLoading(false);
    } catch (err: any) {
      setError(err.message);
      setPageLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients?limit=1000');
      if (res.ok) {
        const data = await res.json();
        setClients(data.clients || []);
      } else {
        console.warn('Clients API not available. Client selection will be limited.');
      }
    } catch (err) {
      console.warn('Failed to fetch clients:', err);
      // Silently fail - form will show empty client list
    }
  };

  const fetchLawyers = async () => {
    try {
      const res = await fetch('/api/users?role=ADMIN,STAFF&limit=1000');
      if (res.ok) {
        const data = await res.json();
        setLawyers(data.users || []);
      } else {
        console.warn('Users API not available. Lawyer assignment will be unavailable.');
      }
    } catch (err) {
      console.warn('Failed to fetch lawyers:', err);
      // Silently fail - form will show unassigned option only
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/cases/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || (isEn ? 'Failed to update case' : '更新案件失敗')
        );
      }

      router.push(`/cases/${id}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (pageLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-green"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href={`/cases/${id}`}>
          <Button variant="text" size="sm">
            ← {isEn ? 'Back to Case' : '返回案件詳情'}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEn ? 'Edit Case' : '編輯案件'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-alert-red/10 border border-alert-red text-alert-red rounded-md">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label={isEn ? 'Title' : '案件標題'}
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <Select
                label={isEn ? 'Client' : '客戶'}
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                required
                helperText={
                  clients.length === 0
                    ? isEn
                      ? 'No clients available. Please create a client first.'
                      : '目前沒有客戶資料，請先建立客戶。'
                    : undefined
                }
                options={[
                  {
                    value: '',
                    label:
                      clients.length === 0
                        ? isEn
                          ? 'No clients available'
                          : '暫無客戶'
                        : isEn
                        ? 'Select a client'
                        : '選擇客戶',
                  },
                  ...clients.map((client) => ({
                    value: client.id,
                    label: `${client.firstName} ${client.lastName}`,
                  })),
                ]}
              />

              <Select
                label={isEn ? 'Category' : '案件類別'}
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                options={[
                  { value: 'CIVIL', label: isEn ? 'Civil' : '民事' },
                  { value: 'CRIMINAL', label: isEn ? 'Criminal' : '刑事' },
                  { value: 'CORPORATE', label: isEn ? 'Corporate' : '公司/商業' },
                  { value: 'FAMILY', label: isEn ? 'Family' : '家事' },
                  { value: 'PROPERTY', label: isEn ? 'Property' : '物業' },
                  { value: 'IMMIGRATION', label: isEn ? 'Immigration' : '入境' },
                  { value: 'LABOUR', label: isEn ? 'Labour' : '勞工' },
                  { value: 'OTHER', label: isEn ? 'Other' : '其他' },
                ]}
              />

              <Select
                label={isEn ? 'Status' : '狀態'}
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                  { value: 'PENDING', label: isEn ? 'Pending' : '待處理' },
                  { value: 'ACTIVE', label: isEn ? 'Active' : '進行中' },
                  { value: 'COMPLETED', label: isEn ? 'Completed' : '已完成' },
                  { value: 'ARCHIVED', label: isEn ? 'Archived' : '已封存' },
                ]}
              />

              <Input
                label={isEn ? 'Filing Date' : '立案日期'}
                name="filingDate"
                type="date"
                value={formData.filingDate}
                onChange={handleChange}
              />

              <Input
                label={isEn ? 'Closing Date' : '結案日期'}
                name="closingDate"
                type="date"
                value={formData.closingDate}
                onChange={handleChange}
              />

              <Input
                label={isEn ? 'Court Reference' : '法院檔案編號'}
                name="courtReference"
                value={formData.courtReference}
                onChange={handleChange}
              />

              <Select
                label={isEn ? 'Assigned Lawyer' : '負責律師'}
                name="assignedLawyerId"
                value={formData.assignedLawyerId}
                onChange={handleChange}
                options={[
                  { value: '', label: isEn ? 'Unassigned' : '未指派' },
                  ...lawyers.map((lawyer) => ({
                    value: lawyer.id,
                    label: lawyer.name || 'Unknown',
                  })),
                ]}
              />

              <Input
                label={isEn ? 'Estimated Budget (HKD)' : '預計費用（港幣）'}
                name="estimatedBudget"
                type="number"
                step="0.01"
                value={formData.estimatedBudget}
                onChange={handleChange}
              />

              <Input
                label={isEn ? 'Actual Cost (HKD)' : '實際費用（港幣）'}
                name="actualCost"
                type="number"
                step="0.01"
                value={formData.actualCost}
                onChange={handleChange}
              />
            </div>

            <Textarea
              label={isEn ? 'Description' : '案件描述'}
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />

            <Textarea
              label={isEn ? 'Notes' : '內部備註'}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
            />

            <div className="flex gap-4 justify-end">
              <Link href={`/cases/${id}`}>
                <Button type="button" variant="secondary">
                  {isEn ? 'Cancel' : '取消'}
                </Button>
              </Link>
              <Button type="submit" loading={loading}>
                {isEn ? 'Update Case' : '更新案件'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
