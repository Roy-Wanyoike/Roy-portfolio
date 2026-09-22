"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Animated light/dark toggle — fully CSS-driven.
 * Both icons render on server and client identically; the .dark class on
 * <html> decides which one is visible, so there is no hydration mismatch
 * and no mounted-state effect. Click reads the live theme from useTheme().
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label="Toggle dark mode"
      title="Toggle dark / light mode"
      className={cn(
        "relative inline-flex size-9 items-center justify-center overflow-hidden rounded-xl glass text-foreground hover:text-primary hover:border-primary/40 transition-all active:scale-95",
        className,
      )}
    >
      {/* Sun shows in light mode, hides in dark */}
      <Sun
        className="absolute size-4 transition-all duration-300 dark:rotate-90 dark:scale-0 dark:opacity-0"
        aria-hidden="true"
      />
      {/* Moon shows in dark mode, hides in light */}
      <Moon
        className="absolute size-4 -rotate-90 scale-0 opacity-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:opacity-100"
        aria-hidden="true"
      />
    </button>
  );
}
