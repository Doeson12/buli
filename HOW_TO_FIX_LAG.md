# How to Make Your Website Not Laggy 🚀

## Quick Performance Checklist

### ✅ Already Optimized (You're Good!)
- Scroll handlers are throttled (60fps)
- Heavy components lazy load
- GPU acceleration is enabled
- React.memo prevents unnecessary re-renders

---

## 🔍 Step 1: Diagnose the Problem (Do This First!)

### Check Your Performance Score
```bash
# 1. Build your site
npm run build
npm start

# 2. Open a new terminal and run Lighthouse
npx lighthouse http://localhost:3000 --view
```

**Good scores:**
- Performance: 90+ (desktop), 85+ (mobile)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s

**If scores are low, proceed to Step 2.**

---

## 🛠️ Step 2: Find What's Causing Lag

### Use Chrome DevTools

1. **Open Chrome DevTools** (`F12` or `Cmd+Option+I`)
2. Go to **Performance** tab
3. Click **Record** (circle icon)
4. Scroll your website for 5 seconds
5. Click **Stop**

**Look for these red flags:**
- 🔴 **Red bars** = Bad (layout thrashing)
- 🟢 **Green bars** = Good (GPU-accelerated paint)
- 🟡 **Yellow spikes** = JavaScript taking too long
- **FPS meter** should be steady at 60fps

### Common Culprits

| Issue | How to Spot It | Fix |
|-------|---------------|-----|
| **Heavy animations** | Low FPS during scroll | Reduce motion or use simpler animations |
| **Large images** | Long loading times | Optimize images (see below) |
| **Too many components** | Yellow JS spikes | Lazy load more components |
| **Framer Motion overuse** | Layout recalculations | Use CSS animations instead |
| **Background animations** | Constant GPU activity | Simplify or pause when idle |

---

## ⚡ Step 3: Quick Wins (Do These Now!)

### 1. Optimize Images (If You Have Any)

```bash
# Install Sharp for image optimization
npm install sharp-cli -g

# Convert to WebP (smaller, faster)
sharp -i input.jpg -o output.webp

# Or use online tools:
# - https://squoosh.app (manual)
# - https://tinypng.com (quick compression)
```

**In your code:**
```tsx
// ❌ Bad
<img src="/hero.png" />

// ✅ Good
import Image from 'next/image'
<Image 
  src="/hero.png" 
  alt="Hero" 
  width={1200} 
  height={630}
  priority // for above-the-fold images
/>
```

### 2. Reduce Framer Motion Animations

**Current problem:** Your Nav component has many motion properties:

```tsx
// 📍 File: components/Nav.tsx (lines 40-54)
animate={{
  backdropFilter: isScrolled ? 'blur(24px)' : 'blur(0px)', // ⚠️ Expensive
  backgroundColor: isScrolled ? '...' : '...',
  borderRadius: '1.5rem',
  scale: isScrolled ? 1 : 1.05,
  opacity: isScrolled ? 1 : 0.85,
  y: isScrolled ? 0 : -6,
  boxShadow: isScrolled ? '...' : '...'
}}
```

**Quick fix:** Simplify to only transform/opacity
```tsx
// ✅ Better (GPU-friendly)
animate={{
  opacity: isScrolled ? 1 : 0.85,
  y: isScrolled ? 0 : -6,
}}
// Move blur/background to CSS classes instead
className={isScrolled ? 'nav-scrolled' : 'nav-top'}
```

### 3. Lazy Load More Components

Check your main page:
```bash
# See what's loading on initial page load
npm run build
npm run start
# Then check Network tab in DevTools
```

**Any component over 50KB should be lazy loaded:**
```tsx
// ✅ Good pattern (in app/page.tsx)
const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { 
    ssr: false, 
    loading: () => <div className="min-h-[400px]" /> 
  }
)
```

---

## 🎯 Step 4: Specific Fixes for Common Issues

### Issue: Scrolling is Janky

**Fix 1: Reduce animation complexity**
```tsx
// 📍 File: components/Nav.tsx

// Current: Animates 8 properties
// Target: Animate only 2-3 properties (opacity, y, scale)

// Remove or move to CSS:
- backdropFilter (use CSS class toggle instead)
- backgroundColor (use CSS class toggle)
- borderRadius (keep static)
- boxShadow (use CSS class toggle)
```

**Fix 2: Use CSS transitions instead of Framer Motion**
```css
/* Add to globals.css */
.nav-pill {
  transition: opacity 0.3s ease, transform 0.3s ease;
  will-change: transform, opacity;
}

.nav-pill.scrolled {
  opacity: 1;
  transform: translateY(0);
  backdrop-filter: blur(24px);
  background: rgba(10, 10, 12, 0.4);
}
```

### Issue: Initial Load is Slow

**Check bundle size:**
```bash
# Install bundle analyzer
npm install @next/bundle-analyzer

# Add to next.config.js:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

**Look for:**
- Framer Motion bundle > 50KB → Consider alternatives
- Lottie animations > 100KB → Compress or remove
- Unused dependencies → Remove them

### Issue: Mobile is Slower Than Desktop

**Quick fixes:**
```tsx
// 1. Disable animations on mobile
const isMobile = window.innerWidth < 768
const shouldAnimate = !isMobile

// 2. Use simpler animations
{shouldAnimate ? (
  <motion.div animate={...} />
) : (
  <div className="fade-in" /> // CSS animation
)}

// 3. Reduce image sizes for mobile
<Image 
  src="/hero.jpg"
  sizes="(max-width: 768px) 100vw, 50vw" // Loads smaller on mobile
