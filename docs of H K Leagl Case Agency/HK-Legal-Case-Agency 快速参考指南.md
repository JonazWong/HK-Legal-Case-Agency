# HK Legal Case Agency - 快速参考指南

## 项目基本信息

| 项 | 值 |
|----|-----|
| **项目名** | HK Legal Case Agency |
| **GitHub URL** | https://github.com/JonazWong/HK-Legal-Case-Agency |
| **项目描述** | 香港律师案件管理平台 |
| **完成度** | 100% 📊 (核心功能) |
| **贡献者数** | 2 (JonazWong, Copilot) |
| **提交数** | 43 |
| **主要语言** | TypeScript (93%) |

---

## 快速启动

### 1. 克隆与安装

```bash
git clone https://github.com/JonazWong/HK-Legal-Case-Agency.git
cd HK-Legal-Case-Agency
npm install
```

### 2. 配置环境

```bash
cp .env.example .env

# 编辑 .env 并填入：
# DATABASE_URL="postgresql://..."
# NEXTAUTH_SECRET="$(openssl rand -base64 32)"
# NEXTAUTH_URL="http://localhost:3000"
```

### 3. 初始化数据库

```bash
createdb hk_legal_db
npm run db:setup
```

### 4. 启动开发服务器

```bash
npm run dev
# 访问 http://localhost:3000
```

### 5. 使用演示账户登录

- **所有者**: owner@wonglaw.hk / demo123456
- **员工**: staff@wonglaw.hk / demo123456

---

## 核心技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| **前端框架** | Next.js | 14.2 |
| **UI 库** | React | 18.2 |
| **类型系统** | TypeScript | 5.5 |
| **样式框架** | TailwindCSS | 3.4 |
| **后端** | Next.js API Routes | 14.2 |
| **ORM** | Prisma | 5.17 |
| **数据库** | PostgreSQL | 14+ |
| **身份认证** | NextAuth.js | 4.24 |
| **国际化** | next-intl | 3.17 |

---

## 主要功能模块

```
✅ 身份认证与授权 (Authentication & Authorization)
   - Email/Password 认证
   - OAuth (Google, LinkedIn)
   - 基于角色的访问控制 (RBAC)
   - 账户安全 (失败登录锁定)

✅ 案例管理 (Case Management)
   - 创建/编辑/删除案例
   - 案例编号自动生成 (HCA-YYYY-NNN)
   - 状态管理 (ACTIVE, PENDING, COMPLETED, ARCHIVED)
   - 分类管理 (CIVIL, CRIMINAL, CORPORATE, etc.)
   - 搜索与筛选

✅ 客户管理 (Client Management)
   - 创建/编辑/删除客户
   - 客户历史案例查询
   - 联系方式管理 (包含香港 HKID)

✅ 仪表板 (Dashboard)
   - 统计概览
   - 快速操作卡片
   - 用户菜单

✅ 多语言支持 (Multi-language)
   - 英文
   - 繁体中文

✅ 设计系统 (Design System)
   - 专业香港风格配色
   - 响应式设计
   - 无障碍支持 (WCAG AA)
```

---

## 常用命令

### 开发

```bash
npm run dev              # 启动开发服务器 (http://localhost:3000)
npm run build            # 生产构建
npm start                # 启动生产服务器
npm run lint             # ESLint 检查
```

### 数据库

```bash
npm run prisma:generate  # 重新生成 Prisma 客户端
npm run prisma:migrate   # 创建新的数据库迁移
npm run prisma:studio    # 打开 Prisma Studio (http://localhost:5555)
npm run prisma:seed      # 执行种子脚本
npm run db:setup         # 完整数据库设置（迁移 + 种子）
```

---

## 项目结构速览

```
app/                    # Next.js App Router
├── (auth)/             # 认证页面 (login, signup)
├── (dashboard)/        # 仪表板页面 (cases, clients, dashboard)
└── api/                # API 端点

components/
├── ui/                 # 可复用 UI 组件 (button, card, input 等)
└── layout/             # 布局组件 (navbar, session-provider)

lib/
├── auth.ts             # NextAuth 配置
├── db.ts               # Prisma 客户端
└── validations.ts      # Zod 验证模式

prisma/
├── schema.prisma       # 数据库模型
└── seed.ts             # 种子数据

messages/              # i18n 翻译文件
public/                # 静态资源
types/                 # TypeScript 类型定义
```

---

## 页面路由

| 路由 | 说明 | 认证 |
|------|------|------|
| `/` | 首页 | 否 |
| `/auth/login` | 登录页 | 否 |
| `/auth/signup` | 注册页 | 否 |
| `/dashboard` | 仪表板 | 是 |
| `/dashboard/cases` | 案例列表 | 是 |
| `/dashboard/cases/new` | 创建案例 | 是 |
| `/dashboard/cases/[id]` | 案例详情 | 是 |
| `/dashboard/clients` | 客户列表 | 是 |
| `/dashboard/clients/new` | 创建客户 | 是 |
| `/dashboard/clients/[id]` | 客户详情 | 是 |

---

## API 端点概览

### 认证

- `POST /api/auth/signin` - 登录
- `POST /api/auth/signup` - 注册
- `POST /api/auth/signout` - 注出

### 案例

- `GET /api/cases` - 列表 (支持分页、搜索、筛选)
- `POST /api/cases` - 创建
- `GET /api/cases/[id]` - 详情
- `PUT /api/cases/[id]` - 更新
- `DELETE /api/cases/[id]` - 删除

### 客户

- `GET /api/clients` - 列表 (支持分页、搜索)
- `POST /api/clients` - 创建
- `GET /api/clients/[id]` - 详情
- `PUT /api/clients/[id]` - 更新
- `DELETE /api/clients/[id]` - 删除

### 仪表板

- `GET /api/dashboard/stats` - 统计概览

---

## 部署提示

- 使用环境变量管理敏感信息（DATABASE_URL, NEXTAUTH_SECRET 等）
- 在生产环境启用 HTTPS 与合适的 CORS 策略
- 配置数据库备份与迁移流程

---

## 贡献与许可证

欢迎提交 issue 与 PR！请遵循项目的贡献指南和代码格式化规范。

License: MIT
