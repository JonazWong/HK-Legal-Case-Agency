# Agency → Premier Design System 升級實施方案

**制定時間**：2026-02-06  
**目標**：將 HK-Legal-Case-Agency 升級到 Looper HQ Premier "Black Veil Empress" 設計系統

---

## 📊 現狀對比

### Agency (當前)
- **配色**：Teal/Mint Green 專業色系
- **風格**：傳統法律專業風格
- **組件**：基礎 UI 組件（11 個）
- **效果**：基本 CSS 動畫
- **登陸頁**：Video 背景

### Looper HQ (目標)
- **配色**：Black/Gold/Purple 奢華色系
- **風格**：Premier "Black Veil Empress"
- **組件**：高級 UI 組件（16+ 個）
- **效果**：Framer Motion + Glassmorphism
- **登陸頁**：Particle 背景 + 動態效果

---

## 🎯 升級方案：完全統一（推薦）

### 理由
1. ✅ **品牌升級**：從專業提升到奢華專業
2. ✅ **技術成熟**：Looper HQ 已驗證穩定
3. ✅ **維護簡化**：單一設計語言
4. ✅ **用戶體驗**：視覺與交互全面提升

---

## 📋 實施清單

### Phase 1: 基礎設施 (Day 1 上午)

#### 1.1 Tailwind 配置升級
**檔案**：`tailwind.config.ts`

**新增配色系統**：
```typescript
colors: {
  // 保留原有 teal 系列（向後兼容）
  ...existing,
  
  // 新增 Premier 配色
  premier: {
    black: {
      DEFAULT: '#0a0a0a',
      light: '#1a1a1a',
      medium: '#0f0f0f',
    },
    gold: {
      DEFAULT: '#D4AF37',
      rose: '#B8860B',
      champagne: '#F7E7CE',
      dark: '#9A7B2F',
    },
    mystery: {
      violet: '#4A148C',
      purple: '#6A1B9A',
      blue: '#1A237E',
      indigo: '#283593',
    },
    pearl: {
      DEFAULT: '#F5F5F5',
      gray: '#C0C0C0',
      cream: '#FAFAF8',
    },
  },
}
```

**新增陰影系統**：
```typescript
boxShadow: {
  ...existing,
  'premier-xs': '0 1px 4px rgba(212,175,55,0.08)',
  'premier-sm': '0 2px 8px rgba(212,175,55,0.12)',
  'premier-md': '0 4px 16px rgba(212,175,55,0.15), 0 2px 8px rgba(212,175,55,0.1)',
  'premier-lg': '0 8px 32px rgba(212,175,55,0.2), 0 4px 16px rgba(212,175,55,0.15)',
  'premier-xl': '0 12px 48px rgba(212,175,55,0.25), 0 8px 24px rgba(212,175,55,0.18)',
  'premier-2xl': '0 24px 64px rgba(212,175,55,0.3), 0 12px 32px rgba(212,175,55,0.2)',
  'premier-glow': '0 0 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.15)',
  'premier-glow-lg': '0 0 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.2)',
  'premier-inner': 'inset 0 1px 2px rgba(255,255,255,0.1)',
}
```

**新增圓角系統**：
```typescript
borderRadius: {
  ...existing,
  'premier-sm': '8px',
  'premier-md': '12px',
  'premier-lg': '16px',
  'premier-xl': '20px',
  'premier-2xl': '24px',
}
```

**新增動畫**：
```typescript
keyframes: {
  ...existing,
  'gradient-rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
  },
  'pulse-glow': {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.6' },
  },
}
```

**狀態**：⏳ 待實施

---

#### 1.2 安裝依賴
```bash
npm install framer-motion class-variance-authority
```

**狀態**：⏳ 待實施

---

#### 1.3 創建工具函數
**檔案**：`lib/animations.ts` (新建)

```typescript
// Framer Motion 動畫預設
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const cardHoverVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
}

export const buttonHoverVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
}
```

**狀態**：⏳ 待實施

---

### Phase 2: 核心組件移植 (Day 1 下午)

#### 2.1 GlassCard (⭐ 最重要)
**來源**：`Looper-HQ/apps/web/components/ui/glass-card.tsx`  
**目標**：`Agency/components/ui/glass-card.tsx`

**功能**：
- ✅ 4 種變體（default, gold, mystery, frosted）
- ✅ Glassmorphism 效果
- ✅ 可選發光（glow prop）
- ✅ Framer Motion 動畫

**優先級**：🔥 P0

---

#### 2.2 PremierButton
**來源**：`Looper-HQ/apps/web/components/ui/premier-button.tsx`  
**目標**：`Agency/components/ui/premier-button.tsx`

**功能**：
- ✅ 5 種變體（primary, secondary, ghost, outline, mystery）
- ✅ Icon 支援（左/右位置）
- ✅ Loading 狀態
- ✅ 金色發光陰影

