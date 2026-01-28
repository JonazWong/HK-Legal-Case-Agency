"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function NewClientPage() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const isEn = pathname.startsWith("/en");
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || (isEn ? 'Failed to create client' : '建立客戶失敗')
        );
      }

      router.push(`/clients/${data.id}`);
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/clients">
          <Button variant="text" size="sm">
            ← {isEn ? 'Back to Clients' : '返回客戶列表'}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {isEn ? 'Create New Client' : '新增客戶'}
          </CardTitle>
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
                label={isEn ? 'First Name' : '名'}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />

              <Input
                label={isEn ? 'Last Name' : '姓'}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />

              <Input
                label={isEn ? 'Email' : '電郵'}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                label={isEn ? 'Phone' : '電話'}
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />

              <Input
                label={isEn ? 'Alternate Phone' : '其他電話'}
                name="alternatePhone"
                type="tel"
                value={formData.alternatePhone}
                onChange={handleChange}
              />

              <Input
                label={
                  isEn
                    ? 'ID Number (HKID/Passport)'
                    : '證件號碼（香港身份證／護照）'
                }
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                helperText={
                  isEn
                    ? 'Hong Kong ID or Passport number'
                    : '例如：香港身份證號碼或護照號碼'
                }
              />

              <Input
                label={isEn ? 'Date of Birth' : '出生日期'}
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />

              <Input
                label={isEn ? 'Occupation' : '職業'}
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
              />

              <Input
                label={isEn ? 'Company' : '公司'}
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <Textarea
              label={isEn ? 'Address' : '地址'}
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
            />

            <Textarea
              label={isEn ? 'Notes' : '內部備註'}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              helperText={
                isEn
                  ? 'Internal notes about the client'
                  : '只供內部參考的備註，不會顯示給客戶'
              }
            />

            <div className="flex gap-4 justify-end">
              <Link href="/clients">
                <Button type="button" variant="secondary">
                  {isEn ? 'Cancel' : '取消'}
                </Button>
              </Link>
              <Button type="submit" loading={loading}>
                {isEn ? 'Create Client' : '建立客戶'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
