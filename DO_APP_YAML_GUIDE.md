# .do/app.yaml 配置文件使用指南

## ✅ 已完成

**配置文件已創建：** `.do/app.yaml`

這個文件告訴 DigitalOcean 如何正確構建和部署您的 Next.js 應用程式。

---

## 🎯 這個文件做了什麼？

### 自動修復構建問題
```yaml
build_command: npx prisma generate && npm run build
```
- ✅ 強制先執行 `prisma generate`（生成 Prisma Client）
- ✅ 然後執行 `npm run build`（構建 Next.js）
- ✅ 覆蓋 DigitalOcean 的自動檢測（不再誤判為 monorepo）

### 定義運行配置
```yaml
run_command: npm start
output_dir: .next
environment_slug: node-js
```

### 環境變數引用
配置文件**引用**了 5 個環境變數（但不包含實際值，因為敏感資訊不能硬編碼）：
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_APP_URL`
- `NODE_ENV`

---

## 🚀 下一步驟

### 步驟 1：提交並推送到 GitHub ✅（即將執行）

我會幫您執行：
```bash
git add .do/
git commit -m "Add DigitalOcean app configuration"
git push origin main
```

### 步驟 2：DigitalOcean 自動偵測 ⏳（自動）

推送後，DigitalOcean 會：
1. 偵測到 `.do/app.yaml` 文件
2. 讀取配置
3. **使用您定義的 Build Command**（不再自動檢測）
4. 自動觸發重新部署

### 步驟 3：設定環境變數 ⚠️（您需要手動執行）

**配置文件只是"引用"環境變數，實際的值仍需在 DigitalOcean UI 中設定！**

前往：`Settings → Components → web → Environment Variables`

設定以下 5 個變數（參考 `ENV_VARS_QUICK_REFERENCE.md`）：

| Key | Value | 檔案參考 |
|-----|-------|---------|
| `DATABASE_URL` | `postgresql://doadmin:...` | ENV_VARS_QUICK_REFERENCE.md |
| `NEXTAUTH_SECRET` | `bjFDOHVzTmNLVWEwWU1qaG1icmsyTGlPRVg5dEozRlY=` | ENV_VARS_QUICK_REFERENCE.md |
| `NEXTAUTH_URL` | `https://[您的域名]` | 您的實際域名 |
| `NEXT_PUBLIC_APP_URL` | `https://[您的域名]` | 與上面相同 |
| `NODE_ENV` | `production` | 已在 app.yaml 設定 |

**注意：** `NODE_ENV` 已經在 `app.yaml` 中設定為 `production`，其他 4 個需要手動設定。

---

## 📊 部署時間線

```
現在：推送 .do/app.yaml 到 GitHub
 ↓
+30秒：DigitalOcean 偵測到變更
 ↓
+1分鐘：開始新的部署
 ↓
+2-3分鐘：安裝依賴 (npm install)
 ↓
+3-4分鐘：生成 Prisma Client (npx prisma generate) ✅
 ↓
+4-6分鐘：構建 Next.js (npm run build) ✅
 ↓
+7-10分鐘：部署完成 ✅
```

---

## ✅ 成功標誌

**構建日誌中會看到：**
```
→ Running build command: npx prisma generate && npm run build
✓ Generating Prisma Client
✓ Compiled successfully
✓ Build completed
```

**如果沒有設定環境變數，會看到錯誤：**
```
✗ Error: Environment variable not found: DATABASE_URL
```
→ 表示需要在 DigitalOcean UI 設定環境變數

---

## 🔄 與手動設定的差異

### 之前（手動設定）：
1. 進入 Settings → Components → web → Edit
2. 手動輸入 Build Command
3. 點擊 Save
4. **問題：** 找不到設定位置

### 現在（使用 app.yaml）：
1. 提交 `.do/app.yaml` 到 GitHub
2. DigitalOcean 自動讀取配置
3. **無需手動修改設定**
4. **但仍需設定環境變數**（敏感資訊不能硬編碼）

---

## 📝 配置文件說明

### 關鍵配置項

```yaml
# 專案名稱
name: hk-legal-case-agency

# 部署區域（新加坡）
region: sgp

# Web 服務配置
services:
  - name: web
    # GitHub 倉庫
    github:
      repo: JonazWong/HK-Legal-Case-Agency
      branch: main
      deploy_on_push: true  # 每次 push 自動部署
    
    # 🔥 關鍵：構建命令（修復 monorepo 誤判）
    build_command: npx prisma generate && npm run build
    
    # 運行命令
    run_command: npm start
    
    # 輸出目錄
    output_dir: .next
    
    # 環境類型
    environment_slug: node-js
    
    # 實例配置
    instance_count: 1
    instance_size_slug: basic-xxs
    
    # HTTP 端口
    http_port: 8080
    
    # 健康檢查
    health_check:
      http_path: /
      initial_delay_seconds: 30
```

---

## 🆘 常見問題

### Q: 為什麼環境變數沒有實際值？
**A:** 敏感資訊（如資料庫密碼、密鑰）不應該硬編碼在配置文件中。配置文件提交到 GitHub 是公開的，任何人都能看到。因此：
- 配置文件只**聲明**需要哪些環境變數
- 實際的**值**在 DigitalOcean UI 中設定（加密儲存）

### Q: 推送後 DigitalOcean 會立即部署嗎？
**A:** 是的！因為設定了 `deploy_on_push: true`，每次推送到 `main` 分支都會觸發自動部署。

### Q: 如果構建仍然失敗怎麼辦？
**A:** 檢查：
1. 環境變數是否都已設定（特別是 `DATABASE_URL`）
2. DATABASE_URL 是否包含 `?sslmode=require`
3. 查看構建日誌確認錯誤訊息

### Q: 我可以修改配置嗎？
**A:** 可以！直接編輯 `.do/app.yaml`，然後提交推送即可。DigitalOcean 會讀取最新的配置。

---

## 📞 需要協助？

如果推送後：
1. **30 分鐘內沒有看到新的部署** → DigitalOcean 可能沒有偵測到，請告訴我
2. **構建失敗並顯示環境變數錯誤** → 需要在 UI 設定環境變數
3. **仍然出現 "Missing project.yml" 錯誤** → 需要進一步診斷

---

## ✨ 優點總結

使用 `.do/app.yaml` 的好處：
- ✅ **版本控制**：配置文件在 Git 中，可追蹤修改歷史
- ✅ **團隊協作**：團隊成員可以看到部署配置
- ✅ **可重現**：刪除並重建 App 時，配置自動套用
- ✅ **避免手動錯誤**：不需要在 UI 中手動輸入命令
- ✅ **文檔化**：配置文件本身就是文檔
- ✅ **覆蓋自動檢測**：強制 DigitalOcean 使用您的配置

---

**準備好了嗎？接下來我會幫您提交並推送到 GitHub！** 🚀
