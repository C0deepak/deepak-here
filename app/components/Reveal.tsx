"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children in when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const C = as === "li" ? motion.li : motion.div;
  return (
    <C
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </C>
  );
}

/**
 * Splits text into words that rise out of a mask one after another.
 * Wrap a word in *asterisks* to render it in italic accent.
 */
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  animateOnMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const trigger = animateOnMount
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "-10% 0px" } };

  return (
    <motion.span
      className={className}
      initial={reduce ? false : "hidden"}
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text.replaceAll("*", "")}
    >
      {words.map((w, i) => {
        const accent = w.startsWith("*") && w.includes("*", 1);
        const clean = w.replaceAll("*", "");
        return (
          <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${accent ? "wonk italic text-accent" : ""}`}
              variants={{
                hidden: { y: "110%", rotate: 4 },
                show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease } },
              }}
            >
              {clean}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
