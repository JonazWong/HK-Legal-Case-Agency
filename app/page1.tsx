import Link from 'next/link';
import { Button } from '@/components/ui';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="relative bg-teal-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              香港法律業務案件管理平台
            </h1>
            <p className="text-lg md:text-xl text-mint-green mb-4">
              Hong Kong Legal Case Management Platform
            </p>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
              為香港法律專業人士打造的全方位案件管理系統，提升效率、優化流程、專業可靠
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="min-w-[200px]">
                  開始 14 天免費試用
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="secondary" className="min-w-[200px] bg-white border-white text-teal-dark hover:bg-light-gray hover:border-light-gray">
                  登入
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-dark mb-4">核心功能</h2>
            <p className="text-lg text-cool-gray">專為香港法律市場設計的完整解決方案</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-light-gray rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mint-green rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">案件管理</h3>
              <p className="text-cool-gray">全面追蹤案件進度、狀態、預算及重要日期，確保每個案件都在掌控之中</p>
            </div>

            <div className="p-6 border border-light-gray rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mint-green rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">客戶管理</h3>
              <p className="text-cool-gray">集中管理客戶資料、通訊記錄及案件歷史，提升客戶服務質量</p>
            </div>

            <div className="p-6 border border-light-gray rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mint-green rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">時間追蹤</h3>
              <p className="text-cool-gray">準確記錄工作時數，自動計算費用並生成專業發票</p>
            </div>

            <div className="p-6 border border-light-gray rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mint-green rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">文檔管理</h3>
              <p className="text-cool-gray">安全存儲和管理案件文檔，支持版本控制及電子簽名</p>
            </div>

            <div className="p-6 border border-light-gray rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mint-green rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">發票管理</h3>
              <p className="text-cool-gray">自動化發票生成、追蹤付款狀態，簡化財務管理流程</p>
            </div>

            <div className="p-6 border border-light-gray rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mint-green rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">通訊平台</h3>
              <p className="text-cool-gray">整合電郵、短訊及應用內訊息，確保溝通順暢無阻</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 bg-off-white border-t-4 border-subtle-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-subtle-gold text-charcoal text-sm font-semibold rounded-full mb-4">
              企業版專享
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-teal-dark mb-4">高級功能</h2>
            <p className="text-lg text-cool-gray">為專業律所提供更強大的管理工具</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border-2 border-subtle-gold hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-subtle-gold rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">進階安全性</h3>
              <p className="text-cool-gray">企業級加密、雙因素認證、完整審計日誌，確保客戶資料絕對安全</p>
              <div className="mt-4 inline-block px-3 py-1 bg-subtle-gold bg-opacity-20 text-subtle-gold text-xs font-semibold rounded">
                企業版獨享
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-subtle-gold hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-subtle-gold rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">自定義工作流</h3>
              <p className="text-cool-gray">根據律所獨特需求，自由配置審批流程、自動化規則和業務邏輯</p>
              <div className="mt-4 inline-block px-3 py-1 bg-subtle-gold bg-opacity-20 text-subtle-gold text-xs font-semibold rounded">
                企業版獨享
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-subtle-gold hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-subtle-gold rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">深度分析報告</h3>
              <p className="text-cool-gray">AI 驅動的業務洞察、績效分析和預測性報告，助力策略決策</p>
              <div className="mt-4 inline-block px-3 py-1 bg-subtle-gold bg-opacity-20 text-subtle-gold text-xs font-semibold rounded">
                企業版獨享
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-dark mb-4">靈活的訂閱計劃</h2>
            <p className="text-lg text-cool-gray">選擇最適合您律所規模的方案</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-off-white p-6 rounded-lg border-2 border-light-gray">
              <h3 className="text-xl font-semibold text-charcoal mb-2">Starter</h3>
              <p className="text-3xl font-bold text-mint-green mb-4">HK$3,100<span className="text-sm text-cool-gray">/月</span></p>
              <p className="text-cool-gray text-sm mb-4">適合 1-2 人小型律所</p>
              <ul className="space-y-2 text-sm text-cool-gray">
                <li>✓ 基礎案件管理</li>
                <li>✓ 客戶聯繫</li>
                <li>✓ 時間追蹤</li>
              </ul>
            </div>

            <div className="bg-off-white p-6 rounded-lg border-2 border-mint-green relative">
              <div className="absolute top-0 right-0 bg-mint-green text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg">
                推薦
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">Professional</h3>
              <p className="text-3xl font-bold text-mint-green mb-4">HK$7,000<span className="text-sm text-cool-gray">/月</span></p>
              <p className="text-cool-gray text-sm mb-4">適合 5-20 人律所</p>
              <ul className="space-y-2 text-sm text-cool-gray">
                <li>✓ 完整功能</li>
                <li>✓ 多用戶協作</li>
                <li>✓ 進階報告</li>
              </ul>
            </div>

            <div className="bg-off-white p-6 rounded-lg border-2 border-subtle-gold relative">
              <div className="absolute top-0 right-0 bg-subtle-gold text-charcoal text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-semibold">
                企業版
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">Enterprise</h3>
              <p className="text-3xl font-bold text-mint-green mb-4">HK$10,100+<span className="text-sm text-cool-gray">/月</span></p>
              <p className="text-cool-gray text-sm mb-4">適合 20-100 人律所</p>
              <ul className="space-y-2 text-sm text-cool-gray">
                <li>✓ 自定義工作流</li>
                <li>✓ API 訪問</li>
                <li>✓ 優先支持</li>
              </ul>
            </div>

            <div className="bg-off-white p-6 rounded-lg border-2 border-light-gray">
              <h3 className="text-xl font-semibold text-charcoal mb-2">Custom</h3>
              <p className="text-3xl font-bold text-mint-green mb-4">按需報價</p>
              <p className="text-cool-gray text-sm mb-4">適合大型律所</p>
              <ul className="space-y-2 text-sm text-cool-gray">
                <li>✓ 完全定制化</li>
                <li>✓ 專業實施</li>
                <li>✓ 24/7 支持</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/signup">
              <Button size="lg">開始免費試用</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">HK Legal Case Agency</p>
            <p className="text-sm opacity-75">© 2024 All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}