"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { formatFullName } from '@/lib/utils';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  _count: {
    cases: number;
  };
}

export default function ClientsPage() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const isEn = pathname.startsWith("/en");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      });

      if (search) {
        params.append('search', search);
      }

      const res = await fetch(`/api/clients?${params}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || (isEn ? 'Failed to fetch clients' : '載入客戶資料失敗')
        );
      }

      setClients(data.clients);
      setTotalPages(data.pagination.totalPages);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [page, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchClients();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">
            {isEn ? 'Clients' : '客戶列表'}
          </h1>
          <p className="text-cool-gray mt-1">
            {isEn ? 'Manage all your clients' : '管理所有客戶資料'}
          </p>
        </div>
        <Link href="/clients/new">
          <Button>{isEn ? 'Create New Client' : '新增客戶'}</Button>
        </Link>
      </div>

      <Card>
        <form onSubmit={handleSearch} className="mb-6">
          <div className="grid grid-cols-1 gap-4">
            <Input
              placeholder={
                isEn
                  ? 'Search by name, email, phone, or company...'
                  : '可輸入姓名、電郵、電話或公司名稱搜尋…'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
        ) : clients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-cool-gray">
              {isEn ? 'No clients found' : '未找到任何客戶'}
            </p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isEn ? 'Full Name' : '姓名'}</TableHead>
                  <TableHead>{isEn ? 'Email' : '電郵'}</TableHead>
                  <TableHead>{isEn ? 'Phone' : '電話'}</TableHead>
                  <TableHead>{isEn ? 'Company' : '公司'}</TableHead>
                  <TableHead>{isEn ? 'Cases' : '案件數'}</TableHead>
                  <TableHead>{isEn ? 'Actions' : '操作'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">
                      {formatFullName(client.lastName, client.firstName)}
                    </TableCell>
                    <TableCell>{client.email || (isEn ? 'N/A' : '—')}</TableCell>
                    <TableCell>{client.phone || (isEn ? 'N/A' : '—')}</TableCell>
                    <TableCell>{client.company || (isEn ? 'N/A' : '—')}</TableCell>
                    <TableCell>{client._count.cases}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/clients/${client.id}`}>
                          <Button size="sm" variant="text">
                            {isEn ? 'View' : '查看'}
                          </Button>
                        </Link>
                        <Link href={`/clients/${client.id}/edit`}>
                          <Button size="sm" variant="text">
                            {isEn ? 'Edit' : '編輯'}
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
                  {isEn ? 'Previous' : '上一頁'}
                </Button>
                <span className="px-4 py-2 text-sm text-cool-gray">
                  {isEn ? 'Page' : '第'} {page}{' '}
                  {isEn ? 'of' : '頁，共'} {totalPages}
                  {isEn ? '' : '頁'}
                </span>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  {isEn ? 'Next' : '下一頁'}
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
