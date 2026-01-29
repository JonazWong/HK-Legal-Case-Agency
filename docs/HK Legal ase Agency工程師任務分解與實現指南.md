# HK Legal Case Agency - 工程師任務分解與實現指南

## 第一部分：立即可執行的任務

---

## Task 1: 部署到測試環境

**優先級**: CRITICAL  
**工作量**: 1-2 天  
**擁有者**: DevOps / 後端工程師

### 目標
在 Railway 或 DigitalOcean 上部署完整的應用棧（Next.js + PostgreSQL），用於 UAT 測試。

### 技術要求

#### 步驟 1: Railway 部署

1. **在 Railway 上創建新項目**
   ```bash
   # 安裝 Railway CLI
   npm install -g @railway/cli
   
   # 初始化項目
   railway init
   
   # 連接 GitHub 倉庫
   # 登錄並授權 railway.app
   ```

2. **添加 PostgreSQL 服務**
   - 在 Railway Dashboard 添加 PostgreSQL 數據庫
   - 獲取連接字符串

3. **配置環境變數**
   ```env
   DATABASE_URL=postgresql://...  # 從 Railway 獲取
   NEXTAUTH_SECRET=$(openssl rand -base64 32)  # 生成新密鑰
   NEXTAUTH_URL=https://your-app.up.railway.app
   NODE_ENV=production
   ```

4. **部署應用**
   ```bash
   railway up
   # 或在 Dashboard 啟用自動部署
   ```

#### 步驟 2: 運行數據庫遷移

```bash
# 在遠程環境中執行
railway run npm run prisma:migrate

# 注入種子數據
railway run npm run prisma:seed
```

#### 步驟 3: 驗證部署

- 訪問 `https://your-app.up.railway.app`
- 使用演示帳戶登錄：
  - 郵箱: `owner@wonglaw.hk`
  - 密碼: `demo123456`
- 測試核心功能：創建案例、創建客戶、查看儀表板

### 驗收標準
- [ ] 應用可在 HTTPS 上訪問
- [ ] 資料庫遷移成功
- [ ] 登錄功能正常
- [ ] 儀表板統計數據正確
- [ ] API 端點可正常調用
- [ ] 備份策略已配置

---

## Task 2: 實現速率限制

**優先級**: HIGH  
**工作量**: 2-3 天  
**擁有者**: 後端工程師  
**相關檔案**: `lib/rate-limit.ts`, `app/api/*/route.ts`

### 目標
防止暴力破解和 DDoS 攻擊，保護應用的所有 API 端點。

### 實現步驟

#### 步驟 1: 安裝依賴

```bash
npm install @upstash/ratelimit @upstash/redis
```

#### 步驟 2: 創建速率限制工具類

創建 `lib/rate-limit.ts`:

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Redis 配置（使用 Upstash 免費層或自託管 Redis）
const redis = Redis.fromEnv();

// 不同端點的速率限制策略
export const rateLimiters = {
  // 登錄：每 IP 10 次/小時
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 h"),
    analytics: true,
  }),

  // 創建資源：每用戶 100 次/天
  create: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "1 d"),
    analytics: true,
  }),

  // 列表 API：每用戶 1000 次/小時
  read: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1000, "1 h"),
    analytics: true,
  }),

  // 刪除操作：每用戶 50 次/天
  delete: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, "1 d"),
    analytics: true,
  }),
};

// 識別用戶的鑰匙（IP 或 User ID）
export function getIdentifier(request: Request, userId?: string): string {
  if (userId) return userId;

  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  return ip.split(",")[0].trim();
}

