# Quick Start Guide

Get the HK Legal Case Management Platform up and running in 5 minutes!

## Prerequisites

Make sure you have installed:
- **Node.js** 18 or higher ([Download](https://nodejs.org))
- **PostgreSQL** 14 or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/JonazWong/HK-Legal-Case-Agency.git
cd HK-Legal-Case-Agency
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages (~2-3 minutes).

### 3. Create PostgreSQL Database
```bash
# Option A: Using createdb command
createdb hk_legal_db

# Option B: Using psql
psql -U postgres
CREATE DATABASE hk_legal_db;
\q
```

### 4. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env file (use your favorite text editor)
nano .env  # or: code .env, vim .env, etc.
```

**Minimal required settings:**
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/hk_legal_db?schema=public"
NEXTAUTH_SECRET="your-random-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

**Generate NEXTAUTH_SECRET:**
```bash
# On Mac/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### 5. Initialize Database
```bash
npm run db:setup
```

This will:
- Generate Prisma client
- Create database tables
- Add demo data (firm, users, cases, clients)

You should see: `🎉 Database seeding completed successfully!`

### 6. Start the Application
```bash
npm run dev
```

You should see:
```
▲ Next.js 14.2.5
- Local:        http://localhost:3000
- Ready in X.Xs
```

### 7. Open in Browser
Visit **http://localhost:3000**

## Demo Login

Use these accounts to explore the platform:

### Firm Owner Account
```
Email:    owner@wonglaw.hk
Password: demo123456
```
Has full access to all features.

### Staff Account
```
Email:    staff@wonglaw.hk
Password: demo123456
```
Has limited access (no firm settings).

## What to Try First

1. **Login** - Use one of the demo accounts
2. **Dashboard** - See overview of cases, clients, and metrics
3. **Cases** - View the list of cases
   - Click on a case to see details
   - Try creating a new case
   - Use search and filters
4. **Clients** - View and manage clients
   - Click on a client to see their case history
   - Try adding a new client
5. **Explore** - Check out the navigation menu for other features

## Common Issues & Solutions

### ❌ "Cannot connect to database"
**Solution:** Make sure PostgreSQL is running
```bash
# Mac
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
# Use pgAdmin or Services app to start PostgreSQL
```

### ❌ "Module not found" errors
**Solution:** Reinstall dependencies
```bash
rm -rf node_modules
npm install
```

### ❌ "Prisma Client not generated"
**Solution:** Regenerate Prisma client
```bash
npm run prisma:generate
```

### ❌ Port 3000 already in use
**Solution:** Either:
1. Stop the application using port 3000
2. Or use a different port:
```bash
PORT=3001 npm run dev
```

### ❌ "Invalid credentials" when logging in
**Solution:** Make sure you ran `npm run db:setup` to create demo accounts

## Next Steps

### Create Your Own Account
1. Click "Sign up" on login page
2. Fill in your details
3. Your firm will get a 14-day free trial

### Explore Database
View data directly using Prisma Studio:
```bash
npm run prisma:studio
```
Opens at http://localhost:5555

### Read Documentation
- `README.md` - Complete setup guide
- `API.md` - API documentation
- `DEVELOPMENT.md` - Development guide
- `PROJECT_SUMMARY.md` - Project overview

## Development Tools

### View Database
```bash
npm run prisma:studio
```

### Check Linting
```bash
npm run lint
```

### Build for Production
```bash
npm run build
npm start
```

## Getting Help

### Documentation Files
- **README.md** - Setup and overview
- **API.md** - API endpoints
- **DEVELOPMENT.md** - Developer guide
- **PROJECT_SUMMARY.md** - Feature list

### Useful Commands
```bash
# Reset database (WARNING: Deletes all data!)
npx prisma migrate reset

# Re-seed database
npm run prisma:seed

# View Prisma schema
cat prisma/schema.prisma
```

## What's Included

✅ **Authentication**
- Login/Signup
- Password reset
- OAuth (Google)

✅ **Case Management**
- Create, view, edit, delete cases
- Auto-generated case numbers
- Status tracking
- Search and filter

✅ **Client Management**
- Create, view, edit, delete clients
- Case history
- Contact information

✅ **Dashboard**
- Statistics overview
- Quick actions
- Recent activity

✅ **Professional UI**
- Hong Kong design theme
- Mobile responsive
- Modern interface

## System Requirements

**Minimum:**
- Node.js 18+
- PostgreSQL 14+
- 2GB RAM
- 500MB disk space

**Recommended:**
- Node.js 20+
- PostgreSQL 15+
- 4GB RAM
- 1GB disk space

## Support

For issues or questions:
1. Check the documentation files
2. Review error messages carefully
3. Check PostgreSQL is running
4. Verify environment variables
5. Try restarting the dev server

---

**You're all set! 🎉**

Start managing your legal cases efficiently with the HK Legal Case Management Platform.
