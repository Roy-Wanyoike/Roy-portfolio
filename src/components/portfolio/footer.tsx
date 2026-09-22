"use client";

import { Heart, ArrowUp, Search, Rss } from "lucide-react";
import { profile, socials, navLinks } from "@/lib/portfolio-data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border/50 glass">
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/90 to-primary/60 text-primary-foreground font-display font-bold text-sm">
                RW
              </span>
              <div className="leading-none">
                <p className="font-display font-semibold text-foreground">
                  {profile.name}
                </p>
                <p className="text-xs text-muted-foreground">{profile.title}</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              {profile.tagline} — building scalable full-stack applications and low-code
              solutions from {profile.location}.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
            >
              {profile.email}
            </a>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Open to new opportunities
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-foreground/80 hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Connect
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.slice(0, 8).map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={`${s.label} — ${s.handle}`}
                    className="group flex size-10 items-center justify-center rounded-xl glass text-muted-foreground hover:text-primary hover:border-primary/40 hover:-translate-y-0.5 transition-all"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Reply time: usually within 24 hours.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground flex items-center gap-1.5 text-center sm:text-left">
            © {year} {profile.name}. Built with
            <Heart className="size-3 text-primary fill-primary" />
            using Next.js, Tailwind &amp; Framer Motion.
          </p>
          <div className="flex items-center gap-2">
            <a
              href="/feed.xml"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RSS feed — writing updates"
              title="RSS feed — writing & notes updates"
              className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              <Rss className="size-3" />
              RSS
            </a>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("roy:open-palette"))}
              aria-label="Open command palette (Control K)"
              title="Search — Ctrl/⌘+K"
              className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              <Search className="size-3" />
              Search
              <kbd className="hidden sm:inline-flex h-4.5 min-w-4.5 items-center justify-center rounded border border-border/70 bg-muted/60 px-1 font-sans text-[10px] font-semibold text-muted-foreground">
                ⌘K
              </kbd>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            >
              Back to top
              <ArrowUp className="size-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
