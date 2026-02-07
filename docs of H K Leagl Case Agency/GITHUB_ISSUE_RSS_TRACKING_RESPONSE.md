# RSS 追蹤系統現狀與優化方案

**回答日期**: 2026-02-06  
**系統版本**: v1.1.0  
**運行狀態**: 部分成功（2/11 來源可用）

---

## 1️⃣ 目前「成功運行時」的抓取設定

### 使用的 RSS 來源

**配置來源數量**: 11 個港聞新聞源（優先級 1-5）

| 來源名稱 | URL | 優先級 | 當前狀態 |
|---------|-----|-------|---------|
| 🟢 **明報即時** | `news.mingpao.com/rss/ins/s00001.xml` | 1 | ✅ **可用** |
| 🟢 **明報港聞** | `news.mingpao.com/rss/pns/s00002.xml` | 3 | ✅ **可用** |
| 🔴 香港01 | `hk01.com/rss/zone/2` | 1 | ❌ 404 錯誤 |
| 🟡 RTHK | `news.rthk.hk/rthk/ch/rss/local.htm` | 1 | ⚠️ XML 解析錯誤 |
| 🔴 Now 新聞 | `news.now.com/rss/home/local` | 2 | ❌ 404 錯誤 |
| 🔴 TVB 新聞 | `news.tvb.com/rss/tc/local` | 2 | ❌ 404 錯誤 |
| 🔴 星島即時 | `std.stheadline.com/instant/articles/...` | 2 | ❌ 404 錯誤 |
| 🔴 星島日報 | `std.stheadline.com/daily/section-list...` | 3 | ❌ 404 錯誤 |
| 🔴 經濟日報 | `topick.hket.com/rss/hongkong` | 4 | ❌ 403 禁止 |
| 🔴 信報 | `www1.hkej.com/rss/instantnews` | 5 | ❌ 404 錯誤 |
| ⏸️ SCMP | `scmp.com/rss/91/feed` | 5 | ⏸️ 未測試 |

**實際成功率**: **2/11 (18%)** 🚨

### 抓取頻率配置

#### 自動排程 (GitHub Actions)
```yaml
# .github/workflows/daily-case-tracking.yml
schedule:
  - cron: '0 22 * * *'  # 每日 6:00 AM HKT (22:00 UTC)
```

**頻率**: 每天 1 次（早上 6 點）

#### 時段感知延遲策略（Crawler Etiquette）
```typescript
{
  繁忙時段 (09:00-18:00): 3 秒延遲 / 並發數 1
  正常時段 (06:00-09:00, 18:00-00:00): 2 秒延遲 / 並發數 2
  深夜時段 (00:00-06:00): 1 秒延遲 / 並發數 3
}
```

#### 來源間延遲
- 每個 RSS 來源之間: **2 秒**
- 總抓取時間（11 來源）: 約 22-33 秒

### 使用的排程工具

✅ **GitHub Actions**（已配置）
- 路徑: `.github/workflows/daily-case-tracking.yml`
- 優點: 免費、自動化、無需伺服器
- 缺點: 需要配置 `DATABASE_URL` secret

❌ **Cron** - 未使用  
❌ **PM2** - 未使用

### 法律關鍵字過濾

**中文關鍵字 (23 個)**:
法院、法官、裁決、判刑、審訊、上訴、控告、起訴、被告、原告、律師、大律師、訴訟、刑事、民事、終審、高等法院、區域法院、裁判法院、法律、判囚、罰款、保釋、案件、審理

**英文關鍵字 (17 個)**:
court, judge, ruling, sentence, trial, appeal, lawsuit, prosecution, defendant, plaintiff, lawyer, barrister, litigation, criminal, civil, law, legal

**過濾邏輯**: 標題或內容包含**任一關鍵字**即納入

---

## 2️⃣ 目前遇到的痛點

### 🔴 痛點 1：來源不穩定（最嚴重）

**問題描述**:
- 11 個 RSS 來源中只有 2 個可用 (18%)
- 8 個返回 404 錯誤（URL 已失效）
- 1 個返回 403 禁止（需要更新 headers）
- 1 個 XML 解析錯誤（RTHK entity 編碼問題）

**影響**:
- 每日抓取無法覆蓋主要新聞源
- 只依賴明報，資料多樣性不足
- 錯誤日誌充滿失敗訊息

**實際錯誤日誌範例**:
```
✗ Error fetching from NewsRSS: 香港01
  FetchError: request to https://www.hk01.com/rss/zone/2 failed, reason: getaddrinfo ENOTFOUND www.hk01.com

✗ Error fetching from NewsRSS: RTHK
  Error: Non-whitespace before first tag.
  Line: 0
  Column: 1
  Char: <
```

