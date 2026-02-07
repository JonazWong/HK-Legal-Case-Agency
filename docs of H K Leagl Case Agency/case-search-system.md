# 香港法律案件搜尋器與自動追蹤系統

本專案已整合香港法律案件搜尋器功能及每日自動追蹤系統。以下是完整的系統架構、設置說明及使用指南。

## 1. 系統架構

系統採用模組化設計，確保資料來源可以隨時更換而無需修改核心代碼。

### 核心組件：
- **`lib/tracking/types.ts`**: 定義了 `IDataSource` 介面及 `RawCase` 資料結構
- **`lib/tracking/engine.ts`**: 追蹤引擎，負責調度各個資料來源並將結果存入數據庫
- **`lib/tracking/sources/`**: 存放具體的爬蟲模組（如 `judiciary.ts`, `news.rss.ts`）
- **`lib/services/publicCaseSearch.ts`**: 提供搜尋及查詢功能
- **`app/api/public-cases/route.ts`**: API 端點處理器
- **`app/(dashboard)/public-search/page.tsx`**: 前端搜尋頁面
- **`scripts/track-cases.ts`**: 執行追蹤的命令行腳本

## 2. 數據模型

在 `prisma/schema.prisma` 中新增了 `PublicCase` 模型，用於存儲從外部抓取的案件資訊：

```prisma
model PublicCase {
  id              String   @id @default(cuid())
  source          String   // 資料來源（如 JUDICIARY, NEWS, HKLII）
  externalId      String?  // 來源網站的唯一 ID
  caseNumber      String?  // 案件編號（如 HCCC 123/2023）
  title           String   // 案件標題
  content         String   @db.Text // 詳細內容
  category        String?  // 類別（如 CIVIL, CRIMINAL）
  court           String?  // 法院（如 High Court）
  judge           String?  // 法官
  hearingDate     DateTime? // 審訊日期
  publishedAt     DateTime @default(now()) // 發布日期
  url             String?  // 原始連結
  tags            String?  // 標籤（逗號分隔）
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([source])
  @@index([caseNumber])
  @@index([hearingDate])
  @@index([title])
  @@unique([source, externalId]) // 防止重複
}
```

### 關鍵欄位說明：
- **source**: 資料來源識別碼，用於追蹤案件來自哪個系統
- **externalId**: 外部系統的唯一標識符，配合 source 使用以實現 upsert 去重
- **tags**: 以逗號分隔的標籤字串，方便分類和搜尋

## 3. 設置說明

### 3.1 資料庫遷移

首次設置時需要建立 PublicCase 表格：

```bash
# 生成 Prisma Client
npm run prisma:generate

# 執行資料庫遷移
npm run prisma:migrate

# （可選）查看資料庫
npm run prisma:studio
```

### 3.2 環境變數

確保 `.env` 文件包含以下必要的環境變數：

```env
DATABASE_URL="postgresql://user:password@localhost:5432/hk_legal_db?schema=public"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3.3 GitHub Actions 自動化

已創建 `.github/workflows/daily-case-tracking.yml` 工作流程：
- **執行時間**: 每天香港時間早上 6:00（UTC 22:00）
- **手動觸發**: 可在 GitHub Actions 頁面手動執行
- **環境變數**: 需在 GitHub Secrets 中設置 `DATABASE_URL`

設置步驟：
1. 前往 GitHub 倉庫 Settings > Secrets and variables > Actions
2. 添加新的 secret：`DATABASE_URL`
3. 輸入生產環境的資料庫連接字串

## 4. 如何新增或更換資料來源

您可以輕鬆地在 `lib/tracking/sources/` 下新增一個類別並實作 `IDataSource` 介面：

```typescript
// 範例：新增 HKLII 資料來源
import { IDataSource, RawCase } from '../types';
import axios from 'axios';

export class HKLIISource implements IDataSource {
  name = 'HKLII';
  
  async fetchDailyCases(): Promise<RawCase[]> {
    // 實作抓取邏輯
    const response = await axios.get('https://www.hklii.hk/api/cases');
    const data = response.data;
    
    return data.map((item: any) => ({
      source: 'HKLII',
      externalId: item.id,
      caseNumber: item.citation,
      title: item.name,
      content: item.summary,
      category: item.category,
      court: item.court,
      publishedAt: new Date(item.date),
      url: `https://www.hklii.hk/cases/${item.id}`,
    }));
  }
}
```

然後在 `scripts/track-cases.ts` 中註冊該來源：

```typescript
import { HKLIISource } from '../lib/tracking/sources/hklii';

