# 🚀 DigitalOcean 資料庫初始化指南

## 📋 問題說明
登入按鈕沒反應是因為 DigitalOcean 的資料庫是**全新的空白資料庫**，沒有任何用戶資料！

## ✅ 解決方案：在 DigitalOcean Console 執行命令

---

## 步驟 1：打開 DigitalOcean Console

### 方法 A：從 App 頁面進入
1. 登入 DigitalOcean
2. 進入 **Apps** → **hk-legal-case-agency**
3. 點擊右上角的 **"Console"** 按鈕（像終端機的圖標）

### 方法 B：從 Components 進入
1. Apps → hk-legal-case-agency
2. 點擊 **Settings** 標籤
3. Components → **web** → 點擊 **Console**

---

## 步驟 2：等待 Console 載入

Console 打開後會顯示類似這樣：
```
Connecting to console...
Connected to web-xxx
root@web-xxx:/workspace#
```

---

## 步驟 3：執行初始化命令

### 🎯 複製貼上以下命令（全部一起）：

```bash
npx prisma db push --accept-data-loss && npx prisma db seed
```

### 或分開執行：

**命令 1：推送資料庫結構**
```bash
npx prisma db push --accept-data-loss
```

等待完成後...

**命令 2：建立種子資料**
```bash
npx prisma db seed
```

---

## 步驟 4：等待完成

您會看到類似的輸出：

```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database

🚀 Your database is now in sync with your Prisma schema ✓

✓ Generated Prisma Client

Running seed command...

🌱 Seeding database...
✓ Created demo firm: Wong & Associates (ID: ...)
✓ Created owner user: owner@wonglaw.hk
✓ Created staff user: staff@wonglaw.hk  
✓ Created clerk user: clerk@wonglaw.hk
✓ Created 5 demo cases
✓ Created 3 demo clients
✓ Seeding completed successfully! 🎉

The seed command has been executed.
```

---

## 步驟 5：測試登入

### 打開您的應用程式 URL
```
https://hk-legal-case-agency-xxxxx.ondigitalocean.app/login
```

### 使用測試帳號登入：

**Owner (擁有者) 帳號：**
- Email: `owner@wonglaw.hk`
- Password: `demo123456`

**Staff (職員) 帳號：**
- Email: `staff@wonglaw.hk`
- Password: `demo123456`

**Clerk (文員) 帳號：**
- Email: `clerk@wonglaw.hk`
- Password: `demo123456`

---

## 🎉 完成！

登入後您應該能看到：
- ✅ Dashboard 儀表板
- ✅ 5 個示範案件
- ✅ 3 個示範客戶
- ✅ 所有功能正常運作

---

## ⚠️ 常見問題

### Q1: Console 找不到或無法打開？
**答：** 確認應用程式狀態是 "Deployed" 而非 "Building"。等待部署完成。

### Q2: 命令執行失敗顯示 "DATABASE_URL not found"？
**答：** 檢查環境變數是否正確設置：
- Settings → Components → web → Environment Variables
- 確認 `DATABASE_URL` 存在且正確

### Q3: 顯示 "Can't reach database server"？
**答：** 檢查資料庫連接：
1. Databases → 您的 PostgreSQL → 確認狀態為 "Online"
2. Settings → Trusted Sources → 確認包含您的 app

### Q4: Seed 執行成功但仍無法登入？
**答：** 檢查瀏覽器 Console (F12) 的錯誤訊息，或查看 Runtime Logs。

### Q5: 想要清空資料重新開始？
**答：** 重新執行相同命令，`--accept-data-loss` 會清空並重建資料庫。

---

## 🔄 替代方案：註冊新帳號

如果您不想使用 seed，也可以：

1. 訪問 `/signup` 頁面
2. 填寫註冊表單
3. **第一個註冊的用戶會自動成為 OWNER 角色**
4. 開始使用！

---

## 📞 需要協助？

如果以上步驟無法解決問題：

1. **截圖 Console 的完整輸出**（包括錯誤訊息）
2. **截圖瀏覽器 Console (F12)** 的錯誤
3. **檢查 Runtime Logs** 的錯誤訊息
4. 提供這些截圖以便診斷

---

**製作時間：** 2026年2月9日  
**適用版本：** HK Legal Case Agency v2.0.0
