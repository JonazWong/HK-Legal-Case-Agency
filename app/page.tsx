export { default } from "./page_improved";
import Link from "next/link";

const highlights = [
  "專為香港法律實務設計的案件管理平台",
  "支援律師事務所、企業法務及非牟利機構",
  "由單一律師到大型團隊皆可擴充",
];

const features = [
  {
    title: "案件全周期管理",
    description: "由接案、程序追蹤到結案歸檔，一個平台完整覆蓋。",
  },
  {
    title: "文件與紀錄集中",
    description: "所有文書、往來紀錄與備忘集中於案件主檔，減少遺漏。",
  },
  {
    title: "合規與稽核友善",
    description: "完整操作紀錄與權限控管，符合香港個資與專業規範。",
  },
  {
    title: "多團隊協作",
    description: "合夥人、律師、助理及企業內部法務可依角色分工協作。",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col">
      <header className="border-b border-white/5 bg-neutral-950/80 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-emerald-500 flex items-center justify-center text-xs font-semibold">
              HK
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">
                Hong Kong Legal Case Agency
              </span>
              <span className="text-[11px] text-neutral-400">
                香港法律案件管理 SaaS
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <Link
              href="#features"
              className="hidden sm:inline-flex text-neutral-300 hover:text-white"
            >
              功能特色
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-50 hover:border-emerald-400/80 hover:bg-emerald-500/10"
            >
              登入系統
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b border-white/5 bg-gradient-to-b from-emerald-900/40 via-neutral-950 to-neutral-950">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
            <div className="space-y-6 sm:space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span>為香港法律實務而生的案件管理系統</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-white">
                幫你把案件、文件與時程
                <span className="block mt-1 bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                  收斂在同一個平台
                </span>
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                專為香港律師事務所與法務團隊設計的案件管理 SaaS，
                由接案、文件、法庭日期到內部備忘，一處完成，減少自製 Excel 與分散系統帶來的風險。
              </p>
              <ul className="space-y-2 text-sm text-neutral-200">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400"
                >
                  申請試用 / Demo
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-neutral-50 hover:border-emerald-300/60 hover:bg-emerald-500/10"
                >
                  了解功能細節
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-emerald-500/20 blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur px-4 py-4 sm:px-5 sm:py-5 shadow-2xl shadow-emerald-500/15 text-xs text-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-[11px] font-medium text-emerald-200">
                      今日重要期限摘要（示意）
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      系統會集中顯示需要即日或即將處理的節點
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-200">
                    Demo
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-neutral-950/80 px-3 py-2">
                    <div>
                      <div className="text-[11px] text-neutral-100">
                        DCCC 456/2023 – 審訊首日
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        明日 10:00 · 區域法院 · 刑事
                      </div>
                    </div>
                    <span className="rounded-full bg-amber-500/15 px-2 py-1 text-[10px] text-amber-200">
                      需合夥人確認
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-neutral-950/80 px-3 py-2">
                    <div>
                      <div className="text-[11px] text-neutral-100">
                        HCA 123/2024 – 文件送達期限
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        本週五 · 高等法院 · 民事
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] text-emerald-200">
                      已排程準備
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-b border-white/5 bg-neutral-950 py-10 sm:py-14"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                  為香港法律工作設計的核心功能
                </h2>
                <p className="mt-2 text-sm text-neutral-300 max-w-xl">
                  從日常案件管理到長期合規需求，系統預先考慮香港常見的程序與實務情境，
                  降低你在選系統與客製時需要投入的時間與風險。
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/5 bg-white/5 p-4 sm:p-5"
                >
                  <div className="text-sm font-semibold text-white">
                    {feature.title}
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-neutral-950 py-10 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-white/10 rounded-3xl bg-gradient-to-r from-emerald-900/40 via-neutral-950 to-emerald-900/20">
            <div className="space-y-2 py-6 sm:py-8">
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
                想看看實際畫面或了解導入方式？
              </h2>
              <p className="text-sm text-neutral-300 max-w-xl">
                留下你的聯絡方式，我們會安排顧問以你方便的方式與你簡短討論，
                共同評估是否適合你的團隊與客戶型態。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pb-6 sm:pb-0">
              <Link
                href="/signup"
                className="inline-flex justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400"
              >
                安排線上 Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-neutral-50 hover:border-emerald-400/70 hover:bg-emerald-500/10"
              >
                以 Email 與我聯絡
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-neutral-950/95">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-neutral-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Hong Kong Legal Case Agency</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">
              為香港律師事務所與法務團隊打造的案件管理平台
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="#" className="hover:text-neutral-300">
              使用條款
            </Link>
            <Link href="#" className="hover:text-neutral-300">
              私隱政策
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
"use client";

import Link from "next/link";
import { useState } from "react";

const trustMetrics = [
  { label: "案件管理效率提升", value: "3x" },
  { label: "輸入錯誤率減少", value: "95%" },
  { label: "律師事務所滿意度", value: "4.9/5" },
  { label: "合規數據即時更新", value: "100%" },
];

const useCases = [
  {
    id: "law-firm",
    title: "律師事務所 / 獨立律師",
    description:
      "從接案、案件分類、時程追蹤、文件管理到客戶溝通，一站式自動化，讓你把時間用在真正有價值的法律工作上。",
    items: [
      "⚖️ 一鍵建立案件主檔，統一管理所有相關文件與聯絡紀錄",
      "📅 自動生成法庭日期、文書期限提醒，避免任何 delay",
      "💬 集中管理與客戶、對手律師及法院之間的往來紀錄",
      "📂 依案件類型（刑事 / 民事 / 家事 / 商業）自動套用標準欄位與流程",
    ],
  },
  {
    id: "inhouse",
    title: "企業法務 / 法律部門",
    description:
      "即時掌握所有對外法律案件、內部法律需求及合約審查狀態，支援跨部門協作與管理決策。",
    items: [
      "🏢 以公司實體為中心的案件視圖，清楚區分不同子公司與業務線",
      "🤝 與財務、人資、風控等部門協作時，提供可控權限的案件存取",
      "📊 案件進度儀表板，協助管理層掌握風險與預估成本",
      "📁 合同/訴訟/投訴/監管查詢等多種案件類型模板",
    ],
  },
  {
    id: "gov",
    title: "非牟利機構 / 公營機構",
    description:
      "為大量案件、求助個案及內部調查提供一致、透明且可稽核的紀錄系統。",
    items: [
      "📌 按服務計畫或資助項目分類個案，方便統計與報告",
      "🔐 完整的存取權限控管，保障個案私隱與敏感資料",
      "📈 自動生成月報／季報所需的案件統計指標",
      "🧾 重要節點（例如約見、評估、轉介）皆可自訂並追蹤",
    ],
  },
];

const features = [
  {
    title: "香港法庭及程序為本設計",
    description:
      "依照香港法院架構及常見程序節點設計欄位與流程，開箱即用，無須重新定義基本邏輯。",
  },
  {
    title: "多角色權限與審批流程",
    description:
      "事務所合夥人、律師、律師助理、法務同事可依職責存取與編輯不同層級資料。",
  },
  {
    title: "集中式文件與紀錄管理",
    description:
      "所有文件、往來紀錄、內部備忘與法庭文件一處管理，再也不用在不同系統與 email 中反覆搜尋。",
  },
  {
    title: "安全合規與審計日志",
    description:
      "完整操作紀錄、欄位變更歷史與存取追蹤，支援內部與外部稽核需求。",
  },
];

const pricingPlans = [
  {
    name: "成長事務所",
    price: "HK$1,980/月起",
    description: "適合 1–10 人規模律師事務所或小型法務團隊",
    highlight: true,
    features: [
      "最多 10 名使用者帳號",
      "標準案件管理與文件儲存",
      "基礎報表與儀表板",
      "Email 技術支援",
    ],
  },
  {
    name: "專業版",
    price: "HK$4,980/月起",
    description: "適合中型律師事務所、集團法務或非牟利機構",
    highlight: false,
    features: [
      "最多 40 名使用者帳號",
      "進階權限控管與多實體管理",
      "進階報表與自訂欄位",
      "專屬成功顧問協助上線",
    ],
  },
  {
    name: "企業／機構方案",
    price: "按需報價",
    description: "針對大型事務所、上市公司或公營機構客製部署",
    highlight: false,
    features: [
      "不限使用者帳號（依合約約定）",
      "專屬環境（Single Tenant）",
      "與現有系統（DMS / ERP / HR）整合",
      "專案級支援與培訓",
    ],
  },
];

const faqs = [
  {
    question: "這個系統適合什麼類型的律師事務所？",
    answer:
      "我們特別針對香港法律生態設計，無論是只處理幾十宗案件的 boutique firm，還是同時管理上千宗案件的中大型事務所，都可以透過按模組擴充的方式，逐步導入而不影響現有營運。",
  },
  {
    question: "資料儲存在哪裡？安全嗎？",
    answer:
      "系統部署於企業級雲端基礎設施，所有資料傳輸與儲存皆以業界標準加密處理，並具備存取權限控管、操作紀錄與備份機制。我們亦可依需求提供專屬環境或本地部署選項。",
  },
  {
    question: "如果我們目前已有案件系統或 Excel，如何遷移？",
    answer:
      "我們會與你一起盤點現有資料結構，提供匯入範本與遷移流程建議。對於較複雜的情況，亦可由我們的顧問團隊協助進行客製遷移計畫。",
  },
  {
    question: "上線需要多少時間？會不會影響日常運作？",
    answer:
      "一般來說，中小型團隊從確認需求到正式上線約需 2–6 週，我們會先在測試環境完成設定與試用，待團隊熟悉後再切換至正式環境，將風險與干擾降到最低。",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("law-firm");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const activeUseCase = useCases.find((c) => c.id === activeTab) ?? useCases[0];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col">
      <header className="border-b border-white/5 bg-neutral-950/80 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-emerald-500 flex items-center justify-center text-xs font-semibold">
              HK
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">
                Hong Kong Legal Case Agency
              </span>
              <span className="text-[11px] text-neutral-400">
                香港法律案件管理 SaaS
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <Link
              href="#features"
              className="hidden sm:inline-flex text-neutral-300 hover:text-white"
            >
              功能特色
            </Link>
            <Link
              href="#pricing"
              className="hidden sm:inline-flex text-neutral-300 hover:text-white"
            >
              收費方案
            </Link>
            <Link
              href="#faq"
              className="hidden sm:inline-flex text-neutral-300 hover:text-white"
            >
              常見問題
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-50 hover:border-emerald-400/80 hover:bg-emerald-500/10"
            >
              登入系統
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b border-white/5 bg-gradient-to-b from-emerald-900/40 via-neutral-950 to-neutral-950">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
            <div className="space-y-6 sm:space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span>為香港法律實務而生的案件管理系統</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-white">
                專為香港律師事務所與法務團隊打造的
                <span className="block mt-1 bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                  法律案件管理 SaaS 平台
                </span>
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                從接案登記、文件管理、法庭日期追蹤到合規報表，一個平台串起你所有案件相關工作。
                專注於香港法律環境，減少客製成本，同時保留足夠彈性。
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400"
                >
                  申請試用 / Demo
                </Link>
                <button className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-neutral-50 hover:border-emerald-300/60 hover:bg-emerald-500/10">
                  下載介紹簡介 PDF
                </button>
                <span className="text-[11px] text-neutral-400">
                  * 支援中文與英文介面，適用香港法律實務
                </span>
              </div>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 pt-4 border-t border-white/5 mt-4">
                {trustMetrics.map((metric) => (
                  <div key={metric.label} className="space-y-1">
                    <div className="text-lg sm:text-xl font-semibold text-emerald-300">
                      {metric.value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-neutral-400">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-emerald-500/20 blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur px-4 py-4 sm:px-5 sm:py-5 shadow-2xl shadow-emerald-500/15">
                <div className="flex items-center justify-between mb-3">
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-emerald-200">
                      香港律師事務所案件總覽
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      即時掌握所有進行中的案件與關鍵時程
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-200">
                    Demo 畫面
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-neutral-950/80 overflow-hidden text-[11px] sm:text-xs">
                  <div className="flex items-center justify-between border-b border-white/5 bg-neutral-900/80 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="font-medium text-neutral-100">案件列表</span>
                    </div>
                    <span className="text-[10px] text-neutral-400">
                      48 宗進行中案件
                    </span>
                  </div>
                  <div className="divide-y divide-white/5">
                    <div className="grid grid-cols-[1.3fr,0.9fr,0.9fr,0.9fr] gap-2 bg-emerald-500/5 px-3 py-2 text-[10px] font-medium text-neutral-300">
                      <span>案件名稱</span>
                      <span>案件類型</span>
                      <span>階段</span>
                      <span>下次重要日期</span>
                    </div>
                    <div className="max-h-52 overflow-y-auto">
                      {[
                        {
                          name: "HCA 123/2024 商業合約爭議",
                          type: "民事訴訟",
                          stage: "審前程序",
                          date: "審前覆核聆訊 – 3 月 28 日",
                        },
                        {
                          name: "DCCC 456/2023 公司董事刑事檢控",
                          type: "刑事",
                          stage: "審訊準備",
                          date: "審訊首日 – 4 月 10 日",
                        },
                        {
                          name: "FLD 789/2024 家事抚養權爭議",
                          type: "家事",
                          stage: "調解",
                          date: "調解會議 – 4 月 3 日",
                        },
                        {
                          name: "ARB 012/2024 跨境商業仲裁",
                          type: "仲裁",
                          stage: "文件審閱",
                          date: "答辯書提交 – 3 月 30 日",
                        },
                      ].map((row) => (
                        <div
                          key={row.name}
                          className="grid grid-cols-[1.3fr,0.9fr,0.9fr,0.9fr] gap-2 px-3 py-2 hover:bg-emerald-500/5"
                        >
                          <span className="truncate text-neutral-100">
                            {row.name}
                          </span>
                          <span className="truncate text-neutral-300">
                            {row.type}
                          </span>
                          <span className="truncate text-emerald-300">
                            {row.stage}
                          </span>
                          <span className="truncate text-neutral-300">
                            {row.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-neutral-300">
                  <div className="rounded-lg border border-white/5 bg-neutral-950/60 px-2 py-2">
                    <div className="text-[11px] font-medium text-emerald-200">
                      即將到期期限
                    </div>
                    <div className="mt-1 text-lg font-semibold text-emerald-300">
                      7
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      未回覆法院或需提交文件
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-neutral-950/60 px-2 py-2">
                    <div className="text-[11px] font-medium text-amber-200">
                      高風險案件
                    </div>
                    <div className="mt-1 text-lg font-semibold text-amber-300">
                      3
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      需合夥人優先關注
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-neutral-950/60 px-2 py-2">
                    <div className="text-[11px] font-medium text-neutral-200">
                      本月已完成
                    </div>
                    <div className="mt-1 text-lg font-semibold text-neutral-50">
                      26
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      已結案或完成主要程序
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/5 bg-neutral-950" id="usecases">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                  適用場景
                </h2>
                <p className="mt-2 text-sm text-neutral-300 max-w-xl">
                  無論你是律師事務所、企業內部法務，還是非牟利機構，我們都提供對應的案件管理視角與流程模板。
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 border-b border-white/5 pb-3">
              {useCases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveTab(c.id)}
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    activeTab === c.id
                      ? "bg-emerald-500 text-neutral-950 shadow shadow-emerald-500/30"
                      : "bg-white/5 text-neutral-300 hover:bg-white/10"
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {activeUseCase.title}
                </h3>
                <p className="text-sm text-neutral-300 max-w-xl">
                  {activeUseCase.description}
                </p>
                <ul className="mt-2 space-y-2 text-sm text-neutral-200">
                  {activeUseCase.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2"
                    >
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/5 bg-neutral-950/70 p-4 sm:p-5 text-xs text-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-[11px] font-medium text-neutral-200">
                      典型案件生命周期
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      從接案到結案的標準化追蹤流程
                    </div>
                  </div>
                </div>
                <ol className="space-y-2 text-[11px]">
                  <li className="flex gap-2">
                    <span className="mt-0.5 h-4 w-4 rounded-full bg-emerald-500 text-[10px] font-semibold text-neutral-950 flex items-center justify-center">
                      1
                    </span>
                    <div>
                      <div className="font-medium text-neutral-100">接案與衝突檢查</div>
                      <div className="text-neutral-400">
                        記錄客戶、相對人與潛在利益衝突，確保接案合規。
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 h-4 w-4 rounded-full bg-emerald-500 text-[10px] font-semibold text-neutral-950 flex items-center justify-center">
                      2
                    </span>
                    <div>
                      <div className="font-medium text-neutral-100">程序與期限設定</div>
                      <div className="text-neutral-400">
                        根據案件類型自動生成關鍵期限與程序節點提醒。
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 h-4 w-4 rounded-full bg-emerald-500 text-[10px] font-semibold text-neutral-950 flex items-center justify-center">
                      3
                    </span>
                    <div>
                      <div className="font-medium text-neutral-100">文件與證據管理</div>
                      <div className="text-neutral-400">
                        將所有相關文件集中於案件主檔中，並可標記重要程度。
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 h-4 w-4 rounded-full bg-emerald-500 text-[10px] font-semibold text-neutral-950 flex items-center justify-center">
                      4
                    </span>
                    <div>
                      <div className="font-medium text-neutral-100">開庭與協商紀錄</div>
                      <div className="text-neutral-400">
                        為每一次聆訊、會議或協商建立結構化紀錄，方便團隊共享。
                      </div>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 h-4 w-4 rounded-full bg-emerald-500 text-[10px] font-semibold text-neutral-950 flex items-center justify-center">
                      5
                    </span>
                    <div>
                      <div className="font-medium text-neutral-100">結案與知識沉澱</div>
                      <div className="text-neutral-400">
                        將案件重點整理為內部知識，作為未來類似案件的參考。
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/5 bg-neutral-950" id="features">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                  為香港法律工作設計的核心功能
                </h2>
                <p className="mt-2 text-sm text-neutral-300 max-w-xl">
                  不只是「任意行業都能用」的通用系統，而是針對香港法律實務中的案件管理、文件流與合規要求精細設計。
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/5 bg-white/5 p-4 sm:p-5"
                >
                  <div className="text-sm font-semibold text-white">
                    {feature.title}
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/5 bg-gradient-to-r from-emerald-900/30 via-neutral-950 to-emerald-900/20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                結合 AI 的文件與紀錄輔助，但一切仍由你掌控
              </h2>
              <p className="text-sm text-neutral-300 max-w-xl">
                我們相信 AI 在法律領域應該是輔助而不是取代。系統提供文件摘要、重點標記與初稿產生等功能，降低重覆性工作時間，同時保留所有審核與決定權在人類專業手上。
              </p>
              <ul className="space-y-2 text-sm text-neutral-200">
                <li>
                  📄 自動從長篇文件中標記關鍵日期、金額、當事人名稱等資訊
                </li>
                <li>📝 為會議與聆訊紀錄生成重點摘要，方便團隊快速掌握</li>
                <li>
                  🧠 讓你以自然語言搜尋過往案件（例如「過去三年有關競業條款的案件」）
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-neutral-950/70 p-4 sm:p-5 text-xs text-neutral-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[11px] font-medium text-emerald-200">
                    AI 輔助摘要預覽
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    （示意）
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-200">
                  不會自動對外發送
                </span>
              </div>
              <div className="rounded-xl border border-white/5 bg-neutral-950/80 p-3 space-y-2">
                <div className="text-[11px] text-neutral-400">
                  針對文件：<span className="text-neutral-200">商業合約（服務協議） – 初稿</span>
                </div>
                <div className="rounded-lg bg-emerald-500/5 p-2 text-[11px]">
                  <div className="text-[11px] font-medium text-emerald-200 mb-1">
                    AI 摘要（僅供參考）：
                  </div>
                  <p className="text-neutral-200">
                    本合約主要規範服務提供方與客戶在資料保密、服務範圍、付款條件、責任限制及終止條款等方面的權利義務。值得特別留意的是賠償上限及終止通知期，可能需要依客戶實際風險承受度調整。
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500">
                * 我們不會在未經你同意的情況下，將案件內容用於訓練任何通用 AI 模型。
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-white/5 bg-neutral-950" id="pricing">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                  收費方案與導入方式
                </h2>
                <p className="mt-2 text-sm text-neutral-300 max-w-xl">
                  以實際使用人數與所需模組為基礎，提供可預測且透明的收費方式。
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`flex flex-col rounded-2xl border p-4 sm:p-5 ${
                    plan.highlight
                      ? "border-emerald-400/60 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {plan.name}
                      </div>
                      <div className="text-xs text-neutral-400 mt-1">
                        {plan.description}
                      </div>
                    </div>
                    <div className="text-xs font-medium text-emerald-200">
                      {plan.price}
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-neutral-200 flex-1">
                    {plan.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <button className="mt-4 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-50 hover:border-emerald-400/70 hover:bg-emerald-500/10">
                    安排顧問與你討論
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/5 bg-neutral-950" id="faq">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                  常見問題
                </h2>
                <p className="mt-2 text-sm text-neutral-300 max-w-xl">
                  如果你有其他想法或特殊情況，我們也非常樂意與你討論。
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {faqs.map((faq) => {
                const open = expandedFaq === faq.question;
                return (
                  <div
                    key={faq.question}
                    className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedFaq(open ? null : faq.question)
                      }
                      className="w-full flex items-center justify-between gap-4 px-4 py-3 sm:px-5 sm:py-4 text-left"
                    >
                      <span className="text-sm font-medium text-neutral-50">
                        {faq.question}
                      </span>
                      <span className="text-lg text-neutral-400">
                        {open ? "−" : "+"}
                      </span>
                    </button>
                    {open && (
                      <div className="px-4 pb-4 text-xs sm:px-5 sm:pb-5 text-neutral-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-neutral-950">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-white/10 rounded-3xl bg-gradient-to-r from-emerald-900/40 via-neutral-950 to-emerald-900/20">
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
                想看看實際畫面或了解導入方式？
              </h2>
              <p className="text-sm text-neutral-300 max-w-xl">
                留下你的聯絡方式，我們會安排顧問以你方便的方式與你簡短討論（約 20–30 分鐘），了解你目前的案件管理狀況與需求。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button className="inline-flex justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400">
                安排線上 Demo
              </button>
              <button className="inline-flex justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-neutral-50 hover:border-emerald-400/70 hover:bg-emerald-500/10">
                以 Email 與我聯絡
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-neutral-950/95">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-neutral-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Hong Kong Legal Case Agency</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">
              為香港律師事務所與法務團隊打造的案件管理平台
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="#" className="hover:text-neutral-300">
              使用條款
            </Link>
            <Link href="#" className="hover:text-neutral-300">
              私隱政策
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
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
        answer:
          '我們提供 14 天免費試用，無需信用卡。您可以完全訪問 Professional 計劃的所有功能。',
      },
      {
        question: '如何從現有系統遷移？',
        answer:
          '我們提供免費的數據遷移服務。我們的專家團隊會幫助您遷移案件、聯絡人、日曆和任務。',
      },
      {
        question: '數據安全如何保障？',
        answer:
          '我們採用銀行級加密、SOC 2 Type II 認證、企業級權限管理和 24/7 安全監控。',
      },
      {
        question: '支持有多少語言？',
        answer:
          '平台支持繁體中文、英文及其他主要語言。我們的支持團隊使用本地語言提供幫助。',
      },
      {
        question: '可以集成其他工具嗎？',
        answer:
          '是的！我們與 250+ 應用集成，包括 Office 365、Google Workspace、Microsoft Teams 等。',
      },
      {
        question: '中途可以更改計劃嗎？',
        answer:
          '完全可以。您隨時可以升級或降級計劃，我們會按比例調整您的賬單。',
      },
    ];

    export default function HomePage() {
      const [activeTab, setActiveTab] = useState('solo');
      const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

      return (
        <div className="min-h-screen bg-off-white">
                  ✨ 香港領先的法律案件管理平台
                </span>
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
                  <Button
                    size="lg"
                    className="min-w-[200px] bg-mint-green hover:bg-[#2F8A87] text-white border-none"
                  >
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
              <div className="absolute inset-0 bg-gradient-to-br from-mint-green/20 to-subtle-gold/20 rounded-2xl backdrop-blur-sm border border-white/10" />
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
            {trustMetrics.map((metric) => (
              <div key={metric.label} className="text-center">
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
                type="button"
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
                  <h3 className="text-3xl md:text-4xl font-bold text-teal-dark mb-2">{item.title}</h3>
                  <p className="text-lg text-cool-gray mb-6">{item.subtitle}</p>
                  <ul className="space-y-4 mb-8">
                    {item.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
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
            ) : null,
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
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-off-white p-8 rounded-xl border border-light-gray hover:border-mint-green hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div
                  className={`w-14 h-14 ${feature.color} rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
                >
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
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
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
                    {plan.period && (
                      <span className="text-cool-gray text-sm ml-2">{plan.period}</span>
                    )}
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
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-cool-gray"
                      >
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
              <Button
                variant="secondary"
                className="bg-white border-2 border-teal-dark text-teal-dark hover:bg-teal-dark hover:text-white"
              >
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
            <p className="text-lg text-cool-gray">了解更多關於我們的平台、計劃和支持</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-off-white border border-light-gray rounded-lg overflow-hidden transition-all hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 md:py-5 flex items-center justify-between hover:bg-light-gray/50 transition-colors"
                >
                  <span className="text-left font-semibold text-charcoal text-lg">
                    {faq.question}
                  </span>
                  <span
                    className={`text-mint-green font-bold text-xl transition-transform ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  >
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
              <Button
                variant="secondary"
                className="bg-teal-dark text-white hover:bg-teal-dark/90"
              >
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
              <Button
                size="lg"
                className="min-w-[240px] bg-mint-green hover:bg-[#2F8A87] text-white"
              >
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
          <p className="text-sm text-white/70 mt-6">
            無需信用卡。免費試用期間完全訪問所有功能。
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-white/10">
            <div>
              <h3 className="font-bold text-lg mb-4">產品</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <Link href="#features" className="hover:text-white">
                    功能
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white">
                    定價
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    安全性
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">公司</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    關於我們
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    新聞
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    聯絡我們
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">資源</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    幫助中心
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    部落格
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    API 文檔
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">法律</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    隱私政策
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    服務條款
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Cookie 政策
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-lg font-bold mb-1">HK Legal Case Management Platform</p>
              <p className="text-sm text-white/50">© 2024 All rights reserved</p>
            </div>
            <div className="flex gap-6 text-white/70">
              <Link href="#" className="hover:text-white">
                Twitter
              </Link>
              <Link href="#" className="hover:text-white">
                LinkedIn
              </Link>
              <Link href="#" className="hover:text-white">
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
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
                    <div className="flex flex-col sm:flex-row gap-4 justify中心">
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
                    <p className="text-sm text白/70 mt-6">無需信用卡。免費試用期間完全訪問所有功能。</p>
                  </div>
                </section>

                {/* Footer */}
                <footer className="bg-charcoal text白 py-12 md:py-16">
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