**優先級**：🔥 P0

---

#### 2.3 GradientBorder
**來源**：`Looper-HQ/apps/web/components/effects/gradient-border.tsx`  
**目標**：`Agency/components/ui/gradient-border.tsx`

**功能**：
- ✅ 旋轉漸變邊框動畫
- ✅ 可調速度與發光強度

**優先級**：🔥 P0

---

#### 2.4 ParticleBackground
**來源**：`Looper-HQ/apps/web/components/effects/particle-background.tsx`  
**目標**：`Agency/components/ui/particle-background.tsx`

**功能**：
- ✅ 動態粒子效果
- ✅ 金色粒子點綴

**優先級**：🔥 P0（登陸頁必需）

---

#### 2.5 其他組件
**來源目錄**：`Looper-HQ/apps/web/components/ui/`

- ✅ `activity-timeline.tsx` - P1
- ✅ `progress-ring.tsx` - P1  
- ✅ `page-loader.tsx` - P2
- ✅ `dialog.tsx` - P2
- ✅ `tabs.tsx` - P2

**優先級**：P1-P2

---

#### 2.6 更新現有組件
**檔案**：`components/ui/stat-card.tsx`

升級為 Premier 風格：
- GlassCard 背景
- 金色 icon 容器
- Hover 發光效果

**優先級**：P1

---

### Phase 3: 頁面升級 (Day 2)

#### 3.1 登陸頁 (app/page.tsx)
**優先級**：🔥 P0

**修改**：
```tsx
// 舊：Video 背景
<video autoPlay muted loop>...</video>

// 新：Particle + Video 混合
<ParticleBackground particleCount={30} />
<video className="opacity-30">...</video>

// 按鈕升級
<Link className="bg-primary hover:bg-blue-800"> // 舊
<PremierButton variant="primary" size="lg"> // 新
```

**效果**：
- 深色背景 + 金色粒子
- Premier 按鈕樣式
- 漸變標題文字

---

#### 3.2 儀表板主頁 (app/(dashboard)/dashboard/page.tsx)
**優先級**：P0

**統計卡片**：
```tsx
// 舊
<Card className="p-6 bg-white">
  <h3 className="text-teal-dark">{title}</h3>
  <p className="text-3xl font-bold">{value}</p>
</Card>

// 新
<GlassCard variant="gold" glow>
  <StatCard
    title={title}
    value={value}
    icon={Icon}
    change={{ value: 12, trend: 'up' }}
  />
</GlassCard>
```

**快速操作按鈕**：
```tsx
// 舊
<Button className="bg-teal-600">新增檔案</Button>

// 新
<PremierButton variant="primary" icon={Plus}>
  新增檔案
</PremierButton>
```

---

#### 3.3 案件列表頁 (app/(dashboard)/cases/page.tsx)
**優先級**：P1

**卡片容器**：
```tsx
// 舊
<Card>
  <CardContent>
    <Table data={cases} />
  </CardContent>
</Card>

// 新
<GlassCard variant="default" glow>
  <GlassCardContent>
    <Table data={cases} className="glass-table" />
  </GlassCardContent>
</GlassCard>
```

---

#### 3.4 客戶列表頁 (app/(dashboard)/clients/page.tsx)
**優先級**：P1

**同案件頁面升級模式**

---

#### 3.5 新增檔案頁 (app/(dashboard)/cases/new/page.tsx)
**優先級**：P1

**表單容器**：
```tsx
<GlassCard variant="frosted">
  <form onSubmit={handleSubmit}>
    <Input className="glass-input" />
    <PremierButton type="submit" loading={isLoading}>
      提交
    </PremierButton>
  </form>
</GlassCard>
```

---

### Phase 4: 全局樣式 (Day 2 下午)

#### 4.1 CSS 變量更新
**檔案**：`app/globals.css`

```css
:root {
  /* 新增 Premier 變量 */
  --premier-black: #0a0a0a;
  --premier-gold: #D4AF37;
  --premier-mystery: #4A148C;
  --premier-pearl: #F5F5F5;
}

/* Glassmorphism 效果 */
.glass-card {
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.2);
  box-shadow: 0 8px 32px rgba(212, 175, 55, 0.15);
}

.glass-gold {
  background: linear-gradient(135deg, 
    rgba(212, 175, 55, 0.1) 0%, 
    rgba(74, 20, 140, 0.05) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.3);
}

/* 文字漸變 */
.text-gradient-gold {
  background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

#### 4.2 字體升級
**檔案**：`app/layout.tsx`

```tsx
import { Inter } from 'next/font/google'
import { Playfair_Display } from 'next/font/google' // 新增

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ // 新增
  subsets: ['latin'],
  variable: '--font-serif',
})

