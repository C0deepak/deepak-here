import type { Work } from "../lib/data";

/** Small illustrated diagrams for each project card, drawn with theme tokens. */
export default function WorkVisual({ kind }: { kind: Work["visual"] }) {
  switch (kind) {
    case "sdk":
      return (
        <div className="w-[78%] space-y-2.5">
          {[
            ["Passport", true],
            ["Photo", true],
            ["Travellers · 3", false],
          ].map(([label, done], i) => (
            <div
              key={String(label)}
              className="flex items-center gap-3 rounded-xl border border-line bg-paper px-3.5 py-2.5 text-sm shadow-sm transition-transform duration-500 group-hover:translate-x-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${done ? "bg-accent text-white" : "border border-line text-ink-3"}`}>
                {done ? "✓" : i + 1}
              </span>
              <span className="text-ink-2">{label}</span>
              <span className="ml-auto h-1.5 w-12 overflow-hidden rounded-full bg-line-soft">
                <span className={`block h-full rounded-full bg-accent transition-all duration-700 ${done ? "w-full" : "w-1/3 group-hover:w-2/3"}`} />
              </span>
            </div>
          ))}
        </div>
      );
    case "cv":
      return (
        <div className="relative h-[70%] w-[46%] overflow-hidden rounded-lg border border-line bg-paper p-3 shadow-sm">
          <div className="flex h-full gap-3">
            <div className="h-full w-[42%] rounded-md bg-line-soft" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-1.5 w-full rounded bg-line" />
              <div className="h-1.5 w-3/4 rounded bg-line" />
              <div className="h-1.5 w-5/6 rounded bg-line" />
              <div className="h-1.5 w-1/2 rounded bg-line" />
            </div>
          </div>
          {/* corner brackets */}
          {["left-1.5 top-1.5 border-l border-t", "right-1.5 top-1.5 border-r border-t", "bottom-1.5 left-1.5 border-b border-l", "bottom-1.5 right-1.5 border-b border-r"].map((c) => (
            <span key={c} className={`absolute h-3 w-3 border-accent ${c}`} />
          ))}
          <span className="scan absolute inset-x-2 h-px bg-accent shadow-[0_0_12px_2px_var(--accent)]" />
          <span className="absolute bottom-2 right-2 rounded-full bg-accent px-1.5 py-0.5 font-mono text-[9px] text-white">sharp ✓</span>
        </div>
      );
    case "cost":
      return (
        <div className="relative w-[62%] max-w-[260px] -rotate-2 transition-transform duration-500 group-hover:rotate-0">
          <div className="receipt bg-paper px-4 pt-3.5 font-mono text-[11px] text-ink-2 shadow-[0_14px_30px_-16px_rgba(0,0,0,0.3)]">
            <p className="text-center text-[10px] uppercase tracking-[0.2em] text-ink-3">AWS · monthly bill</p>
            <div className="my-2 border-t border-dashed border-line" />
            {[
              ["Idle EC2 instances", true],
              ["Unused Elastic IPs", true],
              ["Oversized RDS", true],
              ["Self-hosted CI runners", true],
              ["Right-sized stack", false],
            ].map(([label, cut]) => (
              <div key={String(label)} className="flex items-center justify-between py-[3px]">
                <span className={cut ? "strike text-ink-3" : "text-ink"}>{label}</span>
                <span className={cut ? "text-ink-soft" : "text-accent"}>{cut ? "×" : "✓"}</span>
              </div>
            ))}
            <div className="my-2 border-t border-dashed border-line" />
            <div className="flex justify-between text-ink">
              <span>Total</span>
              <span className="text-accent">−48%</span>
            </div>
          </div>
          {/* rubber stamp */}
          <div className="stamp absolute -right-6 top-10 rotate-[-14deg] rounded-md border-2 border-accent px-2.5 py-1 text-center font-mono text-accent bg-paper/70 opacity-90">
            <p className="text-lg font-semibold leading-none">−48%</p>
            <p className="mt-0.5 text-[8px] uppercase tracking-[0.2em]">audited</p>
          </div>
        </div>
      );
    case "chat":
      return (
        <div className="w-[80%] space-y-2.5 text-[13px]">
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-ink px-3.5 py-2 text-paper">Do I need a visa for Japan?</div>
          <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-md border border-line bg-paper px-3.5 py-2 text-ink-2 shadow-sm">
            Yes. Here&apos;s your plan: 6 documents, ~5 working days, ₹ estimate attached.
          </div>
          <div className="flex w-fit gap-1 rounded-2xl rounded-bl-md border border-line bg-paper px-3 py-2.5">
            {[0, 1, 2].map((d) => (
              <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-3" style={{ animationDelay: `${d * 120}ms` }} />
            ))}
          </div>
        </div>
      );
    case "resume":
      return (
        <div className="flex w-[86%] items-center gap-4">
          {[0, 1, 2].map((k) => (
            <div
              key={k}
              className={`flex-1 rounded-lg border border-line bg-paper p-3 shadow-sm transition-transform duration-500 ${
                k === 1 ? "-translate-y-2 group-hover:-translate-y-4" : "group-hover:-translate-y-1"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-5 w-5 rounded-full ${k === 1 ? "bg-accent" : "bg-line"}`} />
                <span className="h-1.5 w-1/2 rounded bg-line" />
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="h-1 w-full rounded bg-line-soft" />
                <div className="h-1 w-4/5 rounded bg-line-soft" />
                <div className="h-1 w-3/5 rounded bg-line-soft" />
              </div>
            </div>
          ))}
        </div>
      );
  }
}
