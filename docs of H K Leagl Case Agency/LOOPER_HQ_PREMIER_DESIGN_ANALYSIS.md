# Looper HQ Premier Design System 分析報告

**分析時間**：2026-02-06  
**目標**：評估 Agency 與 Looper HQ 風格統一方案

---

## 🎨 Premier Design System - "Black Veil Empress" (黑紗女皇)

### 核心設計理念
以「尊貴女皇黑紗背後的奢華」為主題，營造神秘、高端、專業的視覺體驗。

### 設計哲學
- **Black Veil** (黑紗)：深邃背景，營造隱私與專業感
- **Empress** (女皇)：金色點綴，展現權威與尊貴
- **Mystery** (神秘)：紫/藍色漸變，增添高雅氛圍

---

## 🎨 配色系統

### 主色調 - Premier Palette
```typescript
// 深邃黑色系
premier-black: {
  DEFAULT: '#0a0a0a',     // 主背景
  light: '#1a1a1a',       // 卡片背景
  medium: '#0f0f0f',      // 次要背景
}

// 奢華金色系
premier-gold: {
  DEFAULT: '#D4AF37',     // 皇家金
  rose: '#B8860B',        // 玫瑰金
  champagne: '#F7E7CE',   // 香檳金
  dark: '#9A7B2F',        // 深金色
}

// 神秘紫色系
premier-mystery: {
  violet: '#4A148C',      // 深紫
  purple: '#6A1B9A',      // 皇家紫
  blue: '#1A237E',        // 午夜藍
  indigo: '#283593',      // 深靛藍
}

// 優雅中性色
premier-pearl: {
  DEFAULT: '#F5F5F5',     // 珍珠白
  gray: '#C0C0C0',        // 銀灰
  cream: '#FAFAF8',       // 奶油白
}
```

### 漸變背景
```typescript
bg-premier-dark: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
bg-premier-gold: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)'
bg-premier-mystery: 'linear-gradient(135deg, #4A148C 0%, #1A237E 100%)'
bg-premier-veil: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.1) 0%, transparent 70%)'
```

---

## 📦 核心組件套件

### 1. GlassCard (玻璃態卡片)
**檔案**：`components/ui/glass-card.tsx`

**變體**：
- `default` - 標準玻璃效果
- `gold` - 金色玻璃
- `mystery` - 神秘紫色
- `frosted` - 霧面玻璃

**功能**：
- ✅ Glassmorphism 效果
- ✅ 動態 hover 動畫
- ✅ 可選發光效果 (`glow` prop)
- ✅ Framer Motion 整合

**使用範例**：
```tsx
<GlassCard variant="gold" glow animated>
  <GlassCardHeader>
    <GlassCardTitle>Premium Content</GlassCardTitle>
  </GlassCardHeader>
  <GlassCardContent>...</GlassCardContent>
</GlassCard>
```

---

### 2. PremierButton (奢華按鈕)
**檔案**：`components/ui/premier-button.tsx`

**變體**：
- `primary` - 金色漸變 + 發光
- `secondary` - 玻璃效果 + 金色邊框
- `ghost` - 透明金色文字
- `outline` - 金色外框
- `mystery` - 紫色漸變

**尺寸**：`sm | default | lg | xl | icon`

**功能**：
- ✅ Icon 支援（左/右位置）
- ✅ Loading 狀態
- ✅ Hover/Tap 動畫
- ✅ 金色發光陰影

**使用範例**：
```tsx
<PremierButton variant="primary" icon={Plus} loading={isLoading}>
  New Case
</PremierButton>
```

---

### 3. GradientBorder (動態漸變邊框)
**檔案**：`components/effects/gradient-border.tsx`

**功能**：
- ✅ 旋轉漸變邊框動畫
- ✅ 可調邊框寬度
- ✅ 可調旋轉速度
- ✅ 三級發光強度（low/medium/high）

**使用範例**：
```tsx
<GradientBorder borderWidth={2} speed={3} glowIntensity="high">
  <div className="p-6">Premium Content</div>
</GradientBorder>
```

---

### 4. ParticleBackground (粒子背景)
**檔案**：`components/effects/particle-background.tsx`

**功能**：
- ✅ 動態粒子效果
- ✅ 適用於登陸頁/英雄區塊
- ✅ 金色粒子點綴

---

### 5. 其他 UI 組件
**檔案路徑**：`components/ui/`

