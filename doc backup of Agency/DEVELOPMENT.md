# Development Guide

## Project Structure

```
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                  # Auth route group (no layout)
│   │   ├── login/               # Login page
│   │   └── signup/              # Signup page
│   ├── (dashboard)/             # Dashboard route group (with layout)
│   │   ├── cases/               # Cases management
│   │   │   ├── [id]/           # Case detail/edit
│   │   │   ├── new/            # New case form
│   │   │   └── page.tsx        # Cases list
│   │   ├── clients/             # Clients management
│   │   │   ├── [id]/           # Client detail/edit
│   │   │   ├── new/            # New client form
│   │   │   └── page.tsx        # Clients list
│   │   ├── dashboard/           # Dashboard home
│   │   └── layout.tsx           # Protected layout
│   ├── api/                     # API routes
│   │   ├── auth/               # NextAuth routes
│   │   ├── cases/              # Cases CRUD API
│   │   ├── clients/            # Clients CRUD API
│   │   └── dashboard/          # Dashboard stats API
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/                  # React components
│   ├── layout/                 # Layout components
│   │   ├── navbar.tsx          # Navigation bar
│   │   └── session-provider.tsx # NextAuth wrapper
│   └── ui/                     # UI components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── table.tsx
│       ├── textarea.tsx
│       └── index.ts
├── lib/                        # Utilities
│   ├── auth.ts                 # NextAuth configuration
│   ├── db.ts                   # Prisma client
│   ├── utils.ts                # Helper functions
│   └── validations.ts          # Zod schemas
├── prisma/                     # Database
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed data
├── types/                      # TypeScript types
│   └── next-auth.d.ts         # NextAuth type extensions
└── public/                     # Static assets
```

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **next-auth** - Authentication

### Backend
- **Next.js API Routes** - Backend API
- **Prisma** - ORM for PostgreSQL
- **PostgreSQL** - Database
- **Zod** - Schema validation
- **bcryptjs** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static typing
- **Prisma Studio** - Database GUI

## Getting Started

### Prerequisites
```bash
node --version  # Should be 18+
npm --version   # Should be 9+
psql --version  # Should be 14+
```

### Installation

1. **Clone and install dependencies**
```bash
git clone https://github.com/JonazWong/HK-Legal-Case-Agency.git
cd HK-Legal-Case-Agency
npm install
```

2. **Set up PostgreSQL**
```bash
# Create database
createdb hk_legal_db

# Or using psql
psql -c "CREATE DATABASE hk_legal_db;"
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your settings
```

Required variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/hk_legal_db?schema=public"
NEXTAUTH_SECRET="your-secret-here"  # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
```

4. **Initialize database**
```bash
npm run db:setup
```

This will:
- Generate Prisma client
- Run migrations
- Seed demo data

5. **Start development server**
```bash
npm run dev
```

Visit http://localhost:3000

## Development Workflow

### Database Changes

1. **Update schema**
```bash
# Edit prisma/schema.prisma
```

2. **Create migration**
```bash
npm run prisma:migrate
# Enter migration name when prompted
```

3. **Regenerate Prisma client**
```bash
npm run prisma:generate
```

### Adding New Features

1. **Create Zod schema** in `lib/validations.ts`
2. **Update Prisma schema** if needed
3. **Create API routes** in `app/api/`
4. **Create pages** in `app/(dashboard)/`
5. **Add UI components** in `components/ui/` if needed

### Code Style

- Use TypeScript for all files
- Follow ESLint rules
- Use Prettier for formatting (if configured)
- Use functional components with hooks
- Use server components where possible
- Use client components only when needed ('use client')

### Testing Locally

**Login with demo accounts:**
```
Email: owner@wonglaw.hk
Password: demo123456

