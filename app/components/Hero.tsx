"use client";

import { useLenis } from "lenis/react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { profile, type Chapter, type Mood } from "../lib/data";
import { wrap } from "../lib/ui";
import Roll from "./Roll";

const ease = [0.22, 1, 0.36, 1] as const;

/** How the sky looks at each time of day. Fixed colours, independent of the site theme. */
const MOODS: Record<
  Mood,
  {
    top: string;
    mid: string;
    bottom: string;
    ground: string;
    ink: string;
    accent: string;
    sun: string;
    sunT: number; // 0 = rising on the left horizon, 1 = setting on the right
    sunOn: number;
    moonOn: number;
    stars: number;
    cloud: string;
    clouds: number;
    label: string;
  }
> = {
  dawn: { top: "#bfbde3", mid: "#e9cfd8", bottom: "#f8e6d8", ground: "#eadccd", ink: "#2a2433", accent: "#b8431f", sun: "#ffc99a", sunT: 0.04, sunOn: 1, moonOn: 0, stars: 0.2, cloud: "#fff1ea", clouds: 0.6, label: "Dawn" },
  morning: { top: "#d4ebe4", mid: "#ebf4ef", bottom: "#f8fbf7", ground: "#e2ebdf", ink: "#1f231d", accent: "#b8431f", sun: "#fff1c6", sunT: 0.22, sunOn: 1, moonOn: 0, stars: 0, cloud: "#ffffff", clouds: 0.8, label: "Morning" },
  noon: { top: "#b9dcee", mid: "#dcedf2", bottom: "#f5f8f1", ground: "#e6e6d4", ink: "#1f231d", accent: "#b8431f", sun: "#fffbea", sunT: 0.5, sunOn: 1, moonOn: 0, stars: 0, cloud: "#ffffff", clouds: 0.85, label: "Noon" },
  afternoon: { top: "#f1d39d", mid: "#f7e4bf", bottom: "#fbf1df", ground: "#ecdcb9", ink: "#33261a", accent: "#b8431f", sun: "#ffe09a", sunT: 0.7, sunOn: 1, moonOn: 0, stars: 0, cloud: "#fff6e6", clouds: 0.7, label: "Afternoon" },
  sunset: { top: "#6d68a6", mid: "#ee9668", bottom: "#f7d3b0", ground: "#e7b48b", ink: "#2b1d14", accent: "#a63a17", sun: "#ff9a57", sunT: 0.93, sunOn: 1, moonOn: 0, stars: 0.15, cloud: "#ffc7a8", clouds: 0.55, label: "Sunset" },
  evening: { top: "#262b4f", mid: "#5b4a72", bottom: "#a87189", ground: "#4b3c50", ink: "#f2ede6", accent: "#ff9a6b", sun: "#ff8a4c", sunT: 1.08, sunOn: 0, moonOn: 0.5, stars: 0.55, cloud: "#7a6a8c", clouds: 0.3, label: "Evening" },
  night: { top: "#0a0f1e", mid: "#141b31", bottom: "#222a44", ground: "#1b2131", ink: "#eceae2", accent: "#ef7a52", sun: "#ff8a4c", sunT: 1.1, sunOn: 0, moonOn: 1, stars: 1, cloud: "#2b3346", clouds: 0.15, label: "Night" },
};

const stars = Array.from({ length: 80 }, (_, i) => {
  const r = (n: number) => {
    const v = Math.sin((i + 1) * 12.9898 + n * 78.233) * 43758.5453;
    return Math.round((v - Math.floor(v)) * 1000) / 1000;
  };
  return { x: r(1) * 100, y: r(2) * 60, s: 1 + r(3) * 1.4, d: r(4) * 4 };
});

const clouds = [
  { top: "9%", left: "48%", w: 220, dur: 70 },
  { top: "24%", left: "64%", w: 320, dur: 95 },
  { top: "5%", left: "82%", w: 170, dur: 80 },
];

function Cloud({ w, color }: { w: number; color: MotionValue<string> }) {
  return (
    <motion.svg width={w} height={w * 0.38} viewBox="0 0 200 76" style={{ fill: color }}>
      <ellipse cx="60" cy="50" rx="50" ry="24" />
      <ellipse cx="105" cy="34" rx="44" ry="30" />
      <ellipse cx="148" cy="50" rx="44" ry="22" />
      <rect x="20" y="48" width="170" height="26" rx="13" />
    </motion.svg>
  );
}

