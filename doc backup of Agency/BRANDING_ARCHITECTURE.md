# Looper HQ - Nexus Platform
## 品牌與命名架構規範

> **制定日期**: 2026-02-06  
> **版本**: 1.0  
> **適用範圍**: 所有 Looper HQ 專案與產品

---

## 🏢 企業架構層級

```
┌─────────────────────────────────────────────────┐
│            Looper HQ (Company)                  │
│            企業品牌 & 願景                       │
└─────────────────┬───────────────────────────────┘
                  │
      ┌───────────┴──────────┐
      │                      │
┌─────▼──────────┐    ┌─────▼──────────┐
│ Nexus Platform │    │ Future Product │
│  核心企業框架   │    │   Lines        │
└─────┬──────────┘    └────────────────┘
      │
      ├── Legal Case Agency (法律案件管理系統) ✅ v2.0
      ├── Healthcare Module (醫療管理系統) 📋 Planned
      ├── Finance Module (財務管理系統) 📋 Planned
      └── Professional Services (專業服務模組) 📋 Future
```

---

## 📋 命名規範

### 1. 公司層級 (Company Level)

**名稱**: **Looper HQ**

**使用場景**:
- 公司官方文件
- 對外品牌宣傳
- 企業級合作文件
- 投資者報告

**範例**:
```
Looper HQ - Annual Report 2026
Looper HQ - Corporate Overview
Looper HQ - Brand Guidelines
```

---

### 2. 平台層級 (Platform Level)

**名稱**: **Nexus Platform**

**完整名稱**: **Looper HQ Nexus Platform**

**定位**: 
- 可重用的核心企業級框架
- 提供認證、多租戶、國際化等基礎設施
- 支撐所有垂直領域應用的技術基座

**命名原理**:
- **Nexus** (拉丁語) = 連接、中心、樞紐
- 象徵連接各專業領域的核心平台
- 國際化、專業化、易記易讀

**使用場景**:
- 技術架構文件
- 開發者文檔
- 平台級 API 文檔
- 技術合作洽談

**範例**:
```
Looper HQ Nexus Platform - Architecture Guide
Nexus Platform - API Reference
Nexus Platform - Developer Documentation
```

---

### 3. 應用層級 (Application Level)

#### 當前產品: Legal Case Agency

**完整名稱**: **Nexus Platform - Legal Case Agency**

**簡稱**: **Legal Case Agency** (在上下文明確時)

**定位**:
- 基於 Nexus Platform 的垂直領域應用
- 專為香港法律事務所設計的案件管理系統
- 展示 Nexus Platform 能力的旗艦產品

**使用場景**:
- 產品文檔
- 用戶手冊
- 行銷材料
- 客戶演示

**範例**:
```
Nexus Platform - Legal Case Agency User Guide
Legal Case Agency - Quick Start Guide
Legal Case Agency - Feature Overview
```

---

## 📦 技術命名規範

### Package 命名

**Scope**: `@looper-hq`

**格式**: `@looper-hq/nexus-[module]`

#### 核心 Packages

| Package Name | 用途 | 範圍 |
|--------------|------|------|
| `@looper-hq/nexus-legal` | Legal Case Agency 主應用 | Application |
| `@looper-hq/nexus-utils` | 共用工具函數庫 | Platform |
| `@looper-hq/nexus-types` | TypeScript 型別定義 | Platform |
| `@looper-hq/nexus-config` | 配置管理 | Platform |
| `@looper-hq/nexus-auth` | 認證模組 | Platform (Future) |
| `@looper-hq/nexus-ui` | UI 元件庫 | Platform (Future) |

#### 未來應用 Packages

| Package Name | 用途 | 狀態 |
|--------------|------|------|
| `@looper-hq/nexus-healthcare` | 醫療管理系統 | Planned |
| `@looper-hq/nexus-finance` | 財務管理系統 | Planned |
| `@looper-hq/nexus-education` | 教育管理系統 | Future |

---

### 目錄命名

**主專案目錄**: 

```
nexus-platform-legal/          # Legal Case Agency
nexus-platform-healthcare/     # Healthcare Module (future)
nexus-platform-finance/        # Finance Module (future)
```

**Monorepo 結構**:

```
nexus-platform-legal/
├── packages/
│   ├── nexus-utils/           # @looper-hq/nexus-utils
│   ├── nexus-types/           # @looper-hq/nexus-types
│   └── nexus-config/          # @looper-hq/nexus-config
├── app/                       # Next.js application
├── components/                # React components
└── lib/                       # Core libraries
```

---

### Git Repository 命名

**格式**: `Company/nexus-[vertical]-[optional-feature]`

**範例**:
```
JonazWong/nexus-legal              # Legal Case Agency
JonazWong/nexus-healthcare         # Healthcare Module
JonazWong/nexus-finance            # Finance Module
JonazWong/nexus-platform-core      # Platform core (if separated)
```

---

## 📄 文檔標題規範

### 公司級文檔

```
Looper HQ - [Document Type]

例如:
Looper HQ - Corporate Strategy 2026
Looper HQ - Brand Guidelines
Looper HQ - Annual Report
```

### 平台級文檔