engine.registerSource(new HKLIISource());
```

## 5. API 使用說明

### 5.1 端點：`GET /api/public-cases`

**查詢參數**：
- `query`: 關鍵字搜尋（標題、內容、案件編號）
- `source`: 篩選資料來源（如 JUDICIARY, NEWS, HKLII）
- `category`: 篩選案件類別（如 CIVIL, CRIMINAL）
- `court`: 篩選法院（如 High Court）
- `startDate`: 開始日期（ISO 8601 格式）
- `endDate`: 結束日期（ISO 8601 格式）
- `page`: 頁碼（預設 1）
- `limit`: 每頁筆數（預設 20，最多 100）

**回應格式**：
```json
{
  "cases": [
    {
      "id": "clx123...",
      "source": "JUDICIARY",
      "caseNumber": "HCCC 123/2025",
      "title": "HKSAR v. CHAN TAI MAN",
      "category": "CRIMINAL",
      "court": "High Court",
      "hearingDate": "2026-01-29T00:00:00Z",
      "publishedAt": "2026-01-29T10:00:00Z",
      "url": "https://..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "totalPages": 3
  }
}
```

**範例請求**：
```bash
curl "http://localhost:3000/api/public-cases?query=fraud&category=CRIMINAL&page=1&limit=10"
```

## 6. 前端搜尋功能

已在導覽列中新增 **"Public Search"** 連結，進入搜尋頁面可使用以下功能：

### 功能特點：
- ✅ 關鍵字搜尋（標題、內容、案件編號）
- ✅ 多重篩選器（來源、類別、法院、日期範圍）
- ✅ 分頁瀏覽（每頁 20 筆）
- ✅ 響應式設計（支援手機、平板、桌面）
- ✅ 雙語支援（中文/英文）
- ✅ 即時載入狀態與錯誤處理
- ✅ URL 同步（可分享搜尋結果連結）

### 篩選選項：
- **來源**: Judiciary（司法機構）、News（新聞）、HKLII（香港法律資訊研究所）
- **類別**: Civil（民事）、Criminal（刑事）、Corporate（公司）、Family（家事）等
- **法院**: 終審法院、高等法院、區域法院、裁判法院等
- **日期範圍**: 開始日期至結束日期

## 7. 手動執行追蹤

開發或測試時可手動運行追蹤腳本：

```bash
npm run track:cases
```

**輸出範例**：
```
============================================================
Starting HK Legal Case Tracking
Time: 2026-01-30T09:00:00.000Z
============================================================

📋 Registering data sources...
  ✓ Registered: Judiciary
  ✓ Registered: NewsRSS
✓ Data sources registered successfully

🔍 Starting daily case tracking...

Processing 2 data source(s)...

────────────────────────────────────────────────────────────
📥 Fetching from: Judiciary
────────────────────────────────────────────────────────────
  Found 1 case(s)
  ✓ Successfully processed: 1/1

────────────────────────────────────────────────────────────
📥 Fetching from: NewsRSS
────────────────────────────────────────────────────────────
  Found 2 case(s)
  ✓ Successfully processed: 2/2

============================================================
Summary:
  Total cases processed: 3
============================================================

✓ Daily tracking completed successfully
============================================================

Process finished.
```

## 8. 故障排除

### 問題：追蹤腳本連接資料庫失敗
**解決方案**：
1. 確認 `.env` 檔案中的 `DATABASE_URL` 正確
2. 確認 PostgreSQL 服務正在運行
3. 檢查資料庫權限和防火牆設置

### 問題：前端顯示 "Unauthorized" 錯誤
**解決方案**：
1. 確認已登入系統
2. 檢查 NextAuth session 是否有效
3. 清除瀏覽器 cookie 並重新登入

### 問題：搜尋結果為空
**解決方案**：
1. 執行 `npm run track:cases` 以載入初始資料
2. 檢查資料庫中是否有 PublicCase 記錄
3. 調整搜尋篩選條件

## 9. 擴展建議

### 未來可以新增的資料來源：
- ✨ **香港法律資訊研究所 (HKLII)**: 判例法資料庫
- ✨ **政府憲報**: 法律公告和條例
- ✨ **律政司**: 檢控政策和指引
- ✨ **法律改革委員會**: 法律改革建議

### 功能增強建議：
- 📧 電郵通知：當符合特定條件的新案件時發送提醒
- 🔖 收藏功能：允許使用者儲存感興趣的案件
- 📊 統計儀表板：展示案件趨勢和分析
- 🔍 全文搜尋：使用 PostgreSQL full-text search 或 Elasticsearch
- 📱 移動應用：開發原生或 PWA 應用程式

## 10. 依賴套件

已新增以下依賴：
- `axios`: HTTP 客戶端，用於抓取外部資料
- `rss-parser`: RSS feed 解析器

## 11. 授權與使用條款

使用本系統時請遵守以下原則：
- ⚖️ 遵守各資料來源的使用條款
- 🚫 不要過度頻繁地請求外部服務（建議每日一次）
- 📋 適當標註資料來源
- 🔒 確保個人資料保護合規（PDPO）