- `activity-timeline.tsx` - 活動時間軸
- `badge.tsx` - 徽章標籤
- `card.tsx` - 標準卡片
- `stat-card.tsx` - 統計卡片
- `progress-ring.tsx` - 進度環
- `page-loader.tsx` - 頁面載入器
- `skeleton.tsx` - 骨架屏
- `table.tsx` - 表格
- `tabs.tsx` - 分頁標籤

---

## 🎨 設計細節

### 圓角系統 (Border Radius)
```typescript
premier-sm: '8px',
premier-md: '12px',
premier-lg: '16px',
premier-xl: '20px',
premier-2xl: '24px',
```

### 陰影系統 (Box Shadow)
```typescript
// 細微層次
premier-xs: '0 1px 4px rgba(212,175,55,0.08)'
premier-sm: '0 2px 8px rgba(212,175,55,0.12)'

// 中等層次 + 發光
premier-md: '0 4px 16px rgba(212,175,55,0.15), 0 2px 8px rgba(212,175,55,0.1)'
premier-lg: '0 8px 32px rgba(212,175,55,0.2), 0 4px 16px rgba(212,175,55,0.15)'

// 戲劇性層次
premier-xl: '0 12px 48px rgba(212,175,55,0.25), 0 8px 24px rgba(212,175,55,0.18)'
premier-2xl: '0 24px 64px rgba(212,175,55,0.3), 0 12px 32px rgba(212,175,55,0.2)'

// 發光效果
premier-glow: '0 0 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.15)'
premier-glow-lg: '0 0 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.2)'

// 內陰影（玻璃效果）
premier-inner: 'inset 0 1px 2px rgba(255,255,255,0.1)'
```

### 字體階層 (Typography)
```typescript
// 展示級別
display-1: ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }]
display-2: ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }]

// 優雅階層
premier-xl: ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }]
premier-lg: ['1.5rem', { lineHeight: '1.4' }]
premier-md: ['1.125rem', { lineHeight: '1.6' }]
```

### 字體家族
```typescript
sans: ['Inter', 'Noto Sans TC', 'system-ui', 'sans-serif']
serif: ['Playfair Display', 'Noto Serif TC', 'serif']
mono: ['JetBrains Mono', 'monospace']
```

---

## 🎭 動畫效果

### 關鍵幀動畫
```typescript
shimmer: translateX(-100%) → translateX(100%)       // 閃光效果
gradient-rotate: rotate(0deg) → rotate(360deg)      // 漸變旋轉
float: translateY(0) → translateY(-20px) → 0        // 浮動
pulse-glow: opacity(1) → opacity(0.6) → 1           // 脈衝發光
```

### Framer Motion 變體
**檔案**：`lib/animations.ts`

- `cardHoverVariants` - 卡片 hover 效果
- `buttonHoverVariants` - 按鈕互動效果

---

## 📱 Looper HQ 頁面架構

### 當前頁面配置
**開發伺服器端口**：`localhost:3002` (從 copilot-instructions.md 推測)

### 頁面結構 (根據目錄)
```
apps/web/app/
├── page.tsx                    # 登陸頁
├── landing/                    # 行銷頁面
├── (auth)/                     # 認證路由組
│   └── login/auth/            # 登入/註冊頁
├── (dashboard)/               # 儀表板路由組
│   ├── dashboard/             # 主儀表板
│   ├── cases/                 # 案件管理
│   ├── clients/               # 客戶管理
│   ├── documents/             # 文件管理
│   ├── time-tracking/         # 時間追蹤
│   ├── billing/               # 帳單管理
│   ├── calendar/              # 日曆
│   ├── search/                # 搜尋
│   ├── public-cases/          # 公開案件搜尋 (PREMIUM+ 專屬)
│   ├── test-case-linking/     # 測試：案件連結
│   └── settings/              # 設定
└── api/                       # API 路由
```

### 特殊功能頁面
**Premier Search Card** (高端會員專屬)
- 位置：Dashboard 主頁（Quick Actions 下方）
- 訪問級別：PREMIUM & PREMIER
- 功能：公開案件智能搜尋
- 設計：金色漸變 + 皇冠徽章 + 星光效果

---

## 🔄 HK-Legal-Case-Agency vs Looper HQ 對比

### 相同點
- ✅ Next.js 14+ App Router
- ✅ TypeScript
- ✅ TailwindCSS
- ✅ Prisma + PostgreSQL
- ✅ NextAuth.js
- ✅ 相似的頁面結構（cases, clients, dashboard）

### 差異點

