# HK Legal Case Agency 项目目录结构详解

## 完整项目架构

```
HK-Legal-Case-Agency/
├── .github/                          # GitHub Actions 工作流
├── app/                              # Next.js 14 App Router
│   ├── (auth)/                       # 认证路由组（无布局）
│   │   ├── login/                    # 登录页面
│   │   └── signup/                   # 注册页面
│   ├── (dashboard)/                  # 仪表板路由组（带布局）
│   │   ├── cases/                    # 案例管理
│   │   │   ├── [id]/                 # 案例详情/编辑页面（动态路由）
│   │   │   ├── new/                  # 创建新案例表单
│   │   │   └── page.tsx              # 案例列表页面
│   │   ├── client/                   # 单个客户页面（可能用于导航）
│   │   ├── clients/                  # 客户管理
│   │   │   ├── [id]/                 # 客户详情/编辑页面（动态路由）
│   │   │   ├── new/                  # 创建新客户表单
│   │   │   └── page.tsx              # 客户列表页面
│   │   ├── dashboard/                # 仪表板首页
│   │   └── layout.tsx                # 受保护的布局组件
│   ├── api/                          # API 路由
│   │   ├── auth/                     # NextAuth 路由
│   │   │   ├── signin                # 登录 API
│   │   │   ├── signup                # 注册 API
│   │   │   └── signout               # 注出 API
│   │   ├── cases/                    # 案例 CRUD API
│   │   │   ├── route.ts              # GET (列表), POST (创建)
│   │   │   └── [id]/route.ts         # GET (详情), PUT (编辑), DELETE (删除)
│   │   ├── clients/                  # 客户 CRUD API
│   │   │   ├── route.ts              # GET (列表), POST (创建)
│   │   │   └── [id]/route.ts         # GET (详情), PUT (编辑), DELETE (删除)
│   │   └── dashboard/                # 仪表板数据 API
│   │       └── stats/route.ts        # 获取统计数据
│   ├── globals.css                   # 全局样式
│   ├── layout.tsx                    # 根布局组件
│   └── page.tsx                      # 首页（公开页面）
├── components/                       # React 组件库
│   ├── layout/                       # 布局组件
│   │   ├── navbar.tsx                # 导航栏
│   │   └── session-provider.tsx      # NextAuth 会话包装器
│   └── ui/                           # UI 组件库
│       ├── badge.tsx                 # 徽章组件（5 种变体）
│       ├── button.tsx                # 按钮组件（4 种变体）
│       ├── card.tsx                  # 卡片组件及子组件
│       ├── input.tsx                 # 输入框组件
│       ├── select.tsx                # 选择框组件
│       ├── table.tsx                 # 表格组件
│       ├── textarea.tsx              # 文本区域组件
│       └── index.ts                  # 导出所有 UI 组件
├── lib/                              # 工具函数库
│   ├── auth.ts                       # NextAuth 配置
│   ├── db.ts                         # Prisma 客户端实例
│   ├── utils.ts                      # 通用工具函数
│   └── validations.ts                # Zod 验证模式
├── prisma/                           # 数据库配置
│   ├── schema.prisma                 # 数据库模型定义
│   ├── seed.ts                       # 种子数据脚本
│   └── migrations/                   # 数据库迁移文件
│       └── [migration_name]/         # 单个迁移
│           └── migration.sql         # 迁移 SQL 语句
├── types/                            # TypeScript 类型定义
│   └── next-auth.d.ts                # NextAuth 类型扩展
├── messages/                         # 国际化消息文件
│   ├── en.json                       # 英文翻译
│   └── zh.json                       # 繁体中文翻译
├── public/                           # 静态资源
│   ├── favicon.ico                   # 网站图标
│   └── [其他静态文件]
├── views/                            # 模板文件
│   └── index.ejs                     # EJS 模板
├── .env.example                      # 环境变量示例
├── .eslintrc.json                    # ESLint 配置
├── .gitignore                        # Git 忽略规则
├── API.md                            # API 文档
├── DESIGN_SYSTEM.md                  # 设计系统文档
├── DEVELOPMENT.md                    # 开发指南
├── PAGE_IMPROVEMENTS_GUIDE.md         # 页面改进指南
├── PROJECT_SUMMARY.md                # 项目总结
├── QUICKSTART.md                     # 快速开始指南
├── README.md                         # 主要文档
├── hong_kong_legal_development_specification.txt # 开发规范
├── i18n.ts                           # 国际化配置
├── middleware.ts                     # Next.js 中间件
├── next-env.d.ts                     # Next.js 类型定义
├── next.config.mjs                   # Next.js 配置
├── package.json                      # 项目依赖
├── package-lock.json                 # 依赖锁定文件
├── postcss.config.mjs                # PostCSS 配置
├── tailwind.config.ts                # Tailwind 配置
├── tsconfig.json                     # TypeScript 配置
└── tsconfig.tsbuildinfo              # TypeScript 构建信息
```

---

## 主要文件说明

### 核心应用文件

| 文件路径 | 说明 |
|---------|------|
| `app/page.tsx` | 首页（公开访问） |
| `app/(auth)/login/page.tsx` | 登录页面 |
| `app/(auth)/signup/page.tsx` | 注册页面 |
| `app/(dashboard)/layout.tsx` | 仪表板主布局（受保护） |
| `app/(dashboard)/dashboard/page.tsx` | 仪表板首页 |
| `app/(dashboard)/cases/page.tsx` | 案例列表 |
| `app/(dashboard)/cases/new/page.tsx` | 创建案例 |
| `app/(dashboard)/cases/[id]/page.tsx` | 案例详情 |
| `app/(dashboard)/clients/page.tsx` | 客户列表 |