<html className={`${inter.className} ${playfair.variable}`}>
```

**Tailwind 配置**：
```typescript
fontFamily: {
  sans: ['Inter', 'Noto Sans TC', 'system-ui', 'sans-serif'],
  serif: ['var(--font-serif)', 'Playfair Display', 'Noto Serif TC', 'serif'],
}
```

---

### Phase 5: 測試與優化 (Day 3)

#### 5.1 功能測試
- [ ] 所有頁面渲染正常
- [ ] 動畫流暢（60fps）
- [ ] Glassmorphism 效果正確
- [ ] 按鈕互動回饋正常
- [ ] 表單功能未受影響

#### 5.2 性能優化
- [ ] Lighthouse 評分 > 90
- [ ] 粒子數量控制在 30-50
- [ ] 使用 `will-change` 優化動畫
- [ ] 懶加載非關鍵組件

#### 5.3 無障礙檢查
- [ ] 鍵盤導航正常
- [ ] 顏色對比度符合 WCAG AA
- [ ] ARIA 標籤完整
- [ ] `prefers-reduced-motion` 支援

#### 5.4 跨瀏覽器測試
- [ ] Chrome/Edge 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] 移動端瀏覽器

---

## 📁 檔案移植清單

### 從 Looper HQ 複製到 Agency

```
Tailwind 配置
├── tailwind.config.ts (合併配色)
└── app/globals.css (新增 glass 樣式)

核心組件 (components/ui/)
├── glass-card.tsx ⭐
├── premier-button.tsx ⭐
├── activity-timeline.tsx
├── progress-ring.tsx
├── page-loader.tsx
├── dialog.tsx
└── tabs.tsx

特效組件 (components/effects/ → components/ui/)
├── gradient-border.tsx ⭐
└── particle-background.tsx ⭐

工具函數
├── lib/animations.ts (新建)
└── lib/utils.ts (確認 cn 函數存在)

字體
└── app/layout.tsx (新增 Playfair Display)
```

---

## ⚠️ 注意事項

### 向後兼容
- ✅ **保留原有 teal 配色**（部分頁面可能仍使用）
- ✅ **保留原有組件**（Button, Card 等）
- ✅ **漸進式升級**（一個頁面一個頁面替換）

### 法律合規
- ✅ **用語保持**：「新增檔案」「檔案編號」等已統一
- ✅ **功能不變**：只升級視覺，不改變業務邏輯

### 性能考量
- ⚠️ **Glassmorphism 較耗 GPU**：限制使用範圍
- ⚠️ **Framer Motion bundle size**：~60KB gzipped
- ✅ **懶加載粒子效果**：僅登陸頁使用

---

## 🚀 實施時程

### Day 1 (8 小時)
- **上午 (4h)**：Tailwind 配置 + 依賴安裝 + 工具函數
- **下午 (4h)**：複製 4 個核心組件 + 測試渲染

### Day 2 (8 小時)
- **上午 (4h)**：登陸頁 + Dashboard 主頁升級
- **下午 (4h)**：Cases/Clients 列表頁升級 + 全局樣式

### Day 3 (4 小時)
- **上午 (2h)**：新增頁面 + 其他頁面升級
- **下午 (2h)**：測試 + 優化 + 文檔更新

**總計**：20 小時（2.5 個工作日）

---

## ✅ 成功標準

### 視覺標準
- [ ] 深色背景 + 金色強調色
- [ ] 玻璃態卡片效果
- [ ] 金色發光陰影
- [ ] 流暢的動畫過渡

### 功能標準
- [ ] 所有現有功能正常
- [ ] 法律合規用語保持
- [ ] 測試 100% 通過
- [ ] 無 TypeScript 錯誤

### 性能標準
- [ ] Lighthouse Performance > 90
- [ ] First Contentful Paint < 1.5s
- [ ] 動畫維持 60fps
- [ ] Bundle size 增幅 < 100KB

---

## 📊 預計效果

### Before (Agency Current)
```
配色：Teal/Green 專業色系
風格：傳統法律平台
視覺：✅ 專業 | ⭕ 普通
體驗：✅ 功能完整 | ⭕ 視覺平淡
```

### After (Premier Design)
```
配色：Black/Gold/Purple 奢華色系
風格：Black Veil Empress 女皇風格
視覺：✅ 專業 | ✅ 奢華 | ✅ 高端
體驗：✅ 功能完整 | ✅ 視覺震撼 | ✅ 交互流暢
```

---

## 🎯 下一步行動

### 立即確認
1. **方案確認**：完全統一到 Premier（是/否）
2. **時程確認**：2.5 天可接受（是/調整）
3. **保留選項**：是否需要主題切換功能（保留舊風格選項）

### 準備開始
確認後我將：
1. ✅ 備份當前 Agency 設計系統
2. ✅ 開始 Phase 1: Tailwind 配置升級
3. ✅ 複製核心組件
4. ✅ 逐頁面升級並測試

---

**方案制定完成**  
**等待您的確認即可開始實施** 🚀
