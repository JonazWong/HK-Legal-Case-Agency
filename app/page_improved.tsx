'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';
import { useState } from 'react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('solo');

  const trustMetrics = [
    { label: '認可律師協會', value: '100+' },
    { label: '活躍律所', value: '15,000+' },
    { label: '用戶評分', value: '4.7/5' },
    { label: '服務國家', value: '130+' },
  ];

  const useCase = [
    {
      id: 'solo',
      title: '獨立律師',
      subtitle: '一人運營，專注法律工作',
      benefits: [
        '在一個平台上管理整個執業',
        '減少行政工作，專注法律服務',
        '保持穩定現金流，快速獲得報酬',
      ],
      image: '👨‍⚖️',
    },
    {
      id: 'small',
      title: '小型律所',
      subtitle: '5-20人團隊協作',
      benefits: [
        '贏得更多客戶，簡化運營',
        '將耗時任務轉化為自動化優勢',
        '加強從首次咨詢到付款的客戶關係',
      ],
      image: '👥',
    },
    {
      id: 'mid',
      title: '中型律所',
      subtitle: '20-100人多部門協作',
      benefits: [
        '保持每個案件和客戶連接',
        '獲得智能決策所需的可視性',
        '在無官僚主義的情況下獲得大律所的精緻度',
      ],
      image: '🏢',
    },
    {
      id: 'enterprise',
      title: '企業法務',
      subtitle: '大型律所或企業內部法務',
      benefits: [
        '統一跨越多個辦公室和部門的數據、工具和團隊',
        '獲得戰略、公司範圍決策的智能',
        '使用企業級安全保護您的數據',
      ],
      image: '🏛️',
    },
  ];

  const features = [
    {
      title: '案件管理',
      description: '全面追蹤案件進度、狀態、預算及重要日期',
      icon: '📋',
      color: 'bg-mint-green',
    },
    {
      title: '客戶管理',
      description: '集中管理客戶資料、通訊記錄及案件歷史',
      icon: '👥',
      color: 'bg-mint-green',
    },
    {
      title: '時間追蹤',
      description: '準確記錄工作時數，自動計算費用並生成發票',
      icon: '⏱️',
      color: 'bg-mint-green',
    },
    {
      title: '文檔管理',
      description: '安全存儲和管理案件文檔，支持版本控制及電子簽名',
      icon: '📄',
      color: 'bg-mint-green',
    },
    {
      title: '發票管理',
      description: '自動化發票生成、追蹤付款狀態，簡化財務流程',
      icon: '💰',
      color: 'bg-mint-green',
    },
    {
      title: '通訊平台',
      description: '整合電郵、短訊及應用內訊息，確保溝通順暢',
      icon: '💬',
      color: 'bg-mint-green',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'HK$3,100',
      period: '/月',
      description: '適合 1-2 人律所',
      features: ['基礎案件管理', '客戶聯繫', '時間追蹤', '基礎報告'],
      cta: '開始免費試用',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: 'HK$7,000',
      period: '/月',
      description: '適合 5-20 人律所',
      features: ['完整功能', '多用戶協作', '進階報告', '文檔管理', '客戶門戶'],
      cta: '開始免費試用',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'HK$10,100+',
      period: '/月',
      description: '適合 20-100 人律所',
      features: ['自定義工作流', 'API 訪問', '優先支持', '進階安全', '專業實施'],
      cta: '聯絡銷售',
      highlighted: false,
    },
    {
      name: 'Custom',
      price: '按需報價',
      period: '',
      description: '適合大型律所',
      features: ['完全定制化', '專業實施', '24/7 支持', '私人帳戶經理'],
      cta: '聯絡我們',
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: '我可以免費試用多長時間？',
      answer: '我們提供 14 天免費試用，無需信用卡。您可以完全訪問 Professional 計劃的所有功能。',
    },
    {
      question: '如何從現有系統遷移？',
      answer: '我們提供免費的數據遷移服務。我們的專家團隊會幫助您遷移案件、聯絡人、日曆和任務。',
    },
    {
      question: '數據安全如何保障？',
      answer: '我們採用銀行級加密、SOC 2 Type II 認證、企業級權限管理和 24/7 安全監控。',
    },
    {
      question: '支持有多少語言？',
      answer: '平台支持繁體中文、英文及其他主要語言。我們的支持團隊使用本地語言提供幫助。',
    },
    {
      question: '可以集成其他工具嗎？',
      answer: '是的！我們與 250+ 應用集成，包括 Office 365、Google Workspace、Microsoft Teams 等。',
    },
    {
      question: '中途可以更改計劃嗎？',
      answer: '完全可以。您隨時可以升級或降級計劃，我們會按比例調整您的賬單。',
    },
  ];

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-off-white">
      {/* HERO SECTION - 簡潔有力的首頁開場 */}
      <section className="relative bg-gradient-to-br from-teal-dark via-teal-dark to-teal-dark/90 text-white overflow-hidden">
        {/* 背景裝飾 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-mint-green rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-subtle-gold rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 lg:py-40">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 左側文案 */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-mint-green font-semibold text-sm md:text-base">✨ 香港領先的法律案件管理平台</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                聰明律師選擇的案件管理系統
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                從首次咨詢到最後一筆發票，我們的智能平台自動化案件工作，讓您專注於法律工作。
              </p>

              {/* CTA 按鈕 */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/signup">
                  <Button size="lg" className="min-w-[200px] bg-mint-green hover:bg-[#2F8A87] text-white border-none">
                    開始 14 天免費試用
                  </Button>
                </Link>
                <Link href="#learn-more">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="min-w-[200px] border-2 border-white text-white bg-transparent hover:bg-white/10"
                  >
                    了解更多
                  </Button>
                </Link>
              </div>

              {/* 信任指標 */}
              <div className="flex flex-wrap gap-6 pt-8 border-t border-white/20">
                <div>
                  <div className="text-2xl font-bold text-mint-green">100+</div>
                  <div className="text-sm text-white/75">律師協會認可</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-mint-green">15,000+</div>
                  <div className="text-sm text-white/75">活躍律所</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-mint-green">4.7/5</div>
                  <div className="text-sm text-white/75">用戶評分</div>
                </div>
              </div>
            </div>

            {/* 右側視覺 */}
            <div className="hidden md:block relative h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-mint-green/20 to-subtle-gold/20 rounded-2xl backdrop-blur-sm border border-white/10"></div>
              <div className="absolute inset-4 bg-white/5 rounded-xl border border-white/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚖️</div>
                  <p className="text-white/60 text-sm">所有法律業務在一個平台</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 信任指標區 - 數字說話 */}
      <section className="bg-white border-b border-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {trustMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-mint-green mb-2">
                  {metric.value}
                </div>
                <p className="text-sm md:text-base text-cool-gray">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 為您而設計 - 客戶細分 */}
      <section id="learn-more" className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-dark mb-4">
              為各規模律所量身定制
            </h2>
            <p className="text-lg md:text-xl text-cool-gray max-w-2xl mx-auto">
              無論您是獨立律師、小型律所還是大型企業法務，我們都有適合的解決方案
            </p>
          </div>

          {/* 標籤切換 */}
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-12">
            {useCase.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-mint-green text-white shadow-lg'
                    : 'bg-white text-teal-dark border-2 border-light-gray hover:border-mint-green'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* 內容區 */}
          {useCase.map((item) =>
            activeTab === item.id ? (
              <div key={item.id} className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="text-6xl mb-4">{item.image}</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-teal-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-lg text-cool-gray mb-6">{item.subtitle}</p>
                  <ul className="space-y-4 mb-8">
                    {item.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-mint-green font-bold text-lg mt-1">✓</span>
                        <span className="text-cool-gray">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button size="lg" className="bg-mint-green hover:bg-[#2F8A87]">
                      開始免費試用
                    </Button>
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-mint-green/10 to-subtle-gold/10 rounded-2xl p-8 border border-mint-green/20 hidden md:block">
                  <div className="aspect-square bg-white/50 rounded-xl flex items-center justify-center">
                    <span className="text-8xl">{item.image}</span>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      </section>

      {/* 核心功能網格 - 6 大功能 */}
      <section className="py-20 md:py-28 bg-white border-t-4 border-mint-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-mint-green/10 text-mint-green text-sm font-semibold rounded-full mb-4">
              核心功能
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-dark mb-4">
              您需要的一切
            </h2>
            <p className="text-lg text-cool-gray max-w-2xl mx-auto">
              一個平台，完整的功能。從案件到客戶，從時間到發票，一應俱全
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-off-white p-8 rounded-xl border border-light-gray hover:border-mint-green hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-teal-dark mb-2 group-hover:text-mint-green transition-colors">
                  {feature.title}
                </h3>
                <p className="text-cool-gray leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI 與自動化 - 差異化賣點 */}
      <section className="py-20 md:py-28 bg-teal-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                AI 智能助手，讓工作更聰明
              </h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                我們的智能平台不只存儲數據，它會自動執行任務。案件總結、文件審查、時間追蹤提醒——一切自動進行，為您節省寶貴時間。
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-mint-green font-bold text-lg">✓</span>
                  <span>自動案件總結和亮點提取</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-mint-green font-bold text-lg">✓</span>
                  <span>智能時間追蹤和計費提醒</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-mint-green font-bold text-lg">✓</span>
                  <span>文檔自動分類和標記</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-mint-green font-bold text-lg">✓</span>
                  <span>預測性業務洞察</span>
                </li>
              </ul>
              <Link href="/signup">
                <Button size="lg" className="bg-mint-green hover:bg-[#2F8A87] text-white">
                  體驗 AI 智能
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-mint-green/20 to-subtle-gold/20 rounded-2xl p-8 border border-white/10">
              <div className="aspect-square bg-white/5 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🤖</div>
                  <p className="text-white/60">由 AI 驅動的案件智能</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 定價計劃 - 4 層定價 */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-dark mb-4">
              靈活的定價計劃
            </h2>
            <p className="text-lg text-cool-gray max-w-2xl mx-auto">
              選擇最適合您律所規模和需求的方案
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-xl transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-white border-2 border-mint-green shadow-xl scale-105 md:scale-110'
                    : 'bg-white border border-light-gray hover:shadow-lg'
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-mint-green text-white text-center py-2 px-4 rounded-t-lg text-sm font-semibold">
                    ⭐ 最受歡迎
                  </div>
                )}
                
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-teal-dark mb-1">{plan.name}</h3>
                  <p className="text-cool-gray text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-mint-green">{plan.price}</span>
                    {plan.period && <span className="text-cool-gray text-sm ml-2">{plan.period}</span>}
                  </div>

                  <Link href="/signup">
                    <Button
                      size="lg"
                      className={`w-full font-semibold ${
                        plan.highlighted
                          ? 'bg-mint-green hover:bg-[#2F8A87] text-white'
                          : 'bg-off-white border-2 border-teal-dark text-teal-dark hover:bg-teal-dark hover:text-white'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>

                  <ul className="space-y-3 mt-6 pt-6 border-t border-light-gray">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-cool-gray">
                        <span className="text-mint-green font-bold mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-cool-gray mb-4">需要更多功能或自定義方案？</p>
            <Link href="/contact-sales">
              <Button variant="secondary" className="bg-white border-2 border-teal-dark text-teal-dark hover:bg-teal-dark hover:text-white">
                聯絡銷售團隊
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 常見問題 - FAQ 折疊卡片 */}
      <section className="py-20 md:py-28 bg-white border-t-4 border-subtle-gold">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-subtle-gold/10 text-subtle-gold text-sm font-semibold rounded-full mb-4">
              常見問題
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-teal-dark mb-4">
              您的疑問，我們的解答
            </h2>
            <p className="text-lg text-cool-gray">
              了解更多關於我們的平台、計劃和支持
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-off-white border border-light-gray rounded-lg overflow-hidden transition-all hover:shadow-md"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 md:py-5 flex items-center justify-between hover:bg-light-gray/50 transition-colors"
                >
                  <span className="text-left font-semibold text-charcoal text-lg">
                    {faq.question}
                  </span>
                  <span className={`text-mint-green font-bold text-xl transition-transform ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 py-4 md:py-5 bg-white border-t border-light-gray">
                    <p className="text-cool-gray leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-cool-gray mb-4">還有其他問題？</p>
            <Link href="/contact">
              <Button variant="secondary" className="bg-teal-dark text-white hover:bg-teal-dark/90">
                聯絡我們
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 最後 CTA - 行動召喚 */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-teal-dark to-teal-dark/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            準備好提升您的法律業務了嗎？
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            加入超過 15,000 家律所，體驗更聰明、更高效的案件管理方式
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="min-w-[240px] bg-mint-green hover:bg-[#2F8A87] text-white">
                開始 14 天免費試用
              </Button>
            </Link>
            <Link href="#contact">
              <Button
                size="lg"
                variant="secondary"
                className="min-w-[240px] border-2 border-white text-white bg-transparent hover:bg-white/10"
              >
                預約演示
              </Button>
            </Link>
          </div>
          <p className="text-sm text-white/70 mt-6">無需信用卡。免費試用期間完全訪問所有功能。</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-white/10">
            <div>
              <h3 className="font-bold text-lg mb-4">產品</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="#features" className="hover:text-white">功能</Link></li>
                <li><Link href="#pricing" className="hover:text-white">定價</Link></li>
                <li><Link href="#" className="hover:text-white">安全性</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">公司</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="#" className="hover:text-white">關於我們</Link></li>
                <li><Link href="#" className="hover:text-white">新聞</Link></li>
                <li><Link href="#" className="hover:text-white">聯絡我們</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">資源</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="#" className="hover:text-white">幫助中心</Link></li>
                <li><Link href="#" className="hover:text-white">博客</Link></li>
                <li><Link href="#" className="hover:text-white">API 文檔</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">法律</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="#" className="hover:text-white">隱私政策</Link></li>
                <li><Link href="#" className="hover:text-white">服務條款</Link></li>
                <li><Link href="#" className="hover:text-white">Cookie 政策</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-lg font-bold mb-1">HK Legal Case Management Platform</p>
              <p className="text-sm text-white/50">© 2024 All rights reserved</p>
            </div>
            <div className="flex gap-6 text-white/70">
              <Link href="#" className="hover:text-white">Twitter</Link>
              <Link href="#" className="hover:text-white">LinkedIn</Link>
              <Link href="#" className="hover:text-white">Facebook</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
