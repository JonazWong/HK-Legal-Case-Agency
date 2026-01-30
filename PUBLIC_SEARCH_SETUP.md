# Public Case Search - Setup & Testing Guide

This guide provides instructions for setting up and testing the Public Case Search feature.

## Prerequisites

1. PostgreSQL database running
2. Node.js 20+ installed
3. Environment variables configured

## Setup Instructions

### 1. Configure Environment Variables

Create or update `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/hk_legal_db?schema=public"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
CHECKPOINT_DISABLE=1
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- `axios` - HTTP client for fetching external data
- `rss-parser` - RSS feed parser for news sources

### 3. Database Migration

Run the Prisma migrations to create the `PublicCase` table:

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations (will create PublicCase table)
npm run prisma:migrate

# Optional: Open Prisma Studio to view database
npm run prisma:studio
```

### 4. Seed Initial Data (Optional)

To test the feature, you can manually run the tracking script:

```bash
npm run track:cases
```

This will:
- Fetch mock cases from configured data sources
- Store them in the `PublicCase` table
- Display progress and summary

Expected output:
```
============================================================
Starting HK Legal Case Tracking
Time: 2026-01-30T09:00:00.000Z
============================================================

📋 Registering data sources...
  ✓ Registered: Judiciary
  ✓ Registered: NewsRSS
✓ Data sources registered successfully

🔍 Starting daily case tracking...
...
✓ Daily tracking completed successfully
```

## Testing

### 1. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 2. Login

Use the demo account:
- Email: `owner@wonglaw.hk`
- Password: `demo123456`

(If the demo account doesn't exist, create one through the signup page)

### 3. Access Public Search

Navigate to:
```
http://localhost:3000/public-search
```

Or click "Public Search" in the navigation bar.

### 4. Test Features

#### Basic Search
1. Enter a keyword (e.g., "CHAN", "fraud", "High Court")
2. Click "Search"
3. Verify results appear

#### Filters
1. Select a Source (JUDICIARY, NEWS, or HKLII)
2. Select a Category (CIVIL, CRIMINAL, etc.)
3. Select a Court
4. Set Start Date and End Date
5. Click "Search"
6. Verify filtered results

#### Pagination
1. If more than 20 results exist, pagination controls appear at bottom
2. Click "Next" to go to next page
3. Click "Previous" to go back
4. Verify page number updates correctly

#### Reset
1. Apply some filters
2. Click "Reset" button
3. Verify all filters are cleared

### 5. Test API Endpoint

You can test the API directly:

```bash
# Get all public cases
curl "http://localhost:3000/api/public-cases"

# Search with filters
curl "http://localhost:3000/api/public-cases?query=CHAN&category=CRIMINAL&page=1&limit=10"
```

Expected response format:
```json
{
  "cases": [
    {
      "id": "clx...",
      "source": "JUDICIARY",
      "caseNumber": "HCCC 123/2025",
      "title": "HKSAR v. CHAN TAI MAN",
      "category": "CRIMINAL",
      "court": "High Court",
      "hearingDate": "2026-01-29T00:00:00.000Z",
      "publishedAt": "2026-01-30T09:00:00.000Z",
      "url": "https://..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 3,
    "totalPages": 1
  }
}
```

## GitHub Actions (Production)

### Setup Daily Tracking

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add a new repository secret:
   - Name: `DATABASE_URL`
   - Value: Your production database connection string

4. The workflow will run daily at 6:00 AM Hong Kong Time (22:00 UTC)

### Manual Trigger

1. Go to Actions tab in GitHub
2. Select "Daily Case Tracking" workflow
3. Click "Run workflow"
4. Select branch and click "Run workflow" button

## Troubleshooting

### Database Connection Error

**Problem**: `Environment variable not found: DATABASE_URL`

**Solution**:
1. Check `.env` file exists in project root
2. Verify `DATABASE_URL` is set correctly
3. Restart development server

### No Cases Found

**Problem**: Search returns empty results

**Solution**:
1. Run `npm run track:cases` to seed data
2. Check database with `npm run prisma:studio`
3. Verify `PublicCase` table has records

### Unauthorized Error

**Problem**: API returns 401 Unauthorized

**Solution**:
1. Make sure you're logged in
2. Clear browser cookies and login again
3. Check NextAuth configuration

### Build Errors

**Problem**: TypeScript or build errors

**Solution**:
1. Run `npm run prisma:generate` to regenerate Prisma client
2. Delete `node_modules` and `.next` folders
3. Run `npm install` again
4. Run `npm run build`

## File Structure

```
.
├── app/
│   ├── api/
│   │   └── public-cases/
│   │       └── route.ts          # API endpoint handler
│   └── (dashboard)/
│       └── public-search/
│           └── page.tsx           # Frontend search page
├── lib/
│   ├── tracking/
│   │   ├── engine.ts              # Tracking engine
│   │   ├── types.ts               # TypeScript interfaces
│   │   └── sources/
│   │       ├── judiciary.ts       # Judiciary data source
│   │       └── news.rss.ts        # News RSS data source
│   └── services/
│       └── publicCaseSearch.ts    # Search service
├── scripts/
│   └── track-cases.ts             # Manual tracking script
├── prisma/
│   ├── schema.prisma              # Database schema (includes PublicCase)
│   └── migrations/
│       └── add_public_case_model.sql  # SQL migration
├── .github/
│   └── workflows/
│       └── daily-case-tracking.yml    # GitHub Actions workflow
└── docs/
    └── 香港法律案件搜尋器與自動追蹤系統.md  # Chinese documentation
```

## Adding New Data Sources

To add a new data source (e.g., HKLII):

1. Create a new file in `lib/tracking/sources/`:

```typescript
// lib/tracking/sources/hklii.ts
import { IDataSource, RawCase } from '../types';
import axios from 'axios';

export class HKLIISource implements IDataSource {
  name = 'HKLII';
  
  async fetchDailyCases(): Promise<RawCase[]> {
    const response = await axios.get('https://api.hklii.hk/cases');
    // Process and return cases
    return [];
  }
}
```

2. Register in `scripts/track-cases.ts`:

```typescript
import { HKLIISource } from '../lib/tracking/sources/hklii';

engine.registerSource(new HKLIISource());
```

3. Run the tracking script to test:

```bash
npm run track:cases
```

## Support

For issues or questions:
1. Check the main documentation: `docs/香港法律案件搜尋器與自動追蹤系統.md`
2. Review API documentation: `API.md`
3. Open an issue on GitHub
