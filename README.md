<div align="center">

# RoyCSS

### 760+ production-ready CSS effects. Zero JavaScript runtime.

A modern CSS effects library with live demonstrations, copyable code, color customization, framework adapters, and a platform ecosystem vision — built for developers who ship.

[![Effects](https://img.shields.io/badge/effects-760+-10b981?style=flat-square)](#)
[![Categories](https://img.shields.io/badge/categories-20-06b6d4?style=flat-square)](#)
[![Runtime](https://img.shields.io/badge/runtime-0KB_JS-8b5cf6?style=flat-square)](#)
[![License](https://img.shields.io/badge/license-MIT-f59e0b?style=flat-square)](#)
[![CSS Spec](https://img.shields.io/badge/CSS-2026_spec-ec4899?style=flat-square)](#)

</div>

---

<div align="center">

![RoyCSS Hero](src/assets/hero.png)

*The RoyCSS landing page — 760 effects, live previews, zero JS runtime.*

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Effect Categories](#effect-categories)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [The RoyCSS Platform Vision](#the-roycss-platform-vision)
- [Performance](#performance)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Connect](#connect)

---

## Overview

**RoyCSS** is a comprehensive CSS effects library built on the principle that beautiful interfaces shouldn't require a JavaScript runtime. Every effect is a single, self-contained CSS class — copy, paste, ship.

The library ships **760 unique effects** across **20 categories**, each with a live preview, copyable CSS code, framework-specific usage examples, and OKLCH-based color customization. The project also includes a CLI tool, VS Code snippets, and a 15-product platform ecosystem vision.

### What makes RoyCSS different

| Principle | Implementation |
|---|---|
| **Zero JS runtime** | Every effect is pure CSS. No hydration cost, no bundle bloat, no framework lock-in. |
| **2026 CSS spec** | OKLCH color space, `color-mix()`, logical properties, container queries, `@property`, `:has()`, View Transitions, `light-dark()`. |
| **Accessible by default** | WCAG 2.1 AA compliant. `prefers-reduced-motion`, `prefers-contrast`, focus-visible rings, keyboard navigation, ARIA labels. |
| **Performance-first** | Dynamic CSS loading via `IntersectionObserver` — 10KB initial, lazy-loaded on demand. Virtual scrolling for 760 cards. Offscreen animation pausing. |
| **Framework-agnostic** | Works in React, Vue, Angular, Svelte, Next.js, and vanilla HTML. One global CSS import. |
| **OKLCH color customization** | Pick any color — every OKLCH hue in the effect rotates instantly. No hex hunting. |

---

## Key Features

### For Developers
- **760 CSS effects** across 20 categories (animations, hover, text, backgrounds, loaders, 3D transforms, buttons, cards, borders, filters, forms, navigation, scroll, cursor, page transitions, glass/modern UI, particles, microinteractions, visual effects, miscellaneous)
- **Live previews** — every effect renders in real-time with its actual CSS
- **One-click copy** — copy the CSS code or the framework-specific usage snippet
- **Color customization** — 12 presets + hex input + native color picker with OKLCH hue rotation
- **Framework adapters** — copy-paste usage for React, Vue, Angular, Svelte, Next.js, and vanilla HTML
- **CLI tool** — `npx roycss init`, `search`, `add`, `list`, `categories`, `info`
- **VS Code snippets** — 689 snippets. Type `roycss-` + Tab to insert any effect

### For the Site
- **Rotating featured carousel** — cycles through all 760 effects in an infinite loop with play/pause, hover-pause, and `prefers-reduced-motion` support
- **Virtual-scrolling effects grid** — renders ~24 cards at a time instead of 760 (97.7% DOM reduction)
- **Favorites system** — save effects to localStorage, export as `.css` file
- **Contact form** — suggestions/bug reports/feature requests persist to SQLite via Prisma
- **Mobile-responsive** — hamburger menu, 44px touch targets, responsive layouts
- **Dark/light mode** — automatic via `next-themes` with system preference detection
- **Section scrollbar** — vertical quick-nav on desktop with scroll progress

---

## Screenshots

### Hero & Navigation

<div align="center">

![Hero](src/assets/hero.png)

*Hero section with animated logo, install command, and primary CTAs.*

</div>

### Featured Carousel

<div align="center">

![Featured Carousel](src/assets/featured-carousel.png)

*Rotating showcase that cycles through all 760 effects in an infinite loop. Play/pause, prev/next, hover-to-pause, and prefers-reduced-motion support.*

</div>

### Get Started Guide

<div align="center">

![Get Started](src/assets/get-started.png)

*5-step accordion: install (npm/pnpm/yarn/bun/deno/CDN), import, use a class, CLI, and VS Code snippets.*

</div>

### Effects Grid

<div align="center">

![Effects Grid](src/assets/effects-grid.png)

*Virtual-scrolling grid with search (⌘K), 20 category filters, live previews, favorites, and expandable code.*

</div>

### Effect Detail Dialog

<div align="center">

![Effect Detail](src/assets/effect-detail.png)

*Full-screen dialog with live preview (Dark/Light/Color backgrounds), color customizer, CSS code editor, framework tabs, and related effects.*

</div>

### Color Customizer

<div align="center">

![Color Customizer](src/assets/color-customizer.png)

*12 presets + hex input + native picker. Rotates every OKLCH hue from emerald (162.48°) to your target — instantly recoloring the entire effect.*

</div>

### Platform Ecosystem

<div align="center">

![Platform Ecosystem](src/assets/platform-ecosystem.png)

*15-product platform vision: Marketplace, Studio, Pro Components, RoyAI, CLI Premium, Inspector, Themes, Icons, Academy, Enterprise, DevTools, Motion Library, Accessibility Suite, Cloud, Analytics.*

</div>

### Unique Differentiators

<div align="center">

![Differentiators](src/assets/platform-differentiators.png)

*10 features competitors don't have: Live Utility Search, CSS Doctor, Component Genome, AI Playground, Design Diff, Utility Explorer, AI Migration, Pattern Library, CSS Benchmark, Community Challenges.*

</div>

### Contact Form

<div align="center">

![Contact Form](src/assets/contact-form.png)

*Slide-out contact form with name, email, subject (6 categories), and message. Persists to SQLite via Prisma. Accessible from CTA, footer, and mobile menu.*

</div>

### FAQ

<div align="center">

![FAQ](src/assets/faq.png)

*Accessible accordion with answers to common questions about framework support, JavaScript, bundle size, dark mode, accessibility, and color customization.*

</div>

### Mobile Experience

<div align="center">

![Mobile Hero](src/assets/mobile-hero.png) ![Mobile Menu](src/assets/mobile-menu.png)

*Mobile-first responsive design with hamburger menu, 44px touch targets, and full feature parity.*

</div>

---

## Quick Start

### Install

```bash
# npm
npm install roycss

# pnpm
pnpm add roycss

# yarn
yarn add roycss

# bun
bun add roycss

# deno
deno add npm:roycss
```

### Or use the CDN (no install)

```html
<link rel="stylesheet" href="https://unpkg.com/roycss/dist/roycss.min.css" />
```

### Import

```ts
// One global import — then use any .roycss-* class anywhere
import "roycss/dist/roycss.min.css";
```

### Use

```html
<!-- Every effect is a single self-contained class -->
<button class="roycss-btn-shine">Click me</button>
<div class="roycss-card-glass">Content</div>
<span class="roycss-text-gradient">Beautiful</span>
```

### Framework Examples

<details>
<summary><strong>React</strong></summary>

```tsx
// src/main.tsx
import "roycss/dist/roycss.min.css";

export function Demo() {
  return (
    <button className="roycss-btn-shine" type="button">
      Shine Sweep
    </button>
  );
}
```
</details>

<details>
<summary><strong>Next.js (App Router)</strong></summary>

```tsx
// src/app/layout.tsx
import "roycss/dist/roycss.min.css";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```
</details>

<details>
<summary><strong>Vue 3</strong></summary>

```ts
// src/main.ts
import { createApp } from "vue";
import "roycss/dist/roycss.min.css";
import App from "./App.vue";

createApp(App).mount("#app");
```
</details>

<details>
<summary><strong>Svelte</strong></summary>

```ts
// src/main.ts
import "roycss/dist/roycss.min.css";
```
</details>

<details>
<summary><strong>Angular</strong></summary>

```json
// angular.json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/roycss/dist/roycss.min.css",
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```
</details>

### CLI

```bash
# Scaffold RoyCSS in a project
npx roycss init

# Search effects by keyword
npx roycss search "glass card"

# Add an effect's CSS to your clipboard
npx roycss add btn-shine
npx roycss add text-gradient --copy

# Browse all 760+ effects
npx roycss list
npx roycss list --category loaders --tag spinner
```

### VS Code Snippets

Type `roycss-` + Tab to insert any of the 689 effects instantly.

```bash
code --install-extension roycss.roycss-snippets
```

---

## Effect Categories

760 effects across 20 categories — every one pure CSS, every one WCAG 2.1 AA compliant.

| Category | Count | Examples |
|---|---|---|
| **Animations** | 170 | Pulse Glow, Bounce In, Fade In Up, Rotate Spin, Wobble, Tada |
| **Visual Effects** | 131 | Glitch, Distortion, RGB Shift, Chromatic Aberration |
| **Backgrounds** | 83 | Aurora, Mesh Gradient, Neural Network, Quantum Field |
| **Text Effects** | 52 | Gradient Text, Glitch Text, Neon, Stroke, Wave, Bounce Letters |
| **Hover Effects** | 38 | Tilt, Lift, Shine Sweep, Magnetic, Underline Slide |
| **Microinteractions** | 37 | Button ripples, icon morphs, toggle states |
| **Cards** | 28 | Flip, Glassmorphism, Gradient Border, 3D Tilt |
| **Loaders** | 25 | Ring Spinner, Bouncing Dots, Equalizer Bars, Orbit |
| **Buttons** | 25 | Shine Sweep, Ripple, Magnetic, 3D Press, Liquid |
| **Particles** | 22 | Floating dots, confetti, snow, starfield |
| **Scroll Effects** | 21 | Parallax, reveal, progress, sticky transforms |
| **3D & Transforms** | 20 | Cube Rotate, Card Flip, Perspective, 3D Tilt |
| **Glass & Modern UI** | 19 | Glassmorphism, Frosted, Blur, Backdrop |
| **Borders** | 15 | Gradient Border, Animated Border, Shine Border |
| **Filters** | 15 | Blur, Grayscale, Sepia, Hue Rotate, Contrast |
| **Miscellaneous** | 15 | Utility effects, experimental, hybrid |
| **Page Transitions** | 12 | Fade, Slide, Zoom, Flip, View Transitions API |
| **Cursor Effects** | 12 | Custom cursors, trails, magnetic, glow |
| **Navigation** | 10 | Menus, tabs, breadcrumbs, pagination |
| **Forms & Inputs** | 10 | Inputs, checkboxes, toggles, sliders |

---

## Architecture

RoyCSS is built on modern CSS (2026 spec) with a performance-first, accessibility-first, and developer-experience-first architecture.

### CSS Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Design Tokens (OKLCH)                                       │
│  ├─ Colors: oklch() + color-mix() throughout                 │
│  ├─ Typography: fluid clamp() scales                         │
│  ├─ Spacing: logical properties (margin-block, inset-inline) │
│  └─ Radii, Shadows, Z-index: tokenized                       │
├─────────────────────────────────────────────────────────────┤
│  Effect CSS (760 effects)                                    │
│  ├─ Prefixed: .roycss-* classes, @keyframes roy-*            │
│  ├─ Logical properties: RTL/I18n ready                       │
│  ├─ @property: typed custom properties                       │
│  ├─ Container queries: responsive without media queries      │
│  ├─ :has(): parent selectors                                  │
│  ├─ light-dark(): automatic theme adaptation                  │
│  └─ content-visibility: auto for render optimization         │
├─────────────────────────────────────────────────────────────┤
│  Dynamic Loading                                             │
│  ├─ IntersectionObserver: CSS injects on scroll              │
│  ├─ 10KB initial → lazy-loaded on demand                     │
│  └─ 98.7% reduction in initial CSS payload                   │
└─────────────────────────────────────────────────────────────┘
```

### Rendering Pipeline

```
User scrolls → IntersectionObserver detects card
                     ↓
              DynamicEffectCSS injects CSS
                     ↓
              AnimationPauser checks visibility
                     ↓
              Card renders with live preview
                     ↓
              Offscreen → animation-play-state: paused
```

### Key Design Decisions

| Decision | Rationale |
|---|---|
| **OKLCH over hex/rgba** | Perceptual uniformity, better color mixing, future-proof |
| **Logical properties** | RTL/I18n support without extra code |
| **CSS nesting + `:where()`** | Zero-specificity wrappers, cleaner code |
| **`@property` typed customs** | Animation-friendly, type-safe custom properties |
| **`content-visibility: auto`** | Browser skips rendering offscreen content |
| **Virtual scrolling** | 760 cards → 24 rendered (97.7% DOM reduction) |
| **`useSyncExternalStore`** | Hydration-safe localStorage for favorites |

---

## Technology Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 16 |
| **Language** | TypeScript | 5 |
| **Styling** | Tailwind CSS | 4 |
| **UI Components** | shadcn/ui (New York) | latest |
| **Icons** | Lucide React | latest |
| **Animation** | Framer Motion | latest |
| **Database** | Prisma ORM + SQLite | 6 |
| **State (client)** | Zustand-style hooks | — |
| **State (server)** | TanStack Query-ready | — |
| **Fonts** | Geist Sans/Mono + Space Grotesk | — |

### CSS Specifications Used

- **OKLCH color space** — `oklch(L C H)` with `color-mix(in oklch, ...)`
- **CSS logical properties** — `inset-inline`, `margin-block`, `inline-size`
- **CSS nesting** — native, no preprocessor
- **`:where()` / `:has()`** — zero-specificity and parent selectors
- **`@property`** — typed custom properties with animations
- **Container queries** — `@container` for component-level responsiveness
- **Scroll-driven animations** — `animation-timeline: view()`
- **View Transitions API** — `view-transition-name`
- **`light-dark()`** — automatic light/dark color functions
- **`content-visibility: auto`** — render optimization

---

## Project Structure

```
roycss/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, fonts, metadata
│   │   ├── page.tsx                # Renders RoyCSSPage
│   │   ├── globals.css             # Design tokens, utilities, a11y
│   │   ├── roycss.css              # Effect utilities, scroll-fade
│   │   ├── roymotion.css           # RoyMotion animation system (60+ utilities)
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts        # Contact form endpoint (Prisma → SQLite)
│   │
│   ├── components/
│   │   ├── roycss/
│   │   │   ├── roycss-page.tsx     # Main page: hero, nav, all sections
│   │   │   ├── effect-card.tsx     # Memoized card with LivePreview, favorites
│   │   │   ├── effect-detail-dialog.tsx  # Full dialog: preview, color, code, framework
│   │   │   ├── color-customizer.tsx      # OKLCH hue rotation, 12 presets, hex input
│   │   │   ├── framework-usage.tsx       # 6 framework tabs with code examples
│   │   │   ├── platform-ecosystem.tsx    # 15 products, 10 differentiators, 4 sponsor tiers
│   │   │   ├── contact-form.tsx          # Slide-out form with validation
│   │   │   ├── featured-carousel         # (inline) Rotating showcase, infinite loop
│   │   │   ├── virtual-scroll-grid.tsx   # IntersectionObserver lazy loading
│   │   │   ├── dynamic-effect-css.tsx    # CSS injection on demand
│   │   │   ├── animation-pauser.tsx      # Pauses offscreen animations
│   │   │   ├── favorites-sheet.tsx       # localStorage favorites + .css export
│   │   │   ├── get-started.tsx           # 5-step accordion (no Radix, hydration-safe)
│   │   │   ├── motion-primitives.tsx     # ScrollReveal, TiltCard, Marquee, etc.
│   │   │   ├── roymotion-showcase.tsx    # Interactive RoyMotion demo
│   │   │   ├── roycss-logo.tsx           # Animated logo with gradient + sparkles
│   │   │   ├── scroll-to-top.tsx         # Floating button after 600px
│   │   │   └── section-scrollbar.tsx     # Vertical quick-nav with progress
│   │   └── ui/                     # 48 shadcn/ui components
│   │
│   ├── lib/
│   │   ├── effects-batch-1.ts      # 80 effects (animations, hover, text)
│   │   ├── effects-batch-2.ts      # ... through ...
│   │   ├── ...
│   │   ├── effects-batch-17.ts     # 760 effects total
│   │   ├── roycss-effects.ts       # Combines all batches, exports effects[]
│   │   ├── roycss-types.ts         # CSSEffect interface, 20 categories, categoryMeta
│   │   ├── design-tokens.ts        # 12 token categories, OKLCH colors, export functions
│   │   ├── framework-adapters.ts   # 6 framework code examples per effect
│   │   ├── db.ts                   # Prisma client singleton
│   │   └── utils.ts                # cn() class merge utility
│   │
│   ├── hooks/
│   │   ├── use-favorites.ts        # useSyncExternalStore + localStorage (hydration-safe)
│   │   ├── use-mobile.ts           # Responsive breakpoint hook
│   │   └── use-toast.ts            # Toast notifications
│   │
│   └── cli/
│       └── index.ts                # RoyCSS CLI: init, add, search, list, info
│
├── prisma/
│   └── schema.prisma               # ContactMessage model
│
├── public/
│   ├── favicon.png
│   ├── roycss-logo-mark.png
│   ├── roycss-logo-motion.png
│   ├── roycss-logo-bracket.png
│   └── apple-icon.png
│
├── src/assets/
│   ├── hero.png
│   ├── featured-carousel.png
│   ├── get-started.png
│   ├── effects-grid.png
│   ├── effect-detail.png
│   ├── color-customizer.png
│   ├── platform-ecosystem.png
│   ├── platform-differentiators.png
│   ├── contact-form.png
│   ├── faq.png
│   ├── mobile-hero.png
│   ├── mobile-menu.png
│   └── cta-banner.png
│
├── vscode-support/
│   ├── roycss-snippets.json        # 689 VS Code snippets
│   └── roycss-classes.json         # 700+ class names for autocomplete
│
├── docs/                           # 19 architectural documents (111K+ words)
│   ├── PLATFORM-VISION.md
│   ├── ROYCSS-V2-BLUEPRINT.md
│   ├── COMPETITIVE-ANALYSIS.md
│   ├── ENTERPRISE-REVIEW.md
│   ├── VSCODE-EXTENSION.md
│   └── ... (14 more)
│
├── scripts/
│   ├── migrate-colors.ts           # hex→OKLCH, rgba→color-mix codemod
│   └── migrate-logical.ts          # physical→logical properties codemod
│
├── prisma/schema.prisma
├── package.json
├── package.roycss.json             # Published package config
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── README.md                       # You are here
```

---

## The RoyCSS Platform Vision

RoyCSS is not just a CSS library — it's the entry point to a 15-product ecosystem. The framework remains free and open source. Everything around it becomes the business.

### Free & Open Source (the entry point)
- **Framework** — 760 CSS effects, zero JS
- **Components** — shadcn/ui integration
- **CLI** — init, search, add, list
- **Documentation** — guides, tutorials, references

### Paid Ecosystem (the value layer)

<div align="center">

![Platform Ecosystem](src/assets/platform-ecosystem.png)

</div>

| Product | Description | Revenue |
|---|---|---|
| **Marketplace** | One-click templates (Healthcare, Admin, CRM, POS, Banking) | 15% transaction fee |
| **Roy Studio** | Visual builder → RoyCSS code (Figma meets Webflow) | Subscription |
| **Pro Components** | Enterprise-grade (Scheduler, Kanban, Data Grid, Charts) | $199/year |
| **RoyAI** | AI assistant: "Create a Healthcare Dashboard" → code | Credits + Subscription |
| **CLI Premium** | `roy create dashboard`, `roy convert bootstrap`, `roy doctor` | Pro upgrade |
| **Inspector** | Chrome Extension — inspect any site, get RoyCSS equivalent | Premium export |
| **Themes** | Healthcare, Apple, Material, Banking, SaaS, Fintech | Theme store |
| **Icons** | Official icon pack designed for RoyCSS | Premium sets |
| **Academy** | Associate → Professional → Expert → Architect certification | Courses + Exams |
| **Enterprise** | Support, migration, SLA, private registry, LTS | Annual contracts |
| **DevTools** | Browser DevTools: class inspection, a11y score, suggestions | Pro upgrade |
| **Motion Library** | Premium animations, micro-interactions, scroll choreography | Premium pack |
| **Accessibility Suite** | Audit + auto-fix contrast, ARIA, keyboard, reduced-motion | Enterprise license |
| **Cloud** | Host tokens, themes, components, design systems with versioning | Subscription |
| **Analytics** | Component usage, dead CSS, duplicate styles, a11y scores | Enterprise license |

### The Competitive Moat

> *"A competitor can recreate utility classes in months. What is much harder to reproduce is a mature ecosystem — marketplace, docs, tools, plugins, enterprise support, and an active community."*

---

## Performance

RoyCSS is engineered for production performance at scale.

| Metric | Value | Technique |
|---|---|---|
| **Initial CSS** | ~10KB | Dynamic loading via `IntersectionObserver` |
| **Total CSS** | ~783KB (all 760 effects) | Lazy-loaded on demand |
| **CSS reduction** | 98.7% | Only visible effects' CSS is injected |
| **DOM elements** | ~600 (not 26,000) | Virtual scrolling (24 cards at a time) |
| **Running animations** | ~20 (not 554) | `AnimationPauser` pauses offscreen animations |
| **JS runtime** | 0KB | Pure CSS effects, no hydration cost |
| **Per-effect size** | ~1KB | Tree-shakeable, self-contained classes |

### Performance Optimizations

1. **Dynamic CSS Loading** — `DynamicEffectCSS` component uses `IntersectionObserver` to inject CSS only for visible effects
2. **Virtual Scrolling** — `VirtualScrollGrid` renders 24 cards at a time with 400px pre-load margin
3. **Animation Pausing** — `AnimationPauser` sets `animation-play-state: paused` on offscreen elements
4. **`content-visibility: auto`** — Browser skips rendering offscreen effect cards
5. **Memoized Components** — `EffectCard` is `memo()`-wrapped with `useInView` for one-time entrance animations
6. **`IntersectionObserver`** — Used for scroll reveals, lazy CSS, and animation pausing (no scroll listeners)

---

## Accessibility

WCAG 2.1 AA compliant. Accessibility is a feature, not an afterthought.

| Feature | Implementation |
|---|---|
| **Reduced motion** | `prefers-reduced-motion` respected via `useSyncExternalStore` — carousel auto-pauses |
| **High contrast** | `prefers-contrast` media query support |
| **Keyboard navigation** | Full Tab order, Enter/Space activation, Escape to close dialogs |
| **Focus-visible** | Visible focus rings on all interactive elements |
| **Skip link** | "Skip to effects" link for keyboard users |
| **ARIA** | `role`, `aria-label`, `aria-expanded`, `aria-pressed`, `aria-live`, `aria-selected` throughout |
| **Semantic HTML** | `<main>`, `<nav>`, `<section>`, `<header>`, `<footer>`, `<article>` |
| **Touch targets** | All interactive elements ≥ 44×44px |
| **Screen readers** | `sr-only` class for visually-hidden content |
| **Color contrast** | OKLCH color space ensures perceptually uniform contrast ratios |

---

## Browser Support

RoyCSS uses modern CSS that requires evergreen browsers:

| Browser | Minimum Version | Notes |
|---|---|---|
| Chrome / Edge | 111+ | OKLCH, `color-mix()`, `:has()` |
| Firefox | 113+ | OKLCH, `color-mix()`, `:has()` |
| Safari | 15.4+ | `:has()` (OKLCH in 16.4+) |
| Mobile Safari | 16.4+ | OKLCH support |
| Android Chrome | 111+ | OKLCH, `color-mix()` |

**Graceful degradation:** Effects that use cutting-edge features (`View Transitions`, `scroll-driven animations`) include fallbacks or are progressively enhanced.

---

## Development

### Prerequisites

- Node.js 18.18+ or Bun
- SQLite (bundled, no external DB needed)

### Setup

```bash
# Clone the repository
git clone https://github.com/Roy-Wanyoike/roycss.git
cd roycss

# Install dependencies
bun install

# Set up the database
bun run db:push

# Start the dev server
bun run dev
```

The site will be available at `http://localhost:3000`.

### Scripts

```bash
bun run dev          # Start dev server (port 3000)
bun run lint         # ESLint
bun run build        # Production build
bun run db:push      # Push schema to SQLite
bun run db:generate  # Regenerate Prisma Client
bun run db:migrate   # Create + apply migration
bun run db:reset     # Reset database
```

### Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./db/custom.db"
```

### Code Quality

- **TypeScript strict mode** throughout
- **ESLint** with Next.js + React hooks rules
- **0 lint errors, 0 warnings** enforced
- **No `any` types** — fully typed `CSSEffect` interface
- **Hydration-safe** — `useSyncExternalStore` for localStorage, no `useState`-in-`useEffect`

---

## Contributing

Contributions are welcome! Here's how to help:

### Adding a New Effect

1. Add the effect to the appropriate batch file in `src/lib/effects-batch-*.ts`
2. Follow the `CSSEffect` interface:
   ```ts
   {
     id: "your-effect",           // kebab-case, prefixed with category
     name: "Your Effect",
     category: "animations",       // one of 20 categories
     description: "Short description",
     tags: ["tag1", "tag2"],
     previewType: "box",           // box | text | button | loader | card | background
     cssCode: `/* Your Effect */ .roycss-your-effect { ... }`,
   }
   ```
3. Use OKLCH colors + logical properties (run `scripts/migrate-colors.ts` if needed)
4. Test in the browser
5. Submit a PR

### Guidelines

- Every effect must use OKLCH colors (no hex/rgba)
- Every effect must use logical properties (`inline-size` not `width`, etc.)
- Keyframes must be prefixed `roy-` to avoid conflicts
- Classes must be prefixed `roycss-`
- Effects must respect `prefers-reduced-motion`

---

## License

MIT — RoyCSS is free to use in personal and commercial projects.

---

## Connect

- **GitHub**: [Roy-Wanyoike/roycss](https://github.com/Roy-Wanyoike/roycss)
- **Author**: [Royford Wanyoike Wamaitha](https://github.com/Roy-Wanyoike)
- **Contact**: Use the in-app contact form for questions, bug reports, or feature requests

---

<div align="center">

**RoyCSS** — Crafted with care by [Royford Wanyoike Wamaitha](https://github.com/Roy-Wanyoike)

*Production-ready CSS effects with live demos. Zero JavaScript runtime.*

[![Effects](https://img.shields.io/badge/effects-760+-10b981?style=flat-square)](#)
[![Categories](https://img.shields.io/badge/categories-20-06b6d4?style=flat-square)](#)
[![Runtime](https://img.shields.io/badge/runtime-0KB_JS-8b5cf6?style=flat-square)](#)
[![License](https://img.shields.io/badge/license-MIT-f59e0b?style=flat-square)](#)

</div>
