# 🎯 環境變數快速參考卡片

## ✏️ 複製貼上用（5 個變數）

### 第 1 個：DATABASE_URL
```
Key:   DATABASE_URL
Value: [貼上您從 DigitalOcean Database 複製的連接字串]
```
**範例格式**：
```
postgresql://doadmin:AVNS_xxxxx@db-postgresql-sgp1-75753-do-user-32973725-0.j.db.ondigitalocean.com:25060/defaultdb?sslmode=require&connection_limit=5&pool_timeout=10&connect_timeout=10
```

---

### 第 2 個：NEXTAUTH_SECRET
```
Key:   NEXTAUTH_SECRET
Value: bjFDOHVzTmNLVWEwWU1qaG1icmsyTGlPRVg5dEozRlY=
```
**直接複製**： `bjFDOHVzTmNLVWEwWU1qaG1icmsyTGlPRVg5dEozRlY=`

---

### 第 3 個：NEXTAUTH_URL
```
Key:   NEXTAUTH_URL
Value: https://您的域名
```
**範例**：
- `https://looperhq.hk`
- `https://www.looperhq.hk`

**⚠️ 注意**：
- ✅ 必須包含 `https://`
- ❌ 不要在結尾加 `/`

---

### 第 4 個：NEXT_PUBLIC_APP_URL
```
Key:   NEXT_PUBLIC_APP_URL
Value: https://您的域名
```
**與第 3 個相同**！

**範例**：
- `https://looperhq.hk`
- `https://www.looperhq.hk`

---

### 第 5 個：NODE_ENV
```
Key:   NODE_ENV
Value: production
```
**直接複製**： `production`

---

## 📋 檢查清單

添加每個變數前確認：

- [ ] Key 拼寫正確（大小寫敏感！）
- [ ] Value 已正確貼上（DATABASE_URL 特別長）
- [ ] Scope 保持 "Run and build time"
- [ ] 點擊 "+ Add environment variable" 按鈕
- [ ] 看到變數已添加到列表中

---

## 🎯 完成後

添加完 5 個變數後：

1. **往下滾動**頁面
2. 繼續完成其他配置（如果有"Add a database"區域，可以點擊 "Attach DigitalOcean database" 選擇您剛創建的資料庫）
3. 到達頁面底部
4. 點擊 **"Next"** 或 **"Create Resources"** 按鈕
5. 等待部署完成（5-10 分鐘）

---

## ⚠️ 常見錯誤

### 錯誤 1：DATABASE_URL 太短
❌ `postgresql://localhost:5432/db`
✅ 必須是完整的 DigitalOcean 連接字串（很長，包含多個參數）

### 錯誤 2：域名格式錯誤
❌ `looperhq.hk`（缺少 https://）
❌ `https://looperhq.hk/`（多了結尾斜線）
✅ `https://looperhq.hk`

### 錯誤 3：Key 拼寫錯誤
❌ `NEXTAUTH_SECERT`（拼錯字）
❌ `nextauth_secret`（大小寫錯誤）
✅ `NEXTAUTH_SECRET`（完全一致）

### 錯誤 4：忘記點擊 Add 按鈕
輸入完 Key 和 Value 後，必須點擊 **"+ Add environment variable"** 按鈕，變數才會被添加！

---

## 💡 小技巧

### 技巧 1：快速複製
在終端機中複製這些值：
```
NEXTAUTH_SECRET: bjFDOHVzTmNLVWEwWU1qaG1icmsyTGlPRVg5dEozRlY=
NODE_ENV: production
```

### 技巧 2：檢查是否添加成功
每次點擊 "+ Add environment variable" 後，應該會看到：
- Key 和 Value 輸入框清空
- 上方出現剛添加的變數（可能顯示為 Key: ••••••）

### 技巧 3：如果域名還沒設定
暫時可以使用 DigitalOcean 提供的臨時域名：
```
https://[app-name]-[random].ondigitalocean.app
```
部署完成後再改回真實域名。

---

## 🚀 準備好了嗎？

**現在開始添加第 1 個變數：DATABASE_URL**

1. 在 "Key" 欄位輸入：`DATABASE_URL`
2. 在 "Value" 欄位貼上您的資料庫連接字串
3. 點擊 "+ Add environment variable"
4. 重複 4 次（添加剩餘 4 個變數）

**遇到問題？**
- 添加過程中卡住了？告訴我！
- 不確定某個值是否正確？給我看看！
- 點擊按鈕沒反應？描述一下情況！

加油！您快完成了！💪
