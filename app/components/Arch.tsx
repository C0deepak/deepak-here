"use client";

import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import Image from "next/image";
import type { Scene } from "../lib/data";
import Clock from "./Clock";
import Sky from "./Sky";

const ease = [0.22, 1, 0.36, 1] as const;

function Arrow({ dir }: { dir: 1 | -1 }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 1 ? "M5 12h14m0 0-6-6m6 6-6 6" : "M19 12H5m0 0 6-6m-6 6 6 6"} />
    </svg>
  );
}

/** The illustration inside an arched window with its own little sky, plus floating stickers. */
export default function Arch({
  scenes,
  index,
  onStep,
}: {
  scenes: Scene[];
  index: number;
  onStep: (delta: number) => void;
}) {
  const reduce = useReducedMotion();
  const scene = scenes[index];

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -400) onStep(1);
    else if (info.offset.x > 50 || info.velocity.x > 400) onStep(-1);
  };

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      {/* the arch */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-b-[28px] rounded-t-[999px] border border-line shadow-[0_40px_80px_-40px_rgba(40,30,20,0.35)]">
        <Sky />
        {/* sun / sunset / moon */}
        <motion.div
          aria-hidden
          className="orb absolute left-1/2 top-[16%] aspect-square w-[46%] -translate-x-1/2 rounded-full"
          animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div aria-hidden className="ring spin-slow absolute left-1/2 top-[8%] aspect-square w-[66%] -translate-x-1/2">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
        </div>
        {/* ground */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-paper-2 to-transparent" />

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={onDragEnd}
          className="absolute inset-x-[4%] bottom-[4%] top-[30%] cursor-grab active:cursor-grabbing"
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={scene.file}
              initial={{ opacity: 0, y: 30, scale: 0.92, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, scale: 1.04, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease }}
              className="absolute inset-0"
            >
              <Image
                src={`/scenes/${scene.file}`}
                alt={`Illustration of Deepak ${scene.phrase}`}
                fill
                sizes="(max-width: 768px) 90vw, 440px"
                className="pointer-events-none object-contain object-bottom"
                loading="eager"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* stickers */}
      <div className="bob absolute -left-6 top-[20%] hidden -rotate-6 rounded-2xl border border-line bg-paper px-4 py-3 shadow-[0_12px_30px_-14px_rgba(0,0,0,0.25)] sm:block">
        <p className="font-serif text-2xl leading-none text-accent">+64%</p>
        <p className="mt-1 text-[11px] text-ink-3">order completion</p>
      </div>
      <div
        className="bob absolute -right-5 top-[46%] hidden rotate-3 items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-[11px] text-ink-2 shadow-[0_12px_30px_-14px_rgba(0,0,0,0.25)] sm:flex"
        style={{ animationDelay: "-2s" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#3fae6a]" />
        BLR <Clock />
      </div>
      <div className="absolute -left-20 bottom-[16%] hidden items-end gap-1 lg:flex" aria-hidden>
        <span className="-rotate-6 font-serif text-lg italic text-ink-3">that&apos;s me</span>
        <svg viewBox="0 0 60 40" className="mb-3 h-8 w-14 text-ink-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M2 30 C 20 36, 40 30, 54 12" />
          <path d="M46 12 L55 11 L53 20" />
        </svg>
      </div>

      {/* controls */}
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={() => onStep(-1)}
          aria-label="Previous"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink-2 transition hover:border-ink hover:text-ink"
        >
          <Arrow dir={-1} />
        </button>
        <div className="relative h-5 flex-1 overflow-hidden text-center font-mono text-xs text-ink-3">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={scene.note}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="truncate"
            >
              {scene.note}
            </motion.p>
          </AnimatePresence>
        </div>
        <button
          onClick={() => onStep(1)}
          aria-label="Next"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink-2 transition hover:border-ink hover:text-ink"
        >
          <Arrow dir={1} />
        </button>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {scenes.map((s, i) => (
          <span
            key={s.file}
            className={`h-1 rounded-full transition-all duration-500 ${i === index ? "w-6 bg-accent" : "w-1.5 bg-line"}`}
          />
        ))}
      </div>
    </div>
  );
}