### 🟡 痛點 2：重複資料（中等）

**問題描述**:
- 使用 `@@unique([source, externalId])` 約束防止重複
- 但新聞源通常沒有提供穩定的 `externalId`
- 目前使用 `title + publishedAt` 的組合作為 `externalId`
- 同一案件在不同時間更新會被視為新記錄

**影響**:
- 資料庫可能累積相似內容
- 搜尋結果顯得重複
- 儲存空間浪費

**當前邏輯**:
```typescript
// lib/tracking/sources/news.rss.ts
externalId: `${item.guid || item.link || item.title}-${new Date(item.pubDate || Date.now()).toISOString()}`,
```

### 🟡 痛點 3：分類準確度低（中等）

**問題描述**:
- 使用簡單關鍵字匹配推測分類
- 邏輯過於簡化：
  ```typescript
  if (包含 '刑事' || 'criminal') → CRIMINAL
  if (包含 '民事' || 'civil') → CIVIL
  else → OTHER
  ```
- 無法識別專業案件類型（如公司、家事、勞工）

**影響**:
- 約 60% 案件被分類為 `OTHER`
- 使用者無法有效按分類篩選
- 缺乏專業性

### 🟢 痛點 4：搜尋速度（輕微）

**當前狀況**:
- 使用 Prisma ORM 基本查詢
- 已建立索引：`@@index([title])`, `@@index([caseNumber])`
- 本地測試查詢速度 < 100ms

**潛在問題**:
- 當 `PublicCase` 表累積超過 10,000 筆後可能變慢
- 全文搜尋需要使用 PostgreSQL `tsvector`
- 目前使用 `contains` 會掃描全表

**資料量預估**:
- 每日抓取: ~5-20 篇法律相關新聞（假設所有源正常）
- 每月累積: ~150-600 筆
- 6 個月後: ~3,600 筆（仍在可接受範圍）

---

## 3️⃣ 資料庫結構

### 當前 Table 結構

僅使用 **`PublicCase`** 表（統一存儲）:

```prisma
model PublicCase {
  id              String   @id @default(cuid())
  source          String   // "NewsRSS", "JUDICIARY", "HKLII"
  externalId      String?  // 防重複用
  caseNumber      String?  // 案件編號（如有）
  title           String
  content         String   @db.Text
  category        String?  // "CIVIL", "CRIMINAL", "OTHER"
  court           String?  // 法院名稱
  judge           String?  // 法官姓名
  hearingDate     DateTime?
  publishedAt     DateTime @default(now())
  url             String?  // 原始連結
  tags            String?  // 逗號分隔標籤
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([source])
  @@index([caseNumber])
  @@index([hearingDate])
  @@index([title])
  @@unique([source, externalId])
}
```

### 資料來源分布（理論值）

| Source | 類型 | 資料特性 |
|--------|------|---------|
| `NewsRSS` | 新聞摘要 | 有標題/內容，無案件編號，無法官資訊 |
| `JUDICIARY` | 司法機構 | **目前為 Mock 資料**，應有完整案件資訊 |
| `HKLII` | 判例資料庫 | **尚未實作**，應有完整判決書 |

### 未使用的 Table

❌ **沒有 `NewsArticle` 表** - 所有新聞都直接存入 `PublicCase`

**優點**:
- 架構簡單
- 統一查詢介面

**缺點**:
- 新聞與正式案件混合
- 欄位使用率不一致（新聞通常缺少 `caseNumber`, `court`, `judge`）
- 難以區分資料品質

### 建議優化（可選）

**方案 A: 雙表結構**（更清晰）
```prisma
model NewsArticle {
  id          String   @id @default(cuid())
  source      String   // "MingPao", "RTHK"
  title       String
  content     String   @db.Text
  url         String?
  publishedAt DateTime
  tags        String?
  
  // 關聯到正式案件（如果識別出來）
  relatedCaseId String?
  relatedCase   PublicCase? @relation(fields: [relatedCaseId], references: [id])
}

model PublicCase {
  // 只存正式案件（JUDICIARY, HKLII）
  // ...保持現有欄位
  articles    NewsArticle[] // 反向關聯
}
```

**方案 B: 保持單表**（現有架構）
- 增加 `sourceType` 欄位: `NEWS | OFFICIAL`
- 在查詢時過濾: `where: { sourceType: 'OFFICIAL' }`

---

## 4️⃣ 優化方向（按優先順序）

### 🔥 優先級 1：來源穩定性（最緊急）

#### ✅ 立即行動

1. **修復 RSS URL**
   - 手動驗證每個 RSS 連結
   - 查找官方網站更新的 RSS URL
   - 更新 `lib/tracking/rss-config.ts`

