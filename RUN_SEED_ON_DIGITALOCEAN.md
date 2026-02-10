# 在 DigitalOcean 執行資料庫 Seed

## 問題
登入頁面按鈕沒反應，因為資料庫是空的，沒有測試用戶。

## 解決方法

### 方法 1：使用 DigitalOcean Console (推薦)

1. **進入 App Platform**
   - Apps → hk-legal-case-agency

2. **打開 Console**
   - 點擊右上角 **Console** 按鈕
   - 或 Settings → Components → web → **Console**

3. **執行 Seed 命令**
   ```bash
   npm run prisma:seed
   ```

4. **等待完成**
   ```
   ✓ Seeding completed successfully
   Created demo firm: Wong & Associates
   Created users: owner@wonglaw.hk, staff@wonglaw.hk
   ```

5. **測試登入**
   - Email: `owner@wonglaw.hk`
   - Password: `demo123456`

---

### 方法 2：透過 build_command 自動執行 (永久修復)

修改 `.do/app.yaml`：

```yaml
services:
  - name: web
    build_command: |
      npm install && 
      npx prisma generate && 
      npx prisma db push --accept-data-loss &&
      npx prisma db seed &&
      npm run build
```

**注意：** 這會在每次部署時重置資料庫！只適合開發環境。

---

### 方法 3：使用一次性執行命令

1. **DigitalOcean App Platform** → **Components** → **web**

2. **點擊 "Run Command"**

3. **輸入命令**：
   ```bash
   npx prisma db push && npx prisma db seed
   ```

4. **執行並等待完成**

---

## 驗證資料庫連接

如果 Seed 失敗，檢查：

### 1. DATABASE_URL 是否正確

Settings → Components → web → Environment Variables

確認：
```
DATABASE_URL = postgresql://doadmin:AVNS_xxxxx@db-xxx.ondigitalocean.com:25060/defaultdb?sslmode=require&connection_limit=5&pool_timeout=10
```

### 2. 資料庫是否在運行

Databases → 你的 PostgreSQL → 確認狀態為 **Online**

### 3. Trusted Sources

Databases → 你的 PostgreSQL → Settings → Trusted Sources

確認包含：
- ✅ `hk-legal-case-agency` app

---

## 測試帳號

Seed 成功後，可用這些帳號登入：

**Firm Owner (律所擁有者):**
- Email: `owner@wonglaw.hk`
- Password: `demo123456`
- Role: OWNER
- 權限：完整管理權限

**Staff (職員):**
- Email: `staff@wonglaw.hk`
- Password: `demo123456`
- Role: STAFF
- 權限：一般操作權限

**Clerk (文員):**
- Email: `clerk@wonglaw.hk`
- Password: `demo123456`
- Role: CLERK
- 權限：有限權限

---

## 如果仍然無法登入

### 檢查瀏覽器 Console

1. 按 F12 打開開發者工具
2. 切換到 **Console** 標籤
3. 點擊登入按鈕
4. 查看錯誤訊息

### 檢查 Runtime Logs

1. Apps → hk-legal-case-agency
2. **Runtime Logs** 標籤
3. 點擊登入時查看即時日誌
4. 尋找錯誤訊息：
   - Database connection errors
   - Authentication errors
   - API errors

### 常見錯誤

**錯誤 1: "PrismaClientInitializationError"**
- 原因：DATABASE_URL 不正確
- 解決：檢查環境變數格式

**錯誤 2: "Invalid credentials"**
- 原因：資料庫沒有種子資料
- 解決：執行 `npm run prisma:seed`

**錯誤 3: "Can't reach database"**
- 原因：資料庫未加入 Trusted Sources
- 解決：在資料庫設定中添加 app

---

## 註冊新帳號（替代方案）

如果不想用 seed，可以直接註冊新帳號：

1. 訪問 `/signup` 頁面
2. 填寫資料：
   - Full Name: 你的名字
   - Email: 你的 email
   - Firm Name: 律所名稱
   - Password: 至少 8 字元
3. 點擊 "Create Account"
4. 自動登入並導向 dashboard

**注意：** 第一個註冊的用戶會自動成為 OWNER 角色。

---

## 完成！

執行 seed 後，應該能夠：
✅ 使用 `owner@wonglaw.hk` 登入
✅ 看到 dashboard
✅ 查看 demo 案件和客戶
✅ 測試所有功能
