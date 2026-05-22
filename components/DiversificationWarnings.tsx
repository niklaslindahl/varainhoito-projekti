import type { DiversificationWarning, WarningType } from "@/lib/types";

const ICONS: Record<WarningType, string> = {
  yhtio: "■",
  sektori: "▲",
  alue: "●",
};

const LABELS: Record<WarningType, string> = {
  yhtio: "Yhtiö",
  sektori: "Sektori",
  alue: "Alue",
};

export function DiversificationWarnings({ items }: { items: DiversificationWarning[] }) {
  return (
    <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
      <h2 className="text-slate-200 font-semibold mb-4 text-xs uppercase tracking-widest">
        Hajautusvaroitukset
      </h2>
      {items.length === 0 ? (
        <p className="text-slate-400 text-sm">Ei merkittäviä keskittymiä.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((w, i) => (
            <li key={i} className="border-l-2 border-amber-400 pl-3">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-amber-400 text-base leading-none">{ICONS[w.tyyppi]}</span>
                <span className="text-[11px] uppercase tracking-widest text-slate-400">
                  {LABELS[w.tyyppi]}
                </span>
                <span className="text-slate-100 font-medium">{w.kohde}</span>
                <span className="text-amber-300 font-mono tabular-nums ml-auto">
                  {w.prosentti.toFixed(1)} %
                </span>
              </div>
              <p className="text-slate-300 text-sm mt-1 leading-relaxed">{w.kuvaus}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
