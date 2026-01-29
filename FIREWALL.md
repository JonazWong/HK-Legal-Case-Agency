# 防火牆配置指南 / Firewall Configuration Guide

本文檔說明 HK Legal Case Agency 系統在受限網路環境中運行所需的網路存取規則。

This document outlines the network access rules required to run HK Legal Case Agency in restricted network environments.

---

## 概覽 / Overview

如果您的開發或生產環境有防火牆限制，請確保允許以下連線，或按照相應的禁用說明操作。

If your development or production environment has firewall restrictions, ensure the following connections are allowed, or follow the respective disable instructions.

---

## 必要的外部連線 / Required External Connections

### 開發環境 / Development Environment

#### Prisma 遙測服務 / Prisma Telemetry Service
- **主機 / Host**: `checkpoint.prisma.io`
- **用途 / Purpose**: Prisma 的版本檢查和更新通知 / Prisma version checks and update notifications
- **是否必要 / Required**: ❌ 否 / No (可禁用 / Can be disabled)

**如何禁用 / How to Disable:**

此服務已在專案中預設禁用。確保您的 `.env` 檔案包含以下設定：

This service is disabled by default in the project. Ensure your `.env` file contains:

```env
CHECKPOINT_DISABLE=1
```

如果您使用的是 `.env.example` 範本，此設定已包含在內。

If you're using the `.env.example` template, this setting is already included.

#### Node.js 套件管理 / Node.js Package Management
- **主機 / Host**: `registry.npmjs.org`
- **用途 / Purpose**: 下載 Node.js 套件 / Downloading Node.js packages
- **是否必要 / Required**: ✅ 是 / Yes

### 系統套件管理 (Ubuntu/Debian) / System Package Management (Ubuntu/Debian)

如果您在 Ubuntu 或 Debian 系統上運行，以下套件源可能需要存取：

If running on Ubuntu or Debian systems, the following package sources may need access:

#### Ubuntu 標準套件源 / Ubuntu Standard Repositories
- **主機 / Hosts**:
  - `archive.ubuntu.com` - Ubuntu 主要套件源 / Main package repository
  - `security.ubuntu.com` - Ubuntu 安全更新源 / Security updates
  - `esm.ubuntu.com` - Ubuntu ESM 套件源 / Extended Security Maintenance packages
- **用途 / Purpose**: 系統套件安裝與更新 / System package installation and updates
- **是否必要 / Required**: ⚠️ 視系統配置而定 / Depends on system configuration

**注意事項 / Notes:**
- ESM (Extended Security Maintenance) 僅在訂閱 Ubuntu Pro 的系統上需要
- ESM (Extended Security Maintenance) is only needed on systems with Ubuntu Pro subscriptions
- 如果您的環境無法存取 ESM，您可以禁用此套件源而不影響專案功能
- If your environment cannot access ESM, you can disable this source without affecting project functionality

---

## 資料庫連線 / Database Connections

### PostgreSQL 資料庫 / PostgreSQL Database
- **主機 / Host**: 根據您的 `DATABASE_URL` 設定 / As per your `DATABASE_URL` configuration
- **連接埠 / Port**: 通常為 5432 / Typically 5432
- **是否必要 / Required**: ✅ 是 / Yes

確保您的防火牆允許應用程式伺服器與 PostgreSQL 資料庫之間的連線。

Ensure your firewall allows connections between the application server and PostgreSQL database.

---

## OAuth 提供者 (選用) / OAuth Providers (Optional)

如果您使用 OAuth 身份驗證，需要允許以下連線：

If using OAuth authentication, allow connections to:

### Google OAuth
- **主機 / Hosts**:
  - `accounts.google.com`
  - `oauth2.googleapis.com`
- **是否必要 / Required**: ⚠️ 僅在啟用 Google 登入時 / Only if Google login is enabled

