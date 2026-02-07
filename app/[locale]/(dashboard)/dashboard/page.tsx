'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { StatCard, SkeletonCard, Progress, Badge } from '@/components/ui';
import Link from 'next/link';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DashboardStats {
  totalCases: number;
  activeCases: number;
  totalClients: number;
  pendingInvoices: number;
}

interface CaseStatusData {
  status: string;
  count: number;
  color: string;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  time: string;
  user: string;
}

export default function DashboardPage({ params }: { params: { locale: string } }) {
  const { data: session } = useSession();
  const locale = params.locale || 'zh';
  const isEn = locale === 'en';
  
  const [stats, setStats] = useState<DashboardStats>({
    totalCases: 0,
    activeCases: 0,
    totalClients: 0,
    pendingInvoices: 0,
  });
  const [loading, setLoading] = useState(true);

  // Mock trend data - in production, fetch from API
  const [trends] = useState({
    cases: { value: 12, isPositive: true },
    active: { value: 8, isPositive: true },
    clients: { value: 5, isPositive: true },
    invoices: { value: 3, isPositive: false },
  });

  // Mock case status data - in production, fetch from API
  const [caseStatusData] = useState<CaseStatusData[]>([
    { status: 'ACTIVE', count: 45, color: '#3BA19D' },
    { status: 'PENDING', count: 12, color: '#D4AF37' },
    { status: 'COMPLETED', count: 78, color: '#388E3C' },
    { status: 'ARCHIVED', count: 23, color: '#5A5A5A' },
  ]);

  // Mock recent activities - in production, fetch from API
  const [recentActivities] = useState<Activity[]>([
    { id: '1', type: 'case', description: isEn ? 'New case created: HCA-2024-001' : '新案件建立：HCA-2024-001', time: '2 hours ago', user: 'John Doe' },
    { id: '2', type: 'client', description: isEn ? 'Client profile updated' : '客戶資料已更新', time: '4 hours ago', user: 'Jane Smith' },
    { id: '3', type: 'invoice', description: isEn ? 'Invoice sent to client' : '已向客戶發送發票', time: '1 day ago', user: 'Mike Chen' },
    { id: '4', type: 'document', description: isEn ? 'Contract signed' : '合約已簽署', time: '2 days ago', user: 'Sarah Wong' },
  ]);

  // Mini chart data for sparklines
  const miniChartData = [
    { value: 20 }, { value: 35 }, { value: 28 }, { value: 42 }, { value: 38 }, { value: 50 }, { value: 45 }
  ];

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const getActivityIcon = (type: string) => {
    const icons = {
      case: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      client: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      invoice: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
        </svg>
      ),
      document: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    };
    return icons[type as keyof typeof icons] || icons.case;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-charcoal bg-clip-text">
            {isEn ? 'Dashboard' : '儀表板'}
          </h1>
          <p className="text-cool-gray mt-2 text-lg">
            {isEn ? 'Welcome back, ' : '歡迎回來，'}
            <span className="font-semibold text-teal-600">{session?.user?.name || 'User'}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="gradient" className="text-sm px-4 py-2">
            {isEn ? '🎉 New' : '🎉 最新'}
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard
              title={isEn ? 'Total Cases' : '案件總數'}
              value={stats.totalCases}
              trend={trends.cases}
              color="teal"
              icon={
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              miniChart={
                <ResponsiveContainer width="100%" height={40}>
                  <LineChart data={miniChartData}>
                    <Line type="monotone" dataKey="value" stroke="#3BA19D" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              }
            />

            <StatCard
              title={isEn ? 'Active Cases' : '進行中案件'}
              value={stats.activeCases}
              trend={trends.active}
              color="green"
              icon={
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              miniChart={
                <ResponsiveContainer width="100%" height={40}>
                  <LineChart data={miniChartData.map(d => ({ value: d.value + 5 }))}>
                    <Line type="monotone" dataKey="value" stroke="#388E3C" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              }
            />

            <StatCard
              title={isEn ? 'Total Clients' : '客戶總數'}
              value={stats.totalClients}
              trend={trends.clients}
              color="blue"
              icon={
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              miniChart={
                <ResponsiveContainer width="100%" height={40}>
                  <LineChart data={miniChartData.map(d => ({ value: d.value - 10 }))}>
                    <Line type="monotone" dataKey="value" stroke="#2E6FA8" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              }
            />

            <StatCard
              title={isEn ? 'Pending Invoices' : '待處理發票'}
              value={stats.pendingInvoices}
              trend={trends.invoices}
              color="gold"
              icon={
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                </svg>
              }
              miniChart={
                <ResponsiveContainer width="100%" height={40}>
                  <LineChart data={miniChartData.map(d => ({ value: Math.max(d.value - 20, 5) }))}>
                    <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              }
            />
          </>
        )}
      </div>

      {/* Charts and Activities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Case Status Distribution */}
        <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 hover:shadow-medium transition-all duration-300">
          <h3 className="text-xl font-semibold text-charcoal mb-4">
            {isEn ? 'Case Status Distribution' : '案件狀態分佈'}
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={caseStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {caseStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {caseStatusData.map((item) => (
              <div key={item.status} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-cool-gray">
                  {item.status}: <span className="font-semibold text-charcoal">{item.count}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-soft p-6 border border-gray-100 hover:shadow-medium transition-all duration-300">
          <h3 className="text-xl font-semibold text-charcoal mb-4">
            {isEn ? 'Recent Activities' : '最近活動'}
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-teal-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal">{activity.description}</p>
                  <p className="text-xs text-cool-gray mt-1">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-white to-teal-50 rounded-xl shadow-soft p-6 border border-teal-100">
        <h3 className="text-xl font-semibold text-charcoal mb-4">
          {isEn ? 'Quick Actions' : '快速操作'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href={`/${locale}/cases/new`}
            className="group p-5 bg-white border-2 border-teal-200 rounded-xl hover:border-teal-500 hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-mint-green rounded-xl flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-charcoal text-lg">
                  {isEn ? 'New Case' : '新增檔案'}
                </p>
                <p className="text-sm text-cool-gray">
                  {isEn ? 'Create a new case' : '新增個案檔案'}
                </p>
              </div>
            </div>
          </Link>

          <Link 
            href={`/${locale}/clients/new`}
            className="group p-5 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-info-blue rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-charcoal text-lg">
                  {isEn ? 'New Client' : '新增客戶'}
                </p>
                <p className="text-sm text-cool-gray">
                  {isEn ? 'Add a new client' : '新增一位客戶'}
                </p>
              </div>
            </div>
          </Link>

          <Link 
            href={`/${locale}/time/new`}
            className="group p-5 bg-white border-2 border-green-200 rounded-xl hover:border-green-500 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-success-green rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-charcoal text-lg">
                  {isEn ? 'Log Time' : '登記工時'}
                </p>
                <p className="text-sm text-cool-gray">
                  {isEn ? 'Track billable hours' : '記錄可收費的工作時數'}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
