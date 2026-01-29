import { PublicCaseSearchService } from '@/lib/services/publicCaseSearch';
import { Card, Input, Button, Badge, Table } from '@/components/ui';

export default async function PublicSearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const searchService = new PublicCaseSearchService();
  const query = searchParams.q || '';
  const cases = query 
    ? await searchService.search({ query })
    : await searchService.getRecentCases(20);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-teal-dark">香港法律案件搜尋器</h1>
      </div>

      <Card className="p-6 mb-6">
        <form action="/public-search" method="GET" className="flex gap-4">
          <Input 
            name="q" 
            defaultValue={query} 
            placeholder="搜尋案件編號、標題或內容..." 
            className="flex-1"
          />
          <Button type="submit" className="bg-teal-dark hover:bg-opacity-90">
            搜尋
          </Button>
        </form>
      </Card>

      <div className="grid gap-4">
        {cases.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">來源</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">案件編號 / 標題</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">類別</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">法院</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cases.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {c.hearingDate ? new Date(c.hearingDate).toLocaleDateString() : new Date(c.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {c.source}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{c.caseNumber || 'N/A'}</div>
                      <div className="text-sm text-gray-500 truncate max-w-md">{c.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {c.category || 'OTHER'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {c.court || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">沒有找到相關案件。</p>
          </div>
        )}
      </div>
    </div>
  );
}
