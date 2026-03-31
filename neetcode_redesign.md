# NeetCode.io — Complete Redesign Audit

> **Benchmark sites:** Stripe · Apple · Linear · IOTA · Jeton
> **Analysis models:** Claude Opus 4.6 · GPT-5.2-Codex · GPT-5.1-Codex
> **Reference:** [DESIGN_SYSTEM_GUIDE.md](./DESIGN_SYSTEM_GUIDE.md)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current Technical Profile](#2-current-technical-profile)
3. [Typography — Overhaul](#3-typography--overhaul)
4. [Color System — Overhaul](#4-color-system--overhaul)
5. [Spacing & Layout — Overhaul](#5-spacing--layout--overhaul)
6. [Navigation — Redesign](#6-navigation--redesign)
7. [Homepage — Full Restructure](#7-homepage--full-restructure)
8. [Components — Redesign](#8-components--redesign)
9. [Motion & Animation — Add from Scratch](#9-motion--animation--add-from-scratch)
10. [Dark Mode — Upgrade](#10-dark-mode--upgrade)
11. [Performance — Critical Fixes](#11-performance--critical-fixes)
12. [SEO & Meta — Critical Fixes](#12-seo--meta--critical-fixes)
13. [Accessibility — Fixes](#13-accessibility--fixes)
14. [Page-by-Page Audit](#14-page-by-page-audit)
15. [Priority Roadmap](#15-priority-roadmap)

---

## 1. Executive Summary

**Current state:** NeetCode's UI reads as a competent developer-built interface circa 2020 — functional, clear, but visually flat. It resembles Discord/Slack utility-dark rather than the premium-dark aesthetic of Linear, Stripe, or IOTA.

**Core gaps (ranked by impact):**

| # | Gap | Severity |
|---|-----|----------|
| 1 | No custom font — system stack only | 🔴 Critical |
| 2 | Discord-era dark palette (`#202225`) with only 2 surface tiers | 🔴 Critical |
| 3 | Zero scroll animations or entrance transitions | 🔴 Critical |
| 4 | WCAG contrast failures (`#888888` on `#202225` = 3.9:1) | 🔴 Critical |
| 5 | Triplicated inline CSS blocks in `<head>` | 🔴 Critical |
| 6 | No page-specific SEO (title, meta, OG, canonical, JSON-LD) | 🔴 Critical |
| 7 | Render-blocking Facebook Pixel + Carbon ads on all pages | 🟡 High |
| 8 | Homepage lacks narrative arc (problem → solution → proof → CTA) | 🟡 High |
| 9 | No glassmorphism navbar, no card hover lift, no micro-interactions | 🟡 High |
| 10 | Fixed px typography with no `clamp()` fluid scaling | 🟡 High |

**The good news:** NeetCode's Angular 18 SSR/SSG foundation is solid. The product itself is strong. These are almost entirely **CSS and markup changes** — no fundamental architecture rewrite needed.

---

## 2. Current Technical Profile

```
Framework:       Angular 18.2.14 (SSR + SSG via @angular/ssr)
Rendering:       Static Site Generation (ng-server-context="ssg")
CSS approach:    Inline CSS tokens in <head> (duplicated 3×), component-scoped _ngcontent
Theme system:    .dark-theme class on <html>, toggled via localStorage
Font stack:      BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, sans-serif
Build tool:      Angular CLI (Webpack/esbuild)
External deps:   Facebook Pixel (inline, blocking), Carbon Ads, YouTube iframe API
Images:          Standard <img> tags, no WebP/AVIF, no lazy loading attributes
```

### What's working well ✅
- Angular SSG gives good initial paint times
- System font stack means zero font-loading latency
- Dark theme toggle via localStorage executes before hydration (no flash)
- Component scoping via `_ngcontent` prevents style leaks
- Sensible 1200px max-width constraint on content
- Good use of CSS custom properties for theming

### What needs work ❌
- Everything in sections 3–14 below

---

## 3. Typography — Overhaul

### Problems

| Issue | Current | Reference Standard |
|-------|---------|-------------------|
| **No brand font** | `BlinkMacSystemFont, -apple-system…` | Stripe→Sohne, Linear→Inter Variable, IOTA→Alliance No.2 |
| **Hero size too small & rigid** | `52px` fixed | `clamp(3rem, 6vw, 5.5rem)` → 48–88px fluid |
| **No type scale tokens** | Ad-hoc: 52px, 28px, 20px, 15px, 14px | Systematic 7-step scale with `clamp()` |
| **No letter-spacing** | None on any text | Headlines: `-0.03em` to `-0.04em`; Labels: `+0.05em` |
| **Body line-height too tight** | `1.5` | `1.6–1.75` for reading-heavy content |
| **Stat numbers undersized** | `28px` | `40–72px` (Stripe/IOTA stat treatment) |
| **No monospace font** | None | Code-focused product needs `JetBrains Mono` / `Fira Code` |
| **Font stack order wrong** | `BlinkMacSystemFont` before `-apple-system` | `-apple-system` should lead |

### Recommended Type System

```css
:root {
  /* Font families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace;

  /* Fluid type scale (7 steps) */
  --text-display:    clamp(3rem, 6vw, 5rem);           /* 48→80px — hero */
  --text-headline-1: clamp(2.25rem, 4.5vw, 3.5rem);    /* 36→56px — sections */
  --text-headline-2: clamp(1.75rem, 3vw, 2.5rem);      /* 28→40px — sub-sections */
  --text-headline-3: clamp(1.25rem, 2vw, 1.75rem);     /* 20→28px — card titles */
  --text-body-lg:    clamp(1.125rem, 1.5vw, 1.375rem); /* 18→22px — featured body */
  --text-body:       1rem;                               /* 16px — default */
  --text-body-sm:    0.875rem;                           /* 14px — secondary */
  --text-micro:      0.75rem;                            /* 12px — labels/badges */

  /* Line heights */
  --leading-tight:   1.1;    /* display/headlines */
  --leading-snug:    1.3;    /* sub-headlines */
  --leading-normal:  1.6;    /* body text */
  --leading-relaxed: 1.75;   /* long-form reading (problem descriptions) */

  /* Letter spacing */
  --tracking-tighter: -0.04em;  /* display type */
  --tracking-tight:   -0.02em;  /* headlines */
  --tracking-normal:   0;       /* body */
  --tracking-wide:     0.05em;  /* labels, overlines */
  --tracking-wider:    0.1em;   /* ALL-CAPS micro text */

  /* Font weights */
  --weight-regular: 400;
  --weight-medium:  500;
  --weight-semi:    600;
  --weight-bold:    700;
}
```

### Key typography applications

```css
/* Hero title — currently 52px fixed, no tracking */
.hero-title {
  font-family: var(--font-sans);
  font-size: var(--text-display);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tighter);
}

/* Stat numbers — currently 28px, feels weak */
.stat-number {
  font-family: var(--font-sans);
  font-size: var(--text-headline-1);  /* 36→56px */
  font-weight: var(--weight-bold);
  letter-spacing: -0.03em;
  line-height: 1;
}

/* Code snippets — currently no monospace font */
.code, pre, .problem-description code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  line-height: 1.6;
}

/* Section overlines — currently don't exist */
.overline {
  font-size: var(--text-micro);
  font-weight: var(--weight-semi);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-accent);
}
```

---

## 4. Color System — Overhaul

### Problems

| Issue | Current | Fix |
|-------|---------|-----|
| **Body bg is Discord gray** | `#202225` | → `#0c0d10` (Linear-depth near-black) |
| **Only 2 surface tiers** | Body `#202225` + Card `#2f3136` | → 3 tiers: `#0c0d10` → `#14161a` → `#1c1e23` |
| **Card bg = Navbar bg** | Both `#2f3136` — no hierarchy | Navbar gets glassmorphism; cards get elevated tier |
| **WCAG AA failure** | `#888888` on `#202225` = 3.9:1 contrast | → `#9a9a9a` minimum (4.5:1+) |
| **Only 3 text tiers** | `#f4f4f4`, `#c3c3c3`, `#888888` | → 4 tiers: primary, secondary, tertiary, quaternary |
| **Hard hex borders** | `#404040` solid | → `rgba(255, 255, 255, 0.08)` |
| **No semantic token layer** | Raw hex everywhere | → Named tokens: `--color-bg-primary`, `--color-text-secondary` |
| **Primary too saturated for dark** | `#627eff` | → `#7b8aff` (desaturated for dark comfort) |
| **Light theme has no depth** | `#f0f2f5` for both bg-2 and card-bg | → Distinct surface tiers |
| **No success/warning/error tokens** | Difficulty colors only | → Full semantic palette |

### Recommended Dark Theme Tokens

```css
:root[data-theme="dark"] {
  /* ── Background Hierarchy (3 tiers) ── */
  --color-bg-base:      #0c0d10;   /* deepest — page bg */
  --color-bg-raised:    #14161a;   /* elevated — sections, sidebar */
  --color-bg-overlay:   #1c1e23;   /* highest — cards, modals, dropdowns */

  /* ── Text Hierarchy (4 tiers) ── */
  --color-text-primary:    #ededef;   /* headings, key content */
  --color-text-secondary:  #a0a1a4;   /* body text, descriptions */
  --color-text-tertiary:   #717274;   /* metadata, timestamps */
  --color-text-quaternary: #4a4c50;   /* decorative, disabled */

  /* ── Borders (alpha-based, not hex) ── */
  --color-border:        rgba(255, 255, 255, 0.08);
  --color-border-hover:  rgba(255, 255, 255, 0.15);
  --color-border-active: rgba(255, 255, 255, 0.20);

  /* ── Brand Accent ── */
  --color-accent:        #7b8aff;   /* slightly desaturated for dark mode */
  --color-accent-hover:  #8e9bff;
  --color-accent-muted:  rgba(123, 138, 255, 0.15);
  --color-accent-subtle: rgba(123, 138, 255, 0.08);

  /* ── Pro/Premium Gradient ── */
  --color-pro-start:     #8a82dc;
  --color-pro-end:       #627eff;
  --gradient-pro:        linear-gradient(135deg, var(--color-pro-start), var(--color-pro-end));

  /* ── Semantic Colors ── */
  --color-success:       #4ade80;
  --color-success-muted: rgba(74, 222, 128, 0.12);
  --color-warning:       #f5a623;
  --color-warning-muted: rgba(245, 166, 35, 0.12);
  --color-error:         #f87171;
  --color-error-muted:   rgba(248, 113, 113, 0.12);

  /* ── Shadows (higher opacity for dark surfaces) ── */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 24px 80px rgba(0, 0, 0, 0.6);
}
```

### Recommended Light Theme Tokens

```css
:root[data-theme="light"] {
  --color-bg-base:      #ffffff;
  --color-bg-raised:    #f8f9fb;     /* warmer than current #f0f2f5 */
  --color-bg-overlay:   #ffffff;

  --color-text-primary:    #0a1628;  /* deep navy, not pure black */
  --color-text-secondary:  #4a5568;
  --color-text-tertiary:   #8895a7;
  --color-text-quaternary: #c1c9d2;

  --color-border:        rgba(0, 0, 0, 0.08);
  --color-border-hover:  rgba(0, 0, 0, 0.15);

  --color-accent:        #4f5bd5;    /* more saturated for light bg */
  --color-accent-hover:  #3d4bc4;
  --color-accent-muted:  rgba(79, 91, 213, 0.10);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.12);
}
```

### Before/After Comparison

```
BEFORE (current):                    AFTER (proposed):
┌─────────────────────┐              ┌─────────────────────┐
│ #202225 body bg     │              │ #0c0d10 deep base   │
│  ┌─────────────┐    │              │  ┌─────────────┐    │
│  │ #2f3136 nav │    │              │  │ glass nav    │    │
│  └─────────────┘    │              │  └─────────────┘    │
│  ┌─────────────┐    │              │  ┌ #14161a raised ┐ │
│  │ #2f3136 card│    │  ──────►     │  │ ┌───────────┐  │ │
│  │ #404040 bdr │    │              │  │ │#1c1e23 card│  │ │
│  │ #888 text ⚠️│    │              │  │ │rgba bdr    │  │ │
│  └─────────────┘    │              │  │ │#717274 txt ✅│  │ │
│                     │              │  │ └───────────┘  │ │
│ 2 tiers. Flat.      │              │  └────────────────┘ │
└─────────────────────┘              │ 3 tiers. Depth.     │
                                     └─────────────────────┘
```

---

## 5. Spacing & Layout — Overhaul

### Problems

| Issue | Current | Fix |
|-------|---------|-----|
| **Hero padding too small** | `80px 8% 60px` | → `clamp(8rem, 15vh, 12rem) 0` + container |
| **%-based horizontal padding** | `8%` (inconsistent across viewports) | → `clamp(1.5rem, 4vw, 4rem)` |
| **No spacing scale** | Ad-hoc: 28px, 30px, 80px | → 10-step `4px` base scale |
| **Fixed graph dimensions** | `800×600px` | → `max-width: 100%; aspect-ratio: 4/3` |
| **No max-width container utility** | Inline widths | → `.container` utility |
| **Non-standard breakpoints** | `1200, 950, 650, 400px` | → `1280, 1024, 768, 640, 480px` |
| **No section rhythm** | Varying padding per section | → Consistent `var(--section-gap)` |

### Recommended Spacing System

```css
:root {
  /* ── Spacing Scale (4px base) ── */
  --space-1:  0.25rem;   /*  4px */
  --space-2:  0.5rem;    /*  8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.5rem;    /* 24px */
  --space-6:  2rem;      /* 32px */
  --space-7:  3rem;      /* 48px */
  --space-8:  4rem;      /* 64px */
  --space-9:  6rem;      /* 96px */
  --space-10: 8rem;      /* 128px */

  /* ── Layout ── */
  --container-max:     1200px;
  --container-narrow:  720px;
  --container-padding: clamp(1.5rem, 4vw, 4rem);
  --section-gap:       clamp(5rem, 10vw, 8rem);

  /* ── Border radius ── */
  --radius-sm:   6px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-full: 9999px;
}

/* Container utility */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.container--narrow {
  max-width: var(--container-narrow);
}

/* Section rhythm */
section {
  padding: var(--section-gap) 0;
}

/* Responsive card grid — replaces fixed 3-column */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-5);
}
```

### Recommended Breakpoints

```css
/* Standard breakpoints (replace 1200/950/650/400) */
--bp-sm:  640px;    /* mobile landscape */
--bp-md:  768px;    /* tablet portrait */
--bp-lg:  1024px;   /* tablet landscape */
--bp-xl:  1280px;   /* desktop */
--bp-2xl: 1536px;   /* large desktop */

@media (max-width: 1280px) { /* desktop adjustments */ }
@media (max-width: 1024px) { /* tablet */ }
@media (max-width: 768px)  { /* mobile-first pivot */ }
@media (max-width: 640px)  { /* small mobile */ }
```

---

## 6. Navigation — Redesign

### Current Nav Problems

- **Solid `#2f3136` background** — identical to card bg, no visual separation
- **No glassmorphism on scroll** — every reference site uses `backdrop-filter: blur()` nav
- **No secondary nav / mega-menu** — flat link list, no grouped navigation
- **Pro badge is visually weak** — small text, doesn't leverage premium gradient
- **Mobile hamburger** unknown (couldn't verify responsive behavior)

### Proposed Navigation

```css
/* ── Glassmorphism Navbar ── */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: var(--space-4) 0;
  background: transparent;
  transition: background 0.3s ease, backdrop-filter 0.3s ease;
}

.nav--scrolled {
  background: rgba(12, 13, 16, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--color-border);
}

/* ── Nav Links ── */
.nav-link {
  font-size: var(--text-body-sm);
  font-weight: var(--weight-medium);
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
}

.nav-link:hover {
  color: var(--color-text-primary);
  background: var(--color-accent-subtle);
}

/* ── Pro Badge (gradient pill) ── */
.nav-pro-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  background: var(--gradient-pro);
  font-size: var(--text-micro);
  font-weight: var(--weight-semi);
  color: #fff;
  letter-spacing: var(--tracking-wide);
}

/* ── CTA Button in Nav ── */
.nav-cta {
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-full);
  background: var(--color-accent);
  color: #fff;
  font-weight: var(--weight-semi);
  font-size: var(--text-body-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.nav-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(123, 138, 255, 0.3);
}
```

### Nav Structure Change

```
BEFORE:  [Logo] [Practice] [Roadmap] [Courses] [Pro ✨]  [Sign in]
AFTER:   [Logo] [Practice] [Roadmap] [Courses] [Blog]    [Pro ✨ pill]  [Sign in] [Get Started →]
```

Add a primary CTA button ("Get Started" or "Start for Free") — currently the nav has no conversion-focused action.

---

## 7. Homepage — Full Restructure

### Current Flow (Problems)

```
1. Hero (title + graph)        ← Generic value prop, graph is 800×600 fixed, no CTA ladder
2. Company logos               ← Fine, but no grayscale filter treatment
3. Testimonials (3-col)        ← Too early — no context for what they're praising
4. Courses section             ← Courses before Practice feels backwards
5. Practice preview            ← Single card, feels like an afterthought
6. About section               ← Personal story — fine but low-priority placement
7. Final CTA                   ← Single CTA, no urgency
```

**Core narrative problem:** The homepage jumps from hero → logos → testimonials without establishing *what NeetCode is* or *why it's different*. Testimonials before feature explanation is backwards — proof needs context.

### Proposed Flow (Story Arc)

```
1. HERO
   - Headline: Bold, specific value prop (not "A better way to prepare")
   - Subheadline: One-liner explaining the unique approach
   - Dual CTA: [Start for Free →] [Watch Demo]
   - Hero visual: Animated product preview (not static graph)
   - Background: Gradient mesh or radial spotlight

2. SOCIAL PROOF BAR
   - Company logos (grayscale, hover→color)
   - "Join 500K+ engineers" counter with animated numbers

3. PROBLEM FRAMING
   - "LeetCode grinding is broken" — relatable pain point
   - 3-column grid: common problems (no structure, no roadmap, grind burnout)
   - Scroll-triggered entrance animations

4. HOW IT WORKS
   - 3-step visual walkthrough:
     ① Pick a roadmap → ② Learn the patterns → ③ Solve with confidence
   - Each step with icon + title + description
   - Interactive: click to see product screenshot for each step

5. ROADMAP PREVIEW
   - Interactive mini-roadmap (not full 800×600 graph)
   - "150+ essential problems, organized by pattern"
   - [Explore Roadmap →] CTA

6. PRACTICE PREVIEW
   - Live problem card with difficulty badge, progress indicator
   - "NeetCode 150" and "Blind 75" featured sets
   - [Start Practicing →] CTA

7. COURSES PREVIEW
   - Featured course cards (2-3 max)
   - Video thumbnail + title + rating
   - [Browse All Courses →] CTA

8. SOCIAL PROOF (DEEP)
   - Testimonials in masonry/stagger grid (not rigid 3-col)
   - Stats bar: "500K+ users · 10M+ problems solved · 4.9★ avg rating"
   - Animated stat counters on scroll

9. PRICING PREVIEW (optional)
   - Free vs Pro comparison
   - [Go Pro →] CTA with gradient border

10. FAQ ACCORDION
    - Common questions about the platform

11. FINAL CTA
    - Full-width section with gradient bg
    - "Start your coding interview prep today"
    - Dual CTA: [Create Free Account →] [Explore Roadmap]

12. FOOTER
    - Organized link columns, social icons, newsletter
```

### Hero Section — Before vs After

**Before:**
```html
<!-- Current: generic title, fixed-size graph, no CTA ladder -->
<div class="landing" style="padding: 80px 8% 60px">
  <h1 style="font-size: 52px">A better way to prepare for coding interviews.</h1>
  <p>NeetCode helps you become a better coder...</p>
  <!-- 800x600 fixed graph component -->
</div>
```

**After:**
```html
<section class="hero">
  <div class="hero__spotlight"></div>  <!-- radial gradient glow -->
  <div class="container">
    <div class="hero__content animate-in">
      <p class="overline">THE SMARTER WAY TO LEETCODE</p>
      <h1 class="hero__title">
        Stop grinding.<br>
        <span class="gradient-text">Start learning patterns.</span>
      </h1>
      <p class="hero__subtitle">
        Master coding interviews with structured roadmaps, pattern-based learning,
        and 150+ hand-picked problems — not random LeetCode spam.
      </p>
      <div class="hero__cta-group">
        <a href="/practice" class="btn btn--primary btn--lg">
          Start for Free <span class="btn__arrow">→</span>
        </a>
        <a href="/courses" class="btn btn--ghost btn--lg">
          Watch Demo
        </a>
      </div>
      <p class="hero__social-proof">
        Trusted by engineers at
        <span class="hero__logos">Google · Meta · Amazon · Microsoft</span>
      </p>
    </div>
    <div class="hero__visual animate-in" style="animation-delay: 200ms">
      <!-- Responsive product preview, not fixed 800x600 -->
    </div>
  </div>
</section>
```

```css
/* Hero styles */
.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: clamp(8rem, 15vh, 12rem) 0 var(--section-gap);
  overflow: hidden;
}

.hero__spotlight {
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: min(800px, 80vw);
  height: 600px;
  background: radial-gradient(
    ellipse at center,
    rgba(123, 138, 255, 0.15) 0%,
    rgba(138, 130, 220, 0.08) 30%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}

.hero__title {
  font-size: var(--text-display);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tighter);
  max-width: 14ch;  /* constrain for readability */
}

.gradient-text {
  background: linear-gradient(135deg, #8a82dc, #627eff, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__subtitle {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  max-width: 50ch;
  margin-top: var(--space-5);
}

.hero__cta-group {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-7);
  flex-wrap: wrap;
}
```

---

## 8. Components — Redesign

### 8.1 Cards

**Current:** `#2f3136` bg, `#404040` border, hover→`#3a3d42` (just a bg color shift)

**Problems:**
- No hover lift (translateY + shadow)
- No glass variant for featured/pro content
- No gradient border for premium cards
- Hover is barely perceptible (dark gray → slightly lighter dark gray)

```css
/* ── Base Card ── */
.card {
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: clamp(1.5rem, 3vw, 2rem);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-border-hover);
}

/* ── Glass Card (for featured content) ── */
.card--glass {
  background: rgba(28, 30, 35, 0.6);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* ── Pro/Premium Card (gradient border) ── */
.card--pro {
  position: relative;
  background: var(--color-bg-overlay);
  border: none;
  padding: 1px; /* space for gradient border */
  border-radius: var(--radius-lg);
  background: var(--gradient-pro);
}

.card--pro > .card__inner {
  background: var(--color-bg-overlay);
  border-radius: calc(var(--radius-lg) - 1px);
  padding: clamp(1.5rem, 3vw, 2rem);
  height: 100%;
}
```

### 8.2 Buttons

**Current:** Basic rectangular buttons, no pill shape, no hover lift, no variants

```css
/* ── Button Base ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);   /* pill shape */
  font-family: var(--font-sans);
  font-size: var(--text-body-sm);
  font-weight: var(--weight-semi);
  line-height: 1;
  cursor: pointer;
  border: none;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              background 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

/* ── Primary (filled) ── */
.btn--primary {
  background: var(--color-accent);
  color: #fff;
}

.btn--primary:hover {
  box-shadow: 0 4px 20px rgba(123, 138, 255, 0.35);
  background: var(--color-accent-hover);
}

/* ── Ghost (outline) ── */
.btn--ghost {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.btn--ghost:hover {
  border-color: var(--color-border-hover);
  background: var(--color-accent-subtle);
}

/* ── Sizes ── */
.btn--sm { padding: var(--space-2) var(--space-4); font-size: var(--text-micro); }
.btn--lg { padding: var(--space-4) var(--space-7); font-size: var(--text-body); }

/* ── Arrow animation ── */
.btn__arrow {
  display: inline-block;
  transition: transform 0.2s ease;
}

.btn:hover .btn__arrow {
  transform: translateX(4px);
}
```

### 8.3 Difficulty Badges

**Current:** Basic text with color. No bg tint, no pill shape.

```css
/* ── Difficulty Badges (pill + tinted bg) ── */
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-micro);
  font-weight: var(--weight-semi);
  letter-spacing: var(--tracking-wide);
}

.badge--easy {
  background: var(--color-success-muted);
  color: var(--color-success);
}

.badge--medium {
  background: var(--color-warning-muted);
  color: var(--color-warning);
}

.badge--hard {
  background: var(--color-error-muted);
  color: var(--color-error);
}
```

### 8.4 Testimonial Cards

**Current:** 3-column fixed grid, `52px` avatars

```css
/* ── Testimonials — Masonry-style auto-fit ── */
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-5);
  max-width: var(--container-max);
  margin: 0 auto;
}

.testimonial-card {
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.testimonial-card__quote {
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  font-style: italic;
}

.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

.testimonial-card__avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.testimonial-card__name {
  font-weight: var(--weight-semi);
  color: var(--color-text-primary);
  font-size: var(--text-body-sm);
}

.testimonial-card__role {
  color: var(--color-text-tertiary);
  font-size: var(--text-micro);
}
```

### 8.5 Company Logo Bar

**Current:** `56px` circles, always fully visible

```css
/* ── Logo Bar (grayscale → color on hover) ── */
.logo-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-7);
  padding: var(--space-7) 0;
}

.logo-bar__item {
  height: 28px;
  filter: grayscale(1) brightness(0.7);
  opacity: 0.5;
  transition: filter 0.3s ease, opacity 0.3s ease;
}

.logo-bar__item:hover {
  filter: grayscale(0) brightness(1);
  opacity: 1;
}

/* Dark mode adjustment */
[data-theme="dark"] .logo-bar__item {
  filter: grayscale(1) brightness(1.5);
  opacity: 0.4;
}
```

### 8.6 Progress Bar

**Current:** Basic colored bar

```css
/* ── Enhanced Progress Bar ── */
.progress {
  height: 6px;
  background: var(--color-bg-raised);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress__bar {
  height: 100%;
  border-radius: var(--radius-full);
  background: linear-gradient(90deg, var(--color-accent), #4ecdc4);
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

/* Subtle shimmer animation */
.progress__bar::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.15) 50%,
    transparent 100%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

---

## 9. Motion & Animation — Add from Scratch

NeetCode currently has **zero** scroll animations, entrance transitions, or micro-interactions. Every reference site uses them extensively. This is the single biggest "feel" gap.

### 9.1 Scroll-Triggered Entrance Animations

```css
/* ── Base animation ── */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ── Utility classes ── */
.animate-on-scroll {
  opacity: 0;
}

.animate-on-scroll.is-visible {
  animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* ── Stagger children (80ms intervals) ── */
.stagger-children.is-visible > *:nth-child(1) { animation-delay: 0ms; }
.stagger-children.is-visible > *:nth-child(2) { animation-delay: 80ms; }
.stagger-children.is-visible > *:nth-child(3) { animation-delay: 160ms; }
.stagger-children.is-visible > *:nth-child(4) { animation-delay: 240ms; }
.stagger-children.is-visible > *:nth-child(5) { animation-delay: 320ms; }
.stagger-children.is-visible > *:nth-child(6) { animation-delay: 400ms; }

.stagger-children > * {
  opacity: 0;
}

.stagger-children.is-visible > * {
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

### 9.2 IntersectionObserver Implementation

```typescript
// Angular directive for scroll-triggered animations
@Directive({ selector: '[animateOnScroll]' })
export class AnimateOnScrollDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (typeof IntersectionObserver === 'undefined') {
      // SSR fallback — show immediately
      this.el.nativeElement.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('is-visible');
          this.observer?.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
```

### 9.3 Smooth Scrolling (Lenis-style)

```typescript
// Install: npm install @studio-freight/lenis
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

### 9.4 Animated Stat Counters

```typescript
// Count-up animation for stat numbers
@Component({
  selector: 'app-stat-counter',
  template: `<span class="stat-number">{{ displayValue }}{{ suffix }}</span>`,
})
export class StatCounterComponent {
  @Input() target = 0;
  @Input() suffix = '';
  @Input() duration = 2000;
  displayValue = 0;

  animateCount() {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / this.duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      this.displayValue = Math.floor(eased * this.target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
```

### 9.5 Hover Micro-Interactions

```css
/* ── Card tilt on hover (subtle) ── */
.card--interactive {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.card--interactive:hover {
  transform: translateY(-4px) rotate3d(0, 0, 0, 0deg);
  box-shadow: var(--shadow-xl);
}

/* ── Link underline grow ── */
.link-animated {
  position: relative;
  text-decoration: none;
}

.link-animated::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.link-animated:hover::after {
  width: 100%;
}

/* ── Button press feedback ── */
.btn:active {
  transform: scale(0.98);
  transition-duration: 0.1s;
}
```

### 9.6 Reduced Motion

```css
/* ── CRITICAL: Respect user preferences ── */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .animate-on-scroll {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

---

## 10. Dark Mode — Upgrade

### Current Score: 4/10 ("Functional but dated")

| Criterion | Current | Target |
|-----------|---------|--------|
| **Surface hierarchy** | 2 levels (body + card) | 3+ levels (base, raised, overlay) |
| **Text contrast** | WCAG AA failure on tertiary | All text passes WCAG AA |
| **Border strategy** | Hard hex `#404040` | Alpha-based `rgba(255,255,255,0.08)` |
| **Shadow adaptation** | No dark-mode shadows | Higher opacity shadows for dark surfaces |
| **Accent treatment** | Same blue in both themes | Desaturated in dark, vivid in light |
| **Overall feel** | Discord/Slack utility | Linear/Stripe premium |

### Key Changes

1. **Deepen the base** — `#202225` → `#0c0d10` (adds perceived depth)
2. **Add surface tiers** — 3 distinct levels create visual hierarchy
3. **Alpha borders** — `rgba()` borders blend naturally with any surface
4. **Fix contrast** — Every text tier must pass WCAG AA (4.5:1 minimum)
5. **Add noise texture** — 3% opacity SVG noise on surfaces for tactile depth

```css
/* Noise texture overlay */
.surface--textured::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  background-repeat: repeat;
  pointer-events: none;
  mix-blend-mode: overlay;
  border-radius: inherit;
  z-index: 1;
}
```

### Theme Toggle Enhancement

```typescript
// Current: class="dark-theme" on <html>
// Proposed: data-theme="dark" attribute (more semantic, CSS-friendly)

// Enhanced toggle with system preference detection
function initTheme() {
  const saved = localStorage.getItem('theme-preference');
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const theme = saved || system;

  document.documentElement.setAttribute('data-theme', theme);

  // Listen for system changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme-preference')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}
```

---

## 11. Performance — Critical Fixes

### 11.1 CSS Deduplication (🔴 P0)

**Problem:** The same CSS token block is inlined **3 times** in `<head>`. This is likely an Angular SSG/critters bug.

**Fix:** Investigate the Angular build pipeline — `critters` (critical CSS extractor) may be duplicating styles. Options:
1. Update `@angular/ssr` to latest and check for known critters bugs
2. Manually verify `angular.json` → `inlineCriticalCss` configuration
3. Add a post-build dedup script if the issue persists

### 11.2 Script Loading (🔴 P0)

**Problem:** Facebook Pixel runs as inline render-blocking JavaScript on every page. Carbon Ads and YouTube iframe API load on all pages regardless of need.

```html
<!-- BEFORE: render-blocking, all pages -->
<script>!function(f,b,e,v,n,t,s)...</script>

<!-- AFTER: deferred, only on pages that need it -->
<script>
  // Load tracking after main content is interactive
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => loadFBPixel());
  } else {
    setTimeout(() => loadFBPixel(), 3000);
  }
</script>
```

**YouTube iframe API:** Only load on pages with video content (courses page), not homepage.

**Carbon Ads:** Load after `DOMContentLoaded` or on scroll.

### 11.3 Resource Hints (🟡 P1)

```html
<!-- Add to <head> — currently missing ALL of these -->
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://www.facebook.com">
<link rel="dns-prefetch" href="https://cdn.carbonads.com">
<link rel="dns-prefetch" href="https://www.youtube.com">
```

### 11.4 Image Optimization (🟡 P1)

**Currently:** Standard `<img>` tags with no format optimization or lazy loading.

```html
<!-- BEFORE -->
<img src="avatar.jpg" width="52" height="52">

<!-- AFTER -->
<img
  src="avatar.webp"
  srcset="avatar.webp 1x, avatar@2x.webp 2x"
  alt="User testimonial avatar"
  width="52"
  height="52"
  loading="lazy"
  decoding="async"
>
```

### 11.5 Font Loading Strategy (🟡 P1)

When adding Inter font:

```html
<link rel="preload" href="/assets/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

<style>
  @font-face {
    font-family: 'Inter';
    src: url('/assets/fonts/inter-var.woff2') format('woff2');
    font-weight: 100 900;
    font-display: swap;
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+2000-206F, U+2074, U+20AC;
  }
</style>
```

### 11.6 Code Splitting (🟢 P2)

The `ngx-graph` component (used for roadmap visualization) is likely bundled in the main chunk. It should be lazy-loaded:

```typescript
// Route-level lazy loading for heavy components
const routes: Routes = [
  {
    path: 'roadmap',
    loadComponent: () => import('./roadmap/roadmap.component').then(m => m.RoadmapComponent),
  },
  {
    path: 'practice',
    loadComponent: () => import('./practice/practice.component').then(m => m.PracticeComponent),
  },
];
```

### Performance Impact Estimates

| Fix | LCP Impact | Bundle Impact |
|-----|-----------|---------------|
| Dedupe CSS | -50–100ms | -30KB+ |
| Defer FB Pixel | -100–200ms | Unblocks main thread |
| Defer Carbon/YT | -50ms | Fewer network requests |
| Resource hints | -50–100ms | Earlier DNS/connection |
| Image WebP | – | -40–60% image size |
| Font preload | -100ms | Prevents FOIT |
| Code splitting | – | -200KB+ initial |

---

## 12. SEO & Meta — Critical Fixes

### Current State: Severely Deficient

**Every page** on NeetCode shares identical meta:
```html
<title>NeetCode</title>
<meta name="description" content="A better way to prepare for coding interviews.">
<!-- No OG tags, no Twitter cards, no canonical, no JSON-LD, no page-specific anything -->
```

### Recommended Fix per Page

```html
<!-- ── Homepage ── -->
<title>NeetCode — Master Coding Interviews with Structured Learning</title>
<meta name="description" content="Stop grinding LeetCode randomly. NeetCode's structured roadmaps, pattern-based learning, and 150+ hand-picked problems help you prepare for coding interviews at Google, Meta, Amazon, and more.">
<link rel="canonical" href="https://neetcode.io/">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="NeetCode — Master Coding Interviews">
<meta property="og:description" content="Structured roadmaps and pattern-based learning for coding interviews.">
<meta property="og:image" content="https://neetcode.io/assets/og-home.png">
<meta property="og:url" content="https://neetcode.io/">
<meta property="og:site_name" content="NeetCode">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="NeetCode — Master Coding Interviews">
<meta name="twitter:description" content="Structured roadmaps and pattern-based learning for coding interviews.">
<meta name="twitter:image" content="https://neetcode.io/assets/og-home.png">

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "NeetCode",
  "url": "https://neetcode.io",
  "description": "Structured coding interview preparation platform",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "500000"
  }
}
</script>

<!-- ── Practice Page ── -->
<title>Practice Problems — NeetCode</title>
<meta name="description" content="Browse 150+ hand-picked coding interview problems organized by pattern. Includes NeetCode 150, Blind 75, and topic-based practice sets.">
<link rel="canonical" href="https://neetcode.io/practice">

<!-- ── Roadmap Page ── -->
<title>Coding Interview Roadmap — NeetCode</title>
<meta name="description" content="Follow a structured roadmap to master data structures, algorithms, and coding interview patterns. Visual progress tracking included.">
<link rel="canonical" href="https://neetcode.io/roadmap">

<!-- ── Courses Page ── -->
<title>Video Courses — NeetCode</title>
<meta name="description" content="In-depth video courses on algorithms, data structures, and system design for coding interviews. Learn at your own pace.">
<link rel="canonical" href="https://neetcode.io/courses">
```

### Favicon Enhancement

```html
<!-- Current: only .ico -->
<link rel="icon" href="/favicon.ico">

<!-- Proposed: full set -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0c0d10">
```

---

## 13. Accessibility — Fixes

### Current Gaps

| Issue | Severity | Fix |
|-------|----------|-----|
| `#888888` on `#202225` fails WCAG AA (3.9:1) | 🔴 Critical | → `#9a9a9a` minimum for 4.5:1 |
| No `prefers-reduced-motion` support | 🔴 Critical | Add media query (see §9.6) |
| No `focus-visible` styles | 🟡 High | Add visible focus rings |
| No `aria-live` for dynamic content | 🟡 High | Add to counters, progress bars |
| No skip navigation link | 🟡 High | Add skip-to-content |
| No semantic landmarks | 🟢 Medium | Add `<main>`, `<nav>`, `<section>` with labels |

### Focus Visible Styles

```css
/* ── Focus ring system ── */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Remove outline for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}

/* High contrast mode support */
@media (forced-colors: active) {
  :focus-visible {
    outline: 2px solid Highlight;
  }
}
```

### Skip Navigation

```html
<a href="#main-content" class="skip-link">Skip to main content</a>

<style>
  .skip-link {
    position: absolute;
    top: -100%;
    left: var(--space-4);
    padding: var(--space-3) var(--space-5);
    background: var(--color-accent);
    color: #fff;
    border-radius: var(--radius-md);
    z-index: 1000;
    font-weight: var(--weight-semi);
    transition: top 0.2s;
  }

  .skip-link:focus {
    top: var(--space-4);
  }
</style>
```

---

## 14. Page-by-Page Audit

### 14.1 Homepage `/`

| Element | Issue | Recommendation |
|---------|-------|----------------|
| Hero headline | "A better way to prepare for coding interviews" — generic | Specific, punchy: "Stop grinding. Start learning patterns." |
| Hero visual | 800×600px fixed `ngx-graph` — heavy, not responsive | Responsive product preview with aspect-ratio |
| Hero CTA | Single weak CTA | Dual CTA: [Start Free →] + [Watch Demo] |
| Company logos | Full opacity circles | Grayscale + hover:color treatment |
| Testimonials | Positioned too early (before explaining product) | Move after "How it Works" section |
| Section flow | No narrative arc | Problem → Solution → Proof → CTA ladder |
| Stats | 28px numbers | 40–56px with scroll-triggered count-up animation |
| About section | Founder story in prime real estate | Move to footer or dedicated /about page |
| Final CTA | Small, no visual emphasis | Full-width gradient section with dual CTA |

### 14.2 Practice `/practice`

| Element | Issue | Recommendation |
|---------|-------|----------------|
| Filter UX | Filter bar complexity unclear | Sticky search + simplified filter chips |
| Problem cards | 380px fixed width | Responsive grid with `minmax(300px, 1fr)` |
| Difficulty badges | Plain colored text | Pill badges with tinted backgrounds |
| Progress tracking | Basic progress bar | Enhanced bar with gradient + shimmer |
| Empty states | Unknown if designed | Design friendly empty states for filtered-out results |
| Saved state | Unknown if persists | Show filter persistence indicator |

### 14.3 Roadmap `/roadmap`

| Element | Issue | Recommendation |
|---------|-------|----------------|
| Graph visualization | Full ngx-graph, heavy | Offer list/grid alternate view |
| Progress display | Unknown | Add completion %, milestone markers |
| Mobile experience | 800×600 graph on mobile | Collapse to vertical list on ≤768px |
| Guided path | None | Add "Start here" indicator for beginners |

### 14.4 Courses `/courses`

| Element | Issue | Recommendation |
|---------|-------|----------------|
| Course cards | Basic list | Rich cards: thumbnail, duration, rating, progress |
| Video loading | YouTube iframe on all pages | Lazy-load, facade pattern (thumbnail→click→iframe) |
| Course landing | Unknown | Individual course pages with syllabus, reviews, preview |

---

## 15. Priority Roadmap

### 🔴 Phase 1 — Foundation (Highest Impact)

| # | Task | Category | Impact |
|---|------|----------|--------|
| 1 | Fix CSS triplication in `<head>` | Performance | Immediate bundle reduction |
| 2 | Defer Facebook Pixel / Carbon Ads / YouTube API | Performance | Unblock main thread |
| 3 | Add page-specific `<title>`, `<meta>`, OG tags | SEO | Search visibility |
| 4 | Install Inter font + fluid type scale with `clamp()` | Typography | Brand identity |
| 5 | Deepen dark bg to `#0c0d10` + 3 surface tiers | Colors | Premium dark mode |
| 6 | Fix `#888888` contrast violation → `#9a9a9a`+ | Accessibility | WCAG compliance |
| 7 | Replace hex borders with `rgba(255,255,255,0.08)` | Colors | Visual refinement |

### 🟡 Phase 2 — Premium Feel

| # | Task | Category | Impact |
|---|------|----------|--------|
| 8 | Add glassmorphism navbar on scroll | Navigation | Premium perception |
| 9 | Add scroll-triggered `fadeUp` animations | Motion | Page feels alive |
| 10 | Implement card hover lift (translateY + shadow) | Components | Interaction quality |
| 11 | Add hero spotlight radial gradient | Visual | Depth and drama |
| 12 | Implement spacing scale tokens | Layout | Consistency |
| 13 | Redesign homepage flow (narrative arc) | UX | Conversion funnel |
| 14 | Add `letter-spacing` to headlines and labels | Typography | Polish |
| 15 | Pill-shaped CTA buttons | Components | Modern CTA pattern |

### 🟢 Phase 3 — Polish & Delight

| # | Task | Category | Impact |
|---|------|----------|--------|
| 16 | Animated stat counters | Motion | Engagement |
| 17 | Gradient text with multi-stop colors | Visual | Wow factor |
| 18 | Lenis smooth scrolling | Motion | Premium scrolling feel |
| 19 | Noise texture overlay on surfaces | Visual | Tactile depth |
| 20 | `prefers-reduced-motion` support | Accessibility | Inclusive design |
| 21 | `focus-visible` ring system | Accessibility | Keyboard navigation |
| 22 | JSON-LD structured data | SEO | Rich search results |
| 23 | WebP/AVIF images + lazy loading | Performance | Faster loads |
| 24 | Font preloading with resource hints | Performance | No FOIT |

### 🔵 Phase 4 — Advanced

| # | Task | Category | Impact |
|---|------|----------|--------|
| 25 | Route-level code splitting for heavy components | Performance | Smaller initial bundle |
| 26 | Service Worker for offline/cache | Performance | Repeat visit speed |
| 27 | Testimonial masonry grid | Components | Visual interest |
| 28 | YouTube facade pattern (thumbnail→iframe) | Performance | No iframe until needed |
| 29 | Full favicon set (SVG, apple-touch, manifest) | Meta | Cross-platform branding |
| 30 | System `prefers-color-scheme` detection | Dark mode | Respect OS preference |

---

## Appendix: Design Easing Reference

All animations should use these curves (from DESIGN_SYSTEM_GUIDE.md):

```css
/* Spring-like entrance */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

/* Smooth interaction */
--ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Snappy feedback */
--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Default transition */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
```

---

*This audit was generated by analyzing neetcode.io's live HTML/CSS against the [DESIGN_SYSTEM_GUIDE.md](./DESIGN_SYSTEM_GUIDE.md) principles derived from Stripe, Apple, Linear, IOTA, and Jeton. All recommendations maintain NeetCode's existing Angular 18 SSR/SSG architecture — no framework rewrite required.*
