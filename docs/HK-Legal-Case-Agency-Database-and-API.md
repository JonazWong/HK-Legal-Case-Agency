# HK Legal Case Agency 数据库模型和 API 端点详解

## 数据库模型架构

### 枚举类型 (Enums)

#### 用户角色 (UserRole)
```
OWNER   - 事务所所有者（完全权限）
ADMIN   - 管理员（大部分权限）
STAFF   - 员工（有限权限）
CLIENT  - 客户（只读权限，只能查看自己的数据）
```

#### 订阅等级 (SubscriptionTier)
```
STARTER       - HK$3,100/月（1-2 人）
PROFESSIONAL  - HK$7,000/月（5-20 人）
ENTERPRISE    - HK$10,100+/月（20-100 人）
CUSTOM        - 自定义（100+ 人）
```

#### 案例状态 (CaseStatus)
```
ACTIVE      - 進行中（活跃案例）
PENDING     - 待確認（待确认案例）
COMPLETED   - 已完成（已结案）
ARCHIVED    - 已打檔（存档案例）
```

#### 案例分类 (CaseCategory)
```
CIVIL          - 民事诉讼
CRIMINAL       - 刑事辩护
CORPORATE      - 公司法
FAMILY         - 家庭法
PROPERTY       - 物业法
IMMIGRATION    - 移民法
LABOUR         - 劳动法
OTHER          - 其他
```

#### 发票状态 (InvoiceStatus)
```
DRAFT      - 草稿
SENT       - 已发送
PAID       - 已支付
OVERDUE    - 逾期
CANCELLED  - 已取消
```

#### 文档类型 (DocumentType)
```
CONTRACT          - 合同
EVIDENCE          - 证据
CORRESPONDENCE    - 来往信函
COURT_FILING      - 法院提交
TEMPLATE          - 模板
OTHER             - 其他
```

---

## 核心数据模型 (11 个模型)

### 1. User 模型（用户）

**用途**: 存储律师事务所用户

**字段**:
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String (CUID) | 主键 |
| name | String? | 用户名 |
| email | String | 电子邮件（唯一） |
| passwordHash | String? | 密码哈希 |
| role | UserRole | 用户角色 |
| locale | String | 语言设置（默认: zh） |
| emailVerified | DateTime? | 邮箱验证时间 |
| image | String? | 用户头像 URL |
| failedLoginCount | Int | 失败登录次数 |
| lockedUntil | DateTime? | 账户锁定时间 |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |
| firmId | String? | 所属事务所 ID |

**关系**:
- 属于一个 Firm（事务所）
- 有多个 TimeEntry（时间条目）
- 创建多个 Document（文档）
- 创建多个 Message（消息）
- 分配多个 Case（案例）
- 有多个 Account（OAuth 账户）
- 有多个 Session（会话）

---

### 2. Account 模型（OAuth 账户）

**用途**: NextAuth.js OAuth 账户链接

**字段**: OAuth 提供商信息、tokens 等

---

### 3. Session 模型（会话）

**用途**: NextAuth.js 会话管理

**字段**: sessionToken, userId, expires 等

---

### 4. VerificationToken 模型（验证令牌）

**用途**: 邮件验证和密码重置令牌

---

### 5. Firm 模型（事务所）

**用途**: 存储律师事务所信息

**字段**:
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 主键 |
| name | String | 事务所名称 |
| registrationNumber | String? | 注册编号（唯一） |
| address | String? | 地址 |
| phone | String? | 电话 |
| email | String? | 邮箱 |
| website | String? | 网站 |
| employeeCount | Int? | 员工数 |
| subscriptionTier | SubscriptionTier | 订阅等级 |
| subscriptionStatus | String | 订阅状态 |
| subscriptionEndsAt | DateTime? | 订阅截止日期 |
| billingEmail | String? | 账单邮箱 |
| taxId | String? | 税务 ID |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |

**关系**:
- 有多个 User（用户）
- 有多个 Client（客户）
- 有多个 Case（案例）
- 有多个 Invoice（发票）

---

### 6. Client 模型（客户）

**用途**: 存储律师事务所的客户信息

**字段**:
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 主键 |
| firstName | String | 名字 |
| lastName | String | 姓氏 |
| email | String? | 电子邮件 |
| phone | String? | 电话 |
| alternatePhone | String? | 备用电话 |
| address | String? | 地址 |
| idNumber | String? | 身份证号 / 护照号 |
| dateOfBirth | DateTime? | 出生日期 |
| occupation | String? | 职业 |
| company | String? | 公司 |
| notes | String? | 备注 |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |
| firmId | String | 所属事务所 ID |

**关系**:
- 属于一个 Firm（事务所）
- 有多个 Case（案例）
- 有多个 Message（消息）

---

### 7. Case 模型（案例）

**用途**: 存储法律案例信息

**字段**:
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 主键 |
| caseNumber | String | 案例编号（唯一，格式: HCA-YYYY-NNN） |
| title | String | 案例标题 |
| description | String? | 案例描述 |
| category | CaseCategory | 案例分类 |
| status | CaseStatus | 案例状态 |
| filingDate | DateTime? | 提交日期 |
| closingDate | DateTime? | 结案日期 |
| courtReference | String? | 法院参考号 |
| estimatedBudget | Decimal? | 预算 |
| clientId | String? | 主要客户 ID |
| assignedToId | String? | 负责律师/员工 ID |
| priority | String? | 优先级 |
| tags | String[]? | 标签列表 |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |
| firmId | String | 所属事务所 ID |

