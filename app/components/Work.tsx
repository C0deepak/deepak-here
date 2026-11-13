import { work } from "../lib/data";
import { wrap } from "../lib/ui";
import { Reveal } from "./Reveal";
import SectionHead from "./SectionHead";
import WorkVisual from "./WorkVisual";

export default function Work() {
  return (
    <section id="work" className={`${wrap} scroll-mt-20 py-24 sm:py-32`}>
      <SectionHead index="02" title="Selected work" sub="Things that shipped, and stayed shipped." />

      <ul className="grid gap-5 md:grid-cols-2">
        {work.map((w, i) => {
          const Tag = w.href ? "a" : "div";
          const wide = i === work.length - 1 && work.length % 2 === 1;
          return (
            <Reveal as="li" key={w.no} delay={(i % 2) * 0.08} className={wide ? "md:col-span-2" : ""}>
              <Tag
                {...(w.href ? { href: w.href, target: "_blank", rel: "noreferrer" } : {})}
                className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper transition duration-500 hover:-translate-y-1 hover:border-ink-3/50 hover:shadow-[0_30px_60px_-30px_rgba(40,30,20,0.3)] ${
                  wide ? "md:flex-row" : ""
                }`}
              >
                <div
                  className={`relative flex items-center justify-center bg-paper-2 ${
                    wide ? "h-64 md:h-auto md:w-1/2" : "h-64"
                  }`}
                >
                  <span className="absolute left-5 top-4 font-mono text-[11px] text-ink-3">{w.no}</span>
                  <WorkVisual kind={w.visual} />
                </div>
                <div className={`flex flex-1 flex-col p-6 sm:p-7 ${wide ? "md:w-1/2 md:justify-center" : ""}`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">{w.tag}</span>
                    <span className="font-serif text-lg text-accent">
                      {w.metric} <span className="font-sans text-xs text-ink-3">{w.metricLabel}</span>
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl leading-snug tracking-tight">
                    <span className="link-draw">{w.title}</span>
                    {w.href && (
                      <span className="ml-2 inline-block text-ink-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                        ↗
                      </span>
                    )}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-2">{w.dek}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                    {w.stack.map((s) => (
                      <span key={s} className="rounded-full bg-paper-2 px-2.5 py-1 font-mono text-[11px] text-ink-3">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Tag>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
