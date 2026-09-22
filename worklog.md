# Worklog

---
Task ID: 1
Agent: Z.ai Code (main)
Task: Update Roy's GitHub portfolio (Roy-Wanyoike/Roy-portfolio) with more projects and skills, push to GitHub for Vercel deploy.

Work Log:
- Read upload/ferrix.txt → contained GitHub token (kept out of chat output, used only in env var).
- Installed GitHub CLI (gh 2.63.2), authenticated as Roy-Wanyoike.
- Listed all 110 repos; identified 16 major recent platforms missing from portfolio (Aurevia, Nexora, Bridge, civic-intelligence, Orvexa, novera, fuatilia, digital-lending-os, Motivra, RYNEX, Ryvex, wanyrix, AI-Agentic-Infrastructure-Platform, resilinet, YoungSharkJobHunter, bigman-commerce).
- Fetched real repo metadata (stars, forks, descriptions, primary language) via GitHub API. Real account stats: 110 public repos, 93 followers, top repo TechnicalWritingProgram with 33★.
- Cloned Roy-Wanyoike/Roy-portfolio to /tmp/Roy-portfolio; synced source into /home/z/my-project for sandbox preview.
- Rewrote src/lib/portfolio-data.ts:
  - Projects expanded 7 → 23 with new categories: Platform, Fintech, AI & Data, Open Source, App, Learning.
  - Added status field (Production / In Development / Learning) + year to each project.
  - Skills restructured into 6 pillars: Frontend, Backend & Databases (Go, PostgreSQL, Redis, Prisma), Architecture & Realtime (event-driven, Temporal, WebSocket/SSE, DDD, multi-tenant, ledger), AI & Data (agents, LLM, RAG, ETL), Low-Code & Platforms, Support/DevOps & Craft.
  - Added githubStats export (110 repos, 93 followers).
  - Updated stats, coreStack (added Go, PostgreSQL), tech cloud (40 tags).
- Rewrote src/components/portfolio/projects.tsx:
  - Featured Work showcase (3 large cards: Aurevia, Nexora, Bridge).
  - Live search box (name/tagline/description/tags/impact).
  - Category filter buttons with live counts; show more/less pagination (9 per page).
  - Status badges with pulsing dot; year stamps on cards.
  - Duplicate-guard: featured cards excluded from grid in default view.
- Updated src/components/portfolio/skills.tsx: 6 category cards + expanded tech cloud.
- Updated src/components/portfolio/about.tsx: GitHub Snapshot card (110 repos / 93 followers / 33★ top repo) linking to profile.
- Updated hero.tsx floating badge 100+ → 110+ repos.
- Updated README.md highlights.
- QA with agent-browser (all passed):
  - Hero renders (typewriter, photo, badges); page 200, no console errors.
  - Projects: 23 cards render; Fintech filter → exactly 5 correct projects; search "payment" → Nexora + novera; counts correct.
  - Skills: 6 pillars render with bars.
  - About: GitHub snapshot card shows real numbers.
  - Contact form E2E: submitted QA Robot message → toast "Message sent!" → POST /api/contact 200 → SQLite row persisted (verified via Prisma).
  - Mobile 390px: no horizontal scroll. Footer sits at bottom naturally.
- Lint clean. Pushed commit bd460df to Roy-Wanyoike/Roy-portfolio main → triggers Vercel auto-deploy (roy-portfolio.vercel.app).

Stage Summary:
- Portfolio now shows 23 projects + 6 skill pillars + real GitHub stats; search/filters/featured showcase working; pushed to GitHub main.
- Next: verify Vercel build completes and live site shows new content; then cron webDevReview takes over iterations.

---
Task ID: 2
Agent: Z.ai Code (main)
Task: Diagnose & fix failing Vercel deployments for Roy-portfolio; get new content live.

Work Log:
- GitHub Deployments API showed my push (bd460df) deployed as Production but FAILED.
- Deep-dive: Aug 27 deployments ALSO failed — build was broken BEFORE my changes. Last success: Jul 28 21:55 UTC.
- Diffed working (3f55449) vs broken (0eb21b9) commits: package-lock.json was added Aug 27 (+14504 lines). Vercel then switched installer bun → npm; npm builds fail on Vercel for this project (work fine locally).
- Local reproduction: bun build ✓ and npm ci+build ✓ — so failure is Vercel-platform-specific, tied to npm path.
- Fix (commit d2aaa4b):
  - Added vercel.json pinning installCommand "bun install --frozen-lockfile" + buildCommand "bun run build" (the proven July pipeline).
  - Removed package-lock.json from repo + gitignored it.
  - Made standalone cp steps non-fatal in package.json build script (next build failure still fails build).