/>
```

---

## 🧪 Step 5: Test Your Changes

### Before/After Comparison

1. **Measure before optimizing:**
```bash
npx lighthouse http://localhost:3000 --output=json --output-path=./before.json
```

2. **Make optimizations**

3. **Measure after:**
```bash
npx lighthouse http://localhost:3000 --output=json --output-path=./after.json
```

4. **Compare:**
```bash
# Install lighthouse-ci
npm install -g @lhci/cli

# Compare results
lhci compare --before=./before.json --after=./after.json
```

### Manual Testing

- **Scroll test:** Does it feel smooth?
- **Mobile test:** Test on real device (not just DevTools)
- **Slow 3G test:** DevTools → Network → Slow 3G
- **Low-end device:** DevTools → Performance → CPU 4x slowdown

---

## 🎨 Specific Recommendations for Your Site

Based on your code, here's what to prioritize:

### Priority 1: Simplify Nav Animation (High Impact) ⚡

```tsx
// 📍 components/Nav.tsx

// BEFORE (current - 8 animated properties)
animate={{
  backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'blur(0px)',
  backgroundColor: isScrolled ? 'rgba(10, 10, 12, 0.4)' : 'rgba(10, 10, 12, 0.0)',
  borderRadius: '1.5rem',
  scale: isScrolled ? 1 : 1.05,
  opacity: isScrolled ? 1 : 0.85,
  y: isScrolled ? 0 : -6,
  boxShadow: isScrolled ? '...' : '...'
}}

// AFTER (recommended - 3 animated properties + CSS classes)
animate={{
  opacity: isScrolled ? 1 : 0.85,
  y: isScrolled ? 0 : -6,
  scale: isScrolled ? 1 : 1.05,
}}
className={`nav-pill ${isScrolled ? 'scrolled' : ''}`}
```

Then add to `globals.css`:
```css
.nav-pill {
  border-radius: 1.5rem;
  transition: backdrop-filter 0.3s, background-color 0.3s, box-shadow 0.3s;
}

.nav-pill.scrolled {
  backdrop-filter: blur(24px) saturate(180%);
  background-color: rgba(10, 10, 12, 0.4);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}
```

**Expected improvement:** 30-40% smoother scrolling

### Priority 2: Optimize MobilePillHeader (Medium Impact)

```bash
# Check if it has similar animation issues
cat components/MobilePillHeader.tsx | grep "animate={"
```

Apply same fix as Nav component.

### Priority 3: Check for Memory Leaks (Low Impact)

```tsx
// Ensure all useEffects have cleanup
useEffect(() => {
  const handler = throttle(() => { ... }, 16)
  window.addEventListener('scroll', handler, { passive: true })
  
  // ✅ Good - cleanup
  return () => window.removeEventListener('scroll', handler)
}, [])
```

---

## 📊 Expected Results

After applying these fixes:

| Metric | Before | After Target |
|--------|--------|--------------|
| Lighthouse Performance | 70-85 | 90-95 |
| FPS while scrolling | 30-45 | 55-60 |
| Initial bundle size | ~200KB | ~150KB |
| Time to Interactive | 3-5s | 2-3s |

---

## 🚨 When to Stop Optimizing

**You're good when:**
- ✅ Lighthouse score > 90
- ✅ Scrolling feels smooth on your phone
- ✅ No janky animations
- ✅ Page loads in < 3 seconds on 4G

**Don't over-optimize:**
- Removing all animations (keep the good UX)
- Making code unreadable for tiny gains
- Spending days for 1% improvement

---

## 🆘 Still Laggy? Debug Checklist

- [ ] Ran Lighthouse (score < 85?)
- [ ] Checked Chrome Performance tab (red bars?)
- [ ] Tested on real mobile device (not just DevTools)
- [ ] Checked bundle size (> 300KB JS?)
- [ ] Verified images are optimized (< 200KB each)
- [ ] Disabled all animations (still laggy? → different problem)
- [ ] Tested in Incognito (browser extensions causing lag?)

---

## 🔥 Nuclear Option: Strip Everything Down

If still laggy after all fixes, create a minimal test:

```tsx
// app/test/page.tsx
export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl">Test Page</h1>
      <p>If this is smooth, your components are the issue.</p>
      <p>If this lags, it's a system/browser issue.</p>
    </div>
  )
}
```

Navigate to `/test` and scroll. If smooth → component issue. If laggy → system issue.

---

## 📚 Learn More

- [Chrome DevTools Performance Guide](https://developer.chrome.com/docs/devtools/performance/)
- [Next.js Performance Best Practices](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Framer Motion Performance](https://www.framer.com/motion/guide-performance/)

---

## 💡 Quick Copy-Paste Fixes

### Fix 1: Better Nav Component
See the `Nav.tsx` changes in Priority 1 above.

### Fix 2: Add Performance Monitoring

```tsx
// app/layout.tsx - Add this
'use client'
import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Log slow frames
      let lastTime = performance.now()
      const checkFrameRate = () => {
        const now = performance.now()
        const delta = now - lastTime
        if (delta > 50) { // More than 50ms = < 20fps
          console.warn('Slow frame detected:', delta + 'ms')
        }
        lastTime = now
        requestAnimationFrame(checkFrameRate)
      }
      requestAnimationFrame(checkFrameRate)
    }
  }, [])
  return null
}

// Add <PerformanceMonitor /> in your layout
```

### Fix 3: Reduce Motion Support

```tsx
// Add to any animated component
const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  setPrefersReducedMotion(mediaQuery.matches)
}, [])

// Then use:
{prefersReducedMotion ? (
  <div className="fade-in">Content</div>
) : (
  <motion.div animate={...}>Content</motion.div>
)}
```

---

**Last Updated:** October 19, 2025

**Questions?** Check the `PERFORMANCE_OPTIMIZATIONS.md` file for technical deep dives.