Email: staff@wonglaw.hk
Password: demo123456
```

**Access Prisma Studio:**
```bash
npm run prisma:studio
```

Visit http://localhost:5555

## API Development

### Creating New Endpoints

1. **Create route file**
```typescript
// app/api/resource/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.firmId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Your logic here
  const data = await prisma.resource.findMany({
    where: { firmId: session.user.firmId }
  });

  return NextResponse.json({ data });
}
```

2. **Add validation schema** in `lib/validations.ts`
```typescript
export const resourceSchema = z.object({
  name: z.string().min(1),
  // ... other fields
});
```

3. **Document in API.md**

### Common Patterns

**Pagination:**
```typescript
const page = parseInt(searchParams.get('page') || '1');
const limit = parseInt(searchParams.get('limit') || '10');
const skip = (page - 1) * limit;

const [data, total] = await Promise.all([
  prisma.resource.findMany({ skip, take: limit }),
  prisma.resource.count()
]);

return NextResponse.json({
  data,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  }
});
```

**Multi-tenancy:**
```typescript
// Always filter by firmId
const data = await prisma.resource.findMany({
  where: { firmId: session.user.firmId }
});
```

**Error Handling:**
```typescript
try {
  // ... your code
} catch (error) {
  console.error('Error:', error);
  return NextResponse.json(
    { error: 'Failed to process request' },
    { status: 500 }
  );
}
```

## UI Development

### Using Components

```typescript
import { Button, Input, Card } from '@/components/ui';

function MyForm() {
  return (
    <Card>
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

### Creating New Components

Follow the existing pattern in `components/ui/`:
```typescript
import React from 'react';

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'special';
}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`base-styles ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

### Tailwind Classes

Use design system colors:
- `teal-dark` - #004B5C (primary brand)
- `mint-green` - #3BA19D (accent)
- `subtle-gold` - #D4AF37 (highlight)
- `charcoal` - #1A1A1A (text)
- `cool-gray` - #5A5A5A (secondary text)
- `light-gray` - #E8E8E8 (borders)
- `off-white` - #FAFAFA (backgrounds)

## Database Schema

See `prisma/schema.prisma` for full schema.

**Key models:**
- **User** - Firm users with roles
- **Firm** - Law firms with subscription tiers
- **Client** - Individual clients
- **Case** - Legal cases
- **TimeEntry** - Billable hours
- **Document** - Case documents
- **Invoice** - Billing
- **Message** - Communications

**Relationships:**
```
Firm (1) ─── (N) User
Firm (1) ─── (N) Client
Firm (1) ─── (N) Case
Client (1) ─── (N) Case
Case (1) ─── (N) TimeEntry
Case (1) ─── (N) Document
```

## Debugging

### Enable Prisma Query Logging
```env
DATABASE_URL="postgresql://...?connection_limit=5&pool_timeout=20"
```

In `lib/db.ts`:
```typescript
log: ['query', 'error', 'warn']
```

### Enable Next.js Debug Mode
```bash
NODE_OPTIONS='--inspect' npm run dev
```

### Check Logs
```bash
# Server logs appear in terminal
# Client logs appear in browser console
```

## Common Issues

### "Cannot find module @prisma/client"
```bash
npm run prisma:generate
```

### "Database connection error"
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Check database exists

### "Session not found"
- Clear cookies
- Check NEXTAUTH_SECRET is set
- Restart dev server

### "Type error" in TypeScript
```bash
# Regenerate types
npm run prisma:generate
# Restart TypeScript server in IDE
```

## Performance Tips

1. **Use server components** for static content
2. **Enable Prisma connection pooling**
3. **Add database indexes** for frequently queried fields
4. **Use pagination** for large datasets
5. **Implement caching** for expensive queries

## Security Checklist

- [ ] All API routes check authentication
- [ ] Multi-tenancy enforced via firmId
- [ ] Input validation with Zod
- [ ] Passwords hashed with bcrypt
- [ ] SQL injection prevented (Prisma)
- [ ] XSS prevented (React)
- [ ] CSRF protection (NextAuth)
- [ ] Rate limiting (TODO)

## Deployment

See README.md for deployment instructions.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
