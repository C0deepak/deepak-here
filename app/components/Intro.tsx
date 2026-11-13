"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { stats } from "../lib/data";
import { wrap } from "../lib/ui";
import Counter from "./Counter";
import { Reveal } from "./Reveal";

const statement =
  "I like small teams, tight loops, and work that ends in something running. For the last two years I've been shipping visa tech at StampMyVisa: SDKs, automation, computer vision and LLM tools that real people rely on.";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

export default function Intro() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = statement.split(" ");

  return (
    <section className={`${wrap} py-24 sm:py-32`}>
      <div className="flex items-baseline gap-5 border-t border-line pt-6">
        <span className="font-mono text-xs text-accent">01</span>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3">In short</span>
      </div>

      <div className="mt-10 grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <p ref={ref} className="font-serif text-[1.7rem] leading-[1.4] tracking-[-0.01em] sm:text-[2.1rem]">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>

        <dl className="grid grid-cols-2 gap-3 self-start">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="group rounded-2xl border border-line bg-paper-2/60 p-5 transition duration-500 hover:-translate-y-1 hover:bg-paper-2">
              <dt className="font-serif text-4xl tracking-tight">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dt>
              <dd className="mt-2 min-h-[2.5rem] text-sm leading-snug text-ink-3">{s.label}</dd>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-line-soft">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.meter}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
