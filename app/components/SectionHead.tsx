import { Reveal } from "./Reveal";

export default function SectionHead({ index, title, sub }: { index: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-12 flex flex-col gap-4 border-t border-line pt-6 sm:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="flex items-baseline gap-5">
        <span className="font-mono text-xs text-accent">{index}</span>
        <h2 className="font-serif text-[2.5rem] leading-none tracking-[-0.02em] sm:text-[3.25rem]">{title}</h2>
      </div>
      {sub && <p className="max-w-sm text-ink-3 md:text-right">{sub}</p>}
    </Reveal>
  );
}
