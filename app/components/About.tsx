import type { ReactNode } from "react";
import { extras, skills } from "../lib/data";
import { wrap } from "../lib/ui";
import { Reveal } from "./Reveal";
import SectionHead from "./SectionHead";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const skillIcons: ReactNode[] = [
  <path key="a" {...stroke} d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-12-2 14" />,
  <g key="b" {...stroke}><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></g>,
  <path key="c" {...stroke} d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4.5 4.5 0 0 1-.5 9.5H7Z" />,
  <g key="d" {...stroke}><rect x="5" y="7" width="14" height="11" rx="3" /><path d="M12 3v4M9 12h.01M15 12h.01M9 15h6" /></g>,
];

const extraIcons: ReactNode[] = [
  <path key="e" {...stroke} d="m3 9 9-5 9 5-9 5-9-5Zm4 2.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5" />,
  <path key="f" {...stroke} d="M5 21V4m0 0h11l-2 4 2 4H5" />,
  <path key="g" {...stroke} d="M8 4h8v5a4 4 0 0 1-8 0V4Zm0 2H5a3 3 0 0 0 3 4m8-4h3a3 3 0 0 1-3 4m-4 3v4m-4 3h8" />,
];

function Icon({ children }: { children: ReactNode }) {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-xl bg-paper text-accent ring-1 ring-line transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
      <svg viewBox="0 0 24 24" className="h-5 w-5">{children}</svg>
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className={`${wrap} scroll-mt-20 py-24 sm:py-32`}>
      <SectionHead index="04" title="Toolbox" sub="What I reach for, and where I learned to reach." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.06}>
            <div className="group h-full rounded-3xl border border-line bg-paper-2/60 p-6 transition duration-500 hover:-translate-y-1 hover:bg-paper-2">
              <Icon>{skillIcons[i]}</Icon>
              <h3 className="mt-5 font-serif text-xl tracking-tight">{g.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="cursor-default rounded-full bg-paper px-2.5 py-1 text-[13px] text-ink-2 ring-1 ring-line transition duration-200 hover:text-accent hover:ring-accent"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {extras.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.06}>
            <div className="group flex h-full items-start gap-4 rounded-3xl border border-line p-6 transition duration-500 hover:-translate-y-1 hover:bg-paper-2/60">
              <Icon>{extraIcons[i]}</Icon>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">{e.meta}</p>
                <h3 className="mt-1 font-serif text-xl tracking-tight">{e.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-3">{e.sub}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
