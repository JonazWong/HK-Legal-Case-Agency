# Looper HQ 完整頁面清單

**統計時間**：2026-02-06

---

## 📊 頁面總覽

### 總計：**15+ 主要頁面路由**

---

## 🌐 公開訪問區域

### 1. Landing Page (首頁)
- **路徑**：`/`
- **檔案**：`apps/web/app/page.tsx`
- **端口**：`localhost:3002` (開發)
- **特色**：
  - ParticleBackground 粒子效果
  - Hero Section 英雄區塊
  - 產品特色展示
  - Premier 設計風格

### 2. Marketing Pages (行銷頁)
- **路徑**：`/landing/*`
- **檔案**：`apps/web/app/landing/`
- **用途**：產品介紹、功能展示

---

## 🔐 認證路由組 (auth)

### 3. Login Page (登入)
- **路徑**：`/login` 或 `/auth/login`
- **檔案**：`apps/web/app/(auth)/login/page.tsx`
- **功能**：
  - NextAuth.js 整合
  - 支援 Keycloak
  - Email/Password 登入
  - Remember Me
  - 忘記密碼連結

### 4. Register Page (註冊)
- **路徑**：`/register` 或 `/auth/register`
- **檔案**：`apps/web/app/(auth)/register/page.tsx`
- **功能**：
  - 用戶註冊表單
  - 會員層級選擇
  - Email 驗證
  - 條款同意

---

## 📊 儀表板路由組 (dashboard)

### 5. Main Dashboard (主儀表板)
- **路徑**：`/dashboard`
- **檔案**：`apps/web/app/(dashboard)/dashboard/page.tsx`
- **組件**：`components/dashboard/dashboard-content.tsx`
- **功能**：
  - 統計卡片（Stats Grid）
  - 快速操作（Quick Actions）
  - **Premier Search Card**（PREMIUM/PREMIER 專屬）
  - 案件分佈圖表
  - 最近活動時間軸
  - 最近案件列表

---

### 6-8. Cases (案件管理)

#### 6. Cases List (案件列表)
- **路徑**：`/dashboard/cases`
- **檔案**：`apps/web/app/(dashboard)/cases/page.tsx`
- **功能**：
  - 分頁列表
  - 搜尋與篩選
  - 狀態標籤
  - 排序功能

#### 7. New Case (新增案件)
- **路徑**：`/dashboard/cases/new`
- **檔案**：`apps/web/app/(dashboard)/cases/new/page.tsx`
- **功能**：
  - 案件表單
  - 自動編號生成
  - 客戶關聯

#### 8. Case Detail (案件詳情)
- **路徑**：`/dashboard/cases/[id]`
- **檔案**：`apps/web/app/(dashboard)/cases/[id]/page.tsx`
- **功能**：
  - 案件詳細資訊
  - 相關文件
  - 時間記錄
  - 活動歷史

---

### 9-11. Clients (客戶管理)

#### 9. Clients List (客戶列表)
- **路徑**：`/dashboard/clients`
- **功能**：客戶清單、搜尋、篩選

#### 10. New Client (新增客戶)
- **路徑**：`/dashboard/clients/new`

#### 11. Client Detail (客戶詳情)
- **路徑**：`/dashboard/clients/[id]`

---

### 12. Documents (文件管理)
- **路徑**：`/dashboard/documents`
- **檔案**：`apps/web/app/(dashboard)/documents/page.tsx`
- **功能**：
  - 文件上傳
  - 分類管理
  - 版本控制
  - 預覽功能

---

### 13. Time Tracking (時間追蹤)
- **路徑**：`/dashboard/time-tracking`
- **檔案**：`apps/web/app/(dashboard)/time-tracking/page.tsx`
- **功能**：
  - 工時記錄
  - 計時器
  - 案件關聯
  - 統計報表

---

### 14. Billing (帳單管理)
- **路徑**：`/dashboard/billing`
- **檔案**：`apps/web/app/(dashboard)/billing/page.tsx`
- **功能**：
  - 發票生成
  - 付款記錄
  - 帳單歷史
  - 收款狀態

---

### 15. Calendar (日曆)
- **路徑**：`/dashboard/calendar`
- **檔案**：`apps/web/app/(dashboard)/calendar/page.tsx`
- **功能**：
  - 月/週/日視圖
  - 事件管理
  - 提醒設定
  - 案件截止日期

---

### 16. Search (搜尋)
- **路徑**：`/dashboard/search`
- **檔案**：`apps/web/app/(dashboard)/search/page.tsx`
- **功能**：
  - 全局搜尋
  - 進階篩選
  - 搜尋歷史

---

### 17. Public Cases (公開案件搜尋) ⭐ PREMIUM+
- **路徑**：`/dashboard/public-cases`
- **檔案**：`apps/web/app/(dashboard)/public-cases/page.tsx`
- **訪問權限**：PREMIUM & PREMIER
- **功能**：
  - ✨ **智能案件編號連結**（50+ 香港法院格式）
  - 自動識別並連結
  - HKLII/司法機構連結
  - RSS 新聞源追蹤
  - 相關案件展示