```
Looper HQ Nexus Platform - [Document Type]

或簡稱:
Nexus Platform - [Document Type]

例如:
Looper HQ Nexus Platform - Architecture Overview
Nexus Platform - Developer Guide
Nexus Platform - API Reference
```

### 應用級文檔

```
Nexus Platform - [Application Name] - [Document Type]

或在上下文明確時:
[Application Name] - [Document Type]

例如:
Nexus Platform - Legal Case Agency - User Guide
Legal Case Agency - Quick Start
Legal Case Agency - Installation Guide
```

### 技術文檔

```
[Application/Module Name] - [Technical Topic]

例如:
Legal Case Agency - Database Schema
Legal Case Agency - API Documentation
Nexus Utils - Function Reference
```

---

## 🎨 視覺識別規範

### Logo 使用順序

1. **主要**: Looper HQ (公司 Logo)
2. **次要**: Nexus Platform (平台標識)
3. **產品**: Legal Case Agency / Healthcare / Finance (產品 Logo)

### 文件頁眉格式

```
┌─────────────────────────────────────────────┐
│  [Looper HQ Logo]                           │
│  Nexus Platform                             │
│  Legal Case Agency                          │
│                                             │
│  [Document Title]                           │
└─────────────────────────────────────────────┘
```

---

## 💼 對外溝通規範

### 電子郵件簽名

```
─────────────────────────
[Your Name]
[Position]

Looper HQ - Nexus Platform
Email: [email]@looper-hq.com
Web: www.looper-hq.com
─────────────────────────
```

### 產品介紹

**完整版**:
> "Legal Case Agency is built on Looper HQ's Nexus Platform, an enterprise-grade framework designed for professional services."

**簡短版**:
> "Legal Case Agency - Powered by Nexus Platform"

**技術版**:
> "Nexus Platform is Looper HQ's core enterprise framework. Legal Case Agency demonstrates its capabilities in the legal sector."

---

## 🔗 URL 與域名規範

### 域名結構

```
主域名: looper-hq.com
平台: nexus.looper-hq.com
產品:
  - legal.looper-hq.com (或 nexus-legal.looper-hq.com)
  - healthcare.looper-hq.com
  - finance.looper-hq.com
  
文檔:
  - docs.looper-hq.com
  - api.looper-hq.com
```

### API Endpoints

```
https://api.looper-hq.com/nexus/legal/...
https://api.looper-hq.com/nexus/healthcare/...
https://api.looper-hq.com/nexus/finance/...
```

---

## 📊 使用場景矩陣

| 場景 | 使用名稱 | 範例 |
|------|----------|------|
| 對外品牌宣傳 | Looper HQ | "Looper HQ - Transforming Professional Services" |
| 投資者簡報 | Looper HQ Nexus Platform | "Introducing Nexus Platform" |
| 技術文檔 | Nexus Platform | "Nexus Platform Architecture Guide" |
| 產品行銷 | Legal Case Agency | "Legal Case Agency - Case Management Reimagined" |
| 開發者文檔 | Nexus Platform / Legal Case Agency | "API Reference - Legal Case Agency" |
| 客戶合約 | Looper HQ Nexus Platform - Legal Case Agency | "Software License Agreement" |
| GitHub Repo | nexus-legal | "JonazWong/nexus-legal" |
| npm Package | @looper-hq/nexus-legal | "npm install @looper-hq/nexus-legal" |

---

## ✅ 實施檢查清單

更新專案時，請確保：

### 文件更新
- [ ] README.md 主標題使用完整架構
- [ ] package.json 使用正確的 `@looper-hq/nexus-*` 命名
- [ ] 所有技術文檔標題包含層級結構
- [ ] API 文檔反映 Nexus Platform 架構

### 代碼更新
- [ ] Import 語句使用 `@looper-hq/nexus-*`
- [ ] 註釋中提到正確的專案名稱
- [ ] 錯誤訊息使用適當的產品名稱

### 視覺更新
- [ ] 登入頁面顯示正確的品牌層級
- [ ] About 頁面說明平台與產品關係
- [ ] Footer 包含 Looper HQ 版權聲明

---

## 🚀 未來擴展範例

### 新產品命名流程

當開發新的垂直領域應用時：

1. **確定領域**: 例如 Healthcare（醫療）
2. **完整名稱**: Nexus Platform - Healthcare Management System
3. **簡稱**: Healthcare System
4. **Package**: `@looper-hq/nexus-healthcare`
5. **Repository**: `nexus-healthcare`
6. **目錄**: `nexus-platform-healthcare/`

### 文檔範例

```markdown
# Looper HQ - Nexus Platform
## Healthcare Management System

> **Platform**: Looper HQ → Nexus Platform → Healthcare Management System
> **Version**: 1.0

A comprehensive healthcare management solution built on the proven 
Nexus Platform architecture...
```

---

## 📞 聯絡資訊

**品牌相關問題**: brand@looper-hq.com  
**技術相關問題**: dev@looper-hq.com  
**一般查詢**: info@looper-hq.com

---

**文檔擁有者**: Looper HQ - Brand & Product Team  
**最後更新**: 2026-02-06  
**版本**: 1.0  
**狀態**: ✅ Active & Enforced
