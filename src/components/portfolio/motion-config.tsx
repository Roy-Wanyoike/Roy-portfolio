"use client";

import { MotionConfig } from "framer-motion";

/**
 * Wraps the page so framer-motion honors the user's
 * prefers-reduced-motion setting: transform/layout animations are
 * disabled while opacity fades (perceptible, non-vestibular) remain.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
