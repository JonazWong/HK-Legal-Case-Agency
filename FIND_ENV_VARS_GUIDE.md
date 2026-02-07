# 🔍 DigitalOcean App Platform - 環境變數設定位置指南

## 📍 快速定位

### 情況 A：正在創建 App（多步驟流程）

```
步驟流程：
┌─────────────────────────────────────────┐
│ 1. Select Source (選擇 GitHub repo)    │
│    ✓ 完成                               │
├─────────────────────────────────────────┤
│ 2. Resources (配置資源)                │
│    ✓ 完成                               │
├─────────────────────────────────────────┤
│ 3. Environment Variables ← 您在這裡！   │  👈 就在這裡！
│    ⭐ 添加環境變數                       │
│    📋 看到 "Add Environment Variable"  │
├─────────────────────────────────────────┤
│ 4. Info (應用資訊)                      │
├─────────────────────────────────────────┤
│ 5. Review (檢查並創建)                 │
└─────────────────────────────────────────┘
```

**尋找關鍵字**：
- ✅ "Environment Variables"
- ✅ "Add Environment Variable" 按鈕
- ✅ "Global" 或 "Component-level" 環境變數選項

**操作步驟**：
1. 找到 "Environment Variables" 步驟（通常在 Resources 後面）
2. 點擊 **"Add Environment Variable"** 或 **"+ Add Variable"**
3. 會出現兩個輸入框：
   ```
   Key:   [輸入變數名稱]
   Value: [輸入變數值]
   ```
4. 填寫後點 **"Add"** 或 **"Save"**
5. 重複 5 次（添加 5 個變數）
6. 都添加完後，點擊頁面底部的 **"Next"** 或 **"Continue"**

---

### 情況 B：App 已創建完成

```
App 主頁面導航：
┌─────────────────────────────────────────────────┐
│  HK-Legal-Case-Agency (您的 App 名稱)          │
├─────────────────────────────────────────────────┤
│  [Overview] [Settings] [Logs] [Console] ...    │  👈 點擊 Settings
└─────────────────────────────────────────────────┘

Settings 頁面：
┌─────────────────────────────────────────────────┐
│  ⚙️ Settings                                    │
│                                                 │
│  📦 Components                                  │
│  ┌──────────────────────────────────────────┐  │
│  │ web                              [Edit]  │  │  👈 點擊 Edit
│  │ Type: Web Service                        │  │
│  │ Source: GitHub                           │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  🗄️ Database                                   │
│  ...                                            │
└─────────────────────────────────────────────────┘

編輯 Component 頁面：
┌─────────────────────────────────────────────────┐
│  Edit web                                       │
│                                                 │
│  📄 Build Configuration                         │
│  ...                                            │
│                                                 │
│  🔐 Environment Variables            [Edit]    │  👈 點擊 Edit
│  ┌──────────────────────────────────────────┐  │
│  │ No environment variables configured      │  │
│  │                                          │  │
│  │ [+ Add Variable]                         │  │  👈 點這裡！
│  └──────────────────────────────────────────┘  │
│                                                 │
│  [Cancel]                            [Save]    │
└─────────────────────────────────────────────────┘
```

**操作步驟**：
1. 進入 App 主頁面（https://cloud.digitalocean.com/apps）
2. 點擊您的 App 名稱（例如：HK-Legal-Case-Agency）
3. 點擊上方的 **"Settings"** 頁籤
4. 往下滾動，找到 **"Components"** 區域
5. 看到 **"web"** component，點擊旁邊的 **"Edit"** 按鈕
6. 在彈出頁面中，找到 **"Environment Variables"** 區域
7. 點擊 **"Edit"** 或 **"+ Add Variable"**
8. 開始添加環境變數

---

## ✏️ 添加環境變數的具體操作

### 方式 1：逐個添加（推薦）

找到 "Add Environment Variable" 後：

```
┌────────────────────────────────────────┐
│ Add Environment Variable               │
├────────────────────────────────────────┤
│ Key:   DATABASE_URL                    │
│ Value: postgresql://doadmin:AVNS...   │
│                                        │
│         [Cancel]        [Add] ───► 點這裡
└────────────────────────────────────────┘
```

**第 1 個變數**：
```
Key:   DATABASE_URL
Value: [貼上您的資料庫連接字串]
```
示例：
```
postgresql://doadmin:AVNS_xxxxx@db-postgresql-sgp1-75753-do-user-32973725-0.j.db.ondigitalocean.com:25060/defaultdb?sslmode=require&connection_limit=5&pool_timeout=10&connect_timeout=10
```

**第 2 個變數**：
```
Key:   NEXTAUTH_SECRET
Value: bjFDOHVzTmNLVWEwWU1qaG1icmsyTGlPRVg5dEozRlY=
```

**第 3 個變數**：
```
Key:   NEXTAUTH_URL
Value: https://looperhq.hk
```
（改成您的域名）

**第 4 個變數**：
```
Key:   NEXT_PUBLIC_APP_URL
Value: https://looperhq.hk
```
（與第 3 個相同）

**第 5 個變數**：
```
Key:   NODE_ENV
Value: production
```

### 方式 2：批量編輯（如果有 "Bulk Edit" 選項）

有些頁面可能有 "Bulk Edit" 或 "Edit as Text" 選項：

```
DATABASE_URL=postgresql://doadmin:AVNS_xxxxx@db-postgresql-sgp1-75753-do-user-32973725-0.j.db.ondigitalocean.com:25060/defaultdb?sslmode=require&connection_limit=5&pool_timeout=10
NEXTAUTH_SECRET=bjFDOHVzTmNLVWEwWU1qaG1icmsyTGlPRVg5dEozRlY=
NEXTAUTH_URL=https://looperhq.hk
NEXT_PUBLIC_APP_URL=https://looperhq.hk
NODE_ENV=production
```

