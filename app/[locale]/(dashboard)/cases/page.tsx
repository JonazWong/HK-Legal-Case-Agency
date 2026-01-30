"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface Case {
  id: string;
  caseNumber: string;
  title: string;
  category: string;
  status: string;
  filingDate: string | null;
  client: {
    firstName: string;
    lastName: string;
  };
  assignedLawyer: {
    name: string;
  } | null;
}

export default function CasesPage() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const isEn = pathname.startsWith("/en");
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCases = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      });

      if (statusFilter) {
        params.append('status', statusFilter);
      }

      if (search) {
        params.append('search', search);
      }

      const res = await fetch(`/api/cases?${params}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch cases');
      }

      setCases(data.cases);
      setTotalPages(data.pagination.totalPages);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchCases();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">
            {isEn ? "Cases" : "案件列表"}
          </h1>
          <p className="text-cool-gray mt-1">
            {isEn ? "Manage all your legal cases" : "管理事務所內所有法律案件"}
          </p>
        </div>
        <Link href="/cases/new">
          <Button>{isEn ? "Create New Case" : "新增案件"}</Button>
        </Link>
      </div>

      <Card>
        <form onSubmit={handleSearch} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder={
                  isEn
                    ? "Search by case number, title, or court reference..."
                    : "可輸入案件編號、標題或法院檔案編號搜尋…"
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select
              options={[
                { value: "", label: isEn ? "All Statuses" : "全部狀態" },
                { value: "ACTIVE", label: isEn ? "Active" : "進行中" },
                { value: "PENDING", label: isEn ? "Pending" : "待處理" },
                { value: "COMPLETED", label: isEn ? "Completed" : "已完成" },
                { value: "ARCHIVED", label: isEn ? "Archived" : "已封存" },
              ]}
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </form>

        {error && (
          <div className="mb-4 p-4 bg-alert-red/10 border border-alert-red text-alert-red rounded-md">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-green"></div>
          </div>
        ) : cases.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-cool-gray">
              {isEn ? "No cases found" : "未找到任何案件"}
            </p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isEn ? "Case Number" : "案件編號"}</TableHead>
                  <TableHead>{isEn ? "Title" : "案件標題"}</TableHead>
                  <TableHead>{isEn ? "Client" : "客戶"}</TableHead>
                  <TableHead>{isEn ? "Category" : "類別"}</TableHead>
                  <TableHead>{isEn ? "Status" : "狀態"}</TableHead>
                  <TableHead>{isEn ? "Filing Date" : "立案日期"}</TableHead>
                  <TableHead>{isEn ? "Assigned Lawyer" : "負責律師"}</TableHead>
                  <TableHead>{isEn ? "Actions" : "操作"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-medium">
                      {caseItem.caseNumber}
                    </TableCell>
                    <TableCell>{caseItem.title}</TableCell>
                    <TableCell>
                      {caseItem.client.firstName} {caseItem.client.lastName}
                    </TableCell>
                    <TableCell>{caseItem.category}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(caseItem.status)}>
                        {isEn
                          ? caseItem.status
                          : caseItem.status === "ACTIVE"
                          ? "進行中"
                          : caseItem.status === "PENDING"
                          ? "待處理"
                          : caseItem.status === "COMPLETED"
                          ? "已完成"
                          : caseItem.status === "ARCHIVED"
                          ? "已封存"
                          : caseItem.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(caseItem.filingDate)}</TableCell>
                    <TableCell>
                      {caseItem.assignedLawyer?.name || 'Unassigned'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/cases/${caseItem.id}`}>
                          <Button size="sm" variant="text">
                            {isEn ? "View" : "查看"}
                          </Button>
                        </Link>
                        <Link href={`/cases/${caseItem.id}/edit`}>
                          <Button size="sm" variant="text">
                            {isEn ? "Edit" : "編輯"}
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  {isEn ? "Previous" : "上一頁"}
                </Button>
                <span className="px-4 py-2 text-sm text-cool-gray">
                  {isEn ? "Page" : "第"} {page}{" "}
                  {isEn ? "of" : "頁，共"} {totalPages}{isEn ? "" : "頁"}
                </span>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  {isEn ? "Next" : "下一頁"}
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
