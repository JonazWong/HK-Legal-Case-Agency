# Looper HQ - Nexus Platform
## Legal Case Agency - 整合指南

> **Platform**: Looper HQ → Nexus Platform → Legal Case Agency

本文檔說明如何在 Nexus Platform 專案中使用 Monorepo 架構的共享套件。這些套件設計為可在 Nexus Platform 的所有應用中重用。

## 📦 可用套件

### 1. @looper-hq/nexus-utils
香港法律專用的工具函數庫（可擴展至其他專業服務領域）

### 2. @looper-hq/nexus-types
TypeScript 類型定義庫（Nexus Platform 通用型別）

---

## 🛠️ @hk-legal/utils 使用指南

### 日期處理 (`date.ts`)

```typescript
import {
  nowInHK,
  formatDateHK,
  formatDateShort,
  formatDateLong,
  formatDateTime,
  parseHKDate,
  isBusinessDay,
  addBusinessDays,
  getYearStartHK,
  getYearEndHK,
} from '@hk-legal/utils';

// 獲取香港當前時間
const now = nowInHK();
// => 2025-01-29T17:30:00+08:00

// 格式化日期（完整）
const fullDate = formatDateHK(new Date());
// => "Wednesday, 29 January 2025"

// 格式化日期（短）
const shortDate = formatDateShort('2025-01-29');
// => "29/01/2025"

// 格式化日期（長）
const longDate = formatDateLong(new Date());
// => "29 January 2025"

// 格式化日期時間
const dateTime = formatDateTime(new Date());
// => "29/01/2025 17:30"

// 解析香港日期字串
const parsed = parseHKDate('29/01/2025');
// => Date object in HK timezone

// 檢查是否為工作日
const isBizDay = isBusinessDay(new Date());
// => true/false

// 加上工作日（跳過週末）
const futureDate = addBusinessDays(new Date(), 5);
// => Date 5 business days later

// 獲取年度起始/結束日期
const yearStart = getYearStartHK(2025);
const yearEnd = getYearEndHK(2025);
```

### 格式化工具 (`format.ts`)

```typescript
import {
  formatCurrency,
  formatPhoneHK,
  formatFileSize,
  formatPercentage,
  truncateText,
} from '@hk-legal/utils';

// 格式化貨幣（港幣）
const price = formatCurrency(12345.67);
// => "HK$12,345.67"

// 格式化香港電話號碼
const mobile = formatPhoneHK('51234567');
// => "5123 4567"

const landline = formatPhoneHK('28001234');
// => "2800 1234"

// 格式化文件大小
const size = formatFileSize(1024000);
// => "1.00 MB"

// 格式化百分比
const percent = formatPercentage(0.755);
// => "75.5%"

const percent2dp = formatPercentage(0.755, 2);
// => "75.50%"

// 截斷文字
const text = truncateText('This is a very long text...', 10);
// => "This is a..."
```

### 驗證工具 (`validation.ts`)

```typescript
import {
  isValidEmail,
  isValidHKMobile,
  isValidHKPhone,
  isValidHKID,
  isValidBusinessReg,
  isValidCaseNumber,
  isValidURL,
  isValidPostalCode,
  sanitizeInput,
  validatePassword,
} from '@hk-legal/utils';

// Email 驗證
isValidEmail('user@example.com'); // => true

// 香港手機號碼驗證
isValidHKMobile('51234567'); // => true
isValidHKMobile('91234567'); // => true

// 香港電話號碼驗證（手機或固網）
isValidHKPhone('28001234'); // => true

// 香港身份證驗證
isValidHKID('A1234567'); // => true (format check)

// 商業登記號碼驗證
isValidBusinessReg('12345678-000-01-24-5'); // => true

// 案件編號驗證
isValidCaseNumber('HCA-2025-001'); // => true

// URL 驗證
isValidURL('https://example.com'); // => true

// 香港郵政編碼驗證
isValidPostalCode('999077'); // => true

// 清理輸入（XSS 防護）
const clean = sanitizeInput('<script>alert("xss")</script>');
// => "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"

// 密碼強度驗證
const pwdResult = validatePassword('MyP@ssw0rd123');
// => { valid: true, errors: [] }

const weakPwd = validatePassword('weak');
// => { valid: false, errors: ['Password must be at least 8 characters', ...] }
```

