# Marketing Website Task List

> Source: `.ai/specs/marketing-website.md`
> Created: 2026-01-11

## Phase 1: Setup & Foundation

- [ ] Initialize Astro project with TypeScript
- [ ] Configure Tailwind CSS with custom color palette (primary #3B82F6, secondary #10B981)
- [ ] Add Inter font from Google Fonts
- [ ] Install Heroicons or Lucide icon library
- [ ] Create project structure (components/, layouts/, assets/)
- [ ] Set up Git repository and push to GitHub

## Phase 2: Core Layout & Navigation

- [ ] Build Layout component with sticky header
- [ ] Create Header component with logo and nav links
- [ ] Implement responsive hamburger menu (mobile)
- [ ] Add GitHub star button (shields.io badge)
- [ ] Build Footer component with links and copyright
- [ ] Test navigation across breakpoints (mobile/tablet/desktop)

## Phase 3: Hero Section

- [ ] Create Hero component with headline and subheadline
- [ ] Add primary CTA button ("Download for Free")
- [ ] Add secondary CTA button ("View on GitHub")
- [ ] Source or create hero illustration (devices + file transfer)
- [ ] Add CSS animation for hero visual
- [ ] Make hero responsive (stack CTAs on mobile)

## Phase 4: Content Sections

- [ ] Build ProblemSolution component (3-column comparison)
- [ ] Build Features component (2x3 grid)
- [ ] Build HowItWorks component (3-step timeline)
- [ ] Build PlatformSupport component (5 platform logos)
- [ ] Build OpenSource component (2-column layout + GitHub stats)
- [ ] Build FAQ component with accordion

## Phase 5: Visual Assets

- [ ] Source feature icons (drag-drop, sync, devices, dark mode, no-account, lightning)
- [ ] Source platform logos (Windows, Mac, Linux, iOS, Android)
- [ ] Create or source file transfer animation
- [ ] Create Open Graph image (1200x630px)
- [ ] Create Twitter Card image (1200x600px)
- [ ] Create favicon (16x16, 32x32, 180x180)

## Phase 6: Dark Mode

- [ ] Configure Tailwind dark mode (class strategy)
- [ ] Add dark: variants to all components
- [ ] Implement prefers-color-scheme detection
- [ ] Add optional manual toggle with localStorage
- [ ] Test dark mode across all sections

## Phase 7: Interactivity & Animations

- [ ] Add scroll-triggered fade-in animations (Intersection Observer)
- [ ] Implement FAQ accordion expand/collapse
- [ ] Add smooth scroll for nav anchor links
- [ ] Add hover states for buttons and cards
- [ ] Test keyboard navigation and focus indicators

## Phase 8: SEO & Meta Tags

- [ ] Add meta title and description
- [ ] Add Open Graph meta tags
- [ ] Add Twitter Card meta tags
- [ ] Add JSON-LD structured data (SoftwareApplication)
- [ ] Create robots.txt
- [ ] Generate sitemap.xml
- [ ] Test with opengraph.xyz and Twitter validator

## Phase 9: Performance Optimization

- [ ] Optimize images (WebP, compress, srcset)
- [ ] Add lazy loading to below-fold images
- [ ] Minify CSS and JS (build step)
- [ ] Inline critical CSS
- [ ] Run Lighthouse audit (target 95+)
- [ ] Test Core Web Vitals (LCP < 2.5s, CLS < 0.1)

## Phase 10: Accessibility Testing

- [ ] Run axe DevTools audit
- [ ] Run WAVE accessibility audit
- [ ] Test with screen reader (NVDA or VoiceOver)
- [ ] Verify WCAG 2.1 AA contrast ratios
- [ ] Add ARIA labels where needed
- [ ] Test keyboard-only navigation

## Phase 11: Deployment

- [ ] Set up Vercel or Netlify project
- [ ] Configure build command and output directory
- [ ] Connect GitHub for automatic deployments
- [ ] Configure custom domain (if applicable)
- [ ] Enable SSL certificate
- [ ] Test production build

## Phase 12: Analytics & Monitoring

- [ ] Optional: Add Plausible or Fathom analytics
- [ ] Set up CTA click events
- [ ] Set up GitHub link click events
- [ ] Configure Lighthouse CI for monitoring
- [ ] Optional: Set up uptime monitoring

---

**Total Tasks**: 60+
**Estimated Phases**: 12
**Stack**: Astro + Tailwind CSS + Vercel