/** "I write code that *ships.*" → the starred words become the italic accent. */
function Title({ text, accent }: { text: string; accent: MotionValue<string> }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.startsWith("*") ? (
          <motion.em key={i} style={{ color: accent }} className="wonk italic">
            {part.slice(1, -1)}
          </motion.em>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function Hero({ chapters }: { chapters: Chapter[] }) {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const n = chapters.length;
  const [active, setActive] = useState(0);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(p, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    if (i !== active) setActive(i);
  });

  // Each chapter's look is pinned to the middle of its scroll segment; the sky blends between them.
  const moods = chapters.map((c) => MOODS[c.mood]);
  const stops = [0, ...chapters.map((_, i) => (i + 0.5) / n), 1];
  const pick = <T,>(f: (m: (typeof moods)[number]) => T): T[] => {
    const vals = moods.map(f);
    return [vals[0], ...vals, vals[vals.length - 1]];
  };

  const top = useTransform(p, stops, pick((m) => m.top));
  const mid = useTransform(p, stops, pick((m) => m.mid));
  const bottom = useTransform(p, stops, pick((m) => m.bottom));
  const ground = useTransform(p, stops, pick((m) => m.ground));
  const ink = useTransform(p, stops, pick((m) => m.ink));

  // While the story sky is behind the nav, the nav text follows the sky's ink;
  // once the paper sheet passes under it, it falls back to the theme's ink.
  const { scrollY } = useScroll();
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const el = ref.current;
      const overSky = !!el && window.scrollY < el.offsetTop + el.offsetHeight - 72;
      if (overSky) root.style.setProperty("--nav-ink", ink.get());
      else root.style.removeProperty("--nav-ink");
    };
    sync();
    const a = scrollY.on("change", sync);
    const b = ink.on("change", sync);
    return () => {
      a();
      b();
      root.style.removeProperty("--nav-ink");
    };
  }, [scrollY, ink]);
  const accent = useTransform(p, stops, pick((m) => m.accent));
  const sunColor = useTransform(p, stops, pick((m) => m.sun));
  const sunT = useTransform(p, stops, pick((m) => m.sunT));
  const sunOn = useTransform(p, stops, pick((m) => m.sunOn));
  const moonOn = useTransform(p, stops, pick((m) => m.moonOn));
  const starsOn = useTransform(p, stops, pick((m) => m.stars));
  const cloudColor = useTransform(p, stops, pick((m) => m.cloud));
  const cloudsOn = useTransform(p, stops, pick((m) => m.clouds));

  const sky = useMotionTemplate`linear-gradient(180deg, ${top} 0%, ${mid} 48%, ${bottom} 100%)`;
  const sunLeft = useTransform(sunT, (t) => `${6 + t * 82}%`);
  const sunTop = useTransform(sunT, (t) => `${66 - Math.sin(Math.min(Math.max(t, 0), 1) * Math.PI) * 50}%`);
  const sunGlow = useMotionTemplate`0 0 90px 40px color-mix(in srgb, ${sunColor} 55%, transparent)`;
  const hintOn = useTransform(p, [0, 0.04], [1, 0]);

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    const y = el.offsetTop + ((i + 0.5) / n) * travel;
    if (lenis) lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const ch = chapters[active];

  return (
    <section ref={ref} id="top" style={{ height: `${n * 100}svh` }} className="relative">
      <motion.div style={{ backgroundImage: sky, color: ink }} className="sticky top-0 h-svh overflow-hidden">
        {/* stars */}
        <motion.div aria-hidden style={{ opacity: starsOn }} className="absolute inset-0">
          {stars.map((s, i) => (
            <span
              key={i}
              className="twinkle absolute rounded-full bg-white"
              style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }}
            />
          ))}
        </motion.div>

        {/* sun on its arc */}
        <motion.div
          aria-hidden
          style={{ left: sunLeft, top: sunTop, opacity: sunOn, backgroundColor: sunColor, boxShadow: sunGlow }}
          className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-32 sm:w-32"
        />
        {/* moon */}
        <motion.div
          aria-hidden
          style={{ opacity: moonOn }}
          className="absolute right-[10%] top-[52%] h-14 w-14 rounded-full md:right-[14%] md:top-[14%] bg-[#eef0e6] shadow-[0_0_80px_24px_rgba(135,151,239,0.35)] md:h-24 md:w-24"
        >
          <span className="absolute left-[26%] top-[30%] h-[18%] w-[18%] rounded-full bg-black/10" />
          <span className="absolute left-[56%] top-[54%] h-[12%] w-[12%] rounded-full bg-black/10" />
          <span className="absolute left-[38%] top-[66%] h-[8%] w-[8%] rounded-full bg-black/10" />
        </motion.div>

        {/* clouds */}
        <motion.div aria-hidden style={{ opacity: cloudsOn }} className="absolute inset-0 hidden md:block">
          {clouds.map((c, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ top: c.top, left: c.left }}
              animate={{ x: [0, 40, 0] }}
              transition={{ duration: c.dur / 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cloud w={c.w} color={cloudColor} />
            </motion.div>
          ))}
        </motion.div>

        {/* giant ghost clock */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[16%] flex justify-center overflow-hidden md:justify-end md:pr-[4%]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={ch.time}
              initial={{ y: "40%", opacity: 0 }}
              animate={{ y: 0, opacity: 0.09 }}
              exit={{ y: "-40%", opacity: 0 }}
              transition={{ duration: 0.8, ease }}
              className="font-serif text-[clamp(7rem,26vw,22rem)] leading-none tracking-[-0.04em] tabular-nums"
            >
              {ch.time}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* hills */}
        <svg aria-hidden className="absolute inset-x-0 bottom-0 h-[24%] w-full" viewBox="0 0 1440 300" preserveAspectRatio="none">
          <motion.path d="M0 120 C 300 40, 620 150, 900 90 S 1300 40, 1440 100 L1440 300 L0 300Z" style={{ fill: ground }} opacity={0.55} />
          <motion.path d="M0 170 C 360 110, 700 200, 1040 150 S 1340 120, 1440 150 L1440 300 L0 300Z" style={{ fill: ground }} />
        </svg>

        {/* the character, swapped per chapter */}
        <div className="absolute bottom-[9%] left-1/2 aspect-[5/4] w-[min(88vw,520px)] -translate-x-1/2 md:left-[62%]">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={ch.file}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.96, filter: "blur(8px)" }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="absolute inset-0"
            >
              <Image
                src={`/scenes/${ch.file}`}
                alt={`Illustration: ${ch.title.replaceAll("*", "")}`}
                fill
                sizes="(max-width: 768px) 88vw, 520px"
                className="object-contain object-bottom"
                loading="eager"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* copy */}
        <div className={`${wrap} relative z-10 flex h-full flex-col pb-8 pt-24 sm:pt-28`}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="font-mono text-xs opacity-70"
          >
            A day with {profile.name} · Full-stack engineer, {profile.location}
          </motion.p>

          <div className="mt-6 max-w-[34rem] sm:mt-10">
            <div className="relative h-6 overflow-hidden font-mono text-sm">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={ch.time}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <motion.span style={{ color: accent }}>{ch.time}</motion.span>
                  <span className="opacity-60"> · {MOODS[ch.mood].label}</span>
                </motion.p>
              </AnimatePresence>
            </div>

            <h1 className="sr-only">Deepak Kumar, full-stack engineer</h1>
            <div className="relative mt-3 min-h-[2.3em] text-[clamp(2.4rem,5.4vw,4.75rem)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={ch.title}
                  initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.55, ease }}
                  className="font-serif leading-[1.05] tracking-[-0.025em]"
                >
                  <Title text={ch.title} accent={accent} />
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="relative mt-4 h-7 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={ch.note}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.75 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.05, ease }}
                  className="text-base sm:text-lg"
                >
                  {ch.note}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#work"
              className="group inline-flex h-11 items-center gap-4 rounded-full border border-current pl-5 pr-1.5 text-sm font-medium backdrop-blur-sm transition hover:bg-black/5"
            >
              <Roll>See my work</Roll>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-current/10 transition-transform duration-500 group-hover:rotate-90">↓</span>
            </a>
            <a href={profile.resume} download className="group text-sm opacity-80 hover:opacity-100">
              <span className="link-draw pb-0.5">Download résumé</span>
            </a>
          </div>

          {/* mobile progress */}
          <div className="mt-auto flex justify-center gap-1.5 md:hidden">
            {chapters.map((c, i) => (
              <button key={c.file} onClick={() => goTo(i)} aria-label={`${c.time}`} className="grid h-6 place-items-center">
                <motion.span
                  className="block h-1 rounded-full"
                  style={{ backgroundColor: i === active ? accent : "currentColor", opacity: i === active ? 1 : 0.3 }}
                  animate={{ width: i === active ? 24 : 6 }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* timeline */}
        <ol className="absolute right-[max(1.25rem,calc((100vw-72rem)/2+2rem))] top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-1 md:flex">
          {chapters.map((c, i) => (
            <li key={c.file}>
              <button onClick={() => goTo(i)} className="group flex items-center justify-end gap-3 py-1.5 font-mono text-xs">
                <span className={`transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-40 group-hover:opacity-80"}`}>{c.time}</span>
                <motion.span
                  className="block h-px"
                  style={{ backgroundColor: i === active ? accent : "currentColor", opacity: i === active ? 1 : 0.35 }}
                  animate={{ width: i === active ? 28 : 12 }}
                  transition={{ duration: 0.4, ease }}
                />
              </button>
            </li>
          ))}
        </ol>

        {/* scroll hint */}
        <motion.p
          style={{ opacity: hintOn }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 font-mono text-[11px] md:flex"
        >
          scroll to spend the day with me
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            ↓
          </motion.span>
        </motion.p>
      </motion.div>
    </section>
  );
}
