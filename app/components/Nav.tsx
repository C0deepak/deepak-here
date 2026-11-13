"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { profile } from "../lib/data";
import Clock from "./Clock";
import Roll from "./Roll";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "Toolbox" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 300);
    setScrolled(y > 20);
  });

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ color: "var(--nav-ink, var(--ink))" }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-colors duration-500 sm:px-5"
    >
      {/* neutral frosted glass: no theme colour, so it sits on any sky */}
      <nav
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-4 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 sm:px-6 ${
          scrolled
            ? "border-white/25 bg-white/10 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="group flex items-baseline gap-3">
          <span className="font-serif text-xl tracking-tight">
            <Roll>Deepak Kumar</Roll>
          </span>
          <span className="hidden font-mono text-[11px] opacity-60 sm:inline">
            <Clock />
          </span>
        </a>

        <div className="flex items-center gap-1">
          <ul className="mr-2 hidden items-center md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group block px-3 py-2 text-sm opacity-75 transition-opacity hover:opacity-100">
                  <Roll>{l.label}</Roll>
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <a
            href={profile.resume}
            download
            className="group ml-1 inline-flex h-9 items-center gap-2 rounded-full border border-current/25 bg-white/10 px-4 text-sm transition hover:border-current/60 hover:bg-white/20"
          >
            <Roll>Résumé</Roll>
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