// 檢查速率限制
export async function checkRateLimit(
  identifier: string,
  limiter: Ratelimit
): Promise<{ success: boolean; remaining: number; resetTime: Date }> {
  const result = await limiter.limit(identifier);

  return {
    success: result.success,
    remaining: result.remainingRequests,
    resetTime: new Date(result.resetAfter),
  };
}
```

#### 步驟 3: 在 API 路由中應用速率限制

修改 `app/api/auth/signin/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { rateLimiters, getIdentifier, checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // 檢查速率限制（基於 IP）
    const identifier = getIdentifier(request);
    const rateLimit = await checkRateLimit(identifier, rateLimiters.auth);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Too many login attempts. Please try again later.",
          resetTime: rateLimit.resetTime,
        },
        { status: 429 }
      );
    }

    // 原有的登錄邏輯...
    const body = await request.json();
    // ... 認證邏輯 ...

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
```

修改 `app/api/cases/route.ts` (LIST 端點):

```typescript
import { checkRateLimit, rateLimiters, getIdentifier } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  // 獲取當前用戶 ID（來自 session）
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 檢查速率限制
  const rateLimit = await checkRateLimit(
    session.user.id,
    rateLimiters.read
  );
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429, headers: {
        "Retry-After": String(Math.ceil((rateLimit.resetTime.getTime() - Date.now()) / 1000)),
      }}
    );
  }

  // 原有的邏輯...
  // ...

  return NextResponse.json(cases);
}
```

#### 步驟 4: 環境變數配置

添加到 `.env.production`:

```env
# Upstash Redis（用於速率限制）
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
```

### 測試

```bash
# 單元測試
npm run test -- rate-limit.test.ts

# 集成測試：快速發送多個請求
for i in {1..15}; do
  curl -X POST http://localhost:3000/api/auth/signin \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"123"}'
  sleep 0.1
