# DigitalOcean Settings 設定位置詳細指南

## 🎯 目標
找到並修改 Build Command 以解決構建失敗問題

---

## 📍 完整導覽路徑

### 第 1 步：前往 App Platform
```
網址：https://cloud.digitalocean.com/apps
```

**您會看到：**
- 左側邊欄：Apps、Databases、Networking 等選單
- 主畫面：您創建的所有 Apps 列表

### 第 2 步：點擊您的 App

**尋找您的 App：**
- App 名稱可能是：
  - `hk-legal-case-agency`
  - `HK-Legal-Case-Agency`
  - 或您自定義的名稱
- 狀態可能顯示：
  - 🔴 Failed（失敗）
  - 🟡 Building（構建中）
  - 🟢 Active（運行中）

**動作：點擊 App 名稱**

### 第 3 步：進入 App 詳細頁面

**您會看到上方有 5 個頁籤：**
```
┌──────────┬──────────────┬──────────────┬──────────┬──────────┐
│ Overview │ Runtime Logs │ Deployments  │ Insights │ Settings │
└──────────┴──────────────┴──────────────┴──────────┴──────────┘
                                                        ↑
                                                   點擊這個！
```

**動作：點擊最右邊的 `Settings` 頁籤**

### 第 4 步：在 Settings 頁面尋找 Components

**Settings 頁面結構：**
```
Settings
├─ App Info                    ← 最上方
│  └─ App Name, Region 等基本資訊
│
├─ Components                  ← 往下滾動找到這個區域
│  └─ 🌐 web                   ← 您的主要服務
│     ├─ Source: GitHub - JonazWong/HK-Legal-Case-Agency
│     ├─ Branch: main
│     └─ [Edit] 按鈕           ← 點擊這個！
│
├─ Environment Variables       ← 繼續往下是環境變數
│
└─ App-Level Settings          ← 最下方
```

**關鍵視覺標記：**
- 🔍 找到標題：**Components**
- 🔍 底下會看到：**web** (通常是唯一的 component)
- 🔍 右側有一個 **[Edit]** 按鈕

### 第 5 步：點擊 Edit 按鈕

**點擊後會開啟：Component Settings 彈出視窗**

視窗包含多個區域：
```
Component Settings (web)
┌─────────────────────────────────────┐
│ Source                              │
│ ├─ Repository: JonazWong/...       │
│ └─ Branch: main                    │
│                                      │
│ Build Configuration                 │ ← 重點區域
│ ├─ Build Command                   │ ← 修改這個
│ │  [npx prisma generate && ...]    │
│ ├─ Run Command                     │
│ │  [npm start]                     │
│ └─ Output Directory                │
│    [.next]                          │
│                                      │
│ Environment Variables               │
│ ├─ DATABASE_URL                    │
│ ├─ NEXTAUTH_SECRET                 │
│ └─ ...                             │
│                                      │
│ [Cancel]              [Save]       │ ← 最下方
└─────────────────────────────────────┘
```

---

## ⚡ 快速定位技巧

### 方法 1：使用瀏覽器搜尋功能
1. 在 Settings 頁面按 `Ctrl + F` (Windows) 或 `Cmd + F` (Mac)
2. 搜尋：`Components`
3. 應該會跳轉到正確區域

### 方法 2：滾動尋找關鍵字
在 Settings 頁面往下滾動，尋找：
- **Components** (粗體大標題)
- **web** (您的服務名稱)
- **Edit** 按鈕 (通常是藍色或白色背景)

### 方法 3：檢查 URL
當您點擊 Settings 後，URL 應該類似：
```
https://cloud.digitalocean.com/apps/[app-id]/settings
```
如果不是這個 URL，您可能在錯誤的頁面

---

## 🚨 常見問題

### Q1: 我看不到 Settings 頁籤
**可能原因：**
- 您還在 App 列表頁面 → 需要先點擊 App 名稱
- 頁面還在載入 → 等待幾秒鐘
- 瀏覽器視窗太小 → Settings 可能在 "More" 選單裡

**解決方法：**
1. 確認您已點擊 App 名稱進入詳細頁面
2. 檢查瀏覽器視窗寬度，確保可以看到所有頁籤
3. 如果頁籤被隱藏，找 "..." 或 "More" 按鈕

### Q2: 我在 Settings，但看不到 Components
**可能原因：**
- 頁面還沒完全載入
- 需要往下滾動
- App 還在創建過程中

**解決方法：**
1. 重新整理頁面（F5）
2. 往下滾動查看整個頁面
3. 使用 Ctrl+F 搜尋 "Components"

### Q3: 我看到 Components，但沒有 web
**可能原因：**
- 服務名稱可能不同（例如 `service-1`, `app`, `frontend` 等）
- App 創建時選擇了不同的服務類型

**解決方法：**
- 點擊 Components 底下的任何服務名稱
- 如果有多個服務，選擇類型為 "Web Service" 的那個

### Q4: Edit 按鈕是灰色的
**可能原因：**
- 您的帳號沒有編輯權限
- App 正在部署中

**解決方法：**
- 等待當前部署完成
- 檢查您的帳號權限

---

## 🎯 修改 Build Command 的完整步驟

### 步驟 1-4：找到 Edit 按鈕（如上所述）

### 步驟 5：修改 Build Command
1. 在 "Build Configuration" 區域找到 "Build Command" 欄位
2. 清空現有內容（如果有的話）
3. 輸入或貼上：
   ```
   npx prisma generate && npm run build
   ```
4. 確認 "Run Command" 是：
   ```
   npm start
   ```
5. 確認 "Output Directory" 是：
   ```
   .next
   ```

### 步驟 6：儲存變更
1. 滾動到彈出視窗最底部
2. 點擊藍色的 **[Save]** 按鈕
3. 等待頁面重新載入

### 步驟 7：確認部署開始
儲存後，DigitalOcean 會自動觸發重新部署：
1. 點擊 "Deployments" 頁籤
2. 您應該會看到一個新的部署正在進行
3. 狀態會顯示為：🟡 Building

---

## 📸 視覺提示

**Settings 頁面應該看起來像這樣：**
```
╔══════════════════════════════════════════════════╗
║  Settings                                        ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  📱 App Info                                     ║
║  ├─ App Name: hk-legal-case-agency             ║
║  └─ Region: Singapore                          ║
║                                                  ║
║  ─────────────────────────────────────────────  ║
║                                                  ║
║  📦 Components                    ← 找到這個標題 ║
║                                                  ║
║  🌐 web                          ← 這是服務名稱 ║
║      Source                                      ║
║      ├─ Repository: JonazWong/HK-Legal...      ║
║      └─ Branch: main                           ║
║                                                  ║
║      [Edit] ← 點擊這個按鈕                       ║
║                                                  ║
║  ─────────────────────────────────────────────  ║
║                                                  ║
║  🔐 Environment Variables                        ║
║  ...                                             ║
╚══════════════════════════════════════════════════╝
```

---

## 🆘 如果還是找不到

### 替代方案 A：使用直接連結
如果您知道您的 App ID，可以直接訪問：
```
https://cloud.digitalocean.com/apps/[您的APP-ID]/settings
```

### 替代方案 B：使用 DigitalOcean CLI
如果您有安裝 `doctl`：
```bash
# 列出所有 Apps
doctl apps list

# 查看 App 設定
doctl apps spec get [APP-ID]

# 編輯 App 設定
doctl apps update [APP-ID] --spec app.yaml
```

### 替代方案 C：創建 .do/app.yaml
我可以幫您創建配置文件，直接提交到 GitHub：
- DigitalOcean 會自動偵測並使用
- 無需手動修改設定

---

## 📞 需要協助？

**如果您：**
1. 仍然找不到 Settings 頁籤
2. 看到 Settings 但沒有 Components
3. 看到不同的頁面結構

**請告訴我：**
1. 您當前看到的頁面標題是什麼？
2. 上方有哪些頁籤？
3. 或者截圖給我看（如果可以的話）

我會根據您看到的內容提供更精確的指引！

---

## ✅ 成功標誌

**修改成功後，您會看到：**
1. Settings 頁面重新載入
2. Deployments 頁籤出現新的部署記錄
3. 構建日誌顯示：
   - ✓ Installing dependencies
   - ✓ Generating Prisma Client
   - ✓ Building Next.js

**預計時間：**
- 修改設定：1-2 分鐘
- 等待部署：5-10 分鐘
