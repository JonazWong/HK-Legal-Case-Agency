# Dashboard Redesign - Code Examples

## 🎨 Key Component Examples

### 1. StatCard Usage (Before vs After)

**Before - Basic Card:**
```tsx
<Card>
  <CardContent className="pt-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-cool-gray">Total Cases</p>
        <p className="text-3xl font-bold text-charcoal">{stats.totalCases}</p>
      </div>
      <div className="w-12 h-12 bg-mint-green bg-opacity-10 rounded-lg">
        <svg>...</svg>
      </div>
    </div>
  </CardContent>
</Card>
```

**After - Enhanced StatCard:**
```tsx
<StatCard
  title="Total Cases"
  value={stats.totalCases}
  trend={{ value: 12, isPositive: true }}
  color="teal"
  icon={<svg className="w-7 h-7">...</svg>}
  miniChart={
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={miniChartData}>
        <Line type="monotone" dataKey="value" stroke="#3BA19D" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  }
/>
```

### 2. Loading States (Before vs After)

**Before - Simple Spinner:**
```tsx
{loading ? '-' : stats.totalCases}
```

**After - Skeleton Screen:**
```tsx
{loading ? (
  <>
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </>
) : (
  // Actual content
)}
```

### 3. Card Variants

```tsx
// Default card
<Card variant="default">Content</Card>

// Gradient card (new)
<Card variant="gradient">Content</Card>

// Glass effect (new)
<Card variant="glass">Content</Card>

// Hover lift effect (new)
<Card variant="hover-lift">Content</Card>

// Custom shadows (new)
<Card shadow="soft">Content</Card>
<Card shadow="glow">Content</Card>
```

### 4. Badge Enhancements

```tsx
// Gradient badge (new)
<Badge variant="gradient">
  🎉 New
</Badge>

// Badge with icon (new)
<Badge variant="success" icon={<CheckIcon />}>
  Completed
</Badge>

// Pulsing badge (new)
<Badge variant="pulse">
  Live
</Badge>
```

### 5. Routing Fix

**Before - No Locale Support:**
```tsx
// Navbar.tsx
const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Cases', href: '/cases' },
];
```

**After - Locale-Aware:**
```tsx
// Navbar.tsx
const currentLocale = pathname?.startsWith('/en') ? 'en' : 'zh';
const localePrefix = `/${currentLocale}`;

const navigation = [
  { name: 'Dashboard', href: `${localePrefix}/dashboard` },
  { name: 'Cases', href: `${localePrefix}/cases` },
];
```

### 6. Tailwind Configuration Extensions

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      teal: {
        50: '#E6F7F7',
        // ... full scale
        900: '#003D47',
      }
    },
    boxShadow: {
      'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
      'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
      'strong': '0 8px 32px rgba(0, 0, 0, 0.16)',
      'glow': '0 0 24px rgba(59, 161, 157, 0.3)',
    },
    animation: {
      'fade-in': 'fadeIn 0.5s ease-in',
      'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    }
  }
}
```

### 7. Data Visualization - Pie Chart

```tsx
<ResponsiveContainer width="100%" height="100%">
  <PieChart>
    <Pie
      data={caseStatusData}
      cx="50%"
      cy="50%"
      innerRadius={60}
      outerRadius={90}
      paddingAngle={5}
      dataKey="count"
    >
      {caseStatusData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry.color} />
      ))}
    </Pie>
  </PieChart>
</ResponsiveContainer>
```

### 8. Quick Action Cards

**Before:**
```tsx
<Link href="/cases/new" className="p-4 border-2 border-light-gray rounded-lg">
  <div className="flex items-center space-x-3">
    <div className="w-10 h-10 bg-mint-green rounded-lg">
      <svg>...</svg>
    </div>
    <div>
      <p className="font-semibold">New Case</p>
    </div>
  </div>
</Link>
```

**After:**
```tsx
<Link 
  href={`/${locale}/cases/new`}
  className="group p-5 bg-white border-2 border-teal-200 rounded-xl hover:border-teal-500 hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
>
  <div className="flex items-center space-x-4">
    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-mint-green rounded-xl flex items-center justify-center shadow-md group-hover:shadow-glow">
      <svg className="w-6 h-6 text-white">...</svg>
    </div>
    <div>
      <p className="font-semibold text-charcoal text-lg">New Case</p>
      <p className="text-sm text-cool-gray">Create a new case</p>
    </div>
  </div>
</Link>
```

## 🎯 Animation Classes

```css
/* Fade In */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in;
}

/* Hover Lift */
.hover:-translate-y-1 {
  transform: translateY(-4px);
}

/* Smooth Transitions */
.transition-all.duration-300 {
  transition: all 300ms;
}

/* Pulse Slow */
.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

## 📊 Component Architecture

```
Dashboard Page
├── Header (with gradient badge)
├── Stats Grid (4 columns)
│   ├── StatCard (Total Cases) + Trend + Sparkline
│   ├── StatCard (Active Cases) + Trend + Sparkline
│   ├── StatCard (Total Clients) + Trend + Sparkline
│   └── StatCard (Pending Invoices) + Trend + Sparkline
├── Charts & Activities (2 columns)
│   ├── Case Status Pie Chart (Recharts)
│   └── Recent Activities Timeline
└── Quick Actions (3 gradient cards)
    ├── New Case (teal gradient)
    ├── New Client (blue gradient)
    └── Log Time (green gradient)
```

## 🚀 Performance Optimizations

1. **Code Splitting:** Dashboard bundle separate from other pages
2. **CSS Transforms:** GPU-accelerated animations
3. **Lazy Loading:** Charts only render when visible
4. **Minimal Recharts:** Only import needed components
5. **Skeleton Screens:** Perceived performance improvement

## ✨ Accessibility Features

- Semantic HTML5 elements
- ARIA labels maintained
- Keyboard navigation support
- Color contrast ratios (WCAG AA)
- Screen reader friendly
- Focus indicators on interactive elements

---

**Summary:** Every aspect of the dashboard has been thoughtfully redesigned with modern UX patterns, proper architecture, and attention to detail.
