# ✅ 部署檢查清單

## 🎯 當前狀態

✅ **已完成：**
1. 創建 `.do/app.yaml` 配置文件
2. 提交並推送到 GitHub
3. DigitalOcean 會自動偵測配置

⏳ **待完成：**
1. 設定環境變數（4 個）
2. 觀察部署進度
3. 驗證部署成功

---

## 📋 完整檢查清單

### 步驟 1：等待 DigitalOcean 偵測 ⏳ (自動，約 30 秒)

- [ ] 前往 DigitalOcean App 頁面
- [ ] 點擊 "Deployments" 頁籤
- [ ] 看到新的部署開始（狀態：🟡 Building）

**如果 5 分鐘內沒看到新部署：**
1. 重新整理頁面 (F5)
2. 檢查 GitHub 確認 `.do/app.yaml` 已推送
3. 如果仍然沒有，請告訴我

---

### 步驟 2：設定環境變數 ⚠️ (必須手動設定)

**位置：** Settings → Components → web → Environment Variables

#### 必須設定的 4 個變數：

**參考檔案：** 開啟 `ENV_VARS_QUICK_REFERENCE.md` 查看完整值

| # | Key | Value | 從哪裡取得 |
|---|-----|-------|-----------|
| 1 | `DATABASE_URL` | `postgresql://doadmin:AVNS_...` | DigitalOcean 資料庫連接字串 + `?sslmode=require&connection_limit=5` |
| 2 | `NEXTAUTH_SECRET` | `bjFDOHVzTmNLVWEwWU1qaG1icmsyTGlPRVg5dEozRlY=` | ENV_VARS_QUICK_REFERENCE.md |
| 3 | `NEXTAUTH_URL` | `https://[您的域名]` | 您申請的域名 |
| 4 | `NEXT_PUBLIC_APP_URL` | `https://[您的域名]` | 與 NEXTAUTH_URL 相同 |

#### 設定步驟：

- [ ] 1. 前往 Settings 頁面
- [ ] 2. 找到 "Environment Variables" 區域
- [ ] 3. 點擊 "Edit" 或 "+ Add"
- [ ] 4. 逐一添加 4 個變數
- [ ] 5. 點擊 "Save"
- [ ] 6. DigitalOcean 會自動觸發重新部署

**注意：** 
- DATABASE_URL 必須包含 `?sslmode=require&connection_limit=5&pool_timeout=10`
- 域名不要加結尾的 `/`
- 大小寫敏感，請精確複製

---

### 步驟 3：觀察第一次構建 🔍 (會失敗，正常)

**預期結果：** 第一次構建會失敗（因為還沒設定環境變數）

**觀察構建日誌：**
- [ ] 點擊 "Deployments" 頁籤
- [ ] 點擊最新的部署
- [ ] 查看構建日誌

**應該會看到：**
```
✅ Running build command: npx prisma generate && npm run build
   ↑ 這表示配置文件生效了！

❌ Error: Environment variable not found: DATABASE_URL
   ↑ 這是正常的，因為還沒設定環境變數
```

**✅ 關鍵成功標誌：**
如果看到 `Running build command: npx prisma generate && npm run build`，
表示 `.do/app.yaml` 已經生效！問題已解決一半！

---

### 步驟 4：設定環境變數後觀察第二次構建 🚀 (應該成功)

**設定環境變數後，DigitalOcean 會自動重新部署**

**觀察構建日誌：**
- [ ] 點擊 "Deployments" 頁籤
- [ ] 點擊最新的部署（設定環境變數後觸發的）
- [ ] 查看構建日誌

**應該會看到（成功）：**
```
✓ Installing dependencies
✓ Running build command: npx prisma generate && npm run build
✓ Generating Prisma Client
✓ Compiled successfully
✓ Build completed
✓ Deploying...
✓ Deployment successful
```

**時間估計：** 5-10 分鐘

---

### 步驟 5：驗證部署成功 🎉

**檢查項目：**

- [ ] 1. Deployments 頁籤顯示：✅ Deployed
- [ ] 2. Overview 頁籤顯示：🟢 Active
- [ ] 3. 應用程式 URL 可以訪問
- [ ] 4. 登入功能正常運作

**測試訪問：**
1. 複製 App URL（在 Overview 頁面）
2. 在瀏覽器開啟
3. 應該看到登入頁面
4. 測試登入：`owner@wonglaw.hk / demo123456`

---

## 📊 時間線總覽

```
現在 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━> 完成
 │
 ├─ +30秒: DigitalOcean 偵測配置文件
 │
 ├─ +1分鐘: 觸發第一次部署（會失敗）
 │
 ├─ +3分鐘: 看到錯誤訊息（缺少環境變數）
 │
 ├─ 手動設定環境變數（您需要操作，5 分鐘）
 │
 ├─ +1分鐘: 自動觸發第二次部署
 │
 ├─ +5-10分鐘: 構建完成
 │
 └─ ✅ 部署成功！可以訪問應用程式
```

**總計時間：** 15-20 分鐘（包含等待時間）

---

## 🆘 故障排除

### 問題 1：5 分鐘後仍沒看到新的部署

**可能原因：**
- GitHub 推送未成功
- DigitalOcean 緩存問題

**解決方法：**
1. 檢查 GitHub：https://github.com/JonazWong/HK-Legal-Case-Agency
2. 確認 `.do/app.yaml` 文件存在
3. 重新整理 DigitalOcean 頁面
4. 點擊 "Force Rebuild and Deploy"

---

### 問題 2：構建日誌沒有看到 "npx prisma generate"

**可能原因：**
- DigitalOcean 仍使用自動檢測
- app.yaml 格式錯誤

**解決方法：**
1. 檢查 `.do/app.yaml` 文件內容
2. 確認 `build_command` 欄位正確
3. 嘗試刪除 App 重新創建

---

### 問題 3：設定環境變數後仍然失敗

**可能原因：**
- 環境變數值不正確
- DATABASE_URL 缺少 `?sslmode=require`

**解決方法：**
1. 對照 `ENV_VARS_QUICK_REFERENCE.md` 檢查每個變數
2. 確認 DATABASE_URL 包含參數：
   - `?sslmode=require`
   - `&connection_limit=5`
   - `&pool_timeout=10`
3. 確認 NEXTAUTH_SECRET 完全一致（大小寫敏感）

---

### 問題 4：構建成功但無法訪問

**可能原因：**
- 資料庫連接問題
- NextAuth 設定問題

**解決方法：**
1. 點擊 "Runtime Logs" 查看錯誤訊息
2. 檢查 DATABASE_URL 連接是否正確
3. 確認 NEXTAUTH_URL 與實際域名一致

---

## 📞 需要協助時，請提供：

如果遇到問題，請告訴我：

1. **當前階段：** 您在哪個步驟？
2. **看到的訊息：** 錯誤訊息完整內容
3. **已完成的步驟：** 哪些步驟已完成？
4. **截圖：** 如果可以的話

我會根據您的情況提供精確的解決方案！

---

## ✅ 最終驗證清單

**部署完全成功的標誌：**

- [ ] ✅ Deployments 顯示：Deployed
- [ ] 🟢 Overview 顯示：Active
- [ ] 🌐 App URL 可以訪問
- [ ] 🔐 登入頁面正常顯示
- [ ] 📊 儀表板可以進入
- [ ] 💾 資料庫連接正常

**如果以上全部✅，恭喜您部署成功！** 🎉

---

**下一步：**
1. 設定自定義域名（如果需要）
2. 配置 SSL 證書（DigitalOcean 自動提供）
3. 開始使用您的應用程式！