### LinkedIn OAuth
- **主機 / Host**: `www.linkedin.com`
- **是否必要 / Required**: ⚠️ 僅在啟用 LinkedIn 登入時 / Only if LinkedIn login is enabled

---

## CI/CD 環境配置 / CI/CD Environment Configuration

### GitHub Actions

本專案的 GitHub Actions workflow 已配置禁用 Prisma 遙測。

The project's GitHub Actions workflow is configured to disable Prisma telemetry.

如果您需要在其他 CI/CD 環境中運行，請設定以下環境變數：

If running in other CI/CD environments, set the following environment variable:

```yaml
env:
  CHECKPOINT_DISABLE: 1
```

### Docker 環境 / Docker Environment

如果您使用 Docker 部署，請在 `Dockerfile` 或 `docker-compose.yml` 中新增：

If deploying with Docker, add to your `Dockerfile` or `docker-compose.yml`:

**Dockerfile:**
```dockerfile
ENV CHECKPOINT_DISABLE=1
```

**docker-compose.yml:**
```yaml
environment:
  - CHECKPOINT_DISABLE=1
```

---

## 疑難排解 / Troubleshooting

### Prisma 仍然嘗試連線到 checkpoint.prisma.io
### Prisma still tries to connect to checkpoint.prisma.io

1. 檢查 `.env` 檔案是否包含 `CHECKPOINT_DISABLE=1`
   
   Check if `.env` file contains `CHECKPOINT_DISABLE=1`

2. 確認環境變數已正確載入：
   
   Verify the environment variable is loaded:
   ```bash
   echo $CHECKPOINT_DISABLE
   ```

3. 重新啟動開發伺服器
   
   Restart the development server:
   ```bash
   npm run dev
   ```

### 套件安裝失敗 / Package Installation Fails

如果 `npm install` 失敗且出現網路錯誤：

If `npm install` fails with network errors:

1. 檢查是否可以存取 `registry.npmjs.org`
   
   Check if you can access `registry.npmjs.org`

2. 考慮設定 npm 代理或使用私有 registry
   
   Consider configuring npm proxy or using a private registry:
   ```bash
   npm config set registry https://your-private-registry.com
   ```

### Ubuntu ESM 錯誤 / Ubuntu ESM Errors

如果看到關於 ESM 的錯誤但您沒有 Ubuntu Pro 訂閱：

If seeing ESM errors but you don't have Ubuntu Pro subscription:

1. 禁用 ESM 套件源：
   
   Disable ESM repositories:
   ```bash
   sudo mv /etc/apt/sources.list.d/ubuntu-esm-*.list /etc/apt/sources.list.d/ubuntu-esm-*.list.disabled
   ```

2. 更新套件清單：
   
   Update package lists:
   ```bash
   sudo apt update
   ```

---

## 最小權限原則 / Principle of Least Privilege

建議僅開放必要的連線，並根據您的部署環境調整防火牆規則：

We recommend only allowing necessary connections and adjusting firewall rules based on your deployment environment:

- ✅ **必須開放 / Must Allow**: `registry.npmjs.org`, PostgreSQL database host
- ⚠️ **條件開放 / Conditional**: OAuth providers (if used)
- ❌ **可以封鎖 / Can Block**: `checkpoint.prisma.io` (已禁用 / Disabled)
- ⚠️ **可選開放 / Optional**: Ubuntu package repositories (系統層級 / System-level)

---

## 參考資料 / References

- [Prisma Telemetry Documentation](https://www.prisma.io/docs/concepts/more/telemetry)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [PostgreSQL Connection Security](https://www.postgresql.org/docs/current/auth-pg-hba-conf.html)

---

## 支援 / Support

如有任何問題或需要協助，請聯絡：

For questions or assistance, please contact:

- **Email**: info@hklegal.com
- **GitHub Issues**: [https://github.com/JonazWong/HK-Legal-Case-Agency/issues](https://github.com/JonazWong/HK-Legal-Case-Agency/issues)