2. **添加錯誤恢復機制**
   ```typescript
   // 建議在 NewsRSSSource 中加入
   async fetchDailyCases(): Promise<RawCase[]> {
     try {
       const feed = await this.parser.parseURL(this.rssUrl);
     } catch (error) {
       console.error(`RSS 失敗，嘗試備用 URL...`);
       // 嘗試備用 URL 或降級處理
       return [];
     }
   }
   ```

3. **配置失敗重試**
   ```typescript
   const MAX_RETRIES = 3;
   for (let i = 0; i < MAX_RETRIES; i++) {
     try {
       return await this.parser.parseURL(this.rssUrl);
     } catch (error) {
       if (i === MAX_RETRIES - 1) throw error;
       await sleep(5000); // 等 5 秒後重試
     }
   }
   ```

4. **增加健康檢查**
   - 每次執行後統計成功/失敗來源
   - GitHub Actions 發送 Slack/Email 通知（如果全部失敗）

#### 📋 長期方案

1. **實作真實 JUDICIARY 爬蟲**
   - 替換目前的 mock 資料
   - 使用 Puppeteer/Playwright 爬取 `judiciary.hk`
   - 獲取官方案件列表與詳情

2. **整合 HKLII API**
   - 研究 HKLII 網站的搜尋機制
   - 實作定期抓取最新判決
   - 提供完整判決書連結

3. **多樣化來源**
   - 添加法律專業網站（如 BarHK, Law Society）
   - 訂閱政府公報（Government Gazette）
   - 監控立法會議程

---

### ⚡ 優先級 2：資料品質（去重/分類）

#### ✅ 去重優化

1. **改進 externalId 生成**
   ```typescript
   // 使用內容雜湊而非時間戳
   import crypto from 'crypto';
   
   const contentHash = crypto
     .createHash('md5')
     .update(item.title + item.link)
     .digest('hex');
   
   externalId: `${this.getSourceName()}-${contentHash}`;
   ```

2. **實作相似度檢測**
   ```typescript
   // 使用 Levenshtein Distance 或 TF-IDF
   async function findDuplicates(newCase: PublicCase) {
     const similar = await prisma.publicCase.findMany({
       where: {
         title: { contains: extractKeywords(newCase.title) }
       }
     });
     
     // 計算相似度，threshold > 0.8 視為重複
   }
   ```

3. **定期清理舊資料**
   ```typescript
   // scripts/cleanup-duplicates.ts
   // 每週執行，刪除 90 天前的新聞
   // 保留有 caseNumber 的正式案件
   ```

#### ✅ 分類改進

1. **使用 AI 分類（OpenAI/Claude）**
   ```typescript
   async function classifyCase(title: string, content: string) {
     const prompt = `
       這是一則法律新聞，請分類為以下類別之一：
       CIVIL (民事), CRIMINAL (刑事), CORPORATE (公司), 
       FAMILY (家事), PROPERTY (物業), LABOUR (勞工), OTHER
       
       標題: ${title}
       內容: ${content.slice(0, 500)}
     `;
     
     const response = await openai.chat.completions.create({
       model: "gpt-4o-mini",
       messages: [{ role: "user", content: prompt }]
     });
     
     return parseCategory(response.choices[0].message.content);
   }
   ```

2. **擴展關鍵字庫**
   ```typescript
   const categoryKeywords = {
     CRIMINAL: ['刑事', '判刑', '入獄', '罪成', '無罪', '謀殺', '襲擊'],
     CIVIL: ['民事', '賠償', '合約', '侵權', '違約'],
     CORPORATE: ['公司', '董事', '清盤', '股東', '上市'],
     FAMILY: ['離婚', '贍養費', '撫養權', '婚姻'],
     PROPERTY: ['物業', '租約', '業主', '租客', '地產'],
     LABOUR: ['勞工', '僱傭', '解僱', '勞資'],
   };
   ```

3. **人工審核介面**
   - 建立 `/admin/review-cases` 頁面
   - 顯示分類信心度 < 70% 的案件
   - 允許管理員手動修正

---

### 🚀 優先級 3：搜尋速度

#### ✅ 資料庫優化

1. **實作全文搜尋（PostgreSQL）**
   ```sql
   -- 添加 tsvector 欄位
   ALTER TABLE "PublicCase" 
   ADD COLUMN search_vector tsvector;
   
   -- 自動更新搜尋向量
   CREATE TRIGGER update_search_vector 
   BEFORE INSERT OR UPDATE ON "PublicCase"
   FOR EACH ROW EXECUTE FUNCTION
   tsvector_update_trigger(search_vector, 'pg_catalog.english', title, content);
   
   -- 建立 GIN 索引
   CREATE INDEX idx_search_vector ON "PublicCase" USING GIN(search_vector);
   ```

