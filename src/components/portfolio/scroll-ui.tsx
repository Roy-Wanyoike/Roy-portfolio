"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient scroll-progress bar pinned to the very top of the viewport.
 * Uses framer-motion's useScroll for GPU-friendly spring updates.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-emerald-400 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.45)]"
    />
  );
}

/**
 * Floating back-to-top button with an SVG progress ring.
 * Appears after the user scrolls past one viewport height.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
      setVisible(scrollTop > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const circumference = 2 * Math.PI * 20; // r = 20

  return (
    <motion.button
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.6,
        y: visible ? 0 : 16,
      }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cnFixed(
        "fixed bottom-5 right-5 z-50 flex size-12 items-center justify-center rounded-full",
        "bg-black/70 backdrop-blur-md border border-white/15 shadow-xl",
        "hover:border-primary/50 transition-colors",
      )}
      aria-label="Back to top"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-white/10"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-primary transition-[stroke-dashoffset] duration-150"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />
      </svg>
      <ArrowUpIcon />
    </motion.button>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="relative text-primary"
      aria-hidden="true"
    >
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  );
}

// Local helper to avoid importing cn into a tiny file chain (keeps tree-shaking simple)
function cnFixed(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