### 常數 (`constants.ts`)

```typescript
import {
  APP_NAME,
  MEMBERSHIP_TIERS,
  CASE_STATUSES,
  USER_ROLES,
  DOCUMENT_CATEGORIES,
  NOTIFICATION_TYPES,
  TIMEZONE_HK,
  LOCALE_HK,
  CURRENCY_HKD,
} from '@hk-legal/utils';

// 應用程式名稱
console.log(APP_NAME); // => "HK Legal Case Agency"

// 會員等級
console.log(MEMBERSHIP_TIERS);
/* => {
  FREE: 'free',
  BASIC: 'basic',
  PROFESSIONAL: 'professional',
  ENTERPRISE: 'enterprise',
} */

// 案件狀態
console.log(CASE_STATUSES);
/* => {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PENDING: 'pending',
  ... 
} */

// 用戶角色
console.log(USER_ROLES);
/* => {
  ADMIN: 'admin',
  LAWYER: 'lawyer',
  STAFF: 'staff',
  CLIENT: 'client',
} */
```

---

## 📐 @hk-legal/types 使用指南

### User Types

```typescript
import type {
  UserRole,
  MembershipTier,
  BaseUser,
  UserWithFirm,
} from '@hk-legal/types';

const userRole: UserRole = 'LAWYER';
const tier: MembershipTier = 'PROFESSIONAL';

const user: BaseUser = {
  id: 'user-123',
  email: 'lawyer@example.com',
  name: 'John Doe',
  role: 'LAWYER',
  firmId: 'firm-123',
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

### Case Types

```typescript
import type {
  CaseStatus,
  BaseCase,
  CaseWithRelations,
  CreateCaseInput,
  UpdateCaseInput,
} from '@hk-legal/types';

const status: CaseStatus = 'ACTIVE';

const newCase: CreateCaseInput = {
  title: 'Contract Dispute Case',
  clientId: 'client-123',
  status: 'ACTIVE',
  courtReference: 'HCMP 100/2025',
  priority: 'HIGH',
};

const updateData: UpdateCaseInput = {
  status: 'SETTLED',
  notes: 'Case resolved through mediation',
};
```

### Client Types

```typescript
import type {
  BaseClient,
  ClientWithCases,
  CreateClientInput,
  UpdateClientInput,
} from '@hk-legal/types';

const newClient: CreateClientInput = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  phone: '51234567',
  idNumber: 'A1234567',
};
```

### Document Types

```typescript
import type {
  DocumentCategory,
  BaseDocument,
  DocumentWithCase,
  CreateDocumentInput,
} from '@hk-legal/types';

const category: DocumentCategory = 'LEGAL_BRIEF';

const newDoc: CreateDocumentInput = {
  fileName: 'contract.pdf',
  fileType: 'application/pdf',
  fileSize: 1024000,
  category: 'CONTRACT',
  caseId: 'case-123',
  uploadedById: 'user-123',
};
```

### API Response Types

```typescript
import type {
  ApiResponse,
  PaginatedResponse,
  ErrorResponse,
  ValidationError,
} from '@hk-legal/types';

// 成功響應
const successResponse: ApiResponse<BaseCase> = {
  success: true,
  data: { /* case data */ },
};

// 分頁響應
const paginatedResponse: PaginatedResponse<BaseClient> = {
  data: [/* clients */],
  pagination: {
    page: 1,
    limit: 10,
    total: 100,
    totalPages: 10,
  },
};

// 錯誤響應
const errorResponse: ErrorResponse = {
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid input data',
    details: [
      { field: 'email', message: 'Invalid email format' },
    ],
  },
};
```

---

## 🔧 實際使用範例

### Dashboard 頁面中使用

```typescript
// app/(dashboard)/cases/page.tsx
"use client";

import { useState, useEffect } from "react";
import { formatDateShort, formatCurrency } from '@hk-legal/utils';
import type { CaseWithRelations, PaginatedResponse } from '@hk-legal/types';

