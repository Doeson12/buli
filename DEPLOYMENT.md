# Deployment Guide

## Prerequisites

- [ ] Domain name purchased (optional but recommended)
- [ ] GitHub/GitLab account
- [ ] Vercel account (free tier works)
- [ ] Environment variables ready (see `.env.example`)

## Step-by-Step Deployment

### 1. Prepare Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/buli-site.git
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
4. Add environment variables (copy from `.env.example`)
5. Click **Deploy**

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts to link project
# Deploy to production
vercel --prod
```

### 3. Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Analytics (choose one)
NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com

# OR
NEXT_PUBLIC_ANALYTICS_PROVIDER=ga4
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# Email (Resend)
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL=support@yourdomain.com

# hCaptcha (optional but recommended)
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_site_key
HCAPTCHA_SECRET_KEY=0xYOUR_SECRET_KEY

# App Store Links
NEXT_PUBLIC_IOS_APP_URL=https://apps.apple.com/app/idXXXXXXXXX
NEXT_PUBLIC_ANDROID_APP_URL=https://play.google.com/store/apps/details?id=com.buli.app

# Social Links
NEXT_PUBLIC_DISCORD_URL=https://discord.gg/yourcode
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/buliapp
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/buliapp
```

### 4. Custom Domain Setup

#### In Vercel:

1. Go to Project → Settings → Domains
2. Add your domain (e.g., `buli.app`)
3. Add `www.buli.app` as alias
4. Follow DNS configuration instructions

#### DNS Records (Example for Vercel):

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Update Environment Variables:

```bash
NEXT_PUBLIC_SITE_URL=https://buli.app
```

Redeploy after changing.

### 5. SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt. No action needed.

### 6. Performance Optimization

#### Enable Edge Functions

Already configured in:
- `app/api/subscribe/route.ts`
- `app/download/page.tsx`

#### Caching Headers

Vercel auto-configures optimal caching for:
- Static assets (1 year)
- Dynamic pages (revalidate on demand)

#### Image Optimization

Using `next/image` automatically leverages Vercel's Image Optimization:
- Automatic WebP/AVIF conversion
- Lazy loading
- Responsive srcsets

### 7. Post-Deployment Checks

#### Lighthouse Audit

```bash
# Run Lighthouse on production URL
lighthouse https://yourdomain.com --view

# Mobile audit
lighthouse https://yourdomain.com --preset=mobile --view
```

**Target Scores:**
- Performance: ≥ 90 (desktop), ≥ 85 (mobile)
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: 100

#### Functional Tests

- [ ] All pages load correctly
- [ ] Navigation works (desktop + mobile)
- [ ] Email subscription works
- [ ] Download page detects OS correctly
- [ ] Blog posts render with proper formatting
- [ ] Analytics tracking fires (check Plausible dashboard)
- [ ] QR code generates correctly

#### SEO Checks

```bash
# Verify robots.txt
curl https://yourdomain.com/robots.txt

# Verify sitemap (if added)
curl https://yourdomain.com/sitemap.xml

# Check Open Graph tags
curl -I https://yourdomain.com
```

### 8. Monitoring & Analytics Setup

#### Plausible

1. Add site at [plausible.io](https://plausible.io)
2. Verify script loads on live site (check Network tab)
3. Test event: Click a CTA and verify in Plausible dashboard

#### Vercel Analytics

Enable in Vercel Dashboard → Analytics (free):
- Web Vitals tracking
- Real User Monitoring
- Visitor insights

#### Error Tracking (Optional)

Integrate Sentry:

```bash
npm install @sentry/nextjs

# Run Sentry wizard
npx @sentry/wizard -i nextjs
```

### 9. Continuous Deployment

**Auto-deploys on push:**
- Push to `main` → Production deploy
- Push to other branches → Preview deploy

**Preview URLs:**
Every PR gets a unique preview URL for testing.

---

## Troubleshooting

### Build Fails

**Error: `contentlayer/generated` not found**
- Add build step in `package.json`:
  ```json
  "build": "contentlayer build && next build"
  ```

**Error: Out of memory**
- Increase Node memory in `vercel.json`:
  ```json
  {
    "build": {
      "env": {
        "NODE_OPTIONS": "--max_old_space_size=4096"
      }
    }
  }
  ```

### Runtime Errors

**API routes not working**
- Check environment variables are set in Vercel
- Verify API keys are valid
- Check Vercel logs in Dashboard → Deployments → [Latest] → Logs

**Images not loading**
- Ensure images are in `public/` directory
- Check `next.config.js` image domains config
- Verify paths are correct (use `/` prefix for public files)

### Performance Issues

**High LCP (Largest Contentful Paint)**
- Optimize hero image (use AVIF/WebP)
- Preload critical resources
- Use `priority` prop on hero image

**High CLS (Cumulative Layout Shift)**
- Add explicit dimensions to all images
- Use `next/font` for font optimization
- Avoid injecting content above viewport

---

## Advanced Configuration

### Custom Build Command

In `vercel.json`:

```json
{
  "buildCommand": "contentlayer build && next build",
  "devCommand": "next dev",
  "installCommand": "npm install"
}
```

### Edge Runtime Config

For specific pages:

```tsx
// app/your-page/page.tsx
export const runtime = 'edge'
export const dynamic = 'force-dynamic'
```

### Revalidation Strategy

Static pages with ISR (Incremental Static Regeneration):

```tsx
export const revalidate = 3600 // Revalidate every hour
```

### Security Headers

Add to `next.config.js`:

```js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
      ],
    },
  ]
}
```

---

## Rollback

If deployment has issues:

1. Go to Vercel Dashboard → Deployments
2. Find last working deployment
3. Click "..." → Promote to Production

Or via CLI:

```bash
vercel rollback
```

---

## Maintenance

### Weekly
- [ ] Check Vercel analytics for errors
- [ ] Review user feedback

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Run security audit: `npm audit`
- [ ] Review Lighthouse scores

### Quarterly
- [ ] Review and update content
- [ ] Test on latest browsers
- [ ] Check mobile responsiveness

---

## Support

**Deployment Issues:** [Vercel Support](https://vercel.com/support)

**Next.js Issues:** [Next.js Discord](https://nextjs.org/discord)

**Buli-Specific:** Open a GitHub issue or Discord
