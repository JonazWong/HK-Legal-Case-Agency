'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { formatFullName, formatDate } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  'use client';
  TableRow,
  import { useState, useEffect } from 'react';

interface Case {
  import { usePathname } from 'next/navigation';
  id: string;
  caseNumber: string;
  title: string;
  category: string;
  status: string;
  filingDate: string | null;
    const pathname = usePathname() || "/";
    const isEn = pathname.startsWith("/en");
  createdAt: string;
}
          throw new Error(
            data.error || (isEn ? 'Failed to fetch client' : '載入客戶資料失敗')
          );
interface ClientData {
  id: string;
  firstName: string;
      if (
        !confirm(
          isEn
            ? 'Are you sure you want to delete this client? This action cannot be undone.'
            : '確定要刪除這位客戶嗎？此操作無法還原。'
        )
      ) {
  email: string | null;
  phone: string | null;
  alternatePhone: string | null;
  address: string | null;
  idNumber: string | null;
  dateOfBirth: string | null;
          throw new Error(
            data.message ||
              data.error ||
              (isEn ? 'Failed to delete client' : '刪除客戶失敗')
          );
  company: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  cases: Case[];
  _count: {
    cases: number;
                ← {isEn ? 'Back to Clients' : '返回客戶列表'}
}

export default function ClientViewPage() {
  const router = useRouter();
            {error || (isEn ? 'Client not found' : '找不到相關客戶')}
  const id = params?.id as string;
  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
              ← {isEn ? 'Back to Clients' : '返回客戶列表'}
  useEffect(() => {
    if (id) {
      fetchClient();
    }
              {isEn ? 'Client ID' : '客戶編號'}: {client.id}

  const fetchClient = async () => {
    try {
      setLoading(true);
              <Button variant="secondary">
                {isEn ? 'Edit Client' : '編輯客戶'}
              </Button>
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch client');
      }

      setClient(data);
    } catch (err: any) {
              {isEn ? 'Delete' : '刪除'}
    } finally {
      setLoading(false);
    }
  };

              <CardTitle>
                {isEn ? 'Contact Information' : '聯絡資料'}
              </CardTitle>
    if (!confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
      return;
    }
                <p className="text-sm text-cool-gray">
                  {isEn ? 'Email' : '電郵'}
                </p>
                <p className="font-medium">
                  {client.email || (isEn ? 'N/A' : '—')}
                </p>
      setDeleteLoading(true);
      const res = await fetch(`/api/clients/${id}`, {
                <p className="text-sm text-cool-gray">
                  {isEn ? 'Phone' : '電話'}
                </p>
                <p className="font-medium">
                  {client.phone || (isEn ? 'N/A' : '—')}
                </p>

      const data = await res.json();
                <p className="text-sm text-cool-gray">
                  {isEn ? 'Alternate Phone' : '其他電話'}
                </p>
                <p className="font-medium">
                  {client.alternatePhone || (isEn ? 'N/A' : '—')}
                </p>
        throw new Error(data.message || data.error || 'Failed to delete client');
      }
                <p className="text-sm text-cool-gray">
                  {isEn ? 'Address' : '地址'}
                </p>
                <p className="font-medium whitespace-pre-wrap">
                  {client.address || (isEn ? 'N/A' : '—')}
                </p>
    } catch (err: any) {
      alert(err.message);
      setDeleteLoading(false);
    }
  };

              <CardTitle>
                {isEn ? 'Personal Information' : '個人資料'}
              </CardTitle>
    switch (status) {
      case 'ACTIVE':
        return 'success';
                <p className="text-sm text-cool-gray">
                  {isEn ? 'ID Number' : '證件號碼'}
                </p>
                <p className="font-medium">
                  {client.idNumber || (isEn ? 'N/A' : '—')}
                </p>
      case 'COMPLETED':
        return 'info';
                <p className="text-sm text-cool-gray">
                  {isEn ? 'Date of Birth' : '出生日期'}
                </p>
        return 'default';
      default:
        return 'default';
                <p className="text-sm text-cool-gray">
                  {isEn ? 'Occupation' : '職業'}
                </p>
                <p className="font-medium">
                  {client.occupation || (isEn ? 'N/A' : '—')}
                </p>

  if (loading) {
                <p className="text-sm text-cool-gray">
                  {isEn ? 'Company' : '公司'}
                </p>
                <p className="font-medium">
                  {client.company || (isEn ? 'N/A' : '—')}
                </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-green"></div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="max-w-4xl mx-auto">
              <CardTitle>{isEn ? 'Notes' : '內部備註'}</CardTitle>
          <Link href="/clients">
            <Button variant="text" size="sm">
              ← Back to Clients
            </Button>
          </Link>
        </div>
        <div className="p-4 bg-alert-red/10 border border-alert-red text-alert-red rounded-md">
          {error || 'Client not found'}
        </div>
      </div>
    );
                <CardTitle>
                  {isEn ? 'Cases' : '相關案件'} ({client._count.cases})
                </CardTitle>
                <CardDescription>
                  {isEn
                    ? 'All cases associated with this client'
                    : '此客戶相關的所有案件'}
                </CardDescription>
  return (
    <div className="max-w-6xl mx-auto space-y-6">
                <Button size="sm">
                  {isEn ? 'Create New Case' : '為此客戶新增案件'}
                </Button>
        <Link href="/clients">
          <Button variant="text" size="sm">
            ← Back to Clients
          </Button>
        </Link>
      </div>
                {isEn ? 'No cases found for this client' : '此客戶暫時沒有案件'}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">
            {formatFullName(client.lastName, client.firstName)}
          </h1>
                    <TableHead>{isEn ? 'Case Number' : '案件編號'}</TableHead>
                    <TableHead>{isEn ? 'Title' : '案件標題'}</TableHead>
                    <TableHead>{isEn ? 'Category' : '類別'}</TableHead>
                    <TableHead>{isEn ? 'Status' : '狀態'}</TableHead>
                    <TableHead>{isEn ? 'Filing Date' : '立案日期'}</TableHead>
                    <TableHead>{isEn ? 'Actions' : '操作'}</TableHead>
            <Button variant="secondary">Edit Client</Button>
          </Link>
          <Button
            variant="danger"
            onClick={handleDelete}
            loading={deleteLoading}
            disabled={client._count.cases > 0}
          >
            Delete
          </Button>
        </div>
      </div>
                          {isEn
                            ? caseItem.status
                            : caseItem.status === 'ACTIVE'
                            ? '進行中'
                            : caseItem.status === 'PENDING'
                            ? '待處理'
                            : caseItem.status === 'COMPLETED'
                            ? '已完成'
                            : caseItem.status === 'ARCHIVED'
                            ? '已封存'
                            : caseItem.status}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
                            {isEn ? 'View' : '查看'}
              <p className="text-sm text-cool-gray">Email</p>
              <p className="font-medium">{client.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-cool-gray">Phone</p>
              <p className="font-medium">{client.phone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-cool-gray">Alternate Phone</p>
              <p className="font-medium">{client.alternatePhone || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-cool-gray">Address</p>
            <CardTitle>{isEn ? 'Metadata' : '建立與更新紀錄'}</CardTitle>
            </div>
          </CardContent>
        </Card>
              <p className="text-sm text-cool-gray">
                {isEn ? 'Created' : '建立時間'}
              </p>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
              <p className="text-sm text-cool-gray">
                {isEn ? 'Last Updated' : '最後更新'}
              </p>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-cool-gray">ID Number</p>
              <p className="font-medium">{client.idNumber || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-cool-gray">Date of Birth</p>
              <p className="font-medium">{formatDate(client.dateOfBirth)}</p>
            </div>
            <div>
              <p className="text-sm text-cool-gray">Occupation</p>
              <p className="font-medium">{client.occupation || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-cool-gray">Company</p>
              <p className="font-medium">{client.company || 'N/A'}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {client.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{client.notes}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Cases ({client._count.cases})</CardTitle>
              <CardDescription>All cases associated with this client</CardDescription>
            </div>
            <Link href={`/cases/new?clientId=${id}`}>
              <Button size="sm">Create New Case</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {client.cases.length === 0 ? (
            <div className="text-center py-8 text-cool-gray">
              No cases found for this client
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case Number</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Filing Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {client.cases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-medium">
                      {caseItem.caseNumber}
                    </TableCell>
                    <TableCell>{caseItem.title}</TableCell>
                    <TableCell>{caseItem.category}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(caseItem.status)}>
                        {caseItem.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(caseItem.filingDate)}</TableCell>
                    <TableCell>
                      <Link href={`/cases/${caseItem.id}`}>
                        <Button size="sm" variant="text">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <p className="text-sm text-cool-gray">Created</p>
            <p className="font-medium">{formatDate(client.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-cool-gray">Last Updated</p>
            <p className="font-medium">{formatDate(client.updatedAt)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
