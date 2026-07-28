"use client";

import { Heart, ArrowUp } from "lucide-react";
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
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            Back to top
            <ArrowUp className="size-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