done
# 第 11 個請求應返回 429 狀態碼
```

### 驗收標準
- [ ] 登錄限制每 IP 10 次/小時
- [ ] 列表 API 限制每用戶 1000 次/小時
- [ ] 超限返回 429 狀態碼
- [ ] 包含 `Retry-After` 響應頭
- [ ] Redis 連接正常
- [ ] 單元測試通過

---

## Task 3: 實現審計日誌

**優先級**: HIGH  
**工作量**: 3-4 天  
**擁有者**: 後端工程師  
**相關檔案**: `prisma/schema.prisma`, `lib/audit.ts`

### 目標
記錄所有敏感操作（創建、編輯、刪除用戶、案例、發票等），符合監管要求。

### 實現步驟

#### 步驟 1: 添加 AuditLog 模型

修改 `prisma/schema.prisma`:

```prisma
model AuditLog {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  action    String   // "CREATE_CASE", "UPDATE_INVOICE", "DELETE_USER" 等
  resource  String   // "Case", "Invoice", "User" 等
  resourceId String  // 資源的 ID
  
  // 變更詳情
  changesBefore Json?  // 變更前的狀態
  changesAfter  Json?  // 變更後的狀態
  
  // 上下文信息
  ipAddress String?
  userAgent String?
  
  timestamp DateTime @default(now())
  firmId    String
  firm      Firm     @relation(fields: [firmId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([firmId])
  @@index([timestamp])
  @@index([action])
}

// 在 Firm 模型中添加關係
model Firm {
  // ... 現有字段 ...
  auditLogs AuditLog[]
}

// 在 User 模型中添加關係
model User {
  // ... 現有字段 ...
  auditLogs AuditLog[]
}
```

#### 步驟 2: 創建審計日誌工具類

創建 `lib/audit.ts`:

```typescript
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export interface AuditLogData {
  userId: string;
  firmId: string;
  action: string; // 如 "CREATE_CASE", "UPDATE_INVOICE"
  resource: string; // 如 "Case", "Invoice"
  resourceId: string;
  changesBefore?: Record<string, any>;
  changesAfter?: Record<string, any>;
  request?: NextRequest;
}

export async function logAuditEvent(data: AuditLogData): Promise<void> {
  try {
    // 提取 IP 和 User-Agent
    const ipAddress = data.request?.headers.get("x-forwarded-for") ||
      data.request?.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = data.request?.headers.get("user-agent") || "unknown";

    await db.auditLog.create({
      data: {
        userId: data.userId,
        firmId: data.firmId,
        action: data.action,
        resource: data.resource,
        resourceId: data.resourceId,
        changesBefore: data.changesBefore || null,
        changesAfter: data.changesAfter || null,
        ipAddress: ipAddress.toString(),
        userAgent: userAgent,
      },
    });
  } catch (error) {
    console.error("Failed to log audit event:", error);
    // 不中斷正常操作，但記錄錯誤
  }
}

// 快捷函數
export async function logCaseCreated(
  userId: string,
  firmId: string,
  caseId: string,
  caseData: any,
  request?: NextRequest
): Promise<void> {
  await logAuditEvent({
    userId,
    firmId,
    action: "CREATE_CASE",
    resource: "Case",
    resourceId: caseId,
    changesAfter: caseData,
    request,
  });
}

export async function logCaseUpdated(
  userId: string,
  firmId: string,
  caseId: string,
  before: any,
  after: any,
  request?: NextRequest
): Promise<void> {
  await logAuditEvent({
    userId,
    firmId,
    action: "UPDATE_CASE",
    resource: "Case",
    resourceId: caseId,
    changesBefore: before,
    changesAfter: after,
    request,
  });
}

export async function logCaseDeleted(
  userId: string,
  firmId: string,
  caseId: string,
  caseData: any,
  request?: NextRequest
): Promise<void> {
  await logAuditEvent({
    userId,
    firmId,
    action: "DELETE_CASE",
    resource: "Case",
    resourceId: caseId,
    changesBefore: caseData,
    request,
  });
}
```

#### 步驟 3: 在 API 端點中集成審計日誌

修改 `app/api/cases/route.ts`:

```typescript
import { logCaseCreated } from "@/lib/audit";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // 驗證輸入...
  const validatedData = caseSchema.parse(body);

  // 創建案例
  const newCase = await db.case.create({
    data: {
      ...validatedData,
      firmId: session.user.firmId,
    },
  });

  // 記錄審計日誌
  await logCaseCreated(
    session.user.id,
    session.user.firmId,
    newCase.id,
    newCase,
    request
  );

  return NextResponse.json(newCase, { status: 201 });
}
```

修改 `app/api/cases/[id]/route.ts`:

```typescript
import { logCaseUpdated, logCaseDeleted } from "@/lib/audit";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 獲取原有案例
  const oldCase = await db.case.findUnique({
    where: { id: params.id },
  });

  if (!oldCase) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 });
  }

  const body = await request.json();
  const validatedData = updateCaseSchema.parse(body);

  // 更新案例
  const updatedCase = await db.case.update({
    where: { id: params.id },
    data: validatedData,
  });

  // 記錄審計日誌
  await logCaseUpdated(
    session.user.id,
    session.user.firmId,
    params.id,
    oldCase,
    updatedCase,
    request
  );

  return NextResponse.json(updatedCase);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "OWNER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 獲取案例（刪除前）
  const caseToDelete = await db.case.findUnique({
    where: { id: params.id },
  });

  if (!caseToDelete) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 });
  }

  // 刪除案例
  await db.case.delete({
    where: { id: params.id },
  });

  // 記錄審計日誌
  await logCaseDeleted(
    session.user.id,
    session.user.firmId,
    params.id,
    caseToDelete,
    request
  );

  return NextResponse.json({ success: true });
}
```

#### 步驟 4: 創建審計日誌查看頁面

創建 `app/(dashboard)/audit-logs/page.tsx`:

```typescript
"use client";

import { useEffect, useState } from "react";
import { Button, Table, Card } from "@/components/ui";
import { formatDate } from "@/lib/utils";

interface AuditLog {
  id: string;
  timestamp: string;
  user: { name: string; email: string };
  action: string;
  resource: string;
  resourceId: string;
  changesBefore?: Record<string, any>;
  changesAfter?: Record<string, any>;
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchLogs() {
      const res = await fetch(`/api/audit-logs?page=${page}`);
      const data = await res.json();
      setLogs(data.logs);
      setLoading(false);
    }