export default function CasesPage() {
  const [cases, setCases] = useState<CaseWithRelations[]>([]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    return formatDateShort(dateString);
  };

  return (
    <div>
      {cases.map(c => (
        <div key={c.id}>
          <h3>{c.title}</h3>
          <p>Created: {formatDate(c.createdAt.toString())}</p>
        </div>
      ))}
    </div>
  );
}
```

### API Route 中使用

```typescript
// app/api/cases/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { isValidCaseNumber } from '@hk-legal/utils';
import type { CreateCaseInput, ApiResponse } from '@hk-legal/types';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  
  if (!session?.user?.firmId) {
    return NextResponse.json<ApiResponse<never>>({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Unauthorized' },
    }, { status: 401 });
  }

  const body: CreateCaseInput = await req.json();
  
  // Validate case number if provided
  if (body.caseNumber && !isValidCaseNumber(body.caseNumber)) {
    return NextResponse.json<ApiResponse<never>>({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid case number format',
      },
    }, { status: 400 });
  }

  // ... create case logic
}
```

### 表單驗證中使用

```typescript
// components/forms/ClientForm.tsx
"use client";

import { useState } from 'react';
import { isValidEmail, isValidHKMobile, isValidHKID } from '@hk-legal/utils';
import type { CreateClientInput } from '@hk-legal/types';

export function ClientForm() {
  const [formData, setFormData] = useState<CreateClientInput>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.phone && !isValidHKMobile(formData.phone)) {
      newErrors.phone = 'Invalid Hong Kong mobile number';
    }

    if (formData.idNumber && !isValidHKID(formData.idNumber)) {
      newErrors.idNumber = 'Invalid Hong Kong ID format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Submit form...
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

---

## 🧪 測試中使用

```typescript
// __tests__/components/ClientCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { formatPhoneHK } from '@hk-legal/utils';
import type { BaseClient } from '@hk-legal/types';
import ClientCard from '@/components/clients/ClientCard';

describe('ClientCard', () => {
  it('應該正確格式化電話號碼', () => {
    const client: BaseClient = {
      id: 'client-1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '51234567',
      firmId: 'firm-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { getByText } = render(<ClientCard client={client} />);
    
    expect(getByText(formatPhoneHK('51234567'))).toBeTruthy();
    // Expects: "5123 4567"
  });
});
```

---

## 📝 最佳實踐

### 1. 統一使用 Utils 函數
❌ **不好：**
```typescript
const formatted = new Date(date).toLocaleDateString('en-GB');
```

✅ **好：**
```typescript
import { formatDateShort } from '@hk-legal/utils';
const formatted = formatDateShort(date);
```

### 2. 使用 TypeScript 類型
❌ **不好：**
```typescript
const user: any = { ... };
```

✅ **好：**
```typescript
import type { BaseUser } from '@hk-legal/types';
const user: BaseUser = { ... };
```

### 3. 集中管理常數
❌ **不好：**
```typescript
const ADMIN_ROLE = 'admin';
const LAWYER_ROLE = 'lawyer';
```

✅ **好：**
```typescript
import { USER_ROLES } from '@hk-legal/utils';
const role = USER_ROLES.ADMIN;
```

### 4. 驗證輸入資料
❌ **不好：**
```typescript
if (email.includes('@')) { ... }
```

✅ **好：**
```typescript
import { isValidEmail } from '@hk-legal/utils';
if (isValidEmail(email)) { ... }
```

---

## 🚀 開發流程

### 1. 新增 Util 函數
```bash
# 編輯 packages/utils/src/[category].ts
# 加入新函數

# 更新 packages/utils/src/index.ts
export * from './[category]';

# 重新建置
cd packages/utils
npm run build
```

### 2. 新增 Type 定義
```bash
# 編輯 packages/types/src/[entity].ts
# 加入新類型

# 更新 packages/types/src/index.ts
export * from './[entity]';

# 重新建置
cd packages/types
npm run build
```

### 3. 撰寫測試
```bash
# 建立或編輯 __tests__/utils/[category].test.ts
# 加入測試用例

# 執行測試
npm test -- __tests__/utils/[category].test.ts
```

---

## 📚 參考資源

- [Vitest 文檔](https://vitest.dev/)
- [date-fns 文檔](https://date-fns.org/)
- [TypeScript 文檔](https://www.typescriptlang.org/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**最後更新：** 2026-02-06  
**維護者：** Looper HQ - Nexus Platform Team  
**平台架構：** Looper HQ → Nexus Platform → Legal Case Agency