- Pushed → new Production deployment 6588250486 (10:10:08 UTC) = **SUCCESS** (first since Jul 28).
- Production URL: https://roy-portfolio-roywanyoikes-projects.vercel.app — SSO-protected (Vercel Deployment Protection). Owner sees it logged in; recruiters would NOT until protection is disabled (Settings → Deployment Protection). Cannot change without Vercel token — flagged to user.
- NOTE: roy-portfolio.vercel.app belongs to a DIFFERENT account (Korean portfolio) — Roy's is the -roywanyoikes-projects suffix domain.

Stage Summary:
- Root cause of months-long Vercel deploy failures fixed; new portfolio content (23 projects, 6 skill pillars, featured showcase, GitHub snapshot) is now deployed to production successfully.

---
Task ID: 3
Agent: Z.ai Code (cron webDevReview)
Task: QA pass + new features (live GitHub stats, scroll UI, language dots, OG image) + styling polish.

Work Log:
- Baseline QA: dev server 200, no console/page errors; last deployment (d2aaa4b) confirmed success via Deployments API.
- NEW /api/github route (src/app/api/github/route.ts): live GitHub stats (publicRepos, followers, totalStars, topLanguages) with 1h in-memory cache, Cache-Control headers, optional GITHUB_TOKEN env support, graceful {ok:false} fallback.
  - Sandbox IP was GitHub-rate-limited (403 unauth) → tested authenticated path locally via GITHUB_TOKEN in .env (gitignored; NEVER committed). Real data: 110 repos, 93 followers, 73 total stars, TS×23/JS×11/HTML×9/Go×6/CSS×4.
- GitHub Snapshot card (about.tsx): hydrates live via useGithubLive() hook — LIVE badge, Total stars cell, colored top-language chips; static fallback preserved.
- NEW scroll-ui.tsx: ScrollProgress (gradient spring bar, z-60) + BackToTop (floating, SVG progress ring, appears after 1 viewport). Integrated in page.tsx.
- Project cards: GitHub-style language dots via projectLanguages + languageColors maps (official GitHub colors); footer row = language dot + year stamp.
- Experience timeline: company-initials avatars (IT/ET) + CURRENT pills (Zap icon) on active roles.
- SEO: metadataBase set to production URL; OpenGraph/Twitter wired to /og.png.
- NEW og.png (1200×630 exact): built via styled HTML + agent-browser screenshot (crisp text, dark-emerald branded); tmp files cleaned.
- DEPLOYMENT FAILURE + FIX: commit 0b844f9 failed on Vercel — root cause: portfolio-data.ts (new projectLanguages/languageColors exports) was never synced to the repo while projects.tsx imported them. bun build reproduced the error locally; fixed in 71e63a1 (deployment SUCCESS). Lesson: sync ALL changed files before pushing.
- Polish commit bf9ed0a: default grid now slices AFTER excluding featured (9 grid + 3 featured = 12 cards visible initially).
- Final QA: lint clean, build passes, all 8 sections present, 13 project links, no errors, mobile 390px no overflow, deployments for 71e63a1 + bf9ed0a both SUCCESS.

Stage Summary:
- Portfolio now has live GitHub hydration, scroll progress UI, language dots, OG share image, polished experience timeline. All deployed to Vercel production.
- Known notes: Vercel prod remains SSO-protected (needs Roy to disable Deployment Protection for public/recruiter access); GITHUB_TOKEN can optionally be added in Vercel env vars for higher API rate limits (route works unauthenticated too).
- Next round ideas: downloadable résumé PDF (print-optimized), 404 page, testimonials section (needs real quotes from Roy), per-repo language breakdown on card hover, RSS/changelog of recent commits via GitHub events API.

---
Task ID: 4
Agent: Z.ai Code (cron webDevReview)
Task: QA + print-to-PDF résumé, GitHub activity feed, 404 page, styling details.

Work Log:
- Baseline: dev 200, last deploy bf9ed0a SUCCESS. Phase stable → chose feature round from backlog.
- PRINT-TO-PDF RÉSUMÉ:
  - @media print stylesheet in globals.css: white/ink-friendly output, hides header/nav/footer/buttons/blobs/section decorations, glass cards → bordered light blocks, emerald accents preserved via -webkit-text-fill-color, .print-keep-dark keeps photo name plate readable, break-inside guards, @page margins.
  - "Save as PDF" button added to hero actions (window.print()).
  - Hero floating badges tagged .no-print; name plate tagged .print-keep-dark.
  - Verified via agent-browser pdf(): page 1 renders light with photo + name plate + hero copy (24 pages total — full portfolio; recruiters can pick ranges).
  - DEBUGGING NOTE: print CSS initially missing from served bundle — Turbopack persistent cache was stale (identical chunk hash across restarts). Fix: rm -rf .next + restart. Lesson: if new CSS doesn't appear served, clear .next.
