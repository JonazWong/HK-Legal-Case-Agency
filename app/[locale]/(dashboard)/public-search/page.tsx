'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
import { CaseNumberLink, CaseLinksList, AutoLinkText } from '@/lib/case-linking/use-case-linking';

interface PublicCase {
  id: string;
  source: string;
  caseNumber: string | null;
  title: string;
  content: string | null;
  category: string | null;
  court: string | null;
  hearingDate: string | null;
  publishedAt: string;
  url: string | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function PublicSearchPage() {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const isEn = pathname.startsWith('/en');
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [source, setSource] = useState(searchParams.get('source') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [court, setCourt] = useState(searchParams.get('court') || '');
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  
  const [cases, setCases] = useState<PublicCase[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCases = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError('');
      
      const params = new URLSearchParams({ 
        page: page.toString(), 
        limit: '20' 
      });

      if (query) params.append('query', query);
      if (source) params.append('source', source);
      if (category) params.append('category', category);
      if (court) params.append('court', court);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await fetch(`/api/public-cases?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch public cases');
      }

      setCases(data.cases || []);
      setPagination(data.pagination || null);
    } catch (err: any) {
      setCases([]);
      setPagination(null);
      setError(err.message || 'Failed to fetch public cases');
    } finally {
      setLoading(false);
    }
  }, [query, source, category, court, startDate, endDate]);

  useEffect(() => {
    fetchCases(currentPage);
  }, [fetchCases, currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    
    // Update URL with search params
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (source) params.set('source', source);
    if (category) params.set('category', category);
    if (court) params.set('court', court);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    
    router.push(`${pathname}?${params.toString()}`);
    fetchCases(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setQuery('');
    setSource('');
    setCategory('');
    setCourt('');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
    router.push(pathname);
  };

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

      <Card>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  isEn
                    ? 'Search by case number, title, or content...'
                    : '搜尋案件編號、標題或內容...'
                }
              />
            </div>
            
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-mint-green focus:border-transparent transition-colors border-light-gray"
            >
              <option value="">{isEn ? 'All Sources' : '所有來源'}</option>
              <option value="JUDICIARY">{isEn ? 'Judiciary' : '司法機構'}</option>
              <option value="NEWS">{isEn ? 'News' : '新聞'}</option>
              <option value="HKLII">{isEn ? 'HKLII' : '香港法律資訊研究所'}</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-mint-green focus:border-transparent transition-colors border-light-gray"
            >
              <option value="">{isEn ? 'All Categories' : '所有類別'}</option>
              <option value="CIVIL">{isEn ? 'Civil' : '民事'}</option>
              <option value="CRIMINAL">{isEn ? 'Criminal' : '刑事'}</option>
              <option value="CORPORATE">{isEn ? 'Corporate' : '公司'}</option>
              <option value="FAMILY">{isEn ? 'Family' : '家事'}</option>
              <option value="PROPERTY">{isEn ? 'Property' : '物業'}</option>
              <option value="IMMIGRATION">{isEn ? 'Immigration' : '入境'}</option>
              <option value="LABOUR">{isEn ? 'Labour' : '勞工'}</option>
              <option value="OTHER">{isEn ? 'Other' : '其他'}</option>
            </select>

            <select
              value={court}
              onChange={(e) => setCourt(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-mint-green focus:border-transparent transition-colors border-light-gray"
            >
              <option value="">{isEn ? 'All Courts' : '所有法院'}</option>
              <option value="Court of Final Appeal">{isEn ? 'Court of Final Appeal' : '終審法院'}</option>
              <option value="High Court">{isEn ? 'High Court' : '高等法院'}</option>
              <option value="District Court">{isEn ? 'District Court' : '區域法院'}</option>
              <option value="Magistrates Court">{isEn ? 'Magistrates Court' : '裁判法院'}</option>
              <option value="Labour Tribunal">{isEn ? 'Labour Tribunal' : '勞資審裁處'}</option>
              <option value="Small Claims Tribunal">{isEn ? 'Small Claims Tribunal' : '小額錢債審裁處'}</option>
            </select>

            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder={isEn ? 'Start Date' : '開始日期'}
            />

            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder={isEn ? 'End Date' : '結束日期'}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1 md:flex-none">
              {isEn ? 'Search' : '搜尋'}
            </Button>
            <Button type="button" variant="secondary" onClick={handleReset}>
              {isEn ? 'Reset' : '重設'}
            </Button>
          </div>
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
        <>
          <Card className="p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isEn ? 'Date' : '日期'}</TableHead>
                  <TableHead>{isEn ? 'Source' : '來源'}</TableHead>
                  <TableHead>{isEn ? 'Case Number / Title' : '案件編號 / 標題'}</TableHead>
                  <TableHead>{isEn ? 'Category' : '類別'}</TableHead>
                  <TableHead>{isEn ? 'Court' : '法院'}</TableHead>
                  <TableHead>{isEn ? 'Link' : '連結'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cases.map((c) => (
                  <>
                    <TableRow 
                      key={c.id}
                      onClick={() => setExpandedCase(expandedCase === c.id ? null : c.id)}
                      className="cursor-pointer hover:bg-teal-50"
                    >
                      <TableCell className="whitespace-nowrap">
                        {new Date(c.hearingDate ?? c.publishedAt).toLocaleDateString('en-GB')}
                      </TableCell>
                      <TableCell>
                        <Badge variant="info">{c.source}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {/* 🔗 智能案件編號連結 */}
                          {c.caseNumber ? (
                            <CaseNumberLink 
                              caseNumber={c.caseNumber}
                              className="font-medium text-teal-600 hover:text-teal-700"
                            />
                          ) : (
                            <div className="font-medium text-gray-400">—</div>
                          )}
                          
                          {/* 📄 標題（自動連結內含的案件編號） */}
                          <div className="text-sm text-cool-gray max-w-md">
                            <AutoLinkText text={c.title} />
                          </div>
                          
                          {/* 展開/收合指示 */}
                          {c.content && (
                            <div className="text-xs text-teal-600 flex items-center gap-1 mt-1">
                              {expandedCase === c.id ? '▼' : '▶'} 
                              {isEn ? 'Click to view details' : '點擊查看詳情'}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{c.category ?? 'OTHER'}</TableCell>
                      <TableCell>{c.court ?? '—'}</TableCell>
                      <TableCell>
                        {c.url ? (
                          <a 
                            href={c.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-teal-600 hover:text-teal-700 hover:underline inline-flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {isEn ? 'View Source' : '查看來源'}
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                    
                    {/* 展開的詳情區域 */}
                    {expandedCase === c.id && c.content && (
                      <TableRow key={`${c.id}-details`}>
                        <TableCell colSpan={6} className="bg-teal-50/50 p-6">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-teal-800 mb-2">
                                {isEn ? 'Content' : '內容'}
                              </h4>
                              <div className="text-sm text-gray-700 whitespace-pre-wrap">
                                <AutoLinkText text={c.content} />
                              </div>
                            </div>
                            
                            {/* 顯示所有找到的相關案件編號 */}
                            <CaseLinksList 
                              text={`${c.title} ${c.content}`}
                              showJudiciary={true}
                              showLegalRef={false}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </Card>

          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-cool-gray">
                {isEn ? 'Showing' : '顯示'} {((currentPage - 1) * pagination.limit) + 1} - {Math.min(currentPage * pagination.limit, pagination.total)} {isEn ? 'of' : '共'} {pagination.total} {isEn ? 'results' : '個結果'}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {isEn ? 'Previous' : '上一頁'}
                </Button>
                <span className="flex items-center px-4 text-sm">
                  {isEn ? 'Page' : '第'} {currentPage} {isEn ? 'of' : '/'} {pagination.totalPages} {isEn ? '' : '頁'}
                </span>
                <Button
                  variant="secondary"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                >
                  {isEn ? 'Next' : '下一頁'}
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Card className="text-center">
          <p className="text-cool-gray">
            {isEn ? 'No public cases found. Try adjusting your search filters.' : '未找到相關案件。請嘗試調整搜尋條件。'}
          </p>
        </Card>
      )}
    </div>
  );
}
