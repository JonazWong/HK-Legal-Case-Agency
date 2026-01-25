'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toDateInputValue } from '@/lib/utils';

interface ClientData {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  alternatePhone: string | null;
  address: string | null;
  idNumber: string | null;
  dateOfBirth: string | null;
  occupation: string | null;
  company: string | null;
  notes: string | null;
}

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    address: '',
    idNumber: '',
    dateOfBirth: '',
    occupation: '',
    company: '',
    notes: '',
  });

  useEffect(() => {
    if (id) {
      fetchClient();
    }
  }, [id]);

  const fetchClient = async () => {
    try {
      setFetchLoading(true);
      const res = await fetch(`/api/clients/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch client');
      }

      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        alternatePhone: data.alternatePhone || '',
        address: data.address || '',
        idNumber: data.idNumber || '',
        dateOfBirth: toDateInputValue(data.dateOfBirth),
        occupation: data.occupation || '',
        company: data.company || '',
        notes: data.notes || '',
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update client');
      }

      router.push(`/clients/${id}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-green"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href={`/clients/${id}`}>
          <Button variant="text" size="sm">
            ← Back to Client
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Client</CardTitle>
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
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />

              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />

              <Input
                label="Alternate Phone"
                name="alternatePhone"
                type="tel"
                value={formData.alternatePhone}
                onChange={handleChange}
              />

              <Input
                label="ID Number (HKID/Passport)"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                helperText="Hong Kong ID or Passport number"
              />

              <Input
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />

              <Input
                label="Occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
              />

              <Input
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <Textarea
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
            />

            <Textarea
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              helperText="Internal notes about the client"
            />

            <div className="flex gap-4 justify-end">
              <Link href={`/clients/${id}`}>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" loading={loading}>
                Update Client
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
