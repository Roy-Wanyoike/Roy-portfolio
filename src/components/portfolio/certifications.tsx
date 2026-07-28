"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, ExternalLink } from "lucide-react";
import { certifications } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "./reveal";

export function Certifications() {
  return (
    <section id="certifications" className="section-pad relative scroll-mt-24">
      <div className="absolute inset-0 -z-10 bg-dots opacity-30" />
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Certifications"
          title={
            <>
              Credentials &amp; <span className="text-gradient">achievements</span>
            </>
          }
          description="Continuous learning is part of the craft. These are some of the milestones along the way."
          align="center"
        />

        <div className="mt-12 grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.1}>
              <motion.a
                href={cert.credentialUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex gap-4 glass rounded-2xl p-5 hover:border-primary/40 transition-colors h-full"
              >
                <div className="shrink-0">
                  <div className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/25 to-primary/5 text-primary border border-primary/20">
                    <Award className="size-6" />
                    <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <BadgeCheck className="size-3" />
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-semibold text-foreground leading-tight">
                      {cert.title}
                    </h3>
                    <ExternalLink className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all shrink-0 mt-1" />
                  </div>
                  <p className="text-xs text-primary font-medium mt-0.5">{cert.issuer}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground font-mono">{cert.date}</p>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
