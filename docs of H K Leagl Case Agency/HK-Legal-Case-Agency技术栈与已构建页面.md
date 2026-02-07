# HK Legal Case Agency 技术栈与已构建页面

## 技术框架详细列表

### 核心依赖 (package.json)

#### 生产依赖项 (Dependencies)

| 包名 | 版本 | 用途 |
|------|------|------|
| **next** | 14.2.5 | Next.js 框架 - React 应用框架 |
| **react** | 18.2.0 | React 库 - UI 组件库 |
| **react-dom** | 18.2.0 | React DOM 渲染 |
| **@prisma/client** | 5.17.0 | Prisma ORM 客户端 |
| **next-auth** | 4.24.7 | NextAuth.js - 身份验证 |
| **@next-auth/prisma-adapter** | 1.0.7 | NextAuth Prisma 适配器 |
| **next-intl** | 3.17.2 | 国际化 - 多语言支持 |
| **zod** | 3.23.8 | 数据验证 - Schema 验证 |
| **bcryptjs** | 2.4.3 | 密码哈希加密 |
| **express** | 5.2.1 | Express 服务器框架 |
| **ejs** | 4.0.1 | EJS 模板引擎 |

#### 开发依赖项 (Dev Dependencies)

| 包名 | 版本 | 用途 |
|------|------|------|
| **typescript** | 5.5.4 | TypeScript 类型检查 |
| **@types/node** | 20.14.12 | Node.js 类型定义 |
| **@types/react** | 18.2.79 | React 类型定义 |
| **@types/react-dom** | 18.2.25 | React DOM 类型定义 |
| **@types/bcryptjs** | 2.4.6 | bcryptjs 类型定义 |
| **eslint** | 8.57.0 | 代码检查工具 |
| **eslint-config-next** | 16.1.4 | Next.js ESLint 配置 |
| **tailwindcss** | 3.4.10 | TailwindCSS - 样式框架 |
| **postcss** | 8.4.41 | PostCSS - CSS 处理器 |
| **autoprefixer** | 10.4.20 | 自动添加浏览器前缀 |
| **prisma** | 5.17.0 | Prisma CLI - 数据库管理 |
| **tsx** | 4.7.0 | TypeScript 执行器 |

### 脚本命令 (npm scripts)

```json
{
  "dev": "next dev",                              // 开发服务器
  "build": "next build",                          // 生产构建
  "start": "next start",                          // 生产启动
  "lint": "next lint",                            // ESLint 检查
  "prisma:generate": "prisma generate",           // 生成 Prisma 客户端
  "prisma:migrate": "prisma migrate dev",         // 创建数据库迁移
  "prisma:studio": "prisma studio",               // 打开 Prisma Studio
  "prisma:seed": "tsx prisma/seed.ts",            // 种子数据注入
  "db:setup": "prisma generate && prisma migrate dev && prisma db seed"  // 完整数据库设置
}
```

---

## 页面路由映射

### 公开页面（无需认证）

| 路由 | 页面名 | 文件 | 说明 |
|------|--------|------|------|
| `/` | 首页 | `app/page.tsx` | 公开首页 - 展示功能、定价、演示 |
| `/en` | 首页(英文) | `app/page.tsx` | 英文版首页 |
| `/zh` | 首页(中文) | `app/page.tsx` | 繁体中文版首页 |
| `/auth/login` | 登录 | `app/(auth)/login/page.tsx` | 用户登录页面 |
| `/auth/signup` | 注册 | `app/(auth)/signup/page.tsx` | 新用户注册页面 |

### 受保护页面（需要认证）

#### 仪表板 (Dashboard)

| 路由 | 页面名 | 文件 | 说明 |
|------|--------|------|------|
| `/dashboard` | 仪表板首页 | `app/(dashboard)/dashboard/page.tsx` | 显示统计信息、快捷操作 |

#### 案例管理 (Cases)

| 路由 | 页面名 | 文件 | 说明 |
|------|--------|------|------|
| `/dashboard/cases` | 案例列表 | `app/(dashboard)/cases/page.tsx` | 所有案例列表、搜索、筛选 |
| `/dashboard/cases/new` | 创建案例 | `app/(dashboard)/cases/new/page.tsx` | 创建新案例的表单 |
| `/dashboard/cases/[id]` | 案例详情 | `app/(dashboard)/cases/[id]/page.tsx` | 查看和编辑案例详情 |

#### 客户管理 (Clients)

| 路由 | 页面名 | 文件 | 说明 |
|------|--------|------|------|
| `/dashboard/clients` | 客户列表 | `app/(dashboard)/clients/page.tsx` | 所有客户列表、搜索、分页 |
| `/dashboard/clients/new` | 创建客户 | `app/(dashboard)/clients/new/page.tsx` | 创建新客户的表单 |
| `/dashboard/clients/[id]` | 客户详情 | `app/(dashboard)/clients/[id]/page.tsx` | 查看和编辑客户详情 |

#### 其他页面

| 路由 | 页面名 | 文件 | 说明 |
|------|--------|------|------|
| `/dashboard/client` | 单个客户 | `app/(dashboard)/client/page.tsx` | 可能用于导航过渡 |
| `/index-test-dashboard` | 测试仪表板 | `app/index-test-dashboard/page.tsx` | 开发测试页面 |

---

## 已构建的主要功能页面

### 1. 首页 (Landing Page)
- **文件**: `app/page.tsx`
- **功能**:
  - Hero 部分 - 吸引用户
  - 功能展示 - 核心特性介绍
  - 定价区间 - 4 个订阅套餐
  - 企业版专享功能展示
  - Call-to-action 按钮
- **设计**: 遵循香港设计系统（深藍綠、清新綠、文雅金配色）
- **响应式**: 支持桌面、平板和移动设备。
