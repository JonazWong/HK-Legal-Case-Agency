'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
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
        throw new Error(data.error || 'Failed to fetch case');
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
        throw new Error(data.error || 'Failed to update case');
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
            ← Back to Case
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Case</CardTitle>
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
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <Select
                label="Client"
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                required
                helperText={clients.length === 0 ? "No clients available. Please create a client first." : undefined}
                options={[
                  { value: '', label: clients.length === 0 ? 'No clients available' : 'Select a client' },
                  ...clients.map((client) => ({
                    value: client.id,
                    label: `${client.firstName} ${client.lastName}`,
                  })),
                ]}
              />

              <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                options={[
                  { value: 'CIVIL', label: 'Civil' },
                  { value: 'CRIMINAL', label: 'Criminal' },
                  { value: 'CORPORATE', label: 'Corporate' },
                  { value: 'FAMILY', label: 'Family' },
                  { value: 'PROPERTY', label: 'Property' },
                  { value: 'IMMIGRATION', label: 'Immigration' },
                  { value: 'LABOUR', label: 'Labour' },
                  { value: 'OTHER', label: 'Other' },
                ]}
              />

              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                  { value: 'PENDING', label: 'Pending' },
                  { value: 'ACTIVE', label: 'Active' },
                  { value: 'COMPLETED', label: 'Completed' },
                  { value: 'ARCHIVED', label: 'Archived' },
                ]}
              />

              <Input
                label="Filing Date"
                name="filingDate"
                type="date"
                value={formData.filingDate}
                onChange={handleChange}
              />

              <Input
                label="Closing Date"
                name="closingDate"
                type="date"
                value={formData.closingDate}
                onChange={handleChange}
              />

              <Input
                label="Court Reference"
                name="courtReference"
                value={formData.courtReference}
                onChange={handleChange}
              />

              <Select
                label="Assigned Lawyer"
                name="assignedLawyerId"
                value={formData.assignedLawyerId}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Unassigned' },
                  ...lawyers.map((lawyer) => ({
                    value: lawyer.id,
                    label: lawyer.name || 'Unknown',
                  })),
                ]}
              />

              <Input
                label="Estimated Budget (HKD)"
                name="estimatedBudget"
                type="number"
                step="0.01"
                value={formData.estimatedBudget}
                onChange={handleChange}
              />

              <Input
                label="Actual Cost (HKD)"
                name="actualCost"
                type="number"
                step="0.01"
                value={formData.actualCost}
                onChange={handleChange}
              />
            </div>

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />

            <Textarea
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
            />

            <div className="flex gap-4 justify-end">
              <Link href={`/cases/${id}`}>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" loading={loading}>
                Update Case
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
