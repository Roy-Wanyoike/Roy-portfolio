"use client";

import { motion } from "framer-motion";
import { philosophy } from "@/lib/portfolio-data";
import { Reveal, RevealGroup, RevealItem, SectionHeading } from "./reveal";

export function Philosophy() {
  return (
    <section id="philosophy" className="section-pad relative scroll-mt-24">
      <div className="absolute inset-0 -z-10 bg-dots opacity-30" />
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="How I Work"
          title={
            <>
              My engineering <span className="text-gradient">philosophy</span>
            </>
          }
          description="Principles I actually follow — not slogans. This is how I think when I ship."
        />

        <RevealGroup className="mt-12 grid sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {philosophy.map((p, i) => {
            const Icon = p.icon;
            return (
              <RevealItem key={p.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative h-full glass rounded-2xl p-6 hover:border-primary/40 transition-colors overflow-hidden"
                >
                  {/* Big watermark number */}
                  <span className="absolute -top-2 -right-2 font-display text-7xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/25 to-primary/5 text-primary border border-primary/20 mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.body}
                    </p>
                  </div>

                  <div className="absolute -bottom-px left-5 right-5 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
