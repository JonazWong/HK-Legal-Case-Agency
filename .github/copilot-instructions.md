# HK Legal Case Agency – AI 開發說明

## 專案概觀與架構
- 此專案主體是 Next.js 14 App Router + NextAuth.js + Prisma/PostgreSQL 的多租戶 (firm-based) 案件管理系統。
- 前端頁面主要在 [app](app) 下：公開首頁在 [app/page.tsx](app/page.tsx)，登入/註冊在 [app/(auth)](app/%28auth%29)，登入後儀表板與子功能在 [app/(dashboard)](app/%28dashboard%29)。
- 後端 API 採用 Next.js Route Handlers，集中於 [app/api](app/api)；資料存取一律透過 Prisma client [lib/db.ts](lib/db.ts) 與 schema [prisma/schema.prisma](prisma/schema.prisma)。
- 國際化使用 next-intl 設定於 [i18n.ts](i18n.ts)，訊息檔在 [messages/en.json](messages/en.json) 與 [messages/zh.json](messages/zh.json)，預設 locale 為 zh。

## 驗證、授權與 Session 慣例
- 認證設定集中在 [lib/auth.ts](lib/auth.ts)，所有受保護 API 都必須使用 `getServerSession(authOptions)` 取得 session 並檢查 `session.user.firmId`。參考 [app/api/cases/route.ts](app/api/cases/route.ts)。
- 儀表板 UI 以 [app/(dashboard)/layout.tsx](app/%28dashboard%29/layout.tsx) 做集中保護：未登入導向 `/login`，載入中顯示 Loading，並注入 [components/layout/navbar.tsx](components/layout/navbar.tsx)。新增受保護頁面時盡量掛在此 layout 下。
- Session payload 內含 `id`, `role`, `firmId`, `locale` 等欄位，任何需要權限或 firm 範圍控制的邏輯都應以這些欄位為依據。

## API 與多租戶資料存取規則
- 所有資料查詢與修改都必須以 `firmId` 篩選或驗證歸屬，避免跨事務所存取：
  - List 類路由以 `where: { firmId: session.user.firmId }` 為基礎條件，參考 [app/api/cases/route.ts](app/api/cases/route.ts)、[app/api/clients/route.ts](app/api/clients/route.ts)。
  - 單筆 `[id]` 路由讀取後必須檢查 `record.firmId === session.user.firmId`，否則回傳 403，參考 [app/api/cases/[id]/route.ts](app/api/cases/%5Bid%5D/route.ts)。
- 請沿用現有錯誤格式：
  - 驗證錯誤：`{ error: 'Validation failed', details: zodError.errors }` 並回傳 400。
  - 授權錯誤：`{ error: 'Unauthorized' }` (401) 或 `{ error: 'Forbidden' }` (403)。
  - 其他伺服器錯誤：log 至 console，回 `{ error: 'Failed to …' }` 並回傳 500。
- 分頁參數固定使用 `page`、`limit`，回應中包含 `pagination: { page, limit, total, totalPages }`，參考 [app/api/cases/route.ts](app/api/cases/route.ts) 與 [API.md](API.md)。

## 驗證 (Zod) 與型別
- 表單與 API payload 驗證集中在 [lib/validations.ts](lib/validations.ts)，請優先擴充現有 schema，而非在 route 內手寫驗證。
- 典型流程：`const body = await req.json(); const data = schema.parse(body);`，parse 失敗時捕捉 `ZodError` 回傳 400。
- 若新增資料模型 (例如 TimeEntry/Invoice 的路由)，請沿用既有 schema 與欄位命名；避免在不同路由中對同一欄位使用不同型別或格式。

## UI、設計系統與頁面模式
- 基礎 UI 元件集中在 [components/ui](components/ui)，並透過 [components/ui/index.ts](components/ui/index.ts) 匯出；新增頁面時請優先使用這些元件而非直接寫 HTML + class。
- Button 變體為 `primary | secondary | text | danger`，定義於 [components/ui/button.tsx](components/ui/button.tsx)；Badge 變體為 `default | success | warning | danger | info`，定義於 [components/ui/badge.tsx](components/ui/badge.tsx)。請沿用現有 variant 名稱與語意。
- 儀表板列表頁的標準模式可參考 [app/(dashboard)/cases/page.tsx](app/%28dashboard%29/cases/page.tsx)：
  - 上方為標題 + 簡短描述 + 主要行動按鈕。
  - Card 內含搜尋欄位、篩選 Select、Table、錯誤訊息區塊與 Loading 狀態。
  - 分頁採用底部簡單「Previous / Next」按鈕與目前頁數文字。
- 公開行銷頁 ([app/page.tsx](app/page.tsx)) 以 zh-HK 文案為主、搭配英文副標題，樣式走深色背景 + 金色/綠色點綴；新增公開頁面時請維持這個品牌風格。

## 國際化與文案
- next-intl 設定於 [i18n.ts](i18n.ts)，支援 `en` 與 `zh`，預設使用 `zh`。若新增字串，請同步更新 [messages/en.json](messages/en.json) 與 [messages/zh.json](messages/zh.json)。
- 儀表板目前多為英文 UI，公開行銷頁偏向繁體中文說明；新增內容時可沿用此定位：操作介面以清楚英文為主，行銷敘事可加入繁中。

## 資料庫與 Prisma 工作流程
- prisma client 由 [lib/db.ts](lib/db.ts) 單一輸出並進行 dev-mode global caching；請勿自行建立新的 `PrismaClient` 實例。
- 調整 Schema：修改 [prisma/schema.prisma](prisma/schema.prisma) 後，執行 `npm run prisma:migrate` 建立 migration，並以 `npm run prisma:generate` 重新產生 client。
- 本地開發初始化建議沿用現有指令：`npm run db:setup` (migrate + seed) 與 `npm run prisma:studio` 檢視資料。

## 其他子專案與伺服器
- 在 [app/index-test-dashboard](app/index-test-dashboard) 內有一個獨立的 Vite + Express 測試儀表板 (server 入口在 [app/index-test-dashboard/server/index.ts](app/index-test-dashboard/server/index.ts))，與主 Next.js 應用邏輯解耦；除非特別註明，請優先修改 Next.js 主應用程式。
- 傳統 EJS 登入頁面樣板位於 [views/index.ejs](views/index.ejs)，與現有 React/Next.js UI 分離；如需調整，請確保樣式與品牌調性仍與主站一致。

## 推薦開發流程
- 本地開發：`npm run dev` 啟動 Next.js，搭配 demo 帳號從 `/login` 進入儀表板功能驗證。
- 實作功能時，從下而上流程建議：先定義/擴充 Prisma schema → Zod schema → API route handler → Dashboard page/UI。
- 修改 API 之後，請優先用已存在的相關頁面 (如 Cases/Clients) 驗證回應格式是否仍與現有前端預期相符。
