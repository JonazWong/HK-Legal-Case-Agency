# HK Legal Case Agency – AI 開發說明

香港法律事務所專用的多租戶案件管理系統，採用 Next.js 14 App Router + NextAuth.js + Prisma/PostgreSQL。

## 專案概觀與架構
- **核心技術棧**：Next.js 14 App Router, NextAuth.js, Prisma ORM, PostgreSQL, next-intl, Zod, TailwindCSS
- **多租戶模型**：所有資料以 `firmId` 隔離，每個 Firm 擁有獨立的 users, cases, clients, documents 等資料
- **頁面結構**：
  - 公開頁：[app/page.tsx](app/page.tsx) (行銷首頁，zh-HK 為主)
  - 認證流程：[app/(auth)/login](app/%28auth%29/login) 與 [app/(auth)/signup](app/%28auth%29/signup)
  - 受保護區：[app/(dashboard)](app/%28dashboard%29) layout 統一處理 session 驗證與導向
- **API 架構**：Next.js Route Handlers 於 [app/api](app/api)，必須透過 [lib/db.ts](lib/db.ts) 的單一 Prisma instance 存取資料
- **國際化**：next-intl ([i18n.ts](i18n.ts))，支援 `en|zh`，預設 `zh`；訊息檔位於 [messages/](messages/)

## 驗證、授權與 Session 慣例
- **NextAuth 設定**：[lib/auth.ts](lib/auth.ts) 包含 Credentials Provider + Google OAuth，使用 PrismaAdapter
- **登入保護機制**：3 次失敗自動鎖定 30 分鐘 (見 auth.ts `failedLoginCount` 與 `lockedUntil`)
- **API 驗證模式**：
  ```typescript
  const session = await getServerSession(authOptions);
  if (!session?.user?.firmId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  ```
- **UI 層保護**：[app/(dashboard)/layout.tsx](app/%28dashboard%29/layout.tsx) 集中處理 redirect 與 Loading，新增頁面請掛在此 layout 下
- **Session 欄位**：`{ id, email, name, role, firmId, locale }` — 所有權限與資料範圍控制依賴這些欄位

## API 與多租戶資料存取規則
**核心原則：所有資料操作必須以 `firmId` 隔離，禁止跨事務所存取**

- **List 查詢**：`where: { firmId: session.user.firmId, ...filters }` (見 [app/api/cases/route.ts](app/api/cases/route.ts))
- **單筆操作**：讀取後驗證 `record.firmId === session.user.firmId`，不符回傳 403
- **自動編號**：案件編號格式 `HCA-YYYY-NNN`，由年份 + 流水號組成，需查詢當年最後編號 +1 (見 cases/route.ts POST)
- **錯誤回應標準**：
  - Zod 驗證失敗：`{ error: 'Validation failed', details: zodError.errors }` (400)
  - 未登入：`{ error: 'Unauthorized' }` (401)
  - 跨租戶存取：`{ error: 'Forbidden' }` (403)
  - 伺服器錯誤：`console.error` 後回傳 `{ error: 'Failed to ...' }` (500)
- **分頁規範**：參數 `page, limit`，回應 `{ data, pagination: { page, limit, total, totalPages } }`

## 驗證 (Zod) 與型別安全
- **集中定義**：所有 schema 定義於 [lib/validations.ts](lib/validations.ts)，包含 `signUpSchema`, `caseSchema`, `clientSchema` 等
- **標準驗證流程**：
  ```typescript
  const body = await req.json();
  const data = caseSchema.parse(body); // 拋出 ZodError 自動處理
  ```
- **擴充原則**：新增資料模型時請擴充現有 schema，保持欄位命名一致性 (如 `firstName/lastName` 而非 `first_name`)

## UI、設計系統與頁面模式
- **元件庫**：[components/ui](components/ui) 統一匯出 Button, Card, Badge, Table, Input, Select 等，禁止直接寫 HTML + Tailwind
- **變體系統**：
  - Button: `primary | secondary | text | danger`
  - Badge: `default | success | warning | danger | info`
- **儀表板列表頁標準模式** (參考 [app/(dashboard)/cases/page.tsx](app/%28dashboard%29/cases/page.tsx))：
  ```tsx
  <div className="space-y-6">
    <header>{標題 + 描述 + 主要 CTA}</header>
    <Card>
      <搜尋欄 + 篩選器>
      <Table data={items} loading={isLoading} />
      {error && <ErrorMessage />}
      <Pagination page={page} onPageChange={...} />
    </Card>
  </div>
  ```
- **品牌風格**：公開頁使用深色背景 + 金/綠色強調，繁體中文為主；儀表板以清楚英文 UI 為主

## 國際化 (i18n)
- **設定**：[i18n.ts](i18n.ts) 定義 `en|zh`，預設 `zh`；middleware 處理路由前綴 `/(en|zh)/:path*`
- **訊息檔**：[messages/en.json](messages/en.json) 與 [messages/zh.json](messages/zh.json)，新增字串請同步更新兩份
- **使用慣例**：儀表板操作 UI 以英文為主，公開頁行銷文案以繁體中文 (zh-HK) 為主

## 資料庫與 Prisma 工作流程
- **唯一 Prisma 實例**：必須透過 [lib/db.ts](lib/db.ts) 的 `prisma` 匯出，自帶 dev-mode global caching
- **Schema 調整流程**：
  1. 修改 [prisma/schema.prisma](prisma/schema.prisma)
  2. `npm run prisma:migrate` 建立 migration
  3. `npm run prisma:generate` 重新產生 type-safe client
- **關鍵指令**：
  - `npm run db:setup` — 完整初始化 (generate + migrate + seed)
  - `npm run prisma:studio` — 開啟 GUI 資料瀏覽器
  - `npm run prisma:seed` — 載入 demo 資料 (firm + users + cases)
- **Demo 帳號**：`owner@wonglaw.hk / demo123456` (見 [prisma/seed.ts](prisma/seed.ts))

## 開發工作流程
**本地開發啟動**：
```bash
npm install
npm run db:setup    # 首次執行，建立 DB schema + seed
npm run dev         # 啟動開發伺服器 (http://localhost:3000)
```
登入 `/login` 使用 `owner@wonglaw.hk / demo123456` 測試儀表板功能

**功能實作順序**：
1. 定義/擴充 [prisma/schema.prisma](prisma/schema.prisma) 資料模型
2. 建立/更新 [lib/validations.ts](lib/validations.ts) Zod schema
3. 實作 [app/api](app/api) Route Handler (GET/POST/PATCH/DELETE)
4. 建立 [app/(dashboard)](app/%28dashboard%29) UI 頁面與整合
5. 測試既有頁面 (Cases/Clients) 確認回應格式相容

**注意事項**：
- [app/index-test-dashboard](app/index-test-dashboard) 為獨立 Vite+Express 測試環境，與主應用程式分離
- [views/index.ejs](views/index.ejs) 為舊版樣板，新功能請使用 Next.js 頁面
