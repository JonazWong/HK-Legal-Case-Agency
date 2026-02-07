# 🚀 DigitalOcean App Platform 環境變數設定

## 📋 快速複製清單

請在 **DigitalOcean App Platform** 設定以下環境變數：

---

### 1️⃣ DATABASE_URL (必需)

**Key**: `DATABASE_URL`

**Value**: 
```
[請貼上您從 DigitalOcean Database 複製的連接字串]

格式範例：
postgresql://doadmin:AVNS_xxxxx@db-postgresql-sgp1-75753-do-user-32973725-0.j.db.ondigitalocean.com:25060/defaultdb?sslmode=require&connection_limit=5&pool_timeout=10&connect_timeout=10
```

**注意**：
- ✅ 必須包含 `?sslmode=require`
- ✅ 建議添加 `&connection_limit=5&pool_timeout=10&connect_timeout=10`

---

### 2️⃣ NEXTAUTH_SECRET (必需)

**Key**: `NEXTAUTH_SECRET`

**Value**: 
```
bjFDOHVzTmNLVWEwWU1qaG1icmsyTGlPRVg5dEozRlY=
```

**說明**: 用於簽署 session token，保護用戶認證安全

---

### 3️⃣ NEXTAUTH_URL (必需)

**Key**: `NEXTAUTH_URL`

**Value**: 
```
https://您的域名
```

**範例**:
- `https://looperhq.hk`
- `https://www.looperhq.hk`

**注意**:
- ✅ 必須使用 `https://`
- ❌ 不要在結尾加 `/`

---

### 4️⃣ NEXT_PUBLIC_APP_URL (必需)

**Key**: `NEXT_PUBLIC_APP_URL`

**Value**: 
```
https://您的域名
```

**說明**: 與 `NEXTAUTH_URL` 相同

**範例**:
- `https://looperhq.hk`
- `https://www.looperhq.hk`

---

### 5️⃣ NODE_ENV (可選，建議設定)

**Key**: `NODE_ENV`

**Value**: 
```
production
```

**說明**: 告訴 Next.js 以生產模式運行

---

## 🎯 設定步驟

### 方法 1: 在創建 App 時設定

1. 創建 App 流程中，找到 **Environment Variables** 區域
2. 點擊 **Add Environment Variable**
3. 逐一添加上面 5 個變數
4. 完成後點擊 **Create Resources**

### 方法 2: 在現有 App 中設定

1. 進入 https://cloud.digitalocean.com/apps
2. 點擊您的 App 名稱
3. 進入 **Settings** 頁籤
4. 找到 **Components** → 點擊 **web**
5. 找到 **Environment Variables** → 點擊 **Edit**
6. 點擊 **Add Variable** 逐一添加
7. 點擊 **Save**
8. App 會自動重新部署（約 5-10 分鐘）

---

## ✅ 設定檢查清單

部署前請確認：

- [ ] DATABASE_URL 已正確設定（包含連接參數）
- [ ] NEXTAUTH_SECRET 已設定（使用生成的密鑰）
- [ ] NEXTAUTH_URL 已設定（您的域名）
- [ ] NEXT_PUBLIC_APP_URL 已設定（與 NEXTAUTH_URL 相同）
- [ ] NODE_ENV 設為 `production`（可選）

---

## 🔍 驗證設定

部署完成後，檢查以下內容：

### 1. 查看部署日誌

在 App 頁面 → **Runtime Logs**，應該看到：

✅ **成功訊息**:
```
✓ Compiled successfully
✓ Ready in 3.2s
✓ Local: http://localhost:8080
```

❌ **錯誤訊息**（需修正）:
```
Error: Invalid DATABASE_URL
Error: NEXTAUTH_SECRET is required
Error: Connection refused
```

### 2. 測試應用程式

1. **開啟您的域名**（或 DigitalOcean 提供的臨時域名）
2. **測試登入頁面**：`https://your-domain.com/login`
3. **測試註冊頁面**：`https://your-domain.com/signup`
4. **嘗試登入**：使用 demo 帳號測試

---

## 🚨 常見問題

### Q1: 部署失敗，顯示 "DATABASE_URL is not defined"

**解決方法**：
- 確認環境變數名稱拼寫正確（區分大小寫）
- 確認已點擊 **Save** 儲存
- 嘗試手動觸發重新部署

### Q2: 登入後顯示 "Invalid session"

**解決方法**：
- 確認 `NEXTAUTH_URL` 與實際域名完全一致
- 確認使用 `https://`（不是 `http://`）
- 清除瀏覽器 Cookie 重試

### Q3: 資料庫連接失敗

**解決方法**：
- 確認 DATABASE_URL 包含 `?sslmode=require`
- 確認資料庫在 DigitalOcean 已成功創建
- 檢查資料庫的防火牆設定（允許 App Platform 連接）

### Q4: "Too many connections" 錯誤

**解決方法**：
- 確認連接字串包含 `connection_limit=5`
- 檢查是否有多個 App 實例共用同一資料庫
- 考慮升級資料庫方案（增加連接數）

---

## 📞 需要協助？

如果遇到問題：
1. 檢查 **Runtime Logs**（最重要！）
2. 確認所有環境變數拼寫正確
3. 確認資料庫連接字串完整
4. 嘗試重新部署（Settings → 點擊 **Force Rebuild and Deploy**）

---

**生成時間**: 2026年2月7日  
**NEXTAUTH_SECRET**: `bjFDOHVzTmNLVWEwWU1qaG1icmsyTGlPRVg5dEozRlY=`  
**專案**: HK Legal Case Agency