    fetchLogs();
  }, [page]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">審計日誌</h1>
        <p className="text-gray-600">查看所有系統操作的記錄</p>
      </div>

      <Card>
        <Table>
          <thead>
            <tr>
              <th>時間</th>
              <th>用戶</th>
              <th>操作</th>
              <th>資源</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{formatDate(log.timestamp)}</td>
                <td>{log.user.name || log.user.email}</td>
                <td>{log.action}</td>
                <td>{log.resource}</td>
                <td className="font-mono text-sm">{log.resourceId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
```

#### 步驟 5: 創建審計日誌 API

創建 `app/api/audit-logs/route.ts`:

```typescript
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== "OWNER") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
  const limit = 50;
  const skip = (page - 1) * limit;

  const logs = await db.auditLog.findMany({
    where: { firmId: session.user.firmId },
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { timestamp: "desc" },
    skip,
    take: limit,
  });

  const total = await db.auditLog.count({
    where: { firmId: session.user.firmId },
  });

  return NextResponse.json({
    logs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
```

#### 步驟 6: 運行遷移

```bash
npm run prisma:migrate
# 輸入遷移名稱，如 "add_audit_logs"

npm run prisma:generate
```

### 測試

1. 進行一些操作（創建案例、編輯客戶等）
2. 訪問 `/dashboard/audit-logs`
3. 驗證操作已被記錄

### 驗收標準
- [ ] AuditLog 模型創建且遷移成功
- [ ] 所有 CRUD 操作均被記錄
- [ ] 審計日誌頁面可訪問（僅限 OWNER）
- [ ] 記錄包含時間戳、用戶、IP、操作等信息
- [ ] 變更前後的數據已保存
- [ ] API 端點已實現

---

## 第二部分：Phase 2 功能實現任務

---

## Task 4: 實現時間追踪系統

**優先級**: HIGH  
**工作量**: 3-4 周  
**擁有者**: 前端 + 後端工程師  
**相關檔案**: 見下方

### 頁面要求

#### 4.1 時間條目列表頁 (`/dashboard/time-entries`)

**功能**:
- 顯示所有時間條目的表格
- 支援按日期、案例、狀態篩選
- 支援搜尋
- 分頁（每頁 20 項）
- 編輯、刪除、標記為已計費操作
- 快速操作按鈕（新建時間條目）

**UI 組件**:
```typescript
// app/(dashboard)/time-entries/page.tsx

"use client";

import { useEffect, useState } from "react";
import { Button, Table, Card, Badge } from "@/components/ui";
import Link from "next/link";

interface TimeEntry {
  id: string;
  date: string;
  case: { caseNumber: string; title: string };
  description: string;
  hours: number;
  hourlyRate: number;
  amount: number;
  billed: boolean;
  createdAt: string;
}

export default function TimeEntriesPage() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [filter, setFilter] = useState({ caseId: "", billed: "all" });
  const [page, setPage] = useState(1);

  // 獲取時間條目
  useEffect(() => {
    // API 調用...
  }, [filter, page]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">時間追踪</h1>
        <Link href="/dashboard/time-entries/new">
          <Button>新建時間條目</Button>
        </Link>
      </div>

      {/* 篩選器 */}
      <Card>
        <div className="grid grid-cols-3 gap-4">
          <select
            value={filter.caseId}
            onChange={(e) => setFilter({ ...filter, caseId: e.target.value })}
          >
            <option value="">所有案例</option>
            {/* 案例列表 */}
          </select>

          <select
            value={filter.billed}
            onChange={(e) => setFilter({ ...filter, billed: e.target.value })}
          >
            <option value="all">所有狀態</option>
            <option value="billed">已計費</option>
            <option value="unbilled">未計費</option>
          </select>

          <input type="date" placeholder="篩選日期" />
        </div>
      </Card>

      {/* 表格 */}
      <Card>
        <Table>
          <thead>
            <tr>
              <th>日期</th>
              <th>案例</th>
              <th>描述</th>
              <th>時數</th>
              <th>小時費率</th>
              <th>金額</th>
              <th>狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>
                  <Link href={`/dashboard/cases/${entry.case.id}`}>
                    {entry.case.caseNumber}
                  </Link>
                </td>
                <td>{entry.description}</td>
                <td className="text-right">{entry.hours.toFixed(2)}</td>
                <td className="text-right">HK${entry.hourlyRate}</td>
                <td className="text-right font-semibold">
                  HK${entry.amount.toFixed(2)}
                </td>
                <td>
                  <Badge variant={entry.billed ? "success" : "warning"}>
                    {entry.billed ? "已計費" : "未計費"}
                  </Badge>
                </td>
                <td>
                  <Link href={`/dashboard/time-entries/${entry.id}`}>
                    <Button variant="text" size="sm">
                      編輯
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteEntry(entry.id)}
                  >
                    刪除
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
```

#### 4.2 新建時間條目表單 (`/dashboard/time-entries/new`)

**字段**:
- 案例（下拉，根據事務所自動篩選）
- 日期（日期選擇器，默認今日）
- 開始時間（時間輸入）
- 結束時間（時間輸入）
- 時數（自動計算或手動輸入）
- 描述（文本區域，如"準備訴狀"）
- 小時費率（數值輸入）
- 已計費（複選框）

**驗證規則**:
- 案例必填
- 日期不能晚於案例結案日期
- 結束時間 > 開始時間
- 時數 > 0

#### 4.3 編輯時間條目 (`/dashboard/time-entries/[id]`)

**功能**:
- 預填表單
- 編輯與保存
- 刪除確認

### API 端點

#### 列表 API
```
GET /api/time-entries
Query: ?caseId=xxx&billed=true&page=1&limit=20

Response:
{
  "entries": [
    {
      "id": "...",
      "date": "2026-01-28",
      "caseId": "...",
      "case": { "caseNumber": "HCA-2026-001", "title": "..." },
      "description": "...",
      "hours": 2.5,
      "hourlyRate": 1500,
      "amount": 3750,
      "billed": false,
      "createdAt": "2026-01-28T10:00:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "totalPages": 5
}
```

#### 創建 API
```
POST /api/time-entries
Body:
{
  "caseId": "...",
  "date": "2026-01-28",
  "startTime": "09:00",
  "endTime": "11:30",
  "description": "準備訴狀",
  "hourlyRate": 1500
}

Response: { "id": "...", ... } (201)
```

#### 更新 API
```
PUT /api/time-entries/[id]
Body: { ... 同上 ... }
Response: { "id": "...", ... } (200)
```

#### 刪除 API
```
DELETE /api/time-entries/[id]
Response: { "success": true } (200)
```

### 數據庫模型（已存在，需驗證）

```prisma
model TimeEntry {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  caseId    String?
  case      Case?    @relation(fields: [caseId], references: [id])
  
  date      DateTime
  startTime DateTime?
  endTime   DateTime?
  hours     Float?   // 計算字段：(endTime - startTime) / 3600
  
  description String?
  hourlyRate  Int?    // HKD
  amount      Decimal? // hours * hourlyRate
  
  billed    Boolean  @default(false)
  invoiceId String?
  invoice   Invoice? @relation(fields: [invoiceId], references: [id])
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  firmId    String
  firm      Firm     @relation(fields: [firmId], references: [id])

  @@index([userId])
  @@index([caseId])
  @@index([date])
  @@index([firmId])
}
```

### 實現檢查表
- [ ] TimeEntry 模型已驗證
- [ ] 時間條目列表頁完成
- [ ] 新建/編輯表單完成
- [ ] 所有 API 端點已實現
- [ ] 分頁已實現
- [ ] 篩選功能已測試
- [ ] 驗證規則已實現
- [ ] 時數自動計算已測試
- [ ] 單元測試已完成（覆蓋率 > 80%）
- [ ] API 文檔已更新
- [ ] 審計日誌已集成

### 估計時間: 3-4 周

---

## Task 5: 實現文檔管理系統

**優先級**: HIGH  
**工作量**: 4-5 周  
**擁有者**: 前端 + 後端工程師

### 功能概述

1. **文檔上傳**
   - 支援拖拽上傳
   - 支援多文件批量上傳
   - 文件類型驗證（PDF、Word、Excel 等）
   - 病毒掃描

2. **文檔管理**
   - 關聯案例或客戶
   - 分類（合同、證據、往來信函等）
   - 搜尋與篩選
   - 版本控制

3. **存儲**
   - 使用 AWS S3 或 Cloudflare R2
   - 預簽名 URL
   - 訪問控制

### 實現步驟

#### 步驟 1: 配置對象存儲

AWS S3 配置 (`lib/s3.ts`):

```typescript
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function generatePresignedUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}

export async function uploadToS3(
  file: Buffer,
  key: string,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  await s3Client.send(command);
  return `s3://${process.env.AWS_S3_BUCKET}/${key}`;
}
```

#### 步驟 2: 創建文檔上傳 API

`app/api/documents/upload/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { uploadToS3 } from "@/lib/s3";
import { v4 as uuid } from "uuid";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const caseId = formData.get("caseId") as string;
  const documentType = formData.get("type") as string;

  if (!file) {
    return NextResponse.json(
      { error: "No file provided" },
      { status: 400 }
    );
  }

  // 驗證文件類型
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ];

  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "File type not allowed" },
      { status: 400 }
    );
  }

  // 上傳到 S3
  const buffer = await file.arrayBuffer();
  const key = `documents/${session.user.firmId}/${uuid}/${file.name}`;
  const s3Url = await uploadToS3(
    Buffer.from(buffer),
    key,
    file.type
  );

  // 保存文檔元數據
  const document = await db.document.create({
    data: {
      title: file.name,
      type: documentType || "OTHER",
      url: s3Url,
      uploadedById: session.user.id,
      caseId: caseId || null,
      metadata: {
        originalName: file.name,
        size: file.size,
        uploadedAt: new Date(),
      },
    },
  });

  return NextResponse.json(document, { status: 201 });
}
```

#### 步驟 3: 創建文檔上傳組件

`components/ui/document-upload.tsx`:

```typescript
"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

