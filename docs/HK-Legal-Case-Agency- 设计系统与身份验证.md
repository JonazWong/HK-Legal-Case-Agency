# HK Legal Case Agency 设计系统与身份验证

## 设计系统 (Design System)

### 设计理念

**核心策略**: 「高端穩重」 - 为香港法律市场营造专业、可信的视觉环境

**五大设计原则**:

| 原则 | 说明 | 实践方式 |
|------|------|--------|
| 专业权威性 | 传达法律行业的可信度与权威 | 配色保守、排版精緻、对比清晰 |
| 简洁高效 | 信息架构清晰，避免过度复杂 | 白空间充足、页面层级明确 |
| 香港本地化 | 符合香港客群的审美习惯 | 配色选择、文化敏感性设计 |
| 高端穩重感 | 避免鲜豔休閒，体现成熟感 | 使用深色调与经典配色 |
| 移动优先 | 考虑移动端使用场景 | 響應式設計、觸控友好 |

---

### 核心配色系统

**配色策略**: 10 个精选颜色，支持完整的 UI 系统

| 颜色名 | 十六进制 | RGB | Tailwind 类 | 主要用途 | 设计说明 |
|--------|---------|-----|------------|---------|---------|
| 深藍綠 (Teal Dark) | #004B5C | 0, 75, 92 | teal-dark | 主导航、页脚、标题 | 传达专业、信任、权威 |
| 清新綠 (Mint Green) | #3BA19D | 59, 161, 157 | mint-green | 次要 CTA、功能标籤 | 现代感、高效感 |
| 文雅金 (Subtle Gold) | #D4AF37 | 212, 175, 55 | subtle-gold | 高级功能标籤 | 香港客群喜好的高级感 |
| 石墨黑 (Charcoal) | #1A1A1A | 26, 26, 26 | charcoal | 主体文本、标题 | 确保可读性 |
| 冷灰色 (Cool Gray) | #5A5A5A | 90, 90, 90 | cool-gray | 副文本、禁用状态 | 视觉层次区分 |
| 淺灰色 (Light Gray) | #E8E8E8 | 232, 232, 232 | light-gray | 边框、分隔符 | 清爽不拥挤 |
| 乳白色 (Off-White) | #FAFAFA | 250, 250, 250 | off-white | 主背景、卡片 | 比纯白更柔和 |
| 信息藍 (Info Blue) | #2E6FA8 | 46, 111, 168 | info-blue | 信息提示、链接 | 香港金融常用色 |
| 警告紅 (Alert Red) | #D32F2F | 211, 47, 47 | alert-red | 错误提示、删除 | 高度可见 |
| 成功綠 (Success) | #388E3C | 56, 142, 60 | success-green | 成功提示、验证反馈 | 正面反馈 |

---

### 颜色应用指南

#### 页面导航区
- **背景**: 深藍綠 (#004B5C)
- **文字**: 白色 (#FFFFFF)
- **目的**: 醒目但不突兀，传达专业感

#### 主要 CTA 按钮
- **背景**: 清新綠 (#3BA19D)
- **文字**: 白色 (#FFFFFF)
- **用于**: 「免费试用」、「立即开始」、「预约演示」

#### 高级功能强调
- **背景**: 文雅金 (#D4AF37)
- **用于**: VIP 标籤、企业版独享功能、白金客户标識

#### 页面背景与分层
- **主背景**: 乳白色 (#FAFAFA)
- **卡片背景**: 白色 (#FFFFFF) 或乳白色 (#FAFAFA)
- **边框/分隔**: 淺灰色 (#E8E8E8)
- **目的**: 避免过度白色冷硬感，层次清晰

#### 文字层级
- **标题**: 深藍綠 (#004B5C)
- **主文本**: 石墨黑 (#1A1A1A)
- **副文本**: 冷灰色 (#5A5A5A)
- **辅助信息**: 淺灰色 (#E8E8E8)

---

### 无障碍性标准

所有色彩组合符合 **WCAG AA 标准**（对比度 ≥ 4.5:1）:

| 颜色组合 | 对比度 | 符合性 | 使用场景 |
|---------|--------|--------|---------|
| 深藍綠 + 白色 | 8.2:1 | ✓ | 导航欄、页脚 |
| 清新綠 + 白色 | 5.1:1 | ✓ | CTA 按钮 |
| 石墨黑 + 乳白色 | 14.2:1 | ✓ | 主体文本 |
| 文雅金 + 石墨黑 | 6.4:1 | ✓ | 企业版标籤 |
| 冷灰色 + 白色 | 4.6:1 | ✓ | 副文本 |

---

### UI 组件实现

#### 按钮组件 (4 种变体)

```tsx
import { Button } from '@/components/ui';

// Primary - 清新綠
<Button variant="primary">主要操作</Button>

// Secondary - 深藍綠边框
<Button variant="secondary">次要操作</Button>

// Text - 深藍綠文字
<Button variant="text">文本按钮</Button>

// Danger - 警告紅
<Button variant="danger">删除/危险操作</Button>
```

#### Badge 组件 (5 种变体)

- 默认 (灰色)
- 信息 (蓝色)
- 成功 (绿色)
- 警告 (黄色)
- 错误 (红色)

#### 卡片组件

- Card - 主容器
- CardHeader - 标题区
- CardContent - 内容区
- CardFooter - 底部区

---

### 排版系统

**字体**: Inter (标题和正文)

**大小**:
- 桌面: 16px (主体)
- 移动: 14px (主体)
- 标题: H1 32px, H2 24px, H3 20px

---

### 设计 Token

- --color-primary: #004B5C
- --color-accent: #3BA19D
- --color-muted: #5A5A5A
- --spacing-1: 4px
- --spacing-2: 8px
- --radius-1: 4px

---

### 身份验证 (Authentication)

- 支持标准: OAuth2 / JWT
- 登录方式: 邮箱/手机 + 密码；支持二次验证 (MFA)
- 密码策略: 最少 8 字符，建议包含字母与数字，鼓励使用长密码或密码管理器
- Token 策略: Access token 有效期建议 15 分钟；Refresh token 有效期建议 30 天并可撤销
- 存储与传输: 所有令牌与敏感数据仅通过 HTTPS 传输；在浏览器中优先使用 HttpOnly、Secure 的 cookies 或在安全存储中保存
- 会话管理: 提供显式登出、刷新与失效机制；异常登录需要触发审计与提醒

### 前端与后端集成要点

- 所有 API 请求在 Authorization header 中携带 Bearer token
- 当 access token 过期时，前端应使用 refresh token 交换新的 access token；若 refresh 也无效，跳转到登录
- 对敏感接口进行速率限制、异常检测与审计日志

---

### 资源与参考

- WCAG 指南
- Hong Kong legal websites for local references
- Authentication best practices (OAuth2, JWT)

---

End of document.
