# Looper HQ - Nexus Platform
## Legal Case Agency

> **Version 2.0** - Enterprise Monorepo Architecture  
> **Looper HQ** → **Nexus Platform** → **Legal Case Agency**

A professional multi-tenant legal case management system built on the **Nexus Platform** — Looper HQ's core enterprise framework for professional services solutions. Powered by Next.js 14, PostgreSQL, Prisma, and modern enterprise architecture designed for Hong Kong legal professionals.

## ✨ Features

### Core Features
- 🏢 **Multi-Tenant Architecture**: Complete data isolation with firmId-based access control
- 📊 **Case Management**: Track cases with automatic case number generation (HCA-YYYY-NNN format)
- 👥 **Client Management**: Comprehensive client records with case history
- 🔐 **Enterprise Authentication**: NextAuth.js with Google OAuth, email/password, and account lockout protection
- 🌏 **Internationalization**: Full support for English and Traditional Chinese (next-intl)
- 🔍 **Public Case Search**: Hong Kong court case tracking and monitoring

### Advanced Features
- ⏱️ **Time Tracking**: Log billable hours (planned)
- 📄 **Document Management**: Upload and organize case documents (planned)
- 💰 **Invoicing**: Generate and track invoices (planned)
- 💬 **Messaging**: Integrated client communication (planned)

### Developer Experience
- 🧪 **Comprehensive Testing**: Vitest with 71+ test cases covering Utils and API routes
- 📦 **Monorepo Architecture**: Shared packages for utils and types
- 🔒 **Type Safety**: Full TypeScript with strict mode
- 📚 **Complete Documentation**: Architecture, integration guides, and API documentation

## 🛠️ Tech Stack

### Frontend
- Next.js 14.2.5 (App Router)
- React 18.3.1
- TypeScript 5.5.4
- TailwindCSS 3.4.1
- next-intl 3.15.3
- React Hook Form 7.52.1
- Zod 3.23.8

### Backend
- Next.js API Routes
- NextAuth.js 4.24.7
- Prisma ORM 5.17.0
- PostgreSQL 14+
- bcryptjs 2.4.3

### DevOps & Testing
- Vitest 1.6.1
- Testing Library 14.3.1
- tsup 8.5.1 (Package bundler)
- date-fns 3.0.0 (with Hong Kong timezone support)

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or pnpm

## Getting Started

### Important: Firewall Configuration

If you're running this project in a restricted network environment, please review the [Firewall Configuration Guide](FIREWALL.md) for required network access rules and how to disable Prisma telemetry.

如果您在受限網路環境中運行此專案，請查看[防火牆配置指南](FIREWALL.md)了解所需的網路存取規則以及如何禁用 Prisma 遙測。

### 1. Clone the repository

```bash
git clone https://github.com/JonazWong/HK-Legal-Case-Agency.git
cd HK-Legal-Case-Agency
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` and update the following:

```env
# Database - Update with your PostgreSQL credentials
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hk_legal_db?schema=public"

# NextAuth - Generate a secure secret
NEXTAUTH_SECRET="your-secure-random-string-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional: OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

To generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 4. Set up the database

Create the PostgreSQL database:
```bash
createdb hk_legal_db
```

Run migrations and seed demo data:
```bash
npm run db:setup
```

This will:
- Generate Prisma client
- Run database migrations
- Seed the database with demo data

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

After running the seed script, you can log in with:

- **Owner Account**: `owner@wonglaw.hk` / `demo123456`
- **Staff Account**: `staff@wonglaw.hk` / `demo123456`

## Database Management

### Run migrations
```bash
npm run prisma:migrate
```

### Open Prisma Studio (Database GUI)
```bash
npm run prisma:studio
```

### Reset database
```bash
npx prisma migrate reset
```

### Seed database
```bash
npm run prisma:seed
```

## 📁 Project Structure (Monorepo)

```
HK-Legal-Case-Agency/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages (login, signup)
│   ├── (dashboard)/              # Protected dashboard pages
│   │   ├── dashboard/            # Main dashboard
│   │   ├── cases/                # Case management
│   │   ├── clients/              # Client management
│   │   ├── public-search/        # Public case search
│   │   └── settings/             # Settings
│   ├── api/                      # API routes (RESTful)
│   │   ├── auth/                 # NextAuth endpoints
│   │   ├── cases/                # Case CRUD
│   │   ├── clients/              # Client CRUD
│   │   └── public-cases/         # Public case search API
│   └── [locale]/                 # i18n routes
│
├── packages/                     # 🆕 Monorepo shared packages
│   ├── utils/                    # @hk-legal/utils
│   │   ├── src/
│   │   │   ├── constants.ts      # App constants (roles, statuses, etc.)
│   │   │   ├── date.ts           # HK timezone date utilities
│   │   │   ├── format.ts         # Format utilities (currency, phone, etc.)
│   │   │   ├── validation.ts     # Validation functions (HKID, email, etc.)
│   │   │   └── index.ts          # Barrel exports
│   │   └── package.json
│   │
│   └── types/                    # @hk-legal/types
│       ├── src/
│       │   ├── user.ts           # User types
│       │   ├── case.ts           # Case types
│       │   ├── client.ts         # Client types
│       │   ├── document.ts       # Document types
│       │   ├── api.ts            # API response types
│       │   └── index.ts          # Barrel exports
│       └── package.json
│
├── components/                   # React components
│   ├── ui/                       # Base UI components (shadcn-style)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── table.tsx
│   │   └── ...
│   └── layout/                   # Layout components
│       ├── navbar.tsx
│       └── session-provider.tsx
│
├── lib/                          # Core libraries
│   ├── auth.ts                   # NextAuth configuration
│   ├── db.ts                     # Prisma client (singleton)
│   ├── utils.ts                  # Re-exports from @hk-legal/utils
│   └── validations.ts            # Zod schemas
│
├── prisma/                       # Database
│   ├── schema.prisma             # Prisma schema
│   ├── seed.ts                   # Seed script
│   └── migrations/               # Migration files
│
├── __tests__/                    # 🆕 Test suites
│   ├── utils/                    # Utils tests (53 tests, 98% pass rate)
│   │   ├── validation.test.ts
│   │   ├── format.test.ts
│   │   └── date.test.ts
│   └── api/                      # API tests (19 tests)
│       ├── cases.test.ts
│       └── clients.test.ts
│
├── scripts/                      # Utility scripts
│   ├── deployment/               # 🆕 Deployment scripts
│   │   ├── backup.sh             # Database backup
│   │   └── restore.sh            # Database restore
│   └── track-cases.ts            # Case tracking cron job
│
├── messages/                     # i18n message files
│   ├── en.json
│   └── zh.json
│
├── middleware.ts                 # 🆕 Enhanced Middleware (Auth + i18n)
├── i18n.ts                       # i18n configuration
├── vitest.config.ts              # 🆕 Vitest test configuration
├── vitest.setup.ts               # 🆕 Vitest setup file
├── ARCHITECTURE.md               # 🆕 Complete architecture documentation
├── INTEGRATION_GUIDE.md          # 🆕 Integration usage guide
└── FIREWALL.md                   # Firewall configuration guide
```

### 🆕 What's New in v2.0

1. **Monorepo Architecture**: Shared `@hk-legal/utils` and `@hk-legal/types` packages
2. **Comprehensive Testing**: 71+ tests with Vitest (98% pass rate on utils)
3. **Enhanced Middleware**: Integrated auth + i18n protection at middleware level
4. **Complete Documentation**: ARCHITECTURE.md with 12 chapters covering the entire system
5. **Hong Kong Utilities**: Specialized functions for HK timezone, HKID validation, phone formatting
6. **Type Safety**: Centralized TypeScript types for all entities

## 🚀 Available Scripts

### Development
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Database
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (Database GUI)
- `npm run prisma:seed` - Seed database with demo data
- `npm run db:setup` - Complete setup (generate + migrate + seed)

### Testing (🆕 New in v2.0)
- `npm test` - Run tests in watch mode
- `npm run test:ui` - Open Vitest UI
- `npm run test:coverage` - Generate coverage report

### Packages (🆕 Monorepo)
- `cd packages/utils && npm run build` - Build @hk-legal/utils
- `cd packages/types && npm run build` - Build @hk-legal/types

### Deployment (🆕 New in v2.0)
- `bash scripts/deployment/backup.sh` - Backup PostgreSQL database
- `bash scripts/deployment/restore.sh <backup-file>` - Restore database

---

## 📦 Using Shared Packages

### @looper-hq/nexus-utils

Hong Kong-specific utility functions (extensible to other professional services):

```typescript
import {
  // Date utilities (HK timezone)
  formatDateShort,     // "06/02/2026"
  formatDateLong,      // "6 February 2026"
  nowInHK,             // Current time in HK timezone
  
  // Format utilities
  formatCurrency,      // "HK$1,000.00"
  formatPhoneHK,       // "5123 4567"
  formatFileSize,      // "1.24 MB"
  
  // Validation utilities
  isValidHKMobile,     // Validate HK mobile numbers
  isValidHKID,         // Validate HK ID numbers
  isValidEmail,        // Email validation
  
  // Constants
  USER_ROLES,          // { ADMIN, LAWYER, STAFF, CLIENT }
  CASE_STATUSES,       // { DRAFT, ACTIVE, PENDING, ... }
  MEMBERSHIP_TIERS,    // Subscription tier constants
} from '@looper-hq/nexus-utils';

// Example: Format date in dashboard
const createdDate = formatDateShort(case.createdAt);
// => "06/02/2026"