然後點擊 **"Save"**。

---

## 🔍 常見位置關鍵指標

### 您應該看到的關鍵字

✅ **正確的位置標記**：
- "Environment Variables"
- "Add Environment Variable"
- "Component-level variables"
- "Global variables"
- Key / Value 輸入框

❌ **錯誤的位置**：
- 如果只看到 "GitHub Settings" → 這是 repo 設定，不對
- 如果只看到 "Billing" → 這是帳單頁面，不對
- 如果只看到 "Databases" → 這是資料庫頁面，不對

---

## 🆘 疑難排解

### 問題 1：找不到 "Add Environment Variable" 按鈕

**可能原因**：
- 您在錯誤的頁面
- 需要往下滾動頁面
- 需要先點擊 "Edit" 按鈕

**解決方法**：
1. 確認您在 **Settings → Components → web** 頁面
2. 找到 **"Environment Variables"** 標題
3. 點擊該區域的 **"Edit"** 按鈕
4. 才會出現 "Add Variable" 選項

### 問題 2：創建流程中沒有 "Environment Variables" 步驟

**可能原因**：
- DigitalOcean 介面更新
- 某些流程會跳過此步驟

**解決方法**：
1. 先完成 App 創建
2. 創建後再進入 Settings 添加環境變數
3. 這樣更安全，可以慢慢檢查

### 問題 3：添加後看不到變數

**可能原因**：
- 沒有點擊 "Save" 儲存
- 頁面沒有重新整理

**解決方法**：
1. 確保點擊最下方的 **"Save"** 按鈕
2. 等待頁面顯示 "Saved successfully"
3. 重新整理頁面確認變數已存在

---

## 📸 視覺化參考

### 創建流程中的環境變數頁面

```
┌───────────────────────────────────────────────────────────┐
│  Create App from GitHub Repository                        │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Steps: ①Source ②Resources ③Environment ④Info ⑤Review│  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  Environment Variables                                     │
│  ─────────────────────────────────────────────────────     │
│                                                            │
│  Add environment variables for your app:                  │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  No variables added yet                               │ │
│  │                                                        │ │
│  │  [+ Add Environment Variable]  ←── 點這裡！           │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  Learn more about environment variables                   │
│                                                            │
│  [Back]                                      [Next] ────► │
└───────────────────────────────────────────────────────────┘
```

### Settings 頁面中的環境變數區域

```
┌───────────────────────────────────────────────────────────┐
│  hk-legal-case-agency                                      │
│  [Overview] [Settings] [Logs] [Deployments] [Console]     │
├───────────────────────────────────────────────────────────┤
│  ⚙️  Settings                                             │
│                                                            │
│  Components                                                │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  📦 web                                      [Edit] ──┼─┤ 點這裡
│  │  Type: Web Service                                    │ │
│  │  Instance Size: Basic                                 │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  ... (其他設定)                                           │
└───────────────────────────────────────────────────────────┘

點擊 [Edit] 後：
┌───────────────────────────────────────────────────────────┐
│  Edit web Component                                        │
│                                                            │
│  Source                                                    │
│  GitHub: JonazWong/HK-Legal-Case-Agency                   │
│                                                            │
│  Build Configuration                                       │
│  ...                                                       │
│                                                            │
│  🔐 Environment Variables                       [Edit] ──┐ │ 點這裡
│  ┌──────────────────────────────────────────────────────┐ │
│  │  DATABASE_URL          ••••••••••••••••••••••••••••  │ │
│  │  NEXTAUTH_SECRET       ••••••••••••••••••••••••••••  │ │
│  │  ...                                                  │ │
│  │                                                        │ │
│  │  [+ Add Variable]  ←── 或點這裡添加更多              │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  [Cancel]                                        [Save]   │
└───────────────────────────────────────────────────────────┘
```

---

## ✅ 確認清單

添加完環境變數後，確認以下內容：

- [ ] DATABASE_URL 已添加（value 很長，包含 postgresql://）
- [ ] NEXTAUTH_SECRET 已添加（value: bjFDOH...）
- [ ] NEXTAUTH_URL 已添加（value: https://您的域名）
- [ ] NEXT_PUBLIC_APP_URL 已添加（value: https://您的域名）
- [ ] NODE_ENV 已添加（value: production）
- [ ] 已點擊 **"Save"** 儲存
- [ ] 看到成功訊息或頁面已重新整理
- [ ] App 已開始重新部署（如果已創建）

---

## 💡 還是找不到？

**請告訴我**：

1. **您現在在哪個頁面？**
   - 例如："我在一個有很多步驟的創建頁面"
   - 或："我在 App 的主頁面，看到 Overview, Settings 等"

2. **您看到什麼按鈕或選項？**
   - 例如："我看到 Resources, Databases, Settings"
   - 或："我只看到 GitHub repository 的設定"

3. **頁面標題是什麼？**
   - 例如："Create App" 或 "App Settings"

4. **截圖或描述頁面內容**
   - 告訴我您看到的主要內容

我會根據您的描述提供精確指引！🎯

---

**最後提醒**：
- ⏰ 設定環境變數後，App 會自動重新部署（5-10 分鐘）
- 💾 務必點擊 **"Save"** 儲存，否則變數不會生效
- 🔐 DATABASE_URL 和 NEXTAUTH_SECRET 會自動隱藏（顯示為 ••••），這是正常的安全機制
