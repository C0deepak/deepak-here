"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { jobs } from "../lib/data";
import { wrap } from "../lib/ui";
import { Reveal } from "./Reveal";
import SectionHead from "./SectionHead";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="experience" className={`${wrap} scroll-mt-20 py-24 sm:py-32`}>
      <SectionHead index="03" title="Experience" sub="Small teams, tight loops, production on the line." />

      <div ref={ref} className="relative">
        <div aria-hidden className="absolute bottom-0 left-[19px] top-0 w-px bg-line md:left-[calc(33.333%+19px)]" />
        <motion.div
          aria-hidden
          style={{ scaleY }}
          className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-accent md:left-[calc(33.333%+19px)]"
        />

        <div className="space-y-20">
          {jobs.map((j) => (
            <article key={j.company} className="relative grid gap-6 md:grid-cols-3 md:gap-0">
              <Reveal className="pl-14 md:sticky md:top-28 md:self-start md:pl-0 md:pr-14">
                <p className="font-mono text-xs text-ink-3">{j.period}</p>
                <h3 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">{j.company}</h3>
                <p className="mt-1 text-ink-2">{j.role}</p>
                <p className="text-sm text-ink-3">{j.place}</p>
              </Reveal>

              {/* monogram on the rail */}
              <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-line bg-paper font-serif text-lg text-accent shadow-sm md:left-[33.333%]">
                {j.company[0]}
              </span>

              <div className="pl-14 md:col-span-2 md:pl-20">
                <ul className="space-y-3">
                  {j.points.map((p, i) => (
                    <Reveal as="li" key={i} delay={i * 0.04}>
                      <div className="group flex gap-4 rounded-2xl border border-transparent p-4 leading-relaxed text-ink-2 transition duration-300 hover:border-line hover:bg-paper-2/60 hover:text-ink">
                        <span className="mt-0.5 font-mono text-[11px] text-ink-soft transition-colors group-hover:text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{p}</span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-1.5 pl-4">
                  {j.stack.map((s) => (
                    <span key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-ink-3">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
