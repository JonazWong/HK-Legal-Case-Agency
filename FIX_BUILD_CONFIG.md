# 🔧 DigitalOcean 構建設定修復指南

## ⚠️ 問題分析

DigitalOcean 錯誤地將您的專案識別為 **monorepo**，但 **HK-Legal-Case-Agency** 是標準的 **Next.js + Prisma** 專案！

### 錯誤訊息分析

```
❌ Missing project.yml configuration
   → 這是 monorepo (pnpm workspace) 才需要的配置文件
   → 您的專案不需要這個文件

❌ Empty directory: packages/migration/data
   → 這個目錄在您的專案中不存在
   → DigitalOcean 誤判了專案結構
```

---

## ✅ 解決方案：手動指定構建設定

### 步驟 1：進入構建設定頁面

```
1. 在 DigitalOcean App 頁面
2. 點擊上方 "Settings" 頁籤
3. 往下滾動找到 "Components" 區域
4. 找到 "web" component
5. 點擊旁邊的 "Edit" 按鈕
```

---

### 步驟 2：確認 GitHub 來源

在 "Source" 區域確認：

```
✅ Repository: JonazWong/HK-Legal-Case-Agency
✅ Branch: main
```

**如果 Repository 不對**：
1. 點擊 "Edit Source"
2. 重新選擇正確的 repository
3. 選擇 `main` branch

---

### 步驟 3：修改構建命令

找到 **"Build Configuration"** 區域，設定以下內容：

#### a) Build Command（構建命令）

**推薦設定**：
```bash
npx prisma generate && npm run build
```

**說明**：
- `npx prisma generate` — 生成 Prisma Client（必需！）
- `npm run build` — 執行 Next.js 構建

**如果構建失敗，改為**：
```bash
npm install && npx prisma generate && npm run build
```

#### b) Run Command（執行命令）

```bash
npm start
```

**說明**：這會啟動 Next.js 生產伺服器

#### c) Output Directory（輸出目錄）- 可選

```
.next
```

或留空（DigitalOcean 會自動偵測）

#### d) Install Command（安裝命令）- 通常不需要改

保持預設：
```bash
npm install
```

---

### 步驟 4：確認環境變數

在同一頁面，往下滾動找到 **"Environment Variables"**，確認以下變數都已設定：

```
✅ DATABASE_URL
✅ NEXTAUTH_SECRET
✅ NEXTAUTH_URL
✅ NEXT_PUBLIC_APP_URL
✅ NODE_ENV
```

**如果缺少任何變數**：
- 點擊 "Edit"
- 點擊 "+ Add Variable"
- 參考 [ENV_VARS_QUICK_REFERENCE.md](ENV_VARS_QUICK_REFERENCE.md)

---

### 步驟 5：儲存並重新部署

```
1. 到達頁面底部
2. 點擊 "Save" 按鈕
3. DigitalOcean 會自動觸發重新部署
4. 等待 5-10 分鐘
```

---

## 🎯 完整構建設定範例

以下是完整的設定範例（複製使用）：

### Build Configuration

| 設定項目 | 值 |
|---------|---|
| **Build Command** | `npx prisma generate && npm run build` |
| **Run Command** | `npm start` |
| **Install Command** | `npm install` |
| **Output Directory** | `.next` (或留空) |

### Environment Variables

| Key | Value (範例) |
|-----|--------------|
| `DATABASE_URL` | `postgresql://doadmin:...@db-postgresql-sgp1-xxxxx.db.ondigitalocean.com:25060/defaultdb?sslmode=require` |
| `NEXTAUTH_SECRET` | `bjFDOHVzTmNLVWEwWU1qaG1icmsyTGlPRVg5dEozRlY=` |
| `NEXTAUTH_URL` | `https://looperhq.hk` |
| `NEXT_PUBLIC_APP_URL` | `https://looperhq.hk` |
| `NODE_ENV` | `production` |

---

## 🔍 驗證設定是否正確

部署完成後，檢查以下內容：

### 1. 查看構建日誌

```
Logs → Build Logs
```

**成功的構建日誌應該顯示**：
```
✓ Generating Prisma Client...
✓ Generated Prisma Client
✓ Compiled successfully
✓ Creating an optimized production build
```

**如果看到錯誤**：
- 複製錯誤訊息
- 參考 [BUILD_ERROR_GUIDE.md](BUILD_ERROR_GUIDE.md)

