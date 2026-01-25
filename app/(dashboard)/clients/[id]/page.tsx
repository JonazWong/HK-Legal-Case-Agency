'use client';

import { useState, useEffect } from 'react';
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
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Case {
  id: string;
  caseNumber: string;
  title: string;
  category: string;
  status: string;
  filingDate: string | null;
  createdAt: string;
}

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
  createdAt: string;
  updatedAt: string;
  cases: Case[];
  _count: {
    cases: number;
  };
}

export default function ClientViewPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchClient();
    }
  }, [id]);

  const fetchClient = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/clients/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch client');
      }

      setClient(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleteLoading(true);
      const res = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || 'Failed to delete client');
      }

      router.push('/clients');
    } catch (err: any) {
      alert(err.message);
      setDeleteLoading(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'COMPLETED':
        return 'info';
      case 'ARCHIVED':
        return 'default';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-green"></div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
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
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-6">
        <Link href="/clients">
          <Button variant="text" size="sm">
            ← Back to Clients
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">
            {formatFullName(client.lastName, client.firstName)}
          </h1>
          <p className="text-cool-gray mt-1">
            Client ID: {client.id}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href={`/clients/${id}/edit`}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
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
              <p className="font-medium whitespace-pre-wrap">{client.address || 'N/A'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
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
