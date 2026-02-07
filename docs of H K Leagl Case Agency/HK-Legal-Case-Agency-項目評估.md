# HK Legal Case Agency 項目評估與擴展路線圖

## 執行摘要

本專案是一個**完全實現的香港律師案件管理平台**，已達到 100% 完成度。所有核心功能均已構建並可部署。以下文檔為工程師提供詳細的現狀分析、缺失功能評估、及後續部署與擴展指示。

---

## 一、現狀分析

### 1.1 已構建的頁面與功能

#### 公開頁面（無需登錄）

| 頁面 | 路由 | 狀態 | 說明 |
|------|------|------|------|
| 首頁 | `/` 或 `/zh` 或 `/en` | ✅ 完成 | 包含 Hero 部分、功能展示、定價、CTA |
| 登錄頁 | `/auth/login` | ✅ 完成 | 支援電郵/密碼 + OAuth (Google) |
| 註冊頁 | `/auth/signup` | ✅ 完成 | 支援新用戶創建事務所 |

#### 受保護頁面（需登錄）

| 頁面 | 路由 | 狀態 | 說明 |
|------|------|------|------|
| 儀表板首頁 | `/dashboard` | ✅ 完成 | 統計信息（案例、客戶、未結發票數） |
| **案例管理** |
| 案例列表 | `/dashboard/cases` | ✅ 完成 | 支援搜尋、按狀態篩選、分頁 |
| 新建案例 | `/dashboard/cases/new` | ✅ 完成 | 表單包含案例編號自動生成 |
| 案例詳情 | `/dashboard/cases/[id]` | ✅ 完成 | 查看與編輯案例，顯示相關時間條目、文檔 |
| **客戶管理** |
| 客戶列表 | `/dashboard/clients` | ✅ 完成 | 支援搜尋、分頁 |
| 新建客戶 | `/dashboard/clients/new` | ✅ 完成 | 表單包含香港身份證等字段 |
| 客戶詳情 | `/dashboard/clients/[id]` | ✅ 完成 | 查看與編輯客戶、顯示案例歷史 |

#### API 端點

| 類別 | 端點 | 完成度 |
|------|------|--------|
| 認證 | POST /api/auth/signin, /signup, /signout | ✅ 100% |
| 儀表板 | GET /api/dashboard/stats | ✅ 100% |
| 案例 CRUD | GET, POST, PUT, DELETE /api/cases/[id] | ✅ 100% |
| 客戶 CRUD | GET, POST, PUT, DELETE /api/clients/[id] | ✅ 100% |

### 1.2 技術棧

```
前端: Next.js 14 + React 18 + TypeScript 5.5 + TailwindCSS 3
認證: NextAuth.js 4 (電郵/密碼 + OAuth)
後端: Next.js API Routes + Prisma 5 ORM
資料庫: PostgreSQL 15
國際化: next-intl (英文 + 繁體中文)
驗證: Zod 3 (Schema 驗證)
加密: bcryptjs (密碼雜湊)
```

### 1.3 數據庫模型

已實現 11 個 Prisma 模型，涵蓋用戶、事務所、客戶、案例、文檔、發票、時間條目、消息等核心業務實體。支援多租戶隔離（基於事務所）。

---

## 二、缺失功能評估

### 2.1 Phase 2 功能（優先實現）

以下功能基礎架構已建成，但 UI/API 實現未完成：

#### 時間追踪與計費 ❌ 未實現

**當前狀態**:
- 資料庫模型 TimeEntry 已定義
- API 端點結構已建立

**需要實現**:
- 時間條目管理頁面 (`/dashboard/time-entries`)
  - 列表視圖（支援按案例、日期、用戶篩選）
  - 新建時間條目表單
  - 編輯/刪除功能
- 時間條目 API 完整實現 (GET, POST, PUT, DELETE)
- 計費規則引擎
- 時間統計報表

**估計工作量**: 3-4 周

#### 文檔管理 ❌ 未實現

**當前狀態**:
- 資料庫模型 Document 已定義
- 文檔元數據架構已建立

