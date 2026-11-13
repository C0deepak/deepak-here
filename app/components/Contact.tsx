"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { profile } from "../lib/data";
import { wrap } from "../lib/ui";
import { Reveal } from "./Reveal";
import Roll from "./Roll";

export default function Contact({ art }: { art?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className={`${wrap} scroll-mt-20 pb-10 pt-24 sm:pt-32`}>
      <div className="relative grid items-center gap-10 overflow-hidden rounded-[2rem] border border-line bg-paper-2/70 px-6 py-14 sm:px-12 md:grid-cols-[1.3fr_1fr] md:py-16">
        <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative">
        <Reveal>
          <p className="mb-5 font-mono text-xs text-accent">05 · Contact</p>
          <h2 className="font-serif text-[clamp(2.6rem,6vw,4.25rem)] leading-[1.05] tracking-[-0.025em]">
            Let&apos;s build something
            <br />
            that runs.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-md text-lg text-ink-2">
            Open to full-stack and product engineering roles, and good conversations about either.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex h-12 items-center gap-6 rounded-full bg-ink px-6 text-[15px] font-medium text-paper transition hover:bg-ink/90"
            >
              <Roll>Email me</Roll>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <button
              onClick={copy}
              className="relative inline-flex h-12 min-w-[9.5rem] items-center justify-center overflow-hidden rounded-full border border-ink/20 px-5 text-[15px] text-ink transition hover:border-ink"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "y" : "n"}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {copied ? "Copied ✓" : "Copy address"}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
          <p className="mt-5 font-mono text-xs text-ink-3">{profile.email}</p>
        </Reveal>
        </div>

        {art && (
          <Reveal delay={0.15} className="relative mx-auto w-full max-w-[340px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-b-[24px] rounded-t-[999px] border border-line bg-paper">
              <div aria-hidden className="orb absolute left-1/2 top-[14%] aspect-square w-[52%] -translate-x-1/2 rounded-full" />
              <Image src={`/scenes/${art}`} alt="Illustration of Deepak reading a map" fill sizes="340px" className="object-contain object-bottom p-4 pt-24" />
            </div>
            <span className="bob absolute -left-4 top-10 -rotate-6 rounded-full border border-line bg-paper px-3 py-1.5 font-serif text-sm italic text-ink-2 shadow-sm">
              where to next?
            </span>
          </Reveal>
        )}
      </div>

      <footer className="mt-10 flex w-full flex-col items-center justify-between gap-4 text-sm text-ink-3 sm:flex-row">
          <span>© 2026 Deepak Kumar</span>
          <nav className="flex gap-6">
            {[
              { label: "GitHub", href: profile.github },
              { label: "LinkedIn", href: profile.linkedin },
              { label: "Résumé", href: profile.resume },
            ].map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="link-draw hover:text-ink">
                {l.label}
              </a>
            ))}
          </nav>
      </footer>
    </section>
  );
}
