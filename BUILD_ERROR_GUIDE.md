# 🚨 DigitalOcean 構建錯誤診斷指南

## ⚠️ 錯誤：Build Error: Non-Zero Exit

這個錯誤表示構建過程中某個步驟失敗了。需要查看詳細日誌才能確定具體原因。

---

## 📋 查看構建日誌

### 步驟 1：進入日誌頁面

1. 在您的 App 頁面
2. 點擊上方的 **"Logs"** 或 **"Runtime Logs"** 頁籤
3. 切換到 **"Build Logs"**（構建日誌）
4. 往下滾動到最底部

### 步驟 2：找到錯誤訊息

尋找以下關鍵字（通常是紅色文字）：
- ❌ `Error:`
- ❌ `failed`
- ❌ `cannot find`
- ❌ `undefined`
- ❌ `exit code 1`

### 步驟 3：複製錯誤訊息

**複製最後 20-30 行日誌**，包括：
- 錯誤訊息本身
- 錯誤前的幾行（提供上下文）
- Stack trace（如果有）

---

## 🔍 常見構建錯誤及解決方案

### ❌ 錯誤 1：DATABASE_URL 環境變數問題

**日誌顯示**：
```
Error: Environment variable not found: DATABASE_URL
prisma:error Error: Schema validation error
```

**原因**：
- DATABASE_URL 環境變數未設定
- DATABASE_URL 格式錯誤

**解決方案**：
1. 進入 Settings → Components → web
2. 找到 Environment Variables
3. 確認 `DATABASE_URL` 已添加
4. 確認值包含完整的連接字串：
   ```
   postgresql://doadmin:AVNS_xxxxx@db-postgresql-sgp1-xxxxx.db.ondigitalocean.com:25060/defaultdb?sslmode=require
   ```
5. 重新部署（Settings → Force Rebuild and Deploy）

---

### ❌ 錯誤 2：Prisma Generate 失敗

**日誌顯示**：
```
Error: P1001: Can't reach database server
Error: prisma generate failed
```

**原因**：
- DATABASE_URL 無法連接到資料庫
- 資料庫尚未創建或未就緒
- 缺少 `sslmode=require` 參數

**解決方案**：

**選項 A：檢查 DATABASE_URL 格式**
```
# ✅ 正確格式
postgresql://user:pass@host:port/db?sslmode=require&connection_limit=5

# ❌ 錯誤：缺少 sslmode
postgresql://user:pass@host:port/db

# ❌ 錯誤：使用 localhost（本地才能用）
postgresql://localhost:5432/db
```

**選項 B：確認資料庫已創建**
1. 進入 Databases 頁面
2. 確認資料庫狀態為 "Available"（綠色）
3. 如果顯示 "Creating..."，等待幾分鐘

**選項 C：重新取得連接字串**
1. Databases → 您的資料庫 → Connection Details
2. 複製完整的 Connection String
3. 在字串後面加上：`&connection_limit=5&pool_timeout=10`
4. 更新 Environment Variables

---

### ❌ 錯誤 3：NEXTAUTH_SECRET 或其他環境變數缺失

**日誌顯示**：
```
Error: NEXTAUTH_SECRET must be provided
Error: Invalid environment variables
```

**解決方案**：

確認以下 5 個環境變數都已設定：

```
✅ DATABASE_URL
✅ NEXTAUTH_SECRET
✅ NEXTAUTH_URL
✅ NEXT_PUBLIC_APP_URL
✅ NODE_ENV
```

**檢查步驟**：
1. Settings → Components → web → Environment Variables
2. 點擊 "Edit"
3. 確認所有 5 個變數都已添加
4. 如果缺少，點擊 "+ Add Variable" 補上

---

### ❌ 錯誤 4：TypeScript 編譯錯誤

**日誌顯示**：
```
Type error: Property 'xxx' does not exist on type 'yyy'
TS2304: Cannot find name 'xxx'
Failed to compile.
```

**原因**：
- 程式碼有型別錯誤
- 缺少型別定義

**解決方案**：

這通常是程式碼問題，不是部署配置問題。

**快速修復**：
1. 在本地執行 `npm run build` 檢查錯誤
2. 修正型別錯誤
3. 提交並推送到 GitHub
4. DigitalOcean 會自動重新部署

---

### ❌ 錯誤 5：Next.js Build 失敗

**日誌顯示**：
```
Error occurred prerendering page
Failed to compile
Build failed with exit code 1
```

**原因**：
- 環境變數配置錯誤（特別是 NEXTAUTH_URL）
- API 路由錯誤
- 預渲染頁面時出錯

