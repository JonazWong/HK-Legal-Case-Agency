'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Badge,
  Button,
  Card,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

interface PublicCase {
  id: string;
  source: string;
  caseNumber: string | null;
  title: string;
  category: string | null;
  court: string | null;
  hearingDate: string | null;
  publishedAt: string;
}

export default function PublicSearchPage() {
  const pathname = usePathname() || '/';
  const isEn = pathname.startsWith('/en');
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(queryParam);
  const [cases, setCases] = useState<PublicCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  const fetchCases = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams({ page: '1', limit: '20' });

      if (queryParam) {
        params.append('query', queryParam);
      }

      const response = await fetch(`/api/public-cases?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch public cases');
      }

      setCases(data.cases || []);
    } catch (err: any) {
      setCases([]);
      setError(err.message || 'Failed to fetch public cases');
    } finally {
      setLoading(false);
    }
  }, [queryParam]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">
            {isEn ? 'Public Case Search' : '香港法律案件搜尋'}
          </h1>
          <p className="text-cool-gray mt-1">
            {isEn
              ? 'Search public court listings and case announcements'
              : '搜尋公開法院日程與案件公告'}
          </p>
        </div>
      </div>

      <Card className="mb-6">
        <form action={pathname} method="GET" className="flex flex-col gap-4 md:flex-row">
          <Input
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              isEn
                ? 'Search by case number, title, or content...'
                : '搜尋案件編號、標題或內容...'
            }
            className="flex-1"
          />
          <Button type="submit">{isEn ? 'Search' : '搜尋'}</Button>
        </form>
      </Card>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-green"></div>
        </div>
      ) : error ? (
        <Card className="text-center">
          <p className="text-alert-red">{error}</p>
        </Card>
      ) : cases.length > 0 ? (
        <Card className="p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isEn ? 'Date' : '日期'}</TableHead>
                <TableHead>{isEn ? 'Source' : '來源'}</TableHead>
                <TableHead>{isEn ? 'Case Number / Title' : '案件編號 / 標題'}</TableHead>
                <TableHead>{isEn ? 'Category' : '類別'}</TableHead>
                <TableHead>{isEn ? 'Court' : '法院'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    {new Date(c.hearingDate ?? c.publishedAt).toLocaleDateString('en-GB')}
                  </TableCell>
                  <TableCell>
                    <Badge variant="info">{c.source}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-charcoal">{c.caseNumber ?? '—'}</div>
                    <div className="text-sm text-cool-gray truncate max-w-md">{c.title}</div>
                  </TableCell>
                  <TableCell>{c.category ?? 'OTHER'}</TableCell>
                  <TableCell>{c.court ?? '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="text-center">
          <p className="text-cool-gray">
            {isEn ? 'No public cases found.' : '未找到相關案件。'}
          </p>
        </Card>
      )}
    </div>
  );
}
