# 法律合規說明 - 檔案編號 vs 案件編號
# Legal Compliance - File Number vs Court Case Number

**重要性**: ⚠️ **法律合規要求 (Legal Compliance Requirement)**  
**日期**: 2026-02-06  
**版本**: 1.0.0

---

## 🚨 重要區分

### ❌ 錯誤做法：混淆兩種編號
系統**不可**將自動生成的內部編號稱為「案件編號」(Case Number)，這會造成法律合規問題。

### ✅ 正確做法：明確區分

#### 1. 檔案編號 (File Number / Internal Reference)
**由事務所系統自動生成的內部管理編號**

```typescript
// 資料庫欄位: caseNumber (歷史命名，實際是檔案編號)
// 格式: HCA-YYYY-NNN
// 範例: HCA-2026-001, HCA-2026-002

// 用途：
- 事務所內部檔案管理
- 文件歸檔索引
- 內部報表統計
- 客戶溝通參考

// 生成方式：
const fileNumber = `HCA-${year}-${nextNumber.toString().padStart(3, '0')}`;
```

**特性**：
- ✅ 由系統自動生成
- ✅ 用於內部管理
- ✅ 不具法律效力
- ✅ 可自訂格式規則

#### 2. 案件編號 (Court Case Number)
**由香港司法機構正式分配的官方編號**

```typescript
// 資料庫欄位: courtReference
// 格式: 由法院決定
// 範例: HCCC 123/2023, DCCC 456/2023, HCAL 789/2024

// 用途：
- 法院文件引用
- 正式法律文書
- 司法系統查詢
- 判例引用

// 取得方式：
// ❌ 系統不可自動生成
// ✅ 由法院在立案時分配
// ✅ 律師手動輸入到 courtReference 欄位
```

**特性**：
- ✅ 由司法機構分配
- ✅ 具有法律效力
- ✅ 全港唯一識別
- ❌ 系統不可自行生成

---

## 📋 Prisma Schema 說明

```prisma
model Case {
  id              String   @id @default(cuid())
  
  // ⚠️ 注意：此欄位名稱為歷史遺留
  // 實際儲存的是「檔案編號」，而非「案件編號」
  caseNumber      String   @unique  // 內部檔案編號 HCA-YYYY-NNN
  
  // ✅ 此欄位才是真正的「案件編號」
  courtReference  String?          // 法院分配的案件編號 (如 HCCC 123/2023)
  
  // 其他欄位...
}
```

### 為何不重新命名欄位？

考慮因素：
1. **向後相容性**: 已有大量程式碼依賴 `caseNumber` 欄位
2. **資料遷移成本**: 需要更新所有現有記錄
3. **漸進式改進**: 通過註釋和文件說明現況

**建議做法**：
- ✅ 在程式碼註釋中明確說明
- ✅ 在 UI 顯示時使用正確術語（「檔案編號」）
- ✅ 在文件中清楚區分兩者
- 🔄 未來版本考慮重構欄位名稱

---

## 🎨 UI/UX 指引

### 顯示標籤 (Display Labels)

```typescript
// ✅ 正確
<Label>檔案編號 (File Number)</Label>
<Value>{case.caseNumber}</Value>  // HCA-2026-001

<Label>法院案件編號 (Court Case Number)</Label>
<Value>{case.courtReference || '待法院分配'}</Value>  // HCCC 123/2023

// ❌ 錯誤
<Label>案件編號</Label>
<Value>{case.caseNumber}</Value>  // 會造成混淆！
```

### 使用者說明文字

```tsx
<FormField name="caseNumber">
  <Label>檔案編號</Label>
  <Input value={caseNumber} disabled />
  <HelpText>
    系統自動生成的內部檔案編號，用於事務所內部管理。
    此編號不同於法院分配的正式案件編號。
  </HelpText>
</FormField>

<FormField name="courtReference">
  <Label>法院案件編號</Label>
  <Input 
    value={courtReference} 
    placeholder="如: HCCC 123/2023"
  />
  <HelpText>
    由香港司法機構在立案時分配的正式案件編號。
    如案件尚未立案，此欄位可留空。
  </HelpText>
</FormField>
```

---

## 💻 程式碼範例

### API 路由註釋

```typescript
// POST /api/cases
export async function POST(req: NextRequest) {
  // ✅ 正確註釋
  // Generate internal file number in format HCA-YYYY-NNN
  // Note: This is NOT an official court case number
  // Official case numbers are assigned by judiciary and stored in courtReference
  
  const fileNumber = `HCA-${year}-${nextNumber.toString().padStart(3, '0')}`;
  
  const newCase = await prisma.case.create({
    data: {
      caseNumber: fileNumber,      // 內部檔案編號
      courtReference: undefined,    // 法院編號待填入
      // ...
    }
  });
}
```