- GITHUB ACTIVITY FEED: /api/github extended with recentEvents (public events humanized: push/create/release/public/fork), best-effort (never blocks snapshot). About card renders "Recent activity" list — repo, detail, relative time, colored dots. Verified live: real pushes showing "15m ago".
- 404 PAGE: src/app/not-found.tsx — ambient blobs, ghost icon, "This page swam away", Back to portfolio + GitHub buttons, JSON-LD-consistent footer line. Verified in browser at /does-not-exist.
- STYLING DETAILS: skill % now counts up (0→level, easeOutCubic, framer-motion useInView + rAF); .heading-ornament gradient underline on all section h2s; global emerald scrollbar (webkit+firefox); ::selection color; :focus-visible rings.
- QA: lint clean, bun build passes, screen view unchanged (dark theme intact), no console errors. Synced ALL 7 changed files this time (incl. the missed-in-round-3 data file lesson).
- Pushed 6f743d7 → Production deployment SUCCESS (10:46:25 UTC).

Stage Summary:
- Portfolio now has: print-optimized résumé output, live GitHub activity feed, branded 404, count-up skill bars, heading ornaments, custom scrollbar/selection/focus states. All live in production.
- Next round ideas: testimonials (needs real quotes), commit-activity sparkline, per-project hover previews, dark/light theme toggle (currently dark-only), i18n (EN/SW), blog/notes section.

---
Task ID: 5
Agent: Z.ai Code (cron webDevReview)
Task: QA + light/dark theme toggle, project detail modals, 12-week commit pulse, keyboard shortcuts, styling polish.

Work Log:
- Baseline QA: dev 200, zero console errors, all sections render (last deploy 6f743d7 was SUCCESS). Phase stable → feature round.
- DARK/LIGHT THEME (next-themes 0.4.6 — already in lockfile/template, now imported):
  - src/components/theme-provider.tsx (attribute="class", defaultTheme="dark", enableSystem=false, disableTransitionOnChange); layout.tsx wrapped, hardcoded className="dark" removed.
  - theme-toggle.tsx: CSS-driven sun/moon (dark:* variants decide visibility) — NO mounted-state effect (avoids react-hooks/set-state-in-effect lint error AND hydration mismatch); onClick reads live theme via setTheme updater. In nav + mobile menu "Appearance" row.
  - globals.css light-mode variants via html:not(.dark): .glass (dark tint hairline), .glass-strong (white 75%), .bg-grid/.bg-dots (dark ink), .text-gradient/.text-gradient-muted (darker emerald for contrast on white), scrollbars, ::selection, .glow-emerald; color-scheme light/dark on :root/.dark.
  - hero.tsx outline buttons: border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5. projects.tsx statusStyles/StatusDot: *-600/700 base + dark:*-400. Nav shadow softening.
- 12-WEEK COMMIT PULSE: /api/github now also returns activityWeeks — REAL per-week commit totals via GitHub commit-search API (12 rolling 7-day buckets, per_page=1 each, exact total_count even >100, Promise.all, per-week failure → 0). Discovered: public events API is capped at 300 events and Roy's last 300 all happened within ~24h (events-bucket approach gave useless single-bar chart; also fixed an off-by-one: old bucket 11 was the FUTURE week, always 0). Live data: [0,0,0,5,3,0,0,8,105,614,551,486] = 1772 commits/12wks.
  - about.tsx ActivityPulse: 12 slim bars (flex-1 max-w-6, rounded-t), sqrt scaling so quiet weeks stay visible, tooltip per bar (week + count), "1772 commits · 12 wks" label, hidden unless any week >0; a11y role="img" + aria-label.
