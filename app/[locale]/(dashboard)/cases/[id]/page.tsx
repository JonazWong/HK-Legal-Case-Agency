"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import Link from "next/link";
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
  const pathname = usePathname() || "/";
  const isEn = pathname.startsWith("/en");
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
    if (
      !confirm(
        isEn
          ? "Are you sure you want to delete this case? This action cannot be undone."
          : "確定要刪除這宗案件嗎？此操作無法還原。"
      )
    ) {
      return;
    }

    try {
      setDeleteLoading(true);
      const res = await fetch(`/api/cases/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          data.error || (isEn ? 'Failed to delete case' : '刪除案件失敗')
        );
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
    if (!dateString) return isEn ? "N/A" : "—";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return isEn ? "N/A" : "—";
    const prefix = isEn ? "HKD " : "港幣 ";
    return `${prefix}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
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
            <p className="text-alert-red">
              {error || (isEn ? 'Case not found' : '找不到相關案件')}
            </p>
            <Link href="/cases">
              <Button variant="secondary" className="mt-4">
                {isEn ? 'Back to Cases' : '返回案件列表'}
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
              ← {isEn ? 'Back to Cases' : '返回案件列表'}
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-charcoal mt-2">
            {caseData.caseNumber}
          </h1>
          <p className="text-cool-gray mt-1">{caseData.title}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/cases/${id}/edit`}>
            <Button variant="secondary">
              {isEn ? 'Edit Case' : '編輯案件'}
            </Button>
          </Link>
          <Button
            variant="danger"
            onClick={handleDelete}
            loading={deleteLoading}
          >
            {isEn ? 'Delete' : '刪除'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              {isEn ? 'Case Information' : '案件資料'}
            </CardTitle>
            <Badge variant={getStatusBadgeVariant(caseData.status)}>
              {isEn
                ? caseData.status
                : caseData.status === 'ACTIVE'
                ? '進行中'
                : caseData.status === 'PENDING'
                ? '待處理'
                : caseData.status === 'COMPLETED'
                ? '已完成'
                : caseData.status === 'ARCHIVED'
                ? '已封存'
                : caseData.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-cool-gray">
                {isEn ? 'Case Number' : '案件編號'}
              </label>
              <p className="text-charcoal mt-1">{caseData.caseNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">
                {isEn ? 'Category' : '案件類別'}
              </label>
              <p className="text-charcoal mt-1">{caseData.category}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">
                {isEn ? 'Filing Date' : '立案日期'}
              </label>
              <p className="text-charcoal mt-1">{formatDate(caseData.filingDate)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">
                {isEn ? 'Closing Date' : '結案日期'}
              </label>
              <p className="text-charcoal mt-1">{formatDate(caseData.closingDate)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">
                {isEn ? 'Court Reference' : '法院檔案編號'}
              </label>
              <p className="text-charcoal mt-1">
                {caseData.courtReference || (isEn ? 'N/A' : '—')}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">
                {isEn ? 'Assigned Lawyer' : '負責律師'}
              </label>
              <p className="text-charcoal mt-1">
                {caseData.assignedLawyer?.name || (isEn ? 'Unassigned' : '未指派')}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">
                {isEn ? 'Estimated Budget' : '預計費用'}
              </label>
              <p className="text-charcoal mt-1">{formatCurrency(caseData.estimatedBudget)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">
                {isEn ? 'Actual Cost' : '實際費用'}
              </label>
              <p className="text-charcoal mt-1">{formatCurrency(caseData.actualCost)}</p>
            </div>
          </div>

          {caseData.description && (
            <div className="mt-6">
              <label className="text-sm font-medium text-cool-gray">
                {isEn ? 'Description' : '案件描述'}
              </label>
              <p className="text-charcoal mt-1 whitespace-pre-wrap">{caseData.description}</p>
            </div>
          )}

          {caseData.notes && (
            <div className="mt-6">
              <label className="text-sm font-medium text-cool-gray">
                {isEn ? 'Notes' : '內部備註'}
              </label>
              <p className="text-charcoal mt-1 whitespace-pre-wrap">{caseData.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {isEn ? 'Client Information' : '客戶資料'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-cool-gray">
                {isEn ? 'Name' : '姓名'}
              </label>
              <p className="text-charcoal mt-1">
                {caseData.client.firstName} {caseData.client.lastName}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">
                {isEn ? 'Email' : '電郵'}
              </label>
              <p className="text-charcoal mt-1">
                {caseData.client.email || (isEn ? 'N/A' : '—')}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-cool-gray">
                {isEn ? 'Phone' : '電話'}
              </label>
              <p className="text-charcoal mt-1">
                {caseData.client.phone || (isEn ? 'N/A' : '—')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {isEn ? 'Recent Time Entries' : '最近工時記錄'}
          </CardTitle>
          <CardDescription>
            {isEn
              ? 'Last 5 time entries for this case'
              : '此案件最近的 5 筆工時記錄'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {caseData.timeEntries.length === 0 ? (
            <p className="text-cool-gray text-center py-4">
              {isEn ? 'No time entries yet' : '暫時沒有工時記錄'}
            </p>
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
                      {formatDate(entry.date)} • {entry.hours}{' '}
                      {isEn ? 'hours' : '小時'}
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
          <CardTitle>
            {isEn ? 'Recent Documents' : '最近文件'}
          </CardTitle>
          <CardDescription>
            {isEn
              ? 'Last 5 documents for this case'
              : '此案件最近的 5 份文件'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {caseData.documents.length === 0 ? (
            <p className="text-cool-gray text-center py-4">
              {isEn ? 'No documents yet' : '暫時沒有文件'}
            </p>
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
