import type { Recommendation, Impact } from "@/lib/types";

const IMPACT_COLORS: Record<Impact, string> = {
  matala: "bg-slate-700/50 border-slate-600 text-slate-300",
  keskitaso: "bg-sky-500/15 border-sky-400/40 text-sky-200",
  korkea: "bg-amber-500/15 border-amber-400/40 text-amber-200",
};

const IMPACT_LABELS: Record<Impact, string> = {
  matala: "Matala vaikutus",
  keskitaso: "Keskitason vaikutus",
  korkea: "Korkea vaikutus",
};

export function Recommendations({ items }: { items: Recommendation[] }) {
  return (
    <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
      <h2 className="text-slate-200 font-semibold mb-4 text-xs uppercase tracking-widest">
        Suositukset
      </h2>
      <ol className="space-y-4">
        {items.map((r, i) => (
          <li key={i} className="flex gap-4">
            <span className="text-2xl font-light text-slate-500 leading-none tabular-nums">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <h3 className="text-slate-100 font-medium">{r.otsikko}</h3>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full border whitespace-nowrap ${
                    IMPACT_COLORS[r.vaikutus] ?? "bg-slate-700 border-slate-600 text-slate-200"
                  }`}
                >
                  {IMPACT_LABELS[r.vaikutus] ?? r.vaikutus}
                </span>
              </div>
              <p className="text-slate-300 text-sm mt-1 leading-relaxed">{r.perustelu}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