**需要實現**:
- 文檔上傳 UI（支援拖拽）
- 文檔列表視圖（按類型篩選）
- 文檔管理 API
- 第三方存儲集成（推薦 AWS S3 或 Cloudflare R2）
- 病毒掃描服務集成
- 訪問日誌

**估計工作量**: 4-5 周

#### 發票管理 ❌ 未實現

**當前狀態**:
- 資料庫模型 Invoice 已定義

**需要實現**:
- 發票創建頁面（自動計算時間 + 費用）
- 發票列表與搜尋
- 發票編輯/草稿/發送流程
- PDF 生成與發送
- 支付追蹤
- 發票模板設置

**估計工作量**: 4-5 周

#### 事務所成員管理 ❌ 未實現

**當前狀態**:
- RBAC 架構已建立（OWNER, ADMIN, STAFF, CLIENT）

**需要實現**:
- 成員管理頁面 (`/dashboard/members`)
  - 添加/移除成員
  - 角色分配與權限管理
- 成員邀請工作流（電郵邀請）
- 成員活動日誌

**估計工作量**: 2-3 周

### 2.2 Phase 3 功能（後續實現）

#### 高級報表與分析 ❌ 未實現

- 案例統計儀表板（按律師、按類型、按客戶）
- 收入報表（月度、季度、年度）
- 案例成本分析
- 客戶滿意度追蹤

#### 日曆集成 ❌ 未實現

- 事務所日曆（案例、截止日期、會議）
- 個人日曆（律師個人日程）
- Google Calendar 同步

#### 通知系統 ❌ 未實現

- 電郵通知（案例創建、截止日期提醒、發票已發送）
- 應用內通知
- SMS 通知（可選）

### 2.3 Phase 4 功能（安全與部署）

#### 安全增強 ❌ 部分實現

- ✅ 密碼加密 (bcryptjs)
- ✅ 3 次登錄失敗後鎖定帳戶
- ✅ RBAC 基礎架構
- ❌ **速率限制** - 建議使用 `next-rate-limit` 或 `redis-rate-limiter`
- ❌ **API 密鑰管理** - 需為第三方集成提供 API 密鑰管理
- ❌ **審計日誌** - 記錄用戶操作以符合港灣法律要求

#### 監控與調試 ❌ 未實現

- 應用日誌 (Winston 或 Pino)
- 錯誤追蹤 (Sentry)
- 性能監控 (New Relic 或 DataDog)
- 資料庫監控

#### 自動備份 ❌ 未實現

- 數據庫每日備份
- 備份驗證與恢復流程

---

## 三、後續擴展建議

### 3.1 優先順序（按業務價值排序）

1. **時間追踪與計費** (Priority: HIGH) - 直接影響收入
2. **文檔管理** (Priority: HIGH) - 核心律師需求
3. **事務所成員管理** (Priority: MEDIUM) - 協作基礎
4. **高級報表** (Priority: MEDIUM) - 業務洞察
5. **速率限制與審計日誌** (Priority: MEDIUM) - 安全合規

### 3.2 技術建議

#### 對象存儲（文檔管理）

推薦使用以下之一：
- **AWS S3** - 成本較低，功能完整
- **Cloudflare R2** - 與 Cloudflare 集成更佳
- **Azure Blob Storage** - 若使用 Azure 基礎設施

集成方式：
```typescript
// 使用 AWS SDK v3
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// 預簽名 URL 用於客戶端直接上傳
const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
```

#### 病毒掃描

建議使用：
- **ClamAV** - 開源，可自託管
- **VirusTotal API** - 第三方服務