| 項目 | Agency (localhost:3000) | Looper HQ (localhost:3002) |
|------|------------------------|---------------------------|
| **設計系統** | 傳統法律專業風格 | Premier "Black Veil Empress" |
| **配色** | 藍/綠/灰 職業色 | 黑/金/紫 奢華色 |
| **組件庫** | 基礎 shadcn/ui | Premier 高級組件 |
| **動畫** | 基本 CSS transitions | Framer Motion 全面應用 |
| **玻璃效果** | ❌ 無 | ✅ Glassmorphism |
| **會員系統** | ❌ 無 | ✅ 4 級會員 (BASIC→PREMIER) |
| **特殊效果** | ❌ 無 | ✅ 粒子背景、漸變邊框 |
| **字體** | Inter | Inter + Playfair Display |
| **國際化** | en/zh | (待確認) |
| **端口** | 3000 | 3002 (推測) |

---

## 💡 升級統一方案建議

### 方案 A：完全統一到 Premier Design（推薦）
**優點**：
- ✅ 品牌形象一致性
- ✅ Agency 獲得高端視覺升級
- ✅ 複用 Looper HQ 成熟組件
- ✅ 展現專業與奢華並重

**實施步驟**：
1. 複製 Premier 配色到 Agency `tailwind.config.ts`
2. 移植核心組件：GlassCard, PremierButton, GradientBorder
3. 更新登陸頁使用 ParticleBackground
4. 替換所有按鈕為 PremierButton
5. 卡片統一使用 GlassCard
6. 添加 Framer Motion 動畫

**工作量**：中等（2-3 天）
**風險**：低（Premier 系統已穩定）

---

### 方案 B：保持獨立風格，輕度借鑑
**特色**：
- Agency：保持專業、嚴肅、信任感
- Looper HQ：高端、奢華、科技感

**借鑑元素**：
- ✅ 陰影系統（premier-* shadows）
- ✅ 圓角系統（premier-* border radius）
- ✅ 部分動畫效果
- ❌ 不使用金色系
- ❌ 保持原有藍/綠配色

**工作量**：小（0.5-1 天）
**風險**：極低

---

### 方案 C：混合風格（雙主題系統）
**設計**：
- 公開頁面：傳統專業風格（建立信任）
- 儀表板：Premier 高端風格（提升體驗）

**技術**：
- 使用 CSS Variables 實現主題切換
- 根據路由組應用不同設計系統

**工作量**：大（4-5 天）
**風險**：中等（複雜度高）

---

## 🎯 推薦實施：方案 A（完全統一）

### 理由
1. **品牌一致性**：Looper HQ 是 Agency 的升級版，應共享視覺語言
2. **技術成熟**：Premier 系統已完整開發並測試
3. **提升價值**：Agency 獲得高端視覺升級，提升產品價值
4. **長期維護**：單一設計系統，降低維護成本

### 立即行動項目
1. [ ] 複製 Looper HQ tailwind.config.ts 到 Agency
2. [ ] 複製核心組件到 Agency components/ui/
3. [ ] 更新 Agency 登陸頁使用 Premier 風格
4. [ ] 替換儀表板組件為 Premier 版本
5. [ ] 添加 Framer Motion 依賴
6. [ ] 測試所有頁面渲染

---

## 📦 需要移植的文件清單

### Tailwind 配置
- `apps/web/tailwind.config.ts` → Agency

### 核心組件
```
components/ui/
├── glass-card.tsx          # ⭐ 核心
├── premier-button.tsx      # ⭐ 核心
├── stat-card.tsx
├── activity-timeline.tsx
├── progress-ring.tsx
└── page-loader.tsx

components/effects/
├── gradient-border.tsx     # ⭐ 核心
└── particle-background.tsx # ⭐ 登陸頁
```

### 動畫庫
- `lib/animations.ts` (如果存在)

### 字體
- Playfair Display (serif) - Google Fonts

---

## 🚀 下一步

### 決策點
**請確認**：
1. 使用哪個方案（A/B/C）？
2. 是否保留 Agency 原有配色作為備選主題？
3. 是否需要會員系統（BASIC→PREMIER）？

### 準備工作
- [ ] 備份 Agency 當前設計系統
- [ ] 建立 `docs/DESIGN_MIGRATION_PLAN.md`
- [ ] 準備組件對照表
- [ ] 建立測試檢查清單

---

**報告完成時間**：2026-02-06  
**下一步**：等待方案確認後開始實施