### 2. 查看運行日誌

```
Logs → Runtime Logs
```

**成功啟動應該顯示**：
```
✓ Ready in 3.2s
✓ Local: http://localhost:8080
```

### 3. 訪問應用

```
打開 DigitalOcean 提供的 URL
或您的自訂域名
```

**測試以下頁面**：
- `/` — 首頁
- `/login` — 登入頁面
- `/signup` — 註冊頁面

---

## 🚨 常見問題

### Q1: 構建還是失敗，顯示 "Prisma generate failed"

**可能原因**：
- DATABASE_URL 未設定或格式錯誤
- 資料庫未就緒

**解決方法**：
1. 確認 DATABASE_URL 已設定
2. 確認 DATABASE_URL 包含 `?sslmode=require`
3. 確認資料庫狀態為 "Available"（綠色）

### Q2: 構建成功但運行失敗

**可能原因**：
- Run Command 錯誤
- 環境變數缺失

**解決方法**：
1. 確認 Run Command 為 `npm start`
2. 檢查所有 5 個環境變數都已設定
3. 查看 Runtime Logs 找出具體錯誤

### Q3: 顯示 "Cannot find module '@prisma/client'"

**可能原因**：
- Build Command 沒有執行 `prisma generate`

**解決方法**：
確認 Build Command 為：
```bash
npx prisma generate && npm run build
```

### Q4: 還是顯示 "Missing project.yml"

**可能原因**：
- DigitalOcean 還在使用舊的自動檢測設定

**解決方法**：
1. 刪除現有的 App
2. 重新創建 App
3. 在創建時**手動選擇 "Next.js"** 作為框架
4. 確認 Build Command 和環境變數

---

## 💡 最佳實踐建議

### 1. 使用明確的構建命令

❌ **避免讓 DigitalOcean 自動檢測**
```
Auto-detect (不推薦)
```

✅ **明確指定 Next.js + Prisma**
```
Build: npx prisma generate && npm run build
Run: npm start
```

### 2. 測試本地構建

在部署前，先在本地測試構建：

```bash
cd d:\Looper\HK-Legal-Case-Agency

# 設定環境變數（測試用）
$env:DATABASE_URL="postgresql://..."
$env:NEXTAUTH_SECRET="bjFDOHVzTmNLVWEwWU1qaG1icmsyTGlPRVg5dEozRlY="
$env:NEXTAUTH_URL="https://looperhq.hk"
$env:NEXT_PUBLIC_APP_URL="https://looperhq.hk"

# 模擬 DigitalOcean 的構建流程
npm install
npx prisma generate
npm run build
npm start
```

如果本地構建成功，DigitalOcean 也應該成功。

### 3. 保持構建配置簡單

不要添加不必要的配置文件（如 project.yml）。  
Next.js 標準專案不需要這些。

---

## 📋 檢查清單

修改設定前確認：

- [ ] 已進入 Settings → Components → web → Edit
- [ ] Build Command 設為 `npx prisma generate && npm run build`
- [ ] Run Command 設為 `npm start`
- [ ] 5 個環境變數都已設定
- [ ] DATABASE_URL 格式正確（含 `?sslmode=require`）
- [ ] NEXTAUTH_URL 格式正確（`https://domain.com`，無 `/`）
- [ ] 已點擊 Save 儲存

修改後確認：

- [ ] DigitalOcean 已觸發重新部署
- [ ] 構建日誌顯示 "Generating Prisma Client"
- [ ] 構建日誌顯示 "Compiled successfully"
- [ ] Runtime Logs 顯示 "Ready"
- [ ] 應用程式可以正常訪問

---

## 🎯 如果還是失敗

請提供以下資訊：

1. **構建日誌**（最後 30-50 行）
2. **當前的 Build Command**
3. **環境變數列表**（只要 Key 名稱）
4. **資料庫狀態**（Available / Creating / Error）

我會根據具體情況提供進一步的診斷！

---

**快速修復步驟總結**：
1. Settings → Components → web → Edit
2. Build Command 改為：`npx prisma generate && npm run build`
3. 確認環境變數已設定（5 個）
4. 點擊 Save
5. 等待重新部署

**預計時間**：5-10 分鐘

**成功標誌**：構建日誌顯示 "Compiled successfully" ✅

加油！您快成功了！💪
