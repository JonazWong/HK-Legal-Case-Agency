'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui';
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card';
import { PremierButton } from '@/components/ui/premier-button';
import Link from 'next/link';

interface DashboardStats {
  totalCases: number;
  activeCases: number;
  totalClients: number;
  pendingInvoices: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const pathname = usePathname() || '/';
  const isEn = pathname.startsWith('/en');
  const [stats, setStats] = useState<DashboardStats>({
    totalCases: 0,
    activeCases: 0,
    totalClients: 0,
    pendingInvoices: 0,
  });
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-teal-dark">
            {isEn ? 'Dashboard' : '儀表板'}
          </h1>
          <p className="text-cool-gray mt-1">
            {isEn ? 'Welcome back, ' : '歡迎回來，'}
            {session?.user?.name || 'User'}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard variant="gold" animated>
          <GlassCardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-premier-pearl/70">
                  {isEn ? 'Total Cases' : '案件總數'}
                </p>
                <p className="text-3xl font-bold text-premier-gold mt-2 drop-shadow-premier-sm">
                  {loading ? '-' : stats.totalCases}
                </p>
              </div>
              <div className="w-12 h-12 bg-premier-gold/10 rounded-lg flex items-center justify-center border border-premier-gold/20">
                <svg className="w-6 h-6 text-premier-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>

        <GlassCard variant="mystery" animated>
          <GlassCardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-premier-pearl/70">
                  {isEn ? 'Active Cases' : '進行中案件'}
                </p>
                <p className="text-3xl font-bold text-premier-pearl mt-2 drop-shadow-premier-sm">
                  {loading ? '-' : stats.activeCases}
                </p>
              </div>
              <div className="w-12 h-12 bg-premier-mystery/10 rounded-lg flex items-center justify-center border border-premier-mystery/20">
                <svg className="w-6 h-6 text-premier-mystery-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>

        <GlassCard variant="default" animated>
          <GlassCardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-premier-pearl/70">
                  {isEn ? 'Total Clients' : '客戶總數'}
                </p>
                <p className="text-3xl font-bold text-premier-pearl mt-2 drop-shadow-premier-sm">
                  {loading ? '-' : stats.totalClients}
                </p>
              </div>
              <div className="w-12 h-12 bg-premier-gold/10 rounded-lg flex items-center justify-center border border-premier-gold/20">
                <svg className="w-6 h-6 text-premier-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>

        <GlassCard variant="gold" animated>
          <GlassCardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-premier-pearl/70">
                  {isEn ? 'Pending Invoices' : '待處理發票'}
                </p>
                <p className="text-3xl font-bold text-premier-gold mt-2 drop-shadow-premier-sm">
                  {loading ? '-' : stats.pendingInvoices}
                </p>
              </div>
              <div className="w-12 h-12 bg-premier-gold/10 rounded-lg flex items-center justify-center border border-premier-gold/20">
                <svg className="w-6 h-6 text-premier-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>

      {/* Quick Actions */}
      <GlassCard variant="default">
        <GlassCardHeader>
          <GlassCardTitle className="text-premier-gold">{isEn ? 'Quick Actions' : '快速操作'}</GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/cases/new">
              <div className="p-4 border border-premier-gold/20 rounded-lg hover:border-premier-gold hover:shadow-premier-sm transition-all cursor-pointer bg-premier-gold/5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-premier-gold rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-premier-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-premier-pearl">
                      {isEn ? 'New Case' : '新增檔案'}
                    </p>
                    <p className="text-sm text-premier-pearl/70">
                      {isEn ? 'Create a new case' : '新增個案檔案'}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/clients/new">
              <div className="p-4 border border-premier-mystery/20 rounded-lg hover:border-premier-mystery hover:shadow-premier-sm transition-all cursor-pointer bg-premier-mystery/5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-premier-mystery rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-premier-pearl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-premier-pearl">
                      {isEn ? 'New Client' : '新增客戶'}
                    </p>
                    <p className="text-sm text-premier-pearl/70">
                      {isEn ? 'Add a new client' : '新增一位客戶'}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/time/new">
              <div className="p-4 border border-premier-gold/20 rounded-lg hover:border-premier-gold hover:shadow-premier-sm transition-all cursor-pointer bg-premier-gold/5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-premier-gold rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-premier-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-premier-pearl">
                      {isEn ? 'Log Time' : '登記工時'}
                    </p>
                    <p className="text-sm text-premier-pearl/70">
                      {isEn ? 'Track billable hours' : '記錄可收費的工作時數'}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}