- PROJECT DETAIL MODAL: cards are now buttons opening a shadcn Dialog (a11y focus trap/Escape free) — full description, impact callout, meta chips (category/status/year/language dot/stars/forks), all tags, View-repository + Close. bg-card/95 + backdrop-blur-xl (glass-strong at 75% bled content — fixed to near-opaque). Card footer CTA now "Details"; hover hairline on card top edge; icon scale on hover.
- KEYBOARD: "/" focuses project search (guarded against input/textarea/contenteditable), kbd "/" hint in search pill (hidden when typing), Escape clears query then blurs.
- QA: toggle dark↔light verified both directions + persisted via localStorage; light-mode sections clean (hero, projects, about, snapshot); pulse shows real ramp; modal desktop + 390px mobile fine; search "payment" → Nexora+novera still exact; mobile no horizontal overflow (390=390); zero console errors; lint CLEAN; tsc --noEmit: zero errors in src/ (only pre-existing sandbox examples/skills noise).
- DEPLOY-SAFETY CATCH: sandbox package.json (0.2.1, fatal `&&` standalone cp) would have silently REVERTED the Task-2 non-fatal build script on push. Repo package.json verified byte-identical to HEAD (next-themes was already in repo lockfile — package.json needed NO change). Also finished Task-2 intent: git rm --cached package-lock.json + gitignored (vercel.json already pins bun, so this is defense-in-depth).
- Pushed 6fe54f4 → Production deployment SUCCESS via Deployments API (11:08 UTC).

Stage Summary:
- Portfolio now has: full light/dark theming (CSS-driven toggle, light-mode contrast pass), project detail modals, real 12-week commit pulse (1772 commits), "/" search shortcut, cleaner repo (no tracked package-lock).
- Lessons: (1) sandbox package.json can drift from repo deploy-critical fixes — ALWAYS diff build/install scripts before pushing it; (2) events API 300-cap makes event-bucketed charts useless for active accounts — commit-search total_count is the reliable source; (3) shadcn Dialog + glass needs near-opaque bg.
- Known notes: Vercel prod still SSO-protected (needs Roy to disable Deployment Protection); GITHUB_TOKEN in Vercel env vars recommended for the commit-search rate limits (route degrades gracefully without it — some weeks may show 0 if unauth search is throttled).
- Next round ideas: per-project language-breakdown bar on modal, testimonials (needs real quotes from Roy), blog/notes section, i18n (EN/SW), command palette (Cmd+K) reusing the modal infrastructure, prefers-reduced-motion pass.

---
Task ID: 6
Agent: Z.ai Code (cron webDevReview)
Task: QA pass + Cmd+K command palette, live per-repo language breakdown bars, prefers-reduced-motion pass, cursor spotlight styling.

Work Log:
- Baseline QA: dev 200, last deploy 6fe54f4 SUCCESS via Deployments API. Phase stable → feature round from backlog.
- CMD PALETTE (⌘K / Ctrl+K):
  - NEW src/components/portfolio/command-palette.tsx using shadcn CommandDialog (cmdk): three groups — Projects (all 23, searchable by name/tagline/category/tags, GitHub-style language dot per item), Navigate (8 sections), Actions (Switch to light/dark mode, Save page as PDF via window.print, Copy email → toast w/ mailto fallback, Open GitHub profile, Back to top).
  - Global keydown Cmd/Ctrl+K toggles; nav search button + mobile-menu "Search ⌘K" row dispatch custom event "roy:open-palette" (palette listens) — no prop drilling.
  - Selecting a project: closes palette, scrolls to #projects, then dispatches "roy:open-project" (name in detail) after 350ms; Projects listens and opens the detail modal. Footer shows ↵/esc/⌘K hints. Glass styling: rounded-2xl, border-primary/20, bg-popover/95 backdrop-blur-xl.
  - a11y: nav button has aria-label "Open command palette (Control K)" + aria-keyshortcuts.
- LIVE LANGUAGE BREAKDOWN:
  - NEW /api/github/languages?repo=slug: fetches repos/Roy-Wanyoike/{repo}/languages, bytes→pct, top 6, official GitHub colors (shared languageColors import), strict slug regex (blocks traversal — verified 400 on "../etc"), 6h in-memory cache (max 60 entries, LRU-ish eviction), GITHUB_TOKEN support, graceful {ok:false}.
  - projects.tsx: ProjectDetailModal split — inner ProjectModalBody remounts per project (key={project.name}); language state initializes from props (langLoading init !!slug) so NO sync setState in effects (react-hooks/set-state-in-effect clean). Renders animated stacked bar (h-2.5 rounded-full) + legend chips (dot + name + mono %). Loading state = shimmer bar; on failure bar simply stays hidden. Real data verified: Nexora TS 95.5%, Aurevia TS 96.8%, Motivra Go 68.6%.
  - languageColors expanded: +Dockerfile/Makefile/HCL/Nix/C/C++/PHP/Swift/SCSS/Astro.
