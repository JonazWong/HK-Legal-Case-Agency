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

interface CaseData {
  id: string;
  caseNumber: string;
  title: string;
  description: string | null;
  category: string;
  status: string;
  filingDate: string | null;
  closingDate: string | null;
  courtReference: string | null;
  estimatedBudget: number | null;
  actualCost: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
  };
  assignedLawyer: {
    id: string;
    name: string;
    email: string;
  } | null;
  timeEntries: Array<{
    id: string;
    date: string;
    hours: number;
    description: string;
    totalAmount: number;
  }>;
  documents: Array<{
    id: string;
    title: string;
    fileName: string;
    documentType: string;
    createdAt: string;
  }>;
}

export default function CaseViewPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCase();
    }
  }, [id]);

  const fetchCase = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/cases/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch case');
      }

      setCaseData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this case? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleteLoading(true);
      const res = await fetch(`/api/cases/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete case');
      }

      router.push('/cases');
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return 'N/A';
    return `HKD ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-green"></div>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-alert-red">{error || 'Case not found'}</p>
            <Link href="/cases">
              <Button variant="secondary" className="mt-4">
                Back to Cases
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <Link href="/cases">
            <Button variant="text" size="sm">
              ← Back to Cases
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-charcoal mt-2">
            {caseData.caseNumber}
          </h1>
          <p className="text-cool-gray mt-1">{caseData.title}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/cases/${id}/edit`}>
            <Button variant="secondary">Edit Case</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete} loading={deleteLoading}>
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Case Information</CardTitle>
            <Badge variant={getStatusBadgeVariant(caseData.status)}>
              {caseData.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-cool-gray">Case Number</label>
              <p className="text-charcoal mt-1">{caseData.caseNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">Category</label>
              <p className="text-charcoal mt-1">{caseData.category}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">Filing Date</label>
              <p className="text-charcoal mt-1">{formatDate(caseData.filingDate)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">Closing Date</label>
              <p className="text-charcoal mt-1">{formatDate(caseData.closingDate)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">Court Reference</label>
              <p className="text-charcoal mt-1">{caseData.courtReference || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">Assigned Lawyer</label>
              <p className="text-charcoal mt-1">
                {caseData.assignedLawyer?.name || 'Unassigned'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">Estimated Budget</label>
              <p className="text-charcoal mt-1">{formatCurrency(caseData.estimatedBudget)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">Actual Cost</label>
              <p className="text-charcoal mt-1">{formatCurrency(caseData.actualCost)}</p>
            </div>
          </div>

          {caseData.description && (
            <div className="mt-6">
              <label className="text-sm font-medium text-cool-gray">Description</label>
              <p className="text-charcoal mt-1 whitespace-pre-wrap">{caseData.description}</p>
            </div>
          )}

          {caseData.notes && (
            <div className="mt-6">
              <label className="text-sm font-medium text-cool-gray">Notes</label>
              <p className="text-charcoal mt-1 whitespace-pre-wrap">{caseData.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-cool-gray">Name</label>
              <p className="text-charcoal mt-1">
                {caseData.client.firstName} {caseData.client.lastName}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">Email</label>
              <p className="text-charcoal mt-1">{caseData.client.email || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">Phone</label>
              <p className="text-charcoal mt-1">{caseData.client.phone || 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Time Entries</CardTitle>
          <CardDescription>Last 5 time entries for this case</CardDescription>
        </CardHeader>
        <CardContent>
          {caseData.timeEntries.length === 0 ? (
            <p className="text-cool-gray text-center py-4">No time entries yet</p>
          ) : (
            <div className="space-y-3">
              {caseData.timeEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex justify-between items-start p-3 border border-light-gray rounded-md"
                >
                  <div>
                    <p className="text-charcoal font-medium">{entry.description}</p>
                    <p className="text-sm text-cool-gray">
                      {formatDate(entry.date)} • {entry.hours} hours
                    </p>
                  </div>
                  <p className="text-charcoal font-medium">
                    {formatCurrency(Number(entry.totalAmount))}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>Last 5 documents for this case</CardDescription>
        </CardHeader>
        <CardContent>
          {caseData.documents.length === 0 ? (
            <p className="text-cool-gray text-center py-4">No documents yet</p>
          ) : (
            <div className="space-y-3">
              {caseData.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex justify-between items-start p-3 border border-light-gray rounded-md"
                >
                  <div>
                    <p className="text-charcoal font-medium">{doc.title}</p>
                    <p className="text-sm text-cool-gray">
                      {doc.fileName} • {doc.documentType}
                    </p>
                  </div>
                  <p className="text-sm text-cool-gray">{formatDate(doc.createdAt)}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