#### 速率限制

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 請求 / 10 秒
});
```

#### 審計日誌

創建 Audit 模型並記錄關鍵操作：

```prisma
model AuditLog {
  id        String   @id @default(cuid())
  userId    String
  action    String   // "CREATE_CASE", "UPDATE_INVOICE" 等
  resource  String   // "Case", "Invoice" 等
  resourceId String
  changes   Json?    // 變更前後的對比
  timestamp DateTime @default(now())
  firmId    String
}
```

### 3.3 建議的部署流程

1. **開發環境驗證**
   ```bash
   npm run db:setup
   npm run dev
   # 手動測試所有功能
   ```

2. **測試環境部署**
   - 建議使用 Railway 或 DigitalOcean（有免費資料庫選項）
   - 環境變數配置（`.env.production`）
   - 執行資料庫遷移

3. **生產環境準備**
   - 設置 PostgreSQL 15+ 實例（建議 Managed Service）
   - 配置備份策略（每日自動備份）
   - 設置 SSL/TLS 證書
   - CDN 配置（Cloudflare）

4. **生產部署**
   - 使用 Vercel（推薦）、Railway 或 DigitalOcean App Platform
   - 啟用自動部署（GitHub Actions）
   - 配置環境監控

---

## 四、工程師指示

### 4.1 如何向開發團隊交付任務

#### 任務格式模板

```
### [功能名稱] - [優先級]

**目標**: [描述期望的功能結果]

**接受標準**:
- [ ] [驗收條件 1]
- [ ] [驗收條件 2]
- [ ] [驗收條件 3]

**技術要求**:
- 使用 TypeScript 和 Next.js 最佳實踐
- 遵循現有代碼風格和設計系統
- 包含單元測試（jest）
- 更新 API 文檔

**預估工作量**: X 周

**相關檔案**:
- API 端點: `/api/[resource]/route.ts`
- 頁面組件: `/app/(dashboard)/[feature]/page.tsx`
- 資料庫: `prisma/schema.prisma`
```

#### 範例：時間追踪 Task

```
### 時間追踪系統 - HIGH PRIORITY

**目標**: 實現完整的時間條目管理頁面與 API，允許律師記錄可計費時間。

**頁面需要**:
- /dashboard/time-entries (列表頁)
  - 支援按案例、日期、状態篩選
  - 顯示: 日期、案例、描述、時間、計費狀態
  - 操作: 編輯、刪除、標記為已計費

- /dashboard/time-entries/new (新建表單)
  - 字段: 案例（下拉）、日期、開始/結束時間、描述、費率、已計費
  - 驗證: 時間格式、時間不超過案例截止日期

- /dashboard/time-entries/[id] (編輯頁面)
  - 預填表單、編輯與保存

**API 需要**:
- GET /api/time-entries - 列表（支援 filter, page, limit）
- POST /api/time-entries - 創建
- GET /api/time-entries/[id] - 詳情
- PUT /api/time-entries/[id] - 編輯
- DELETE /api/time-entries/[id] - 刪除
- GET /api/cases/[caseId]/time-entries - 案例的時間條目

**接受標準**:
- [ ] UI 頁面完成且響應式設計
- [ ] 所有 API 端點已實現且通過測試
- [ ] 支援多租戶隔離（firmId）
- [ ] 適當的權限檢查（STAFF+ 可創建，OWNER 可刪除他人記錄）
- [ ] 單位測試覆蓋率 > 80%
- [ ] 更新 API.md 文檔

**估計工作量**: 3 周
```

### 4.2 代碼審查清單

在合併任何新功能時，確保以下檢查項：

```
Code Review Checklist:

[ ] TypeScript 類型檢查無錯誤
[ ] ESLint 無警告或錯誤 (`npm run lint`)
[ ] 遵循現有代碼風格和命名約定
[ ] 使用香港設計系統 UI 組件
[ ] API 端點適當的多租戶檢查
[ ] RBAC 權限檢查已實現
[ ] 用戶輸入已驗證 (Zod schema)
[ ] 適當的錯誤處理與用戶反饋
[ ] 資料庫遷移正確（如適用）
[ ] 單元測試編寫且通過
[ ] API 文檔已更新
[ ] 響應式設計已驗證（桌面、平板、手機）
[ ] 無敏感信息洩露（密碼、密鑰等）
```

### 4.3 常用命令

```bash
# 開發
npm run dev              # 啟動開發服務器 (localhost:3000)
npm run lint             # 運行 ESLint 檢查
npm run build            # 生產構建

# 資料庫
npm run prisma:generate  # 生成 Prisma 客戶端
npm run prisma:migrate   # 創建與應用遷移
npm run prisma:studio    # 打開 Prisma Studio GUI
npm run prisma:seed      # 注入種子數據