- REDUCED MOTION: MotionProvider (MotionConfig reducedMotion="user") wraps the whole page (page.tsx) — framer-motion disables transform/layout animations for users who prefer it; globals.css @media (prefers-reduced-motion: reduce) kills blob/shimmer/ping CSS animations, smooth-scroll → auto, transitions → 0.01ms.
- STYLING DETAILS: .card-spotlight cursor-tracking emerald radial glow on project cards (pointer CSS vars --mx/--my set in onPointerMove, light-mode variant, fades in on hover) — verified opacity=1 on hover + visible glow. Nav search button (size-10 glass, always visible incl. mobile).
- QA (agent-browser): Ctrl+K opens palette (all 23+8+5 items); search "nexora"→Enter→modal + bar TS 95.5%; tap Motivra on mobile→Go 68.6% bar; copy-email→toast "Email copied"; light/dark switch via palette works, light-mode modal renders clean; mobile 390px overflowX=0; 10 sections; fresh reload → ZERO console/page errors (one stale mid-edit parse error in log was superseded by Fast Refresh — verified file + fresh reload clean). Lint CLEAN, tsc --noEmit zero errors in src/.
- DEPLOY-SAFETY: sandbox package.json had drifted AGAIN to the fatal `&& cp` build script (exactly the Task-5 lesson) — diffed before push, deps identical, so package.json NOT pushed; repo kept its non-fatal script. All 8 changed files synced (5 M + 3 new).
- Pushed f485b5e → Production deployment 6589478222 SUCCESS (11:23:26 UTC) via Deployments API.

Stage Summary:
- Portfolio now has: ⌘K command palette (projects/sections/actions), live per-repo language breakdown bars in project modals, prefers-reduced-motion support (CSS + framer-motion), cursor spotlight on cards, nav search entry point on mobile + desktop.
- Known notes: Vercel prod still SSO-protected (needs Roy to disable Deployment Protection); GITHUB_TOKEN in Vercel env vars recommended (languages route degrades gracefully without it — bar stays hidden if throttled).
- Next round ideas: testimonials (needs real quotes from Roy), blog/notes section, i18n (EN/SW), per-skill project count links from skill cards → filtered project grid, GitHub contribution-style heatmap reusing commit-search API, palette: fuzzy highlight + recently-viewed projects.

---
Task ID: 7
Agent: Z.ai Code (cron webDevReview)
Task: QA + Writing section, skills→projects cross-links, palette recents, footer polish.

Work Log:
- Baseline: dev 200, zero errors, last deploy f485b5e (Task 6) SUCCESS. Phase stable → feature round.
- WRITING SECTION (NEW src/components/portfolio/writing.tsx, id="writing", placed between Community and Speaking):
  - Data: NEW `writing` export in portfolio-data.ts — 4 REAL, verifiable items researched via GitHub API this round: Technical Writing Hub (his top-starred repo, 33★, featured card spanning 2 cols), "Beyond Data Risk" (published article, no fabricated URL — card renders without link), "Make a notebook from a script" (real gist ca4e37da…, Python), Technical Writing Programme (youngsharktechnologies.com page referenced from his own README).
  - Kind icons (Star/Newspaper/NotebookPen/PenLine), kind badges, meta lines, CTA rows; cursor spotlight + gradient hairline consistent with project cards.
  - Nav: "Writing" added to navLinks (9 links) → desktop nav switched md:flex → lg:flex with px-2.5/text-[13px] at lg (xl restores px-3/text-sm); hamburger now lg:hidden; mobile menu gets max-h-[75vh] overflow-y-auto scrollbar-thin. Palette Navigate group + scrollspy picked up Writing automatically.
- SKILLS → PROJECTS CROSS-LINKS (skills.tsx):
  - relatedTags map (Frontend→Next.js, Backend→Go, Architecture→WebSocket, AI & Data→AI, Low-Code→API); counts computed live with the SAME matcher as the projects search box, so the promised count always equals what the user then sees (verified: "AI" → exactly 13 cards).
  - Support/DevOps category intentionally has no link (best tag "CI"=5 matches spuriously via "civic", Docker=1 too weak — button hidden when count=0).
  - Click → dispatches "roy:filter-projects" {query} + smooth-scroll to #projects; projects.tsx listener sets filter=All, query=tag, showAll=true. Real counts: 5 Next.js / 8 Go / 3 WebSocket / 13 AI / 4 API.
