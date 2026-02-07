"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ParticleBackground } from "@/components/ui/particle-background";
import { PremierButton } from "@/components/ui/premier-button";

export default function HomePage() {
  const pathname = usePathname() || "/";
  const isEn = pathname.startsWith("/en");
  const localePrefix = isEn ? "/en" : "/zh";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section with Background Image */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-premier-black">
        {/* Particle Background Effect */}
        <ParticleBackground particleCount={40} />
        
        {/* Background Video with Dark Overlay */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/media/5636967-uhd_3840_2160_24fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-premier-black/60 via-premier-black/40 to-premier-black" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold">
              {isEn ? "Hong Kong Legal Intelligence Platform" : "法律事務智能資料庫"}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-premier-gold font-semibold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
              {isEn ? "AI-powered Search & Analysis" : "AI 集成搜尋分析"}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-premier-pearl/90 max-w-2xl mx-auto leading-relaxed">
              {isEn
                ? "An integrated case and knowledge management platform for Hong Kong legal professionals, combining AI search with modern case workflows."
                : "為香港法律專業人士打造的全方位案件與知識管理平台，整合智能搜尋與案件管理，提升效率、優化流程、專業可靠。"}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 sm:pt-8">
              <Link href={`${localePrefix}/signup`}>
                <PremierButton 
                  variant="primary" 
                  size="lg"
                  className="min-w-[220px] text-base sm:text-lg py-4 sm:py-5"
                >
                  {isEn ? "Start 14-day Free Trial" : "14天免費試用"}
                </PremierButton>
              </Link>
              <Link href={`${localePrefix}/login`}>
                <PremierButton 
                  variant="outline" 
                  size="lg"
                  className="min-w-[220px] text-base sm:text-lg py-4 sm:py-5"
                >
                  {isEn ? "Log in to Smart Search" : "登入智能搜尋器"}
                </PremierButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform z-10 animate-bounce">
          <svg
            className="w-6 h-6 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isEn ? "Core Features" : "核心功能"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isEn
                ? "A complete solution designed for the Hong Kong legal market."
                : "專為香港法律市場設計的完整解決方案"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group p-6 border border-border rounded-lg bg-card hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 hover:border-accent/50">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-background"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {isEn ? "Case Management" : "案件管理"}
              </h3>
              <p className="text-muted-foreground">
                {isEn
                  ? "Track case progress, status, budgets and key dates in one place."
                  : "全面追蹤案件進度、狀態、預算及重要日期，確保每個案件都在掌控之中"}
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="group p-6 border border-border rounded-lg bg-card hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 hover:border-accent/50">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-background"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {isEn ? "Client Management" : "客戶管理"}
              </h3>
              <p className="text-muted-foreground">
                {isEn
                  ? "Centralise client information, communications and case history."
                  : "集中管理客戶資料、通訊記錄及案件歷史，提升客戶服務質量"}
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="group p-6 border border-border rounded-lg bg-card hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 hover:border-accent/50">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-background"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {isEn ? "Time Tracking" : "時間追蹤"}
              </h3>
              <p className="text-muted-foreground">
                {isEn
                  ? "Accurately record billable hours and generate professional invoices."
                  : "準確記錄工作時數，自動計算費用並生成專業發票"}
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="group p-6 border border-border rounded-lg bg-card hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 hover:border-accent/50">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-background"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {isEn ? "Document Management" : "文檔管理"}
              </h3>
              <p className="text-muted-foreground">
                {isEn
                  ? "Securely store and manage documents with versioning and e-signatures."
                  : "安全存儲和管理案件文檔，支持版本控制及電子簽名"}
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="group p-6 border border-border rounded-lg bg-card hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 hover:border-accent/50">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-background"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {isEn ? "Invoice Management" : "發票管理"}
              </h3>
              <p className="text-muted-foreground">
                {isEn
                  ? "Automate invoice creation and payment tracking for smoother billing."
                  : "自動化發票生成、追蹤付款狀態，簡化財務管理流程"}
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="group p-6 border border-border rounded-lg bg-card hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 hover:border-accent/50">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-6 h-6 text-background"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {isEn ? "Communication Hub" : "通訊平台"}
              </h3>
              <p className="text-muted-foreground">
                {isEn
                  ? "Unify email, SMS and in-app messaging for seamless communication."
                  : "整合電郵、短訊及應用內訊息，確保溝通順暢無阻"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-4">
              {isEn ? "Enterprise Only" : "企業版專享"}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isEn ? "Advanced Features" : "高級功能"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isEn
                ? "Powerful tools tailored for professional law firms."
                : "為專業律所提供更強大的管理工具"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Premium Feature 1 */}
            <div className="bg-background p-8 rounded-lg border-2 border-accent/30 hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {isEn ? "Advanced Security" : "進階安全性"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isEn
                  ? "Enterprise-grade encryption, MFA and full audit logs to secure client data."
                  : "企業級加密、雙因素認證、完整審計日誌，確保客戶資料絕對安全"}
              </p>
              <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">
                {isEn ? "Enterprise Only" : "企業版獨享"}
              </div>
            </div>

            {/* Premium Feature 2 */}
            <div className="bg-background p-8 rounded-lg border-2 border-accent/30 hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {isEn ? "Custom Workflows" : "自定義工作流"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isEn
                  ? "Configure approval flows and automation rules to match your practice."
                  : "根據律所獨特需求，自由配置審批流程、自動化規則和業務邏輯"}
              </p>
              <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">
                {isEn ? "Enterprise Only" : "企業版獨享"}
              </div>
            </div>

            {/* Premium Feature 3 */}
            <div className="bg-background p-8 rounded-lg border-2 border-accent/30 hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {isEn ? "Deep Analytics" : "深度分析報告"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isEn
                  ? "AI-driven insights, performance analytics and forecasting for better decisions."
                  : "AI 驅動的業務洞察、績效分析和預測性報告，助力策略決策"}
              </p>
              <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">
                {isEn ? "Enterprise Only" : "企業版獨享"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isEn ? "Flexible Subscription Plans" : "靈活的訂閱計劃"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isEn
                ? "Choose the plan that best fits your firm size."
                : "選擇最適合您律所規模的方案"}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Pricing Card 1 */}
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent/50 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-2">Starter</h3>
              <p className="text-3xl font-bold text-accent mb-4">
                HK$3,100
                <span className="text-sm text-muted-foreground">/月</span>
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                {isEn ? "Ideal for 1-2 person firms" : "適合 1-2 人小型律所"}
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <span className="text-accent mr-2">✓</span> {isEn ? "Core case management" : "基礎案件管理"}
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">✓</span> {isEn ? "Client contact tools" : "客戶聯繫"}
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">✓</span> {isEn ? "Time tracking" : "時間追蹤"}
                </li>
              </ul>
            </div>

            {/* Pricing Card 2 - Featured */}
            <div className="bg-card p-8 rounded-lg border-2 border-accent relative hover:shadow-lg hover:shadow-accent/20 transition-all">
              <div className="absolute top-0 right-0 bg-accent text-background text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-semibold">
                推薦
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Professional</h3>
              <p className="text-3xl font-bold text-accent mb-4">
                HK$7,000
                <span className="text-sm text-muted-foreground">/月</span>
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                {isEn ? "Ideal for 5-20 person firms" : "適合 5-20 人律所"}
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <span className="text-accent mr-2">✓</span> {isEn ? "Full feature set" : "完整功能"}
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">✓</span> {isEn ? "Multi-user collaboration" : "多用戶協作"}
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">✓</span> {isEn ? "Advanced reports" : "進階報告"}
                </li>
              </ul>
            </div>

            {/* Pricing Card 3 */}
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent/50 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
              <p className="text-3xl font-bold text-accent mb-4">
                HK$10,100+
                <span className="text-sm text-muted-foreground">/月</span>
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                {isEn ? "Ideal for 20-100 person firms" : "適合 20-100 人律所"}
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <span className="text-accent mr-2">✓</span> {isEn ? "Custom workflows" : "自定義工作流"}
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">✓</span> {isEn ? "API access" : "API 訪問"}
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">✓</span> {isEn ? "Priority support" : "優先支持"}
                </li>
              </ul>
            </div>

            {/* Pricing Card 4 */}
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent/50 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-2">Custom</h3>
              <p className="text-3xl font-bold text-accent mb-4">按需報價</p>
              <p className="text-muted-foreground text-sm mb-6">
                {isEn ? "Ideal for large firms" : "適合大型律所"}
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <span className="text-accent mr-2">✓</span> {isEn ? "Fully customised" : "完全定制化"}
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">✓</span> {isEn ? "Professional implementation" : "專業實施"}
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">✓</span> {isEn ? "24/7 support" : "24/7 支持"}
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-blue-800 text-white font-semibold text-lg py-6 px-8"
            >
              {isEn ? "Start Free Trial" : "開始免費試用"}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-semibold text-white mb-2">
              HK Legal Case Management Platform
            </p>
            <p className="text-sm text-muted-foreground">© 2024 All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
