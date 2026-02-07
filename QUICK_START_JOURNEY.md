# 🚀 立即開始體驗
# Quick Start - User Journey

**5 分鐘開始體驗完整流程**

---

## ✅ 系統狀態

```bash
✅ 測試通過:        69/69 (100%)
✅ 套件建置:        @looper-hq/nexus-utils + nexus-types
✅ 品牌架構:        完整實施
✅ 開發伺服器:      準備中...
```

---

## 🎯 立即啟動

### 步驟 1: 啟動開發伺服器

在終端機執行：

```bash
npm run dev
```

稍等片刻，當您看到：

```
✓ Ready in XXXms
  ○ Local:   http://localhost:3000
  ○ Network: http://192.168.x.x:3000
```

代表伺服器已經啟動成功！

### 步驟 2: 開啟瀏覽器

點擊或複製此連結：

```
http://localhost:3000
```

---

## 🎬 開始您的旅程

### 選項 A: 使用 Demo 帳號登入（推薦）

**最快體驗方式**：

1. 點擊登陸頁的「登入」按鈕
2. 使用以下帳號：

```
管理員帳號
Email:    owner@wonglaw.hk
Password: demo123456

律師帳號
Email:    lawyer@wonglaw.hk
Password: demo123456
```

3. 立即進入儀表板，查看範例資料！

### 選項 B: 註冊新帳號

**完整體驗流程**：

1. 點擊「14天免費試用」
2. 填寫註冊表單
3. 建立您的事務所帳號
4. 從零開始探索功能

---

## 📖 完整指南

詳細的體驗指南請參考：

**[USER_JOURNEY_GUIDE.md](USER_JOURNEY_GUIDE.md)**

包含：
- 🎨 登陸頁完整介紹
- 📝 註冊流程詳解
- 🔐 登入體驗說明
- 📊 儀表板導覽
- 🔍 所有功能模組說明
- ✅ 體驗檢查清單

---

## 🎯 核心功能預覽

完成登入後，您可以探索：

### 1. 案件管理 📁
```
http://localhost:3000/cases
```
- 查看範例案件
- 新增個案檔案（自動生成內部檔案編號）
- 編輯案件詳情

### 2. 客戶管理 👥
```
http://localhost:3000/clients
```
- 瀏覽客戶列表
- 新增客戶資料
- 查看客戶關聯案件

### 3. 公開案件搜尋 🔍
```
http://localhost:3000/public-search
```
- AI 智能搜尋香港判例
- 整合 HKLii + 司法機構資料
- 自動案件編號連結

### 4. 儀表板總覽 📊
```
http://localhost:3000/dashboard
```
- 案件統計
- 客戶統計
- 財務概覽

---

## ⚠️ 重要提醒

### 檔案編號 vs 案件編號

系統自動生成的 `HCA-2026-XXX` 是**檔案編號**（File Number），用於內部管理。

只有香港司法機構才能分配正式的**案件編號**（Court Case Number，如 `HCCC 123/2023`）。

詳見：[法律合規說明](docs/LEGAL_COMPLIANCE_FILE_NUMBER.md)

---

## 🐛 遇到問題？

### 伺服器無法啟動

```bash
# 檢查是否有其他服務佔用 3000 port
netstat -ano | findstr :3000

# 或者使用其他 port
PORT=3001 npm run dev
```

### 沒有範例資料

```bash
# 重置資料庫並載入範例資料
npm run db:setup
```

### 登入失敗

確認：
- Email 格式正確
- 密碼至少 8 字元
- 包含大小寫字母、數字、特殊符號

使用 demo 帳號：`owner@wonglaw.hk / demo123456`

---

## 📊 體驗路徑建議

### 🏃‍♂️ 快速體驗 (10 分鐘)

```
1. 登入 demo 帳號
   ↓
2. 瀏覽儀表板
   ↓
3. 查看現有案件
   ↓
4. 試用公開搜尋
   ↓
5. 切換語言 (中/英)
```

### 🚶‍♂️ 完整體驗 (30 分鐘)

```
1. 從登陸頁開始
   ↓
2. 註冊新帳號
   ↓
3. 新增第一個檔案
   ↓
4. 新增客戶資料
   ↓
5. 記錄時間
   ↓
6. 探索所有模組
   ↓
7. 查看個人設定
```

### 🧑‍💼 角色體驗 (15 分鐘 x 3)

分別用三個 demo 帳號登入，體驗不同角色的權限：

```
👔 OWNER (owner@wonglaw.hk)
   - 完整管理權限
   - 事務所設定
   - 用戶管理

⚖️ LAWYER (lawyer@wonglaw.hk)
   - 案件與客戶
   - 時間記錄
   - 有限報表

📋 STAFF (staff@wonglaw.hk)
   - 協助案件管理
   - 文件處理
   - 基本功能
```

---

## 🎓 學習資源

### 技術文件
- [ARCHITECTURE.md](ARCHITECTURE.md) - 系統架構
- [API.md](API.md) - API 規範
- [DEVELOPMENT.md](docs/DEVELOPMENT.md) - 開發指南

### 品牌與合規
- [BRANDING_ARCHITECTURE.md](BRANDING_ARCHITECTURE.md) - 品牌架構
- [LEGAL_COMPLIANCE_FILE_NUMBER.md](docs/LEGAL_COMPLIANCE_FILE_NUMBER.md) - 法律合規

### 測試報告
- [TEST_FIX_REPORT.md](TEST_FIX_REPORT.md) - 測試修復
- [BRANDING_VERIFICATION_REPORT.md](BRANDING_VERIFICATION_REPORT.md) - 品牌驗證

---

## 💡 專業提示

### 資料持久性

目前使用開發資料庫，所有變更會保留。如需重置：

```bash
npm run db:setup
```

### 多語言切換

在任何頁面：
- 英文：URL 加上 `/en/` 前綴
- 中文：URL 加上 `/zh/` 前綴或無前綴

範例：
```
http://localhost:3000/cases      (中文)
http://localhost:3000/zh/cases   (中文)
http://localhost:3000/en/cases   (英文)
```

### 快捷操作

- **搜尋案件**: 直接在列表頁輸入關鍵字
- **快速建立**: 點擊 ➕ 按鈕
- **返回列表**: 點擊 ← 按鈕

---

## 🎉 準備好了嗎？

1. ✅ 確認開發伺服器運行中
2. 🌐 開啟瀏覽器訪問 `http://localhost:3000`
3. 🚀 開始您的探索之旅！

**祝您體驗愉快！**

---

*有問題？查看 [USER_JOURNEY_GUIDE.md](USER_JOURNEY_GUIDE.md) 完整指南*

*Powered by: **Looper HQ** → **Nexus Platform** → **Legal Case Agency***
