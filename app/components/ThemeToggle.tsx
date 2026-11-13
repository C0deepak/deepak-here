"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTheme, type Theme } from "./useTheme";

const label: Record<Theme, string> = { day: "Day", dusk: "Dusk", night: "Night" };

function Icon({ theme }: { theme: Theme }) {
  if (theme === "day")
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="12" cy="12" r="4.2" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return <line key={i} x1={12 + Math.cos(a) * 7} y1={12 + Math.sin(a) * 7} x2={12 + Math.cos(a) * 9.4} y2={12 + Math.sin(a) * 9.4} />;
        })}
      </svg>
    );
  if (theme === "dusk")
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M6 16a6 6 0 0 1 12 0" />
        <line x1="2.5" y1="16" x2="21.5" y2="16" />
        <line x1="5" y1="19.5" x2="19" y2="19.5" />
        <line x1="12" y1="4" x2="12" y2="6.5" />
        <line x1="4.6" y1="8.6" x2="6.3" y2="10.3" />
        <line x1="19.4" y1="8.6" x2="17.7" y2="10.3" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, cycle } = useTheme();
  return (
    <button
      onClick={cycle}
      suppressHydrationWarning
      className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-white/15"
      aria-label={`Theme: ${label[theme]}. Click to change.`}
    >
      <span className="relative grid h-[18px] w-[18px] place-items-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={theme}
            initial={{ y: 14, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -14, rotate: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="block"
          >
            <Icon theme={theme} />
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
