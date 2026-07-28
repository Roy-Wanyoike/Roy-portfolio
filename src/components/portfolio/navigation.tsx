"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <nav
            className={cn(
              "flex items-center justify-between rounded-2xl px-4 sm:px-5 py-2.5 transition-all duration-300",
              scrolled ? "glass-strong shadow-lg shadow-black/20" : "bg-transparent"
            )}
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2.5"
              aria-label="Go to top"
            >
              <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/90 to-primary/60 text-primary-foreground font-display font-bold text-sm shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                RW
                <span className="absolute -inset-0.5 -z-10 rounded-xl bg-primary/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
              <span className="hidden sm:flex flex-col leading-none">
                <span className="font-display font-semibold text-sm text-foreground">
                  {profile.firstName} {profile.lastName}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {profile.title}
                </span>
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                    active === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {active === link.href ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg bg-primary/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => handleNav("#contact")}
                className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                Hire Me
                <ArrowUpRight className="size-3.5" />
              </Button>
              <button
                onClick={() => setOpen((v) => !v)}
                className="md:hidden inline-flex size-10 items-center justify-center rounded-xl glass text-foreground"
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="container mx-auto px-4 mt-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass-strong rounded-2xl p-3 shadow-2xl">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className={cn(
                      "block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      active === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted/50"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  onClick={() => handleNav("#contact")}
                  className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Hire Me
                  <ArrowUpRight className="size-4" />
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