// Example: Validate phone number
if (isValidHKMobile(phoneNumber)) {
  // Valid HK mobile number
}
```

### @looper-hq/nexus-types

Centralized TypeScript type definitions (reusable across Nexus Platform):

```typescript
import type {
  // User types
  UserRole,
  BaseUser,
  UserWithFirm,
  
  // Case types
  CaseStatus,
  BaseCase,
  CaseWithRelations,
  CreateCaseInput,
  
  // Client types
  BaseClient,
  ClientWithCases,
  CreateClientInput,
  
  // API types
  ApiResponse,
  PaginatedResponse,
  ErrorResponse,
} from '@looper-hq/nexus-types';

// Example: Type-safe API response
const response: PaginatedResponse<BaseCase> = {
  data: cases,
  pagination: {
    page: 1,
    limit: 10,
    total: 100,
    totalPages: 10,
  },
};
```

For complete usage guide, see [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md).

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `CHECKPOINT_DISABLE` | Disable Prisma telemetry (set to `1`) | Recommended |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `NEXTAUTH_URL` | Base URL of the application | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |
| `LINKEDIN_CLIENT_ID` | LinkedIn OAuth client ID | No |
| `LINKEDIN_CLIENT_SECRET` | LinkedIn OAuth client secret | No |

**Note**: See [FIREWALL.md](FIREWALL.md) for network configuration in restricted environments.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Complete system architecture documentation (12 chapters) |
| [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) | How to use @hk-legal/utils and @hk-legal/types |
| [FIREWALL.md](FIREWALL.md) | Network configuration for restricted environments |
| [MIGRATION_PHASE3_COMPLETE.md](MIGRATION_PHASE3_COMPLETE.md) | Latest migration report (Phase 3) |

---

## 💳 Subscription Tiers

The platform supports 4 subscription tiers:

- **Starter** (HK$3,100/month): Basic features for 1-2 person firms
- **Professional** (HK$7,000/month): Full features for 5-20 person firms
- **Enterprise** (HK$10,100+/month): Advanced features for 20-100 person firms
- **Custom**: Fully customized for large firms (100+ people)

---

## 🧪 Testing

The project includes comprehensive test coverage:

- **Utils Tests**: 53 tests, 98% pass rate
  - Date formatting and timezone handling
  - Validation functions (HKID, phone, email)
  - Format utilities (currency, file size)
  
- **API Tests**: 19 tests
  - Cases API (GET, POST endpoints)
  - Clients API (CRUD operations)
  - Authentication and authorization

Run tests with:
```bash
npm test                  # Watch mode
npm run test:coverage     # With coverage report
```

---

## 🔒 Security Features

- **Password Security**: bcrypt hashing with 10 rounds
- **Account Lockout**: 3 failed attempts = 30-minute lockout
- **Multi-Tenant Isolation**: Complete data separation by firmId
- **Input Validation**: Zod schema validation on all inputs
- **XSS Protection**: Sanitized input/output
- **CSRF Protection**: Built-in with NextAuth.js

---

## 🌐 Internationalization

Full support for:
- 🇬🇧 English (en)
- 🇭🇰 Traditional Chinese (zh)

Language switching is automatic based on user preference or browser settings.

---

## 🚀 Deployment

### Environment Variables

Ensure these are set in production:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth (REQUIRED)
NEXTAUTH_SECRET="your-production-secret"  # Use: openssl rand -base64 32
NEXTAUTH_URL="https://yourdomain.com"

# Optional: OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Recommended
CHECKPOINT_DISABLE=1
NODE_ENV=production
```

### Database Backup

Automated backup script included:

```bash
# Backup
bash scripts/deployment/backup.sh

# Restore
bash scripts/deployment/restore.sh backup-20260206-123456.sql.gz
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards

- ✅ TypeScript strict mode
- ✅ ESLint rules compliance
- ✅ Test coverage for new features
- ✅ Update documentation as needed

---

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Vitest Documentation](https://vitest.dev/)

---

## 📝 License

Private - All rights reserved

---

## 💬 Support

For support and inquiries:

- **Email**: info@hklegal.com
- **GitHub Issues**: [Report a bug or request a feature](https://github.com/JonazWong/HK-Legal-Case-Agency/issues)

---

## 🏢 About Looper HQ

**Looper HQ** is an enterprise software company specializing in professional services management solutions. 

**Nexus Platform** is our core enterprise framework powering vertical-specific applications across legal, healthcare, finance, and other professional service sectors.

**Legal Case Agency** is the flagship product built on Nexus Platform, demonstrating our platform's capabilities in the legal sector.

For more information about our platform architecture, see [BRANDING_ARCHITECTURE.md](BRANDING_ARCHITECTURE.md).

---

## 🙏 Acknowledgments

Built  with ❤️ for Hong Kong legal professionals and professional services worldwide.

**Powered by**: Looper HQ Nexus Platform

Special thanks to all contributors and the open-source community.

---

**Platform**: Looper HQ → Nexus Platform → Legal Case Agency  
**Version**: 2.0 (Enterprise Monorepo Architecture)  
**Last Updated**: 2026-02-06  
**Status**: ✅ Production Ready