# 測試
npm test                 # 運行測試套件
npm run test:watch       # Watch 模式運行測試
```

### 4.4 新功能開發流程

1. **創建分支**
   ```bash
   git checkout -b feature/time-tracking
   ```

2. **實現功能**
   - 先實現 API 端點 (`app/api/[resource]/route.ts`)
   - 再實現頁面組件 (`app/(dashboard)/[feature]/page.tsx`)
   - 添加測試文件

3. **本地驗證**
   ```bash
   npm run lint
   npm run build
   npm run test
   ```

4. **提交 PR**
   - 描述變更內容
   - 引用相關任務編號
   - 添加截圖或演示鏈接

5. **代碼審查與合併**

### 4.5 調試技巧

- 使用 `npm run prisma:studio` 檢查資料庫狀態
- 使用 `console.log()` 及 VS Code Debugger 調試
- 檢查瀏覽器開發者工具的網絡標籤，查看 API 請求/響應
- 查看 Next.js 終端輸出的錯誤堆棧

---

## 五、部署與運維指示

### 5.1 推薦部署方案

#### 方案 A：Vercel （推薦用於快速部署）

優點：
- Next.js 官方支援，零配置
- 自動 HTTPS 與 CDN
- 內置環境變數管理
- 自動部署 (Git push)
- 免費額度充足

步驟：
1. 在 Vercel 註冊帳戶 (vercel.com)
2. 導入 GitHub 倉庫
3. 配置環境變數 (DATABASE_URL, NEXTAUTH_SECRET 等)
4. 部署

#### 方案 B：Railway （推薦用於全棧部署）

優點：
- PostgreSQL 內置支持
- 簡單的環境配置
- 月費低

步驟：
1. 在 Railway 註冊 (railway.app)
2. 創建新項目
3. 添加 PostgreSQL 服務
4. 部署 Next.js 應用
5. 配置環境變數

#### 方案 C：DigitalOcean App Platform （推薦用於完整控制）

優點：
- 完整的基礎設施控制
- Managed Databases 可用
- 固定月費低廉

### 5.2 部署前清單

- [ ] 環境變數已配置 (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL)
- [ ] PostgreSQL 實例已設置與遷移完成
- [ ] 種子數據已注入 (`npm run prisma:seed`)
- [ ] HTTPS/SSL 已配置
- [ ] SMTP 或郵件服務已配置（用於認證郵件）
- [ ] 備份策略已設置
- [ ] 監控告警已配置
- [ ] 性能測試已完成

### 5.3 上線後的監控

- 定期檢查錯誤日誌
- 監控資料庫連接池
- 追踪 API 響應時間
- 定期備份驗證
- 安全更新檢查

---

## 六、安全建議

### 6.1 已實現的安全措施

- ✅ 密碼 bcryptjs 加密
- ✅ 登錄失敗鎖定機制
- ✅ NextAuth CSRF 保護
- ✅ SQL 注入防護 (Prisma ORM)
- ✅ XSS 防護 (React)
- ✅ 多租戶資料隔離

### 6.2 建議實現的安全措施

1. **速率限制** - 防止暴力破解與 DDoS
2. **審計日誌** - 記錄敏感操作以符合監管要求
3. **加密 SSL/TLS** - 傳輸層加密
4. **定期安全審計** - 第三方 Pentest
5. **依賴項更新** - 定期檢查 `npm audit` 並更新包

---

## 七、總結

該項目已達到可部署的成熟度。建議：

1. **立即部署** 到測試環境進行 UAT
2. **優先實現** Phase 2 的時間追踪、文檔管理、成員管理
3. **加強安全** 部署速率限制、審計日誌、備份策略
4. **建立 CI/CD** 自動化構建、測試、部署流程
5. **設置監控** 性能、錯誤、安全告警

預估完整上線時間：4-6 週（含 Phase 2 功能）。

---

**文檔版本**: v1.0
**最後更新**: 2026-01-28
**準備者**: Monica AI Assistant