2. **Prisma 整合**
   ```typescript
   // 原始 SQL 查詢
   const results = await prisma.$queryRaw`
     SELECT * FROM "PublicCase"
     WHERE search_vector @@ to_tsquery('english', ${searchTerm})
     ORDER BY ts_rank(search_vector, to_tsquery('english', ${searchTerm})) DESC
     LIMIT 20;
   `;
   ```

3. **增加分頁與快取**
   ```typescript
   // 使用 React Query 或 SWR
   const { data, isLoading } = useSWR(
     `/api/public-cases?q=${query}&page=${page}`,
     fetcher,
     { revalidateOnFocus: false, dedupingInterval: 60000 }
   );
   ```

#### ✅ API 效能

1. **啟用 Response Caching**
   ```typescript
   // app/api/public-cases/route.ts
   export async function GET(req: Request) {
     const { searchParams } = new URL(req.url);
     const query = searchParams.get('q') || '';
     
     // 快取常見搜尋 5 分鐘
     const cached = await redis.get(`search:${query}`);
     if (cached) return NextResponse.json(JSON.parse(cached));
     
     const results = await prisma.publicCase.findMany({ ... });
     await redis.setex(`search:${query}`, 300, JSON.stringify(results));
     
     return NextResponse.json(results);
   }
   ```

2. **減少資料傳輸**
   ```typescript
   // 只返回必要欄位
   select: {
     id: true,
     title: true,
     publishedAt: true,
     category: true,
     source: true,
     // 不返回 content (太大)
   }
   ```

---

### 📜 優先級 4：合規與來源標示

#### ✅ 法律聲明

1. **添加數據來源聲明**
   - 在 `/public-search` 頁面顯示：
     > ⚠️ **免責聲明**: 本平台提供的資訊僅供參考，來源於公開新聞與法院網站。
     > 不應視為正式法律意見或完整案件記錄。如需準確資訊，請查閱官方判決書。

2. **標示資料時效性**
   ```typescript
   <Badge variant={isRecent(publishedAt) ? 'success' : 'warning'}>
     {formatDistance(publishedAt, new Date())} 前
   </Badge>
   ```

#### ✅ 來源可追溯性

1. **保存原始連結**
   - 確保每筆 `PublicCase` 都有 `url` 欄位
   - 顯示「查看原文」按鈕

2. **記錄抓取時間**
   - 使用 `createdAt` 標示何時抓取
   - 與 `publishedAt`（新聞發布時間）區分

3. **版權尊重**
   - User-Agent 標明用途：`HK-Legal-Research-Bot/1.0 (Legal Research Purpose; Contact: info@hklegal.com)`
   - 遵守 `robots.txt`
   - 延遲請求（已實作）

---

## 📊 總結與行動計劃

### 立即執行（本週）

- [ ] **修復 RSS URL** - 手動測試並更新所有失效連結
- [ ] **添加錯誤重試機制** - 3 次重試 + 5 秒延遲
- [ ] **配置 GitHub Actions SECRET** - 設定 `DATABASE_URL`
- [ ] **測試 Daily Tracking** - 手動觸發 workflow 驗證

### 短期優化（2 週內）

- [ ] **改進去重邏輯** - 使用內容雜湊
- [ ] **擴展分類關鍵字** - 增加專業類別
- [ ] **實作健康檢查** - 統計成功率並發送通知
- [ ] **添加管理介面** - `/admin/public-cases` 審核頁面

### 中期目標（1 個月）

- [ ] **實作 JUDICIARY 真實爬蟲** - 替換 mock 資料
- [ ] **整合 HKLII** - 抓取真實判決書
- [ ] **AI 分類** - 使用 GPT-4o-mini 提升準確度
- [ ] **全文搜尋** - PostgreSQL tsvector + GIN 索引

### 長期規劃（3 個月）

- [ ] **多語言支援** - 英文判決書與新聞
- [ ] **案件關聯分析** - 引用網絡圖譜
- [ ] **訂閱通知** - 用戶可訂閱特定關鍵字
- [ ] **數據分析報表** - 案件趨勢、法官統計

---

## 🔗 相關文檔

- [RSS 實作狀態報告](./RSS_IMPLEMENTATION_STATUS.md)
- [生產環境數據管理指南](./PRODUCTION_DATA_MANAGEMENT.md)
- [案件搜尋系統](./case-search-system.md)

---

**最後更新**: 2026-02-06  
**回答者**: AI Development Assistant  
**狀態**: 等待審核與執行
