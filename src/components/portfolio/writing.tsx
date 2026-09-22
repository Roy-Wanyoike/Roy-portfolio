"use client";

import { BookOpen, ExternalLink, PenLine, Star, NotebookPen, Newspaper } from "lucide-react";
import { writing, type WritingItem } from "@/lib/portfolio-data";
import { Reveal, RevealGroup, RevealItem, SectionHeading } from "./reveal";
import { cn } from "@/lib/utils";

const kindIcons: Record<string, typeof BookOpen> = {
  "Curated Resource": Star,
  "Published Article": Newspaper,
  "GitHub Gist": NotebookPen,
  "Program Page": PenLine,
};

function WritingCard({ item, featured }: { item: WritingItem; featured?: boolean }) {
  const Icon = kindIcons[item.kind] ?? BookOpen;
  const body = (
    <>
      {/* Cursor spotlight — consistent with project cards */}
      <span className="card-spotlight" aria-hidden="true" />
      {/* Gradient top hairline on hover */}
      <span
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden="true"
      />
      <div className="relative flex items-start justify-between gap-3 mb-4">
        <div
          className={cn(
            "flex items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary border border-primary/20 shrink-0 group-hover:scale-105 transition-transform",
            featured ? "size-13 p-3" : "size-11",
          )}
        >
          <Icon className={featured ? "size-6" : "size-5"} />
        </div>
        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          {item.kind}
        </span>
      </div>

      <h3
        className={cn(
          "relative font-display font-semibold text-foreground group-hover:text-primary transition-colors",
          featured ? "text-xl" : "text-lg",
        )}
      >
        {item.title}
      </h3>
      {item.meta ? (
        <p className="relative mt-0.5 text-xs font-medium text-primary">{item.meta}</p>
      ) : null}
      <p className="relative mt-3 text-sm text-muted-foreground leading-relaxed">
        {item.description}
      </p>

      {item.href ? (
        <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          {item.cta ?? "Read"}
          <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      ) : (
        <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          Available in print &amp; journal
        </span>
      )}
    </>
  );

  const cls = cn(
    "group relative flex flex-col h-full w-full text-left glass rounded-2xl overflow-hidden transition-colors",
    featured ? "p-6 sm:p-7" : "p-6",
    item.href
      ? "cursor-pointer hover:border-primary/40"
      : "cursor-default",
  );

  return item.href ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export function Writing() {
  const featured = writing.find((w) => w.featured);
  const rest = writing.filter((w) => !w.featured);

  return (
    <section id="writing" className="section-pad relative scroll-mt-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Writing"
          title={
            <>
              Documenting what I{" "}
              <span className="text-gradient">learn &amp; teach</span>
            </>
          }
          description="Technical writing keeps me honest — from a curated hub of paid writing programs to published articles and hands-on gists."
          align="center"
        />

        <RevealGroup className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured ? (
            <RevealItem className="lg:col-span-2">
              <WritingCard item={featured} featured />
            </RevealItem>
          ) : null}
          {rest.map((item) => (
            <RevealItem key={item.title}>
              <WritingCard item={item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
