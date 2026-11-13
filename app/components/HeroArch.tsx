"use client";

import { motion } from "motion/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { profile, type Scene } from "../lib/data";
import Roll from "./Roll";
import { wrap } from "../lib/ui";
import Arch from "./Arch";

const ease = [0.22, 1, 0.36, 1] as const;
const AUTO_MS = 4200;

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease },
});

export default function HeroArch({ scenes }: { scenes: Scene[] }) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [touched, setTouched] = useState(false);
  const n = scenes.length;

  const step = useCallback((d: number) => setIndex((i) => (i + d + n) % n), [n]);

  // Cycle through the hobbies until the visitor picks one themselves.
  useEffect(() => {
    if (touched || hovering || n < 2) return;
    const t = setInterval(() => step(1), AUTO_MS);
    return () => clearInterval(t);
  }, [touched, hovering, n, step]);

  const pick = (i: number) => {
    setTouched(true);
    setIndex(i);
  };

  const word = (i: number) => (
    <button
      type="button"
      className="pick"
      aria-pressed={index === i}
      onClick={() => pick(i)}
      onMouseEnter={() => pick(i)}
      onFocus={() => pick(i)}
    >
      {scenes[i].phrase}
    </button>
  );

  const rest = scenes.slice(1).map((_, k) => k + 1);

  return (
    <section
      id="top"
      className="relative overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div aria-hidden className="dot-grid absolute inset-0" />

      <div className={`${wrap} relative z-10 grid min-h-[100svh] grid-cols-[minmax(0,1fr)] items-center gap-14 pb-16 pt-28 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-10 md:pt-24`}>
        <div>
          <motion.p {...fade(0.1)} className="inline-flex items-center gap-3 rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-xs text-ink-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Full-stack engineer · {profile.location}
          </motion.p>

          <motion.h1 {...fade(0.2)} className="mt-7 font-serif text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1.08] tracking-[-0.025em]">
            Hi, I&apos;m Deepak.
            <br />I {word(0)} that ships.
          </motion.h1>

          {rest.length > 0 && (
            <motion.p {...fade(0.35)} className="mt-7 max-w-xl font-serif text-[clamp(1.3rem,2.2vw,1.65rem)] leading-[1.5] text-ink-2">
              Off the clock you&apos;ll find me{" "}
              {rest.map((i, k) => (
                <Fragment key={i}>
                  {word(i)}
                  {k < rest.length - 2 ? ", " : k === rest.length - 2 ? (rest.length > 2 ? ", or " : " or ") : "."}
                </Fragment>
              ))}
            </motion.p>
          )}

          <motion.div {...fade(0.5)} className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#work"
              className="group inline-flex h-12 items-center gap-6 rounded-full bg-ink pl-6 pr-2 text-[15px] font-medium text-paper transition hover:bg-ink/90"
            >
              <Roll>See my work</Roll>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-paper/15 transition-transform duration-500 group-hover:rotate-90">
                ↓
              </span>
            </a>
            <a href={profile.resume} download className="group text-[15px] text-ink-2 hover:text-ink">
              <span className="link-draw pb-0.5">Download résumé</span>
            </a>
          </motion.div>

          <motion.ul {...fade(0.65)} className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-sm text-ink-3">
            {[
              ["Now", "StampMyVisa"],
              ["Before", "Breezo.AI"],
              ["Studied", "BIT Sindri"],
              ["Side project", "GradAI"],
            ].map(([k, v]) => (
              <li key={k}>
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">{k}</span>
                <span className="mt-1 block font-serif text-lg text-ink">{v}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
        >
          <Arch scenes={scenes} index={index} onStep={(d) => {
              setTouched(true);
              step(d);
            }} />
        </motion.div>
      </div>
    </section>
  );
}
