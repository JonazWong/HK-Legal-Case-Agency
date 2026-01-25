'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

export default function NewCasePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    fetchClients();
    fetchLawyers();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients?limit=1000');
      if (res.ok) {
        const data = await res.json();
        setClients(data.clients || []);
      }
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    }
  };

  const fetchLawyers = async () => {
    try {
      const res = await fetch('/api/users?role=ADMIN,STAFF&limit=1000');
      if (res.ok) {
        const data = await res.json();
        setLawyers(data.users || []);
      }
    } catch (err) {
      console.error('Failed to fetch lawyers:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create case');
      }

      router.push(`/cases/${data.id}`);
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/cases">
          <Button variant="text" size="sm">
            ← Back to Cases
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Case</CardTitle>
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
                options={[
                  { value: '', label: 'Select a client' },
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
              <Link href="/cases">
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" loading={loading}>
                Create Case
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