### 測試描述

```typescript
// ✅ 正確
describe('POST /api/cases', () => {
  it('應該創建新案件並生成檔案編號', async () => {
    // 測試系統是否正確生成內部檔案編號
  });
  
  it('應該允許手動輸入法院案件編號', async () => {
    // 測試 courtReference 欄位的輸入
  });
});

// ❌ 錯誤
describe('POST /api/cases', () => {
  it('應該創建新案件並生成案件編號', async () => {
    // 誤導：暗示系統可生成官方案件編號
  });
});
```

---

## 📊 資料庫查詢範例

### 查詢所有待立案案件（無法院編號）

```typescript
const pendingCourtFilingCases = await prisma.case.findMany({
  where: {
    firmId: session.user.firmId,
    courtReference: null,  // 尚未取得法院分配的案件編號
    status: 'ACTIVE'
  },
  orderBy: {
    caseNumber: 'desc'  // 按內部檔案編號排序
  }
});
```

### 查詢特定法院案件

```typescript
const courtCase = await prisma.case.findFirst({
  where: {
    courtReference: 'HCCC 123/2023'  // 使用法院分配的正式編號查詢
  }
});
```

---

## 🔍 驗證與校驗

### 檔案編號驗證

```typescript
// 驗證內部檔案編號格式
function isValidFileNumber(fileNumber: string): boolean {
  return /^HCA-\d{4}-\d{3}$/.test(fileNumber);
}

// 範例
isValidFileNumber('HCA-2026-001');  // true
isValidFileNumber('HCCC 123/2023'); // false (這是法院編號)
```

### 法院案件編號驗證

```typescript
// 驗證香港法院案件編號格式
function isValidCourtCaseNumber(caseNumber: string): boolean {
  // 常見格式: HCCC 123/2023, DCCC 456/2023, HCAL 789/2024
  return /^[A-Z]{2,6}\s+\d+\/\d{4}$/.test(caseNumber);
}

// 範例
isValidCourtCaseNumber('HCCC 123/2023');  // true
isValidCourtCaseNumber('HCA-2026-001');   // false (這是內部編號)
```

---

## 📚 相關文件

### PublicCase 模型中的 caseNumber

在 `PublicCase` 模型中，`caseNumber` 欄位**確實**是指法院案件編號：

```prisma
model PublicCase {
  id              String   @id @default(cuid())
  source          String   // "JUDICIARY", "HKLII", "NEWS"
  caseNumber      String?  // ✅ 這裡是真正的法院案件編號 (如 HCCC 123/2023)
  courtReference  String?  // 法院參考
  // ...
}
```

**區別原因**：
- `Case` 模型：事務所內部案件管理 → `caseNumber` 是內部編號
- `PublicCase` 模型：公開法院判例 → `caseNumber` 是法院編號

---

## ⚠️ 法律風險與合規要點

### 禁止行為

❌ **不可**將系統生成的編號稱為「案件編號」對外呈現  
❌ **不可**在正式文件中使用內部檔案編號代替法院編號  
❌ **不可**暗示系統能夠生成具法律效力的案件編號  
❌ **不可**混淆兩種編號的用途和權限

### 合規要求

✅ **必須**在 UI 明確標示「檔案編號」vs「法院案件編號」  
✅ **必須**在律師培訓中說明兩者差異  
✅ **必須**在用戶手冊中解釋編號系統  
✅ **必須**確保正式文書只使用法院分配的編號

---

## 🔄 未來改進計劃

### Phase 1: 文件與註釋（已完成 ✅）
- [x] 更新程式碼註釋
- [x] 建立此合規說明文件
- [x] 修正測試描述

### Phase 2: UI/UX 改進（建議執行）
- [ ] 更新所有表單標籤為「檔案編號」
- [ ] 添加工具提示說明兩種編號的差異
- [ ] 在案件詳情頁面清楚區分顯示

### Phase 3: 資料庫重構（長期計劃）
- [ ] 考慮將 `Case.caseNumber` 重命名為 `Case.fileNumber`
- [ ] 建立遷移腳本
- [ ] 更新所有相關程式碼

---

## 📞 聯絡與支援

如對編號系統有任何疑問，請參考：
- [ARCHITECTURE.md](../ARCHITECTURE.md) - 系統架構文件
- [Prisma Schema](../prisma/schema.prisma) - 資料庫結構定義
- [API Documentation](../API.md) - API 說明

**法律合規顧問**: 如涉及法律合規問題，請諮詢專業法律顧問

---

**文件建立**: 2026-02-06  
**最後更新**: 2026-02-06  
**維護者**: Looper HQ Development Team  
**重要性**: 🔴 **Critical - Legal Compliance**

---

*此文件為法律合規要求，所有開發人員必須閱讀並遵守。*