- PALETTE RECENTS: projects.tsx writes "roy:recent-projects" (max 3, dedupe, try/catch for private mode) in a selected-change effect (localStorage = external system, no setState). Palette reads via readRecents() called from BOTH open paths (⌘K handler + roy:open-palette listener) — event handlers, not effect bodies → lint-clean; recents group renders first with History icon + separator. Verified: open Aurevia modal → Ctrl+K → "Recently viewed: Aurevia" appears above Projects.
- FOOTER POLISH: "Open to new opportunities" chip with pulsing emerald dot next to email; bottom bar now has Search ⌘K chip (dispatches roy:open-palette; verified opens palette from footer) + Back to top; Navigate column includes Writing.
- QA (agent-browser): 11 sections; writing cards + 3 links; nav shows Writing at 1440 & fits; cross-link click E2E (query=AI, 13 cards); palette recents flow; footer palette trigger; light-mode footer/writing clean; 768px → hamburger visible (below lg); 390px overflowX=0; fresh reload → ZERO console/page errors. Lint CLEAN, tsc clean in src/.
- DEPLOY-SAFETY: package.json diffed first — deps IDENTICAL, fatal-build-script drift absent this time, repo file untouched. 8 files synced (7 M + 1 new writing.tsx).
- Pushed 7be016d → commit status "Vercel success / Deployment has completed" (polled ~3.5 min).

Stage Summary:
- Portfolio now has: a dedicated Writing section (real 33★ repo, published article, gist, programme page), skill-pillar → filtered-projects cross-links with honest live counts, command-palette recently-viewed, footer availability status + palette entry point.
- Known notes: Vercel prod still SSO-protected (Roy must disable Deployment Protection); GITHUB_TOKEN in Vercel env vars still recommended.
- Next round ideas: GitHub contribution heatmap (26w, commit-search, needs token on Vercel to avoid search throttling), testimonials (needs real quotes from Roy), i18n (EN/SW), reading-time/word-count badges on writing cards, per-writing GitHub stars via /api/github extension, palette: Cmd+K "recently viewed" also for sections, SEO: JSON-LD Person + WritingArticle schema.

---
Task ID: 8
Agent: Z.ai Code (cron webDevReview)
Task: QA + 26-week commit activity chart, JSON-LD/sitemap SEO, rate-limit throttle guard.