export interface DocumentUploadProps {
  caseId?: string;
  onUploadComplete?: (document: any) => void;
}

export function DocumentUpload({
  caseId,
  onUploadComplete,
}: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    await uploadFiles(Array.from(files));
  };

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("caseId", caseId || "");

      try {
        const res = await fetch("/api/documents/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const document = await res.json();
        onUploadComplete?.(document);

        setProgress((prev) => prev + 100 / files.length);
      } catch (error) {
        console.error("Upload error:", error);
      }
    }

    setIsUploading(false);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {isUploading ? (
        <div>
          <p>上傳中... {Math.round(progress)}%</p>
          <progress value={progress} max={100} className="w-full" />
        </div>
      ) : (
        <>
          <p className="text-gray-600">拖拽文件或點擊選擇</p>
          <input
            type="file"
            multiple
            onChange={(e) => uploadFiles(Array.from(e.target.files || []))}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input">
            <Button as="span">選擇文件</Button>
          </label>
        </>
      )}
    </div>
  );
}
```

### 驗收標準
- [ ] S3 連接已測試
- [ ] 文檔上傳 API 完成
- [ ] 拖拽上傳 UI 完成
- [ ] 文檔列表頁面完成
- [ ] 文檔下載功能完成
- [ ] 訪問控制已實現
- [ ] 單元測試已完成
- [ ] API 文檔已更新

---

## Task 6: 實現事務所成員管理

**優先級**: MEDIUM  
**工作量**: 2-3 周

### 功能

1. **成員列表** (`/dashboard/members`)
   - 顯示所有事務所成員
   - 顯示角色和狀態
   - 操作按鈕（編輯角色、移除成員）

2. **邀請成員**
   - 添加新成員表單
   - 發送邀請電郵
   - 邀請追蹤

3. **成員詳情編輯**
   - 修改角色
   - 重新發送邀請

### 實現...

（Task 6 及其他任務的詳細實現指南因篇幅限制，可在需要時擴展。以上 Task 1-5 涵蓋最關鍵的初期工作。）

---

## 總結

按照以上任務順序執行：

1. **Task 1** (1-2 天): 部署到測試環境 → 驗收 UAT
2. **Task 2** (2-3 天): 實現速率限制 → 提高安全性
3. **Task 3** (3-4 天): 實現審計日誌 → 符合合規要求
4. **Task 4** (3-4 周): 時間追踪 → Phase 2 核心功能
5. **Task 5** (4-5 周): 文檔管理 → Phase 2 核心功能
6. **Task 6** (2-3 周): 成員管理 → 協作支持

**預估總時間**: 6-8 週 (含並行開發)

---

**文檔版本**: v1.0  
**最後更新**: 2026-01-28  
**準備者**: Monica AI Assistant