**关系**:
- 属于一个 Firm
- 关联多个 Client（当案件有多个当事人）
- 有多个 Document、Invoice、TimeEntry、Message

---

### 8. Document 模型（文档）

**用途**: 存储与案件或客户相关的文件元数据和存储引用

**字段**:
| id | String | 主键 |
| title | String | 标题 |
| type | DocumentType | 文档类型 |
| url | String | 存储 URL |
| uploadedById | String | 上传者 ID |
| caseId | String? | 关联案例 ID |
| clientId | String? | 关联客户 ID |
| metadata | Json? | 额外元数据 |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |

---

### 9. Invoice 模型（发票）

**用途**: 账单和付款记录

**字段**:
| id | String | 主键 |
| invoiceNumber | String | 发票编号 |
| status | InvoiceStatus | 发票状态 |
| amount | Decimal | 总金额 |
| dueDate | DateTime? | 到期日 |
| issuedAt | DateTime? | 开票日期 |
| caseId | String? | 关联案例 |
| clientId | String? | 客户 |
| firmId | String | 事务所 |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |

---

### 10. TimeEntry 模型（时间记录）

**用途**: 记录律师或员工的计费时间

**字段**:
| id | String | 主键 |
| userId | String | 员工/律师 ID |
| caseId | String? | 关联案例 |
| minutes | Int | 时长（分钟） |
| description | String? | 描述 |
| billed | Boolean | 是否已计费 |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |

---

### 11. Message 模型（消息/通讯）

**用途**: 案件或客户相关的内部消息或外部通信记录

**字段**:
| id | String | 主键 |
| senderId | String | 发送者 ID |
| recipientIds | String[] | 接收者 ID 列表 |
| subject | String? | 主题 |
| body | String | 内容 |
| attachments | String[]? | 附件 URL 列表 |
| caseId | String? | 关联案例 |
| clientId | String? | 关联客户 |
| createdAt | DateTime | 创建时间 |

---

## API 端点概览

下面列出常见的 RESTful 端点（基于 /api/v1）以及简要说明。鉴于权限和多租户需求，所有端点应基于事务所 (firmId) 过滤并进行授权检查。

通用行为:
- 返回格式: JSON
- 鉴权: Bearer token (JWT) 或基于 NextAuth 的会话
- 错误代码: 400, 401, 403, 404, 422, 500

示例端点:

- GET /api/v1/firms - 列出事务所（超管）
- POST /api/v1/firms - 创建事务所（超管）

- GET /api/v1/firms/:firmId/users - 列出事务所用户
- POST /api/v1/firms/:firmId/users - 创建用户
- GET /api/v1/firms/:firmId/users/:userId - 获取用户
- PATCH /api/v1/firms/:firmId/users/:userId - 更新用户
- DELETE /api/v1/firms/:firmId/users/:userId - 删除用户

- GET /api/v1/firms/:firmId/clients - 列出客户
- POST /api/v1/firms/:firmId/clients - 创建客户

- GET /api/v1/firms/:firmId/cases - 列出案例（支持 filter: status, category, assignedTo, clientId, q）
- POST /api/v1/firms/:firmId/cases - 创建案例
- GET /api/v1/firms/:firmId/cases/:caseId - 获取案例详细
- PATCH /api/v1/firms/:firmId/cases/:caseId - 更新案例

- GET /api/v1/firms/:firmId/cases/:caseId/documents - 列出案例文档
- POST /api/v1/firms/:firmId/cases/:caseId/documents - 上传文档（返回存储 URL）

- GET /api/v1/firms/:firmId/invoices - 列出发票
- POST /api/v1/firms/:firmId/invoices - 创建发票

- GET /api/v1/firms/:firmId/time-entries - 列出时间记录
- POST /api/v1/firms/:firmId/time-entries - 创建时间记录

- POST /api/v1/auth/login - 登录（返回 token）
- POST /api/v1/auth/verify-email - 邮箱验证流程
- POST /api/v1/auth/forgot-password - 密码重置

---

## 权限和角色示例策略

- OWNER: 完全访问事务所资源，管理订阅、成员、计费
- ADMIN: 管理大部分资源（用户、客户、案例、文档、发票），但不能更改订阅细节
- STAFF: 创建/编辑案例、时间记录、文档、消息；不能管理用户或订阅
- CLIENT: 只读访问其相关案例、文档和发票（通过受限客户端门户）

---

## 存储与文件处理

建议使用外部对象存储（如 S3 兼容）保存文档，数据库只存储元数据与外部 URL。上传流程应支持预签名 URL 以减低服务器带宽压力。

---

## 审计与合规

- 关键操作（创建/删除/更新用户、案例、发票、文档）应记录审计日志
- 保留策略可基于订阅等级与合规需求配置

---

## 备注

该文档为系统设计概要，便于后续生成 Prisma schema、数据库迁移脚本与 API 实现细节。可根据实际需求扩展字段（如多地址、联系人、案件阶段、费用明细、税务设置等）。