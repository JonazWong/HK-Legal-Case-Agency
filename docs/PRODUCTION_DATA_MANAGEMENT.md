# 生產環境數據管理與安全指南

**更新日期**: 2026-02-01  
**版本**: 1.0.0

---

## 📋 目錄

1. [數據存儲架構](#1-數據存儲架構)
2. [安全措施與隱私保護](#2-安全措施與隱私保護)
3. [客戶數據管理](#3-客戶數據管理)
4. [訂閱管理系統](#4-訂閱管理系統)
5. [公開案件數據管理](#5-公開案件數據管理)
6. [管理員控制台](#6-管理員控制台)
7. [生產環境部署建議](#7-生產環境部署建議)

---

## 1. 數據存儲架構

### 1.1 客戶數據存儲位置

**當前系統（開發環境）**：
- **資料庫**: PostgreSQL 本地實例
- **位置**: `localhost:5432/hk_legal_db`
- **連接字串**: `.env` 中的 `DATABASE_URL`

**生產環境建議**：
```
推薦選項 1: 雲端託管資料庫
├─ AWS RDS (PostgreSQL)
│  ├─ 自動備份（每日）
│  ├─ 自動故障轉移
│  └─ 加密儲存（AES-256）
│
├─ Google Cloud SQL
│  ├─ 自動備份
│  ├─ 高可用性配置
│  └─ VPC 私有網路隔離
│
└─ Azure Database for PostgreSQL
   ├─ 自動修補
   ├─ 威脅檢測
   └─ 進階數據加密

推薦選項 2: 自建伺服器
├─ 專用 PostgreSQL 伺服器
├─ 需自行管理備份
├─ 需自行配置安全措施
└─ 成本較低但維護成本高
```

### 1.2 數據表結構

```sql
-- 客戶註冊數據
User (用戶表)
├─ id              主鍵
├─ email           加密存儲（唯一）
├─ passwordHash    bcrypt 加密（成本因子 10）
├─ name            明文（必要顯示）
├─ role            OWNER | ADMIN | STAFF
├─ firmId          所屬事務所（多租戶隔離）
└─ createdAt       註冊時間

Firm (事務所表)
├─ id                       主鍵
├─ name                     事務所名稱
├─ registrationNumber       商業登記號
├─ subscriptionTier         訂閱級別
├─ subscriptionStatus       訂閱狀態
├─ subscriptionEndsAt       訂閱到期日
└─ billingEmail             帳單郵箱

Case (案件表 - 私有數據)
├─ firmId            多租戶隔離（索引）
├─ clientId          關聯客戶
├─ caseNumber        HCA-YYYY-NNN
├─ title, description 案件內容
└─ [嚴格權限控制]

PublicCase (公開案件 - 非敏感數據)
├─ source            來源（NewsRSS, Judiciary）
├─ caseNumber        案件編號
├─ title, content    公開內容
└─ [無個人資料]
```

---

## 2. 安全措施與隱私保護

### 2.1 已實施的安全措施

#### ✅ **密碼安全**
```typescript
// lib/auth.ts
import bcrypt from 'bcryptjs';

// 註冊時加密（成本因子 10 = 1024 rounds）
const passwordHash = await bcrypt.hash(password, 10);

// 登入時驗證
const valid = await bcrypt.compare(password, user.passwordHash);
```

**特點**：
- 使用 bcrypt 單向雜湊
- 自動加鹽（salt）
- 無法從 hash 反推密碼
- 儲存格式：`$2a$10$...`（60字元）

#### ✅ **會話管理**
```typescript
// NextAuth.js 配置
session: {
  strategy: 'jwt',
  maxAge: 30 * 24 * 60 * 60, // 30 天
}

// Session 只包含必要資訊
{
  id: string,
  email: string,
  name: string,
  role: 'OWNER' | 'ADMIN' | 'STAFF',
  firmId: string,
  locale: 'en' | 'zh'
}
```

#### ✅ **多租戶隔離**
```typescript
// 所有查詢必須包含 firmId
const cases = await prisma.case.findMany({
  where: { 
    firmId: session.user.firmId, // 強制隔離
    ...filters 
  }
});

// 跨租戶存取會被阻擋
if (case.firmId !== session.user.firmId) {
  return { error: 'Forbidden' }; // 403
}
```

#### ✅ **登入失敗鎖定**
```typescript
// 3 次失敗 = 鎖定 30 分鐘
if (user.failedLoginCount >= 3) {
  const lockoutDuration = 30 * 60 * 1000; // 30 分鐘
  if (user.lockedUntil && new Date() < user.lockedUntil) {
    throw new Error('Account locked');
  }
}
```

### 2.2 需要補充的安全措施（生產環境必要）

#### ❌ **數據傳輸加密**（需實施）
```nginx
# 強制 HTTPS
server {
  listen 443 ssl http2;
  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;
  
  # 強制使用 TLS 1.2+
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:...';
}

# 重定向 HTTP → HTTPS
server {
  listen 80;
  return 301 https://$host$request_uri;
}
```

**環境變數**：
```env
# .env.production
NEXTAUTH_URL="https://your-domain.com"  # 必須 HTTPS
```

#### ❌ **資料庫加密**（需實施）
```sql
-- PostgreSQL 透明數據加密（TDE）
-- AWS RDS: 啟用時自動加密

-- 或使用欄位級加密（敏感資料）
CREATE EXTENSION pgcrypto;

-- 加密敏感欄位
UPDATE users 
SET email = pgp_sym_encrypt(email, 'encryption_key');

-- 查詢時解密
SELECT pgp_sym_decrypt(email, 'encryption_key') 
FROM users;
```

#### ❌ **備份加密**（需實施）
```bash
# PostgreSQL 備份並加密
pg_dump hk_legal_db | \
  gpg --encrypt --recipient admin@firm.com > \
  backup_$(date +%Y%m%d).sql.gpg

# 自動每日備份腳本
0 2 * * * /usr/local/bin/encrypted-backup.sh
```

#### ❌ **審計日誌**（需實施）
```typescript
// 記錄所有敏感操作
await prisma.auditLog.create({
  data: {
    userId: session.user.id,
    action: 'CASE_VIEW',
    resourceType: 'Case',
    resourceId: caseId,
    ipAddress: req.headers['x-forwarded-for'],
    timestamp: new Date(),
  }
});
```

### 2.3 隱私保護措施

#### 符合 PDPO（《個人資料（私隱）條例》）

```typescript
// 1. 數據最小化原則
// 只收集必要資料
interface UserRegistration {
  email: string;      // 必要：登入識別
  password: string;   // 必要：身份驗證
  name: string;       // 必要：顯示名稱
  // 不收集：電話、地址、身份證號（除非業務必需）
}

// 2. 明確同意
// 註冊頁面必須包含
<Checkbox required>
  我已閱讀並同意《隱私政策》和《服務條款》
</Checkbox>

// 3. 數據訪問權
// API: GET /api/users/me/data
// 用戶可下載自己的所有數據（GDPR Right）

// 4. 數據刪除權
// API: DELETE /api/users/me/account
// 用戶可要求刪除帳戶（保留 90 天用於恢復）
```

---

## 3. 客戶數據管理

### 3.1 查看客戶資料

#### 方法 1：Prisma Studio（開發/管理）
```bash
npm run prisma:studio
# 開啟 http://localhost:5555
# 可視化瀏覽所有資料表
```

**可操作**：
- ✅ 查看所有 User、Firm、Case 資料
- ✅ 編輯欄位（需謹慎）
- ✅ 刪除記錄
- ❌ 無權限控制（僅限開發環境）

#### 方法 2：管理員 API（生產環境）

**目前狀態**: ❌ 未實施  
**需要建立**: `/api/admin/*` 端點

建議實作：
```typescript
// app/api/admin/users/route.ts
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  
  // 僅超級管理員可存取
  if (session?.user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      firm: {
        select: { name: true, subscriptionTier: true }
      },
      createdAt: true,
      _count: { select: { cases: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
  
  return NextResponse.json({ users });
}
```

#### 方法 3：直接資料庫查詢
```bash
# 連接資料庫
psql -U postgres -d hk_legal_db

# 查看所有事務所
SELECT id, name, "subscriptionTier", "subscriptionStatus" 
FROM "Firm" 
ORDER BY "createdAt" DESC;

# 查看特定事務所的用戶
SELECT u.email, u.name, u.role, u."createdAt"
FROM "User" u
WHERE u."firmId" = 'clxxxxx';

# 查看用戶的案件數量
SELECT 
  f.name AS firm_name,
  COUNT(c.id) AS total_cases,
  COUNT(DISTINCT c."clientId") AS total_clients
FROM "Firm" f
LEFT JOIN "Case" c ON c."firmId" = f.id
GROUP BY f.id, f.name;
```

### 3.2 修改客戶資料

#### 透過 Prisma Studio（開發）
```bash
npm run prisma:studio
# 1. 選擇 User 表
# 2. 找到要修改的用戶
# 3. 點擊欄位直接編輯
# 4. 點擊 "Save 1 change"
```

#### 透過 SQL（生產環境謹慎使用）
```sql
-- 更新用戶名稱
UPDATE "User" 
SET name = '新名稱' 
WHERE email = 'user@example.com';

-- 更改訂閱狀態
UPDATE "Firm"
SET "subscriptionTier" = 'PROFESSIONAL',
    "subscriptionStatus" = 'active',
    "subscriptionEndsAt" = '2027-02-01'
WHERE id = 'firm_id';

-- 重置密碼（需先產生 hash）
-- 使用 bcrypt 在線工具或腳本產生
UPDATE "User"
SET "passwordHash" = '$2a$10$...'
WHERE email = 'user@example.com';
```

#### 透過管理介面（需實作）

**目前狀態**: ❌ 未實施  
**建議路徑**: `/admin/users`

---

## 4. 訂閱管理系統

### 4.1 當前訂閱方案

```typescript
// prisma/schema.prisma
enum SubscriptionTier {
  STARTER       // HK$3,100/月
  PROFESSIONAL  // HK$7,000/月
  ENTERPRISE    // HK$10,100+/月
  CUSTOM        // 自訂價格
}

model Firm {
  subscriptionTier      SubscriptionTier @default(STARTER)
  subscriptionStatus    String  // 'trial' | 'active' | 'past_due' | 'canceled'
  subscriptionEndsAt    DateTime?
  billingEmail          String?
}
```

### 4.2 訂閱升級/降級

**目前狀態**: ❌ **未實施自動處理**  
**手動方式**: 透過資料庫直接更新

```sql
-- 升級到 PROFESSIONAL
UPDATE "Firm"
SET "subscriptionTier" = 'PROFESSIONAL',
    "subscriptionStatus" = 'active',
    "subscriptionEndsAt" = CURRENT_DATE + INTERVAL '1 month'
WHERE id = 'firm_id';
```

### 4.3 需要實作的訂閱管理功能

#### 方案 A：整合 Stripe（推薦）

```typescript
// 1. 安裝 Stripe
// npm install stripe @stripe/stripe-js

// 2. 建立訂閱頁面
// app/(dashboard)/settings/billing/page.tsx

import { loadStripe } from '@stripe/stripe-js';

export default function BillingPage() {
  const handleUpgrade = async (tier: 'PROFESSIONAL' | 'ENTERPRISE') => {
    const response = await fetch('/api/stripe/create-checkout', {
      method: 'POST',
      body: JSON.stringify({ tier }),
    });
    
    const { sessionId } = await response.json();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({ sessionId });
  };
  
  return (
    <div>
      <h1>訂閱管理</h1>
      
      <div>目前方案: STARTER</div>
      <Button onClick={() => handleUpgrade('PROFESSIONAL')}>
        升級到 PROFESSIONAL
      </Button>
    </div>
  );
}
```

```typescript
// app/api/stripe/create-checkout/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { tier } = await req.json();
  const session = await getServerSession();
  
  const priceMap = {
    PROFESSIONAL: 'price_xxx', // Stripe Price ID
    ENTERPRISE: 'price_yyy',
  };
  
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    mode: 'subscription',
    line_items: [{
      price: priceMap[tier],
      quantity: 1,
    }],
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?upgrade=success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/settings/billing`,
  });
  
  return NextResponse.json({ sessionId: checkoutSession.id });
}
```

```typescript
// app/api/stripe/webhook/route.ts
// Stripe Webhook 處理訂閱事件
export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')!;
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
  
  switch (event.type) {
    case 'customer.subscription.created':
      // 訂閱成功，更新資料庫
      await prisma.firm.update({
        where: { billingEmail: event.data.object.customer },
        data: {
          subscriptionTier: 'PROFESSIONAL',
          subscriptionStatus: 'active',
          subscriptionEndsAt: new Date(event.data.object.current_period_end * 1000),
        }
      });
      break;
      
    case 'customer.subscription.updated':
      // 訂閱變更（升級/降級）
      break;
      
    case 'customer.subscription.deleted':
      // 取消訂閱
      await prisma.firm.update({
        where: { ... },
        data: { subscriptionStatus: 'canceled' }
      });
      break;
  }
  
  return NextResponse.json({ received: true });
}
```

#### 方案 B：手動管理（簡易版）

```typescript
// app/(dashboard)/settings/billing/page.tsx
// 顯示目前方案與聯絡客服升級
export default function BillingPage() {
  return (
    <div>
      <h1>訂閱管理</h1>
      <Card>
        <p>目前方案: STARTER (HK$3,100/月)</p>
        <p>到期日: 2026-03-01</p>
        
        <Button onClick={() => {
          window.location.href = 'mailto:billing@hklegal.com?subject=升級訂閱';
        }}>
          聯絡客服升級
        </Button>
      </Card>
    </div>
  );
}
```

---

## 5. 公開案件數據管理

### 5.1 自動抓取的數據

**來源**：
- ✅ RSS 新聞源（明報、RTHK 等）
- ✅ 司法機構（目前為 mock data）
- ⏳ HKLII（計劃中）

**數據量預估**：
- 每日抓取: ~50-100 篇新聞
- 法律相關（過濾後）: ~5-20 篇
- 每月累積: ~150-600 條記錄

### 5.2 數據清理功能

**目前狀態**: ❌ **未實施管理介面**  
**需要建立**: 管理員控制台

#### 建議實作：公開案件管理頁面

```typescript
// app/(dashboard)/admin/public-cases/page.tsx
export default function PublicCasesAdminPage() {
  const [cases, setCases] = useState<PublicCase[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  
  const handleBulkDelete = async () => {
    await fetch('/api/admin/public-cases/bulk-delete', {
      method: 'POST',
      body: JSON.stringify({ ids: selected }),
    });
    
    // 重新載入
    fetchCases();
  };
  
  const handleMarkUseful = async (id: number) => {
    await fetch(`/api/admin/public-cases/${id}/mark`, {
      method: 'PATCH',
      body: JSON.stringify({ useful: true }),
    });
  };
  
  return (
    <div>
      <h1>公開案件管理</h1>
      
      <div className="flex gap-2 mb-4">
        <Button onClick={handleBulkDelete} variant="danger">
          刪除選中 ({selected.length})
        </Button>
        <Button onClick={() => setSelected(cases.map(c => c.id))}>
          全選
        </Button>
        <Button onClick={() => setSelected([])}>
          取消選擇
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox 
                checked={selected.length === cases.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelected(cases.map(c => c.id));
                  } else {
                    setSelected([]);
                  }
                }}
              />
            </TableHead>
            <TableHead>日期</TableHead>
            <TableHead>來源</TableHead>
            <TableHead>標題</TableHead>
            <TableHead>有用?</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                <Checkbox
                  checked={selected.includes(c.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelected([...selected, c.id]);
                    } else {
                      setSelected(selected.filter(id => id !== c.id));
                    }
                  }}
                />
              </TableCell>
              <TableCell>{formatDate(c.publishedAt)}</TableCell>
              <TableCell><Badge>{c.source}</Badge></TableCell>
              <TableCell>{c.title}</TableCell>
              <TableCell>
                <Button onClick={() => handleMarkUseful(c.id)}>
                  ⭐ 標記為有用
                </Button>
              </TableCell>
              <TableCell>
                <Button 
                  variant="danger" 
                  onClick={() => handleDelete(c.id)}
                >
                  🗑️ 刪除
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

#### API 端點

```typescript
// app/api/admin/public-cases/bulk-delete/route.ts
export async function POST(req: Request) {
  const session = await getServerSession();
  
  // 僅管理員可操作
  if (session?.user?.role !== 'OWNER' && session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  const { ids } = await req.json();
  
  await prisma.publicCase.deleteMany({
    where: { id: { in: ids } }
  });
  
  return NextResponse.json({ success: true, deleted: ids.length });
}
```

### 5.3 自動清理策略（建議實施）

```typescript
// scripts/cleanup-old-cases.ts
// 每週自動刪除 90 天前的無用案件

async function cleanupOldCases() {
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
  const result = await prisma.publicCase.deleteMany({
    where: {
      publishedAt: { lt: ninetyDaysAgo },
      useful: { not: true }, // 保留標記為有用的
    }
  });
  
  console.log(`Deleted ${result.count} old cases`);
}
```

```yaml
# .github/workflows/weekly-cleanup.yml
name: Weekly Data Cleanup
on:
  schedule:
    - cron: '0 2 * * 0' # 每週日 2:00 AM

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npx tsx scripts/cleanup-old-cases.ts
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## 6. 管理員控制台

### 6.1 當前狀態

**已有功能**：
- ✅ 基本儀表板（`/dashboard`）
- ✅ 案件管理（僅限自己事務所）
- ✅ 客戶管理（僅限自己事務所）
- ✅ 公開搜尋（所有用戶可見）

**缺少功能**：
- ❌ 超級管理員面板
- ❌ 跨事務所數據查看
- ❌ 用戶管理（查看所有用戶）
- ❌ 訂閱管理介面
- ❌ 公開案件審核/清理
- ❌ 系統監控儀表板

### 6.2 建議實作：管理員專用頁面

#### 路由結構
```
app/(dashboard)/admin/
├── layout.tsx          # 管理員權限檢查
├── page.tsx            # 管理員儀表板總覽
├── users/
│   └── page.tsx        # 所有用戶列表
├── firms/
│   ├── page.tsx        # 所有事務所列表
│   └── [id]/
│       └── page.tsx    # 事務所詳情
├── subscriptions/
│   └── page.tsx        # 訂閱管理
├── public-cases/
│   └── page.tsx        # 公開案件管理（上面已詳述）
└── analytics/
    └── page.tsx        # 系統分析報表
```

#### 權限控制

```typescript
// app/(dashboard)/admin/layout.tsx
export default async function AdminLayout({ children }: { children: React.Node }) {
  const session = await getServerSession(authOptions);
  
  // 僅超級管理員可存取
  if (session?.user?.role !== 'SUPER_ADMIN') {
    redirect('/dashboard');
  }
  
  return (
    <div>
      <AdminNavbar />
      <main>{children}</main>
    </div>
  );
}
```

```sql
-- 需要在資料庫中新增 SUPER_ADMIN 角色
ALTER TYPE "UserRole" ADD VALUE 'SUPER_ADMIN';

-- 將特定用戶設為超級管理員
UPDATE "User"
SET role = 'SUPER_ADMIN'
WHERE email = 'admin@hklegal.com';
```

#### 管理員儀表板

```typescript
// app/(dashboard)/admin/page.tsx
export default async function AdminDashboard() {
  // 統計數據
  const stats = {
    totalUsers: await prisma.user.count(),
    totalFirms: await prisma.firm.count(),
    activeFirms: await prisma.firm.count({
      where: { subscriptionStatus: 'active' }
    }),
    totalCases: await prisma.case.count(),
    publicCases: await prisma.publicCase.count(),
    revenueThisMonth: await calculateRevenue(),
  };
  
  return (
    <div>
      <h1>系統管理員控制台</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="總用戶數" value={stats.totalUsers} />
        <StatCard title="活躍事務所" value={stats.activeFirms} />
        <StatCard title="本月收入" value={`HK$ ${stats.revenueThisMonth}`} />
      </div>
      
      <Card>
        <h2>最近註冊</h2>
        <RecentUsersTable />
      </Card>
      
      <Card>
        <h2>訂閱到期提醒</h2>
        <ExpiringSubscriptionsTable />
      </Card>
    </div>
  );
}
```

---

## 7. 生產環境部署建議

### 7.1 部署平台選擇

#### 選項 A：Vercel（推薦新手）
```bash
# 1. 安裝 Vercel CLI
npm i -g vercel

# 2. 連接專案
vercel

# 3. 設定環境變數（在 Vercel Dashboard）
DATABASE_URL="postgres://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://your-app.vercel.app"
```

**優點**：
- ✅ 自動部署（Git push 即部署）
- ✅ 全球 CDN
- ✅ 免費 SSL
- ✅ 簡單易用

**缺點**：
- ❌ Serverless 限制（函數執行時間 10s）
- ❌ 需外部資料庫（Vercel Postgres 或 AWS RDS）

#### 選項 B：自建 VPS（完全控制）
```bash
# Ubuntu 22.04 伺服器
# 1. 安裝 Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 安裝 PostgreSQL
sudo apt install postgresql postgresql-contrib

# 3. 安裝 Nginx
sudo apt install nginx

# 4. 部署應用
git clone https://github.com/yourrepo/HK-Legal-Case-Agency.git
cd HK-Legal-Case-Agency
npm install
npm run build

# 5. 使用 PM2 守護程序
npm install -g pm2
pm2 start npm --name "hk-legal" -- start
pm2 save
pm2 startup
```

**Nginx 配置**：
```nginx
server {
  listen 443 ssl http2;
  server_name yourdomain.com;
  
  ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
  
  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### 7.2 環境變數清單

```env
# .env.production

# 資料庫
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public"
CHECKPOINT_DISABLE=1

# 驗證
NEXTAUTH_SECRET="超強密碼至少32字元"
NEXTAUTH_URL="https://yourdomain.com"

# OAuth（可選）
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stripe（訂閱管理）
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_KEY="pk_live_..."

# 郵件服務（發送通知）
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="noreply@yourdomain.com"
SMTP_PASS="app_password"

# 監控（可選）
SENTRY_DSN="https://..."
```

### 7.3 備份策略

```bash
# 每日自動備份腳本
#!/bin/bash
# /usr/local/bin/backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/postgresql"
DB_NAME="hk_legal_db"

# 創建備份
pg_dump -U postgres $DB_NAME | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# 刪除 30 天前的備份
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete

# 上傳到 S3（可選）
aws s3 cp $BACKUP_DIR/backup_$DATE.sql.gz s3://your-backup-bucket/
```

```cron
# 每天凌晨 2:00 執行
0 2 * * * /usr/local/bin/backup-db.sh
```

---

## 8. 快速參考

### 常用操作指令

```bash
# 查看所有用戶
psql -U postgres -d hk_legal_db -c "SELECT email, name, role FROM \"User\" ORDER BY \"createdAt\" DESC LIMIT 10;"

# 查看訂閱統計
psql -U postgres -d hk_legal_db -c "SELECT \"subscriptionTier\", COUNT(*) FROM \"Firm\" GROUP BY \"subscriptionTier\";"

# 刪除測試數據
psql -U postgres -d hk_legal_db -c "DELETE FROM \"PublicCase\" WHERE source = 'NewsRSS' AND \"publishedAt\" < NOW() - INTERVAL '90 days';"

# 查看資料庫大小
psql -U postgres -d hk_legal_db -c "SELECT pg_size_pretty(pg_database_size('hk_legal_db'));"

# 重置用戶密碼（需先產生 hash）
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('newpassword', 10));"
# 然後更新資料庫
```

### 緊急聯絡

- **技術支援**: tech@hklegal.com
- **帳單問題**: billing@hklegal.com
- **數據隱私**: privacy@hklegal.com

---

**文檔版本**: 1.0.0  
**最後更新**: 2026-02-01  
**維護者**: HK Legal Development Team
