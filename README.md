# HK Legal Case Agency

A professional case management platform for Hong Kong legal professionals, built with Next.js, PostgreSQL, and Prisma.

## Features

- **Case Management**: Track cases with status, categories, deadlines, and budgets
- **Client Management**: Maintain client records with contact information and case history
- **Time Tracking**: Log billable hours with automatic invoice generation
- **Document Management**: Upload and organize case documents
- **Invoicing**: Generate and track invoices linked to time entries
- **Firm Management**: Multi-user support with role-based access control
- **Messaging**: Communicate with clients through integrated messaging
- **Multi-language**: Support for English and Traditional Chinese

## Tech Stack

- **Frontend**: Next.js 14, React 18, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Email/Password, Google OAuth, LinkedIn OAuth)
- **Internationalization**: next-intl

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

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

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
│   ├── auth.ts          # Authentication utilities
│   ├── db.ts            # Database client
│   └── validations.ts   # Zod schemas
├── prisma/              # Database schema and migrations
│   ├── schema.prisma    # Database schema
│   ├── seed.ts          # Seed data
│   └── migrations/      # Migration files
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:seed` - Seed database with demo data
- `npm run db:setup` - Complete database setup (migrate + seed)

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

## Subscription Tiers

The platform supports 4 subscription tiers:

- **Starter** (HK$3,100/month): Basic features for 1-2 person firms
- **Professional** (HK$7,000/month): Full features for 5-20 person firms
- **Enterprise** (HK$10,100+/month): Advanced features for 20-100 person firms
- **Custom**: Fully customized for large firms (100+ people)

## License

Private - All rights reserved

## Support

For support, please contact: info@hklegal.com

