"use client";

import { useEffect, useState } from "react";

type Phase = "typing" | "pausing" | "deleting";

export function Typewriter({
  words,
  typingSpeed = 90,
  deletingSpeed = 40,
  pause = 1800,
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}) {
  const [state, setState] = useState({
    index: 0,
    subIndex: 0,
    phase: "typing" as Phase,
  });

  useEffect(() => {
    const { index, subIndex, phase } = state;
    const safeIndex = index % words.length;
    const currentWord = words[safeIndex] ?? "";

    let next: typeof state | null = null;
    let delay = typingSpeed;

    if (phase === "typing") {
      if (subIndex < currentWord.length) {
        next = { index, subIndex: subIndex + 1, phase: "typing" as Phase };
        delay = typingSpeed;
      } else {
        next = { index, subIndex, phase: "pausing" as Phase };
        delay = pause;
      }
    } else if (phase === "pausing") {
      next = { index, subIndex, phase: "deleting" as Phase };
      delay = deletingSpeed;
    } else {
      // deleting
      if (subIndex > 0) {
        next = { index, subIndex: subIndex - 1, phase: "deleting" as Phase };
        delay = deletingSpeed;
      } else {
        next = { index: (index + 1) % words.length, subIndex: 0, phase: "typing" as Phase };
        delay = typingSpeed;
      }
    }

    const t = setTimeout(() => {
      if (next) setState(next);
    }, delay);
    return () => clearTimeout(t);
  }, [state, words, typingSpeed, deletingSpeed, pause]);

  const safeIndex = state.index % words.length;
  const currentWord = words[safeIndex] ?? "";

  return (
    <span className="inline-flex items-baseline">
      <span className="text-foreground">{currentWord.substring(0, state.subIndex)}</span>
      <span className="ml-0.5 inline-block w-[2px] h-[1em] bg-primary animate-pulse self-center" />
    </span>
  );
}
