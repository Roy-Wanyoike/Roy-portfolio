# Royford Wanyoike — Portfolio

A recruiter-optimized, human-centered developer portfolio for **Royford Wanyoike** — Software Engineer, Technical Support Engineer & Developer Advocate based in Nairobi, Kenya.

> Built to be understood in under 2 minutes of scrolling.

## ✨ Highlights

- **Real professional photo** (sourced from Sessionize speaker profile)
- **USP elevator pitch** + clear role targeting up front
- **Quantifiable impact metrics** — 100+ repos, 33★ top repo, 37 forks, Pro certification
- **Engineering philosophy** section showing how I think
- **Working contact form** — messages persist to SQLite via Prisma
- **JSON-LD Person schema** for recruiter/SEO searchability
- **Mobile-first responsive**, dark emerald/teal theme (no blue/indigo)
- **Accessibility** — WCAG-conscious contrast, keyboard nav, semantic HTML, ARIA labels

## 🎯 Target Roles

- Full-Stack Engineer
- Frontend Engineer (React/Next/Angular)
- Technical Support Engineer
- Low-Code / Quickbase Developer
- Developer Advocate

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York)
- **Animation**: Framer Motion
- **Database**: Prisma ORM (SQLite)
- **Fonts**: Geist Sans/Mono + Space Grotesk (display)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ or Bun
- A `.env` file in the project root with:
  ```
  DATABASE_URL="file:/home/z/my-project/db/custom.db"
  ```

### Install & Run

```bash
# Install dependencies
bun install

# Create the SQLite database & tables
bun run db:push

# Start the dev server (http://localhost:3000)
bun run dev
```

### Other Scripts

```bash
bun run lint       # ESLint
bun run build      # Production build
bun run db:push    # Push schema to SQLite
bun run db:generate # Regenerate Prisma Client
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout + JSON-LD Person schema
│   ├── page.tsx                # Single-page portfolio
│   ├── globals.css             # Theme + utilities (emerald/teal)
│   └── api/contact/route.ts    # Contact form endpoint (Prisma → SQLite)
├── components/
│   ├── portfolio/              # All portfolio sections
│   │   ├── hero.tsx            # Hero with photo, USP, metrics
│   │   ├── about.tsx
│   │   ├── skills.tsx          # 5 skill categories
│   │   ├── projects.tsx        # Filterable project grid
│   │   ├── experience.tsx      # Timeline
│   │   ├── philosophy.tsx      # "How I Work"
│   │   ├── speaking.tsx
│   │   ├── certifications.tsx
│   │   ├── contact.tsx         # Working form
│   │   ├── footer.tsx
│   │   ├── navigation.tsx
│   │   ├── reveal.tsx          # Scroll-reveal wrapper
│   │   └── typewriter.tsx
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── portfolio-data.ts       # All profile data (single source of truth)
│   ├── db.ts                   # Prisma client
│   └── utils.ts
prisma/
└── schema.prisma               # ContactMessage model
public/images/
└── roy-photo.jpg               # Real professional photo
```

## 📝 Customizing

All content lives in **`src/lib/portfolio-data.ts`** — edit that single file to update profile info, skills, experience, projects, talks, and certifications. The UI components read from it automatically.

## 📄 License

MIT — feel free to fork and adapt as a template for your own portfolio.

## 🔗 Connect

- LinkedIn: [in/roywanyoike](https://www.linkedin.com/in/roywanyoike/)
- GitHub: [Roy-Wanyoike](https://github.com/Roy-Wanyoike)
- X: [@WanyoikeRoyford](https://x.com/WanyoikeRoyford)
- Email: roywanyoike328@gmail.com