---

### 18. Test Case Linking (測試：案件連結)
- **路徑**：`/dashboard/test-case-linking`
- **檔案**：`apps/web/app/(dashboard)/test-case-linking/page.tsx`
- **用途**：開發測試頁面

---

### 19. Settings (設定)
- **路徑**：`/dashboard/settings`
- **檔案**：`apps/web/app/(dashboard)/settings/page.tsx`
- **功能**：
  - 個人資料
  - 偏好設定
  - 通知設定
  - 主題切換（可能）

---

## 🎨 特殊頁面元素

### Premier Search Card (組件)
- **檔案**：`components/dashboard/premier-search-card.tsx`
- **顯示位置**：Main Dashboard
- **訪問權限**：PREMIUM & PREMIER
- **設計特色**：
  - 金色漸變背景
  - 旋轉星光動畫
  - PREMIER 皇冠徽章
  - 發光邊框效果
  - Hover 互動動畫

---

## 🔗 外部系統整合

### Eyclock Admin (獨立系統)
- **端口**：`localhost:8080/admin`
- **用途**：時間追蹤管理後台（可能是獨立服務）
- **技術棧**：（待確認）

---

## 📱 路由架構設計

### Route Groups (路由組)
```
app/
├── (public)          # 公開頁面
│   ├── page.tsx     # 登陸頁
│   └── landing/     # 行銷頁
│
├── (auth)           # 認證頁面（無儀表板 Layout）
│   ├── login/
│   └── register/
│
└── (dashboard)      # 儀表板頁面（共享 Layout）
    ├── layout.tsx   # 儀表板 Layout
    ├── dashboard/
    ├── cases/
    ├── clients/
    ├── documents/
    ├── time-tracking/
    ├── billing/
    ├── calendar/
    ├── search/
    ├── public-cases/
    ├── test-case-linking/
    └── settings/
```

---

## 🎯 頁面使用 Premier Design System

### ✅ 已使用 Premier 組件

1. **Main Dashboard**
   - GlassCard（統計卡片）
   - PremierButton（快速操作）
   - Premier Search Card（高端會員專屬）
   - ActivityTimeline（最近活動）
   - StatCard（統計展示）

2. **Landing Page**
   - ParticleBackground（背景效果）
   - GradientBorder（區塊邊框）
   - PremierButton（CTA 按鈕）

3. **Cases/Clients Pages**
   - GlassCard（列表容器）
   - Table（資料表格）
   - Badge（狀態標籤）

4. **Auth Pages** (推測)
   - GlassCard（登入表單容器）
   - PremierButton（提交按鈕）

---

## 📊 會員權限層級對應頁面

### 所有會員可訪問
- ✅ Dashboard
- ✅ Cases
- ✅ Clients
- ✅ Documents
- ✅ Calendar
- ✅ Settings

### PREMIUM & PREMIER 專屬
- ⭐ Public Cases (智能案件搜尋)
- ⭐ Premier Search Card (儀表板特權卡片)

### 進階功能 (根據角色)
- Time Tracking（計費相關）
- Billing（財務管理）

---

## 🔧 API 路由

### API 端點架構
```
app/api/
├── auth/              # NextAuth.js
├── cases/
│   ├── route.ts       # GET, POST
│   └── [id]/
│       └── route.ts   # GET, PATCH, DELETE
├── clients/
├── documents/
├── time-entries/
├── invoices/
├── public-cases/      # 公開案件 API
└── search/
```

---

## 📈 頁面統計

| 類別 | 頁面數 |
|------|--------|
| 公開頁面 | 2 |
| 認證頁面 | 2 |
| 儀表板主頁 | 1 |
| 核心功能頁 | 9 |
| 高級功能頁 | 1 (Public Cases) |
| 測試頁面 | 1 |
| 設定頁面 | 1 |
| **總計** | **17+** |

---

## 🚀 與 Agency 對比

| 項目 | Agency (3000) | Looper HQ (3002) |
|------|--------------|------------------|
| 登陸頁 | ✅ | ✅ (更高級) |
| 認證頁 | ✅ | ✅ |
| Dashboard | ✅ | ✅ (更豐富) |
| Cases | ✅ | ✅ + [id] 詳情 |
| Clients | ✅ | ✅ + [id] 詳情 |
| Documents | ❌ | ✅ |
| Time Tracking | ❌ | ✅ |
| Billing | ❌ | ✅ |
| Calendar | ❌ | ✅ |
| Search | ❌ | ✅ |
| Public Cases | ✅ (基礎) | ✅ (智能連結) |
| Settings | ✅ | ✅ |

### 結論
**Looper HQ 比 Agency 多 5 個核心功能模組：**
1. Documents
2. Time Tracking
3. Billing
4. Calendar
5. Advanced Search

---

**統計完成時間**：2026-02-06  
**下一步**：決定 Agency 是否需要同步這些額外功能