**解決方案**：

**檢查 NEXTAUTH_URL**：
```
# ✅ 正確格式
https://looperhq.hk

# ❌ 錯誤：缺少 https://
looperhq.hk

# ❌ 錯誤：多了結尾斜線
https://looperhq.hk/

# ❌ 錯誤：使用 localhost
http://localhost:3000
```

**檢查 NEXT_PUBLIC_APP_URL**：
- 必須與 NEXTAUTH_URL 相同
- 必須是完整的 URL（包含 `https://`）

---

### ❌ 錯誤 6：記憶體不足

**日誌顯示**：
```
FATAL ERROR: Reached heap limit Allocation failed
JavaScript heap out of memory
```

**原因**：
- 構建過程需要的記憶體超過 App 方案限制
- Next.js 編譯需要大量記憶體

**解決方案**：

**選項 A：升級 App 方案**（推薦）
1. Settings → General
2. 升級到更高的方案（至少 1 GB RAM）

**選項 B：優化構建**
在 `package.json` 添加：
```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

---

### ❌ 錯誤 7：找不到模組或套件

**日誌顯示**：
```
Error: Cannot find module 'xxx'
Module not found: Can't resolve 'xxx'
```

**原因**：
- `package.json` 中缺少依賴
- `node_modules` 未正確安裝

**解決方案**：

1. 檢查本地 `package.json` 是否包含該套件
2. 如果缺少，安裝它：
   ```bash
   npm install xxx
   ```
3. 提交並推送 `package.json` 和 `package-lock.json`
4. DigitalOcean 會自動重新部署

---

## 🛠️ 通用修復步驟

### 方法 1：檢查環境變數

```
Settings → Components → web → Environment Variables → Edit
```

確認：
- [ ] DATABASE_URL 已設定且完整
- [ ] NEXTAUTH_SECRET 已設定
- [ ] NEXTAUTH_URL 已設定（格式：`https://domain.com`）
- [ ] NEXT_PUBLIC_APP_URL 已設定（與 NEXTAUTH_URL 相同）
- [ ] NODE_ENV 已設定為 `production`

### 方法 2：強制重新構建

```
Settings → 往下滾動 → "Force Rebuild and Deploy"
```

有時環境變數更新後需要手動觸發重新部署。

### 方法 3：檢查資料庫狀態

```
Databases → 您的資料庫
```

確認：
- [ ] 狀態為 "Available"（綠色）
- [ ] 連接字串可以複製
- [ ] 沒有顯示錯誤訊息

### 方法 4：本地測試構建

```bash
cd d:\Looper\HK-Legal-Case-Agency

# 設定環境變數（暫時測試用）
$env:DATABASE_URL="[您的資料庫連接字串]"
$env:NEXTAUTH_SECRET="bjFDOHVzTmNLVWEwWU1qaG1icmsyTGlPRVg5dEozRlY="
$env:NEXTAUTH_URL="https://looperhq.hk"
$env:NEXT_PUBLIC_APP_URL="https://looperhq.hk"

# 執行構建
npm run build
```

如果本地構建成功，表示問題在於 DigitalOcean 的環境變數配置。

---

## 📞 需要進一步協助

如果上述方法都無法解決，請提供：

1. **完整的構建日誌**（最後 30-50 行）
2. **環境變數列表**（Key 名稱，不要貼 Value）
3. **資料庫狀態**（是否已成功創建）
4. **錯誤發生在哪個階段**：
   - Installing dependencies？
   - Running build command？
   - Running migrations？
   - Generating Prisma client？

---

## 🎯 快速檢查清單

部署失敗時，按此順序檢查：

- [ ] 構建日誌已查看，錯誤訊息已找到
- [ ] 5 個環境變數都已正確設定
- [ ] DATABASE_URL 包含完整連接字串（含 `?sslmode=require`）
- [ ] NEXTAUTH_URL 格式正確（`https://domain.com`，無結尾 `/`）
- [ ] 資料庫狀態為 "Available"
- [ ] 已嘗試 "Force Rebuild and Deploy"
- [ ] 本地 `npm run build` 成功執行

---

**提示**：90% 的構建錯誤都是環境變數配置問題。請先仔細檢查環境變數！

**最常見錯誤**：
1. DATABASE_URL 缺少 `?sslmode=require`
2. NEXTAUTH_URL 格式錯誤（缺少 `https://` 或多了 `/`）
3. 環境變數未儲存（忘記點 Save）

如果您找到了具體的錯誤訊息，請複製給我，我會幫您精確診斷！💪