Work Log:
- Baseline: dev 200, zero errors, last deploy 7be016d (Task 7) SUCCESS. Phase stable → feature round.
- 26-WEEK COMMIT ACTIVITY (upgraded from 12-week pulse):
  - /api/github fetchWeeklyCommits: WEEKS 12 → 26. Naive 26-request burst THROTTLED (GitHub search secondary limit counts per-minute — my back-to-back test bursts 26+26/min → all-zero results), so fetches now go in 3 waves of 9 with 1.5s pauses → cold fetch 6.7s (safe under Vercel's ~10s function budget; verified locally).
  - THROTTLE GUARD (important bugfix): if a refresh returns all-zero activity while cache holds last-known-good weeks, keep the old weeks instead of caching zeros. Also: fetch failure now serves stale cache (max-age=60) rather than {ok:false}, so a transient GitHub outage doesn't blank the chart. Root cause of the zero-cache: in-memory cache survived 1h with poisoned data; guard prevents recurrence.
  - about.tsx: ActivityPulse → CommitActivity — GitHub-style intensity tiers (bg-muted/50 nub for zero, primary at 35/60/85/100% alpha by sqrt-scaled ratio), 26 motion bars with staggered whileInView scaleY grow-in, per-bar tooltip ("Week of Sep 15: 497 commits"), month ticks row (Mar…Sep) aligned to the same flex rhythm, "1,788 commits" summary, Less→More legend, inset top highlight on active bars, hover brightness/saturate. aria role=img with peak-week summary. Hidden when total===0 (defense-in-depth vs throttled data).
  - Real data live: [1,0,0,…,4,0,…,5,3,0,0,8,105,614,551,497] = 1,788 commits / 26 wks.
- SEO: Person JSON-LD (already present) enhanced with @id/url/image; NEW WebSite JSON-LD referencing Person @id; both injected in layout.tsx. NEW src/app/sitemap.ts → /sitemap.xml served (verified: production URL, weekly, priority 1).
- QA (agent-browser): chart renders desktop + light mode + mobile 390px (bars fit, no overflowX — note: client hydration takes a beat after reload; poll for the element before asserting), sitemap.xml + 2 JSON-LD blocks in HTML, zero console/page errors, lint CLEAN, tsc clean.
- DEPLOY-SAFETY: package.json diffed (deps identical, no drift), 4 files synced (route.ts, about.tsx, layout.tsx, sitemap.ts).
- Pushed ae51f50 → Vercel "success / Deployment has completed" (~40s after push).

Stage Summary:
- Portfolio now has: GitHub-style 26-week commit activity chart with month ticks + legend (throttle-proof), full JSON-LD Person+WebSite structured data, sitemap.xml.
- Known notes: Vercel prod still SSO-protected (Roy must disable Deployment Protection); GITHUB_TOKEN in Vercel env vars recommended — without it the commit-search weeks degrade to 0 and the chart auto-hides; cold /api/github fetch ~7s on cache-miss (1h server cache absorbs it).
- Next round ideas: per-day heatmap via gh-archive or GraphQL contributions (needs different scope), testimonials (needs real quotes from Roy), i18n (EN/SW), reading-time badges on writing cards, RSS/changelog section from recent events API, print stylesheet pass on new sections (writing/activity already inherit light print base).

---
Task ID: 9
Agent: Z.ai Code (cron webDevReview)
Task: QA + RSS writing feed, repo OG preview images in project modals, copy-clone button with tiered fallbacks, print stylesheet pass.

Work Log:
- Baseline: dev 200, fresh reload ZERO console/page errors, 11 sections, no overflow; last deploy ae51f50 (Task 8) SUCCESS via Deployments API. Phase stable → feature round from backlog.
- RSS FEED (/feed.xml):
  - NEW src/app/feed.xml/route.ts — RSS 2.0 built from the real `writing` data (4 items: Technical Writing Hub, Beyond Data Risk, notebook gist, Technical Writing Programme). XML-escaped, atom:link self, language en, 1h Cache-Control; per-item pubDate deliberately OMITTED (no verified dates — never fabricate); items without external href link back to /#writing.
  - Verified: 200 application/rss+xml, parses as valid XML, 4 items with correct links/categories.
  - Discovery: layout.tsx metadata.alternates.types["application/rss+xml"]="/feed.xml" (verified <link rel="alternate"> in served HTML) + footer RSS chip (Rss icon, glass pill, bottom bar next to Search/Back to top).
- REPO OG PREVIEW IMAGES (projects.tsx modal):
  - ProjectModalBody now shows GitHub's social-preview image (opengraph.githubassets.com/1/Roy-Wanyoike/{slug}) as a 2:1 cover between header and meta chips: shimmer while loading, opacity fade-in on load, hidden on error, hover scale 1.03, inset ring + gradient hairline, and a bottom-left mono caption chip "Roy-Wanyoike/{slug}" linking to the repo.
  - Plain <img> (lazy, referrerPolicy no-referrer) for lazy+onError control; remount-per-project via existing key so preview state resets cleanly.
  - Verified: Aurevia naturalWidth=1200 state=ok caption correct; Nexora same on mobile.
- COPY-CLONE BUTTON with 3-tier fallback (found + fixed a real UX gap during QA):
  - "Clone" button in modal CTA row copies `git clone https://github.com/Roy-Wanyoike/{slug}.git` → toast.
  - QA discovery: in headless/permission-denied contexts navigator.clipboard rejects — and the original code had NO fallback (palette copy-email has the same shape). Added execCommand('copy') textarea fallback → final fallback toast shows the full command text inline ("Copy blocked by browser — Run manually: …") so the user always gets the command. Real browsers with focus hit tier 1.
- PRINT PASS: .glass/.glass-strong now break-inside:avoid in @media print (cards never split across pages — covers projects/writing/skills), and [role=dialog] display:none (an open project modal never lands on paper).
- QA (agent-browser): modal desktop (image 2.01 ratio, all rows render) + 390px mobile (zero overflow, buttons wrap cleanly); light-mode footer clean with RSS chip; palette→"motivra"→modal→language bar regression PASS; /api/github/languages still cached+correct (TS 95.5%); toast fires on clone click; fresh reload zero errors. Lint CLEAN, tsc clean in src/.
- DEPLOY-SAFETY: package.json had drifted AGAIN to the fatal `&& cp` build script (3rd time) — diffed first, deps identical, NOT pushed. 5 files synced (4 M + 1 new).
- Pushed 72d8e65 → Production deployment 6590211035 SUCCESS (~45s after push) via Deployments API.

Stage Summary:
- Portfolio now has: an RSS feed for writing artifacts with browser auto-discovery + footer chip, GitHub social-preview images inside every project modal, a copy-clone button that degrades gracefully across browsers, and a print stylesheet that never splits cards or prints open dialogs.
- Known notes: Vercel prod still SSO-protected (Roy must disable Deployment Protection for recruiter access); GITHUB_TOKEN in Vercel env vars still recommended.
- Next round ideas: testimonials (needs real quotes from Roy), i18n (EN/SW), palette: recently-viewed for sections, per-project README excerpt in modal (GitHub readme API), image lightbox for OG previews, writing-section reading-time badges (needs gist/article content fetch), deploy-preview comments.

---
Task ID: 10
Agent: Z.ai Code (cron webDevReview)
Task: QA + real per-day GitHub contribution heatmap (GraphQL), README excerpts in project modals, local git hygiene.

Work Log:
- Baseline: dev 200, zero errors; remote main at 72d8e65 (Task 9) SUCCESS via Deployments API (deployment 6590211035). Local sandbox repo had drifted: no git remote, UUID-message commits with junk artifacts (--width PNG screenshot, tool-results/*.txt) committed — cleaned via git rm --cached + .gitignore additions (/tool-results, /upload, /--width, agent-ctx). upload/ ignore now protects the token file from ever reaching the repo.
- FEASIBILITY: tested GitHub GraphQL contributionsCollection with the token — WORKS (53 weeks, ~4.2k contributions). Unlocked the real per-day heatmap that was blocked in Task 8.
- CONTRIBUTION HEATMAP (About section, new full-width card):
  - NEW /api/github/heatmap: GraphQL contributionsCollection → {total, weeks[53]{days[{date,count}]}}, busiest day; 1h in-memory cache, stale-on-error serving, all-zero throttle guard (Task-8 lessons applied), 8s AbortSignal timeout (Vercel function budget), GITHUB_TOKEN via env, graceful {ok:false}.
  - about.tsx ContributionHeatmap: GitHub-style grid — 53 week columns × 7 rows, size-[9px]→sm:size-[11px] cells, weekday gutter (Mon/Wed/Fri), month labels (Sep→Sep) aligned over columns, header "4,188 contributions · last 12 months" + LIVE chip + 🔥 busiest day 594, Less→More legend, "View on GitHub →" link. Staggered column fade-in (whileInView), hover scale+ring per cell, per-cell title tooltips, role=img aria-label with totals. Grid centered (w-fit mx-auto) inside overflow-x-auto scroll container with min-w-[640px] — mobile scrolls horizontally, zero document overflow.
  - TIERING BUG AVOIDED: busiest=594 (bulk-push day) would flatten max-relative scaling; switched to data-adaptive quartiles over non-zero days (25/50/78/100 pct) like GitHub's own coloring. Verified distribution across all 5 tiers (326/11/10/11/9 cells).
- README EXCERPTS (project modals):
  - NEW /api/github/readme?repo=slug: raw README via Accept: application/vnd.github.raw+json → server-side markdown distillation (strip front matter/HTML comments/code fences/<img>/badge rows/anchor-nav rows/tables/headings, links→text, decoration markers off, skip taglines/arrow-chain/keyword-row paragraphs) → first meaningful prose paragraph, ≤380 chars word-safe ellipsis. Strict slug regex, 6h cache (max 60), GITHUB_TOKEN, graceful null.
  - Verified against real repos: Aurevia → "A production-grade platform for market intelligence…" (arrow-chain tagline correctly skipped after filter tweak); novera → "The problem. The next wave of commerce won't be typed by humans…"; nexora, Motivra, fuatilia all extract clean prose.
  - projects.tsx modal: "FROM THE README" block between description and tags — border-l-2 primary accent, bg-muted/30, line-clamp-4, BookOpen icon, "Read it in context ↗" → repo#readme; shimmer skeleton while loading; hidden on failure. Fetch pattern identical to language bar (per-project remount, abort controller, no sync setState).
- QA (agent-browser): heatmap 367 cells/13 month labels/legend desktop + centered (230px=230px gaps); mobile 390px scroll-contained, docOverflow=0; modal README blocks verified for Aurevia + novera + Motivra (mobile); light-mode heatmap contrast clean (zero-cell oklab verified); fresh reload ZERO console/page errors (only pre-existing Radix aria-describedby warning); 11 sections intact; palette→modal regression untouched. Lint CLEAN, tsc clean in src/.
- DEPLOY-SAFETY: package.json drifted to the fatal `&& cp` build script AGAIN (4th time) — diffed first, deps identical, NOT pushed; repo keeps non-fatal script.

Stage Summary:
- Portfolio now has: the real GitHub contribution calendar (per-day, GraphQL-powered, quartile-tiered, centered GitHub-style grid) in About, and live README excerpts distilled from each repo into its project modal.
- Known notes: Vercel prod still SSO-protected (Roy must disable Deployment Protection); GITHUB_TOKEN in Vercel env vars recommended — heatmap/readme/languages routes all degrade gracefully without it.
- Next round ideas: testimonials (needs real quotes from Roy), i18n (EN/SW), heatmap tooltip upgrade to styled popover (currently native title), per-project "last pushed" chip from repos API, palette recently-viewed for sections, writing-section per-item stars via /api/github extension.
