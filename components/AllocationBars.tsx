import type { Allocation, AllocationCategory } from "@/lib/types";

const COLORS: Record<AllocationCategory, string> = {
  Osakkeet: "bg-sky-500",
  Korot: "bg-emerald-500",
  Vaihtoehtoiset: "bg-amber-500",
  Kateinen: "bg-slate-400",
};

const LABELS: Record<AllocationCategory, string> = {
  Osakkeet: "Osakkeet",
  Korot: "Korot",
  Vaihtoehtoiset: "Vaihtoehtoiset",
  Kateinen: "Käteinen",
};

export function AllocationBars({ items }: { items: Allocation[] }) {
  return (
    <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
      <h2 className="text-slate-200 font-semibold mb-4 text-xs uppercase tracking-widest">
        Allokaatio
      </h2>
      <div className="space-y-3">
        {items.map((a) => (
          <div key={a.luokka}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-200">{LABELS[a.luokka] ?? a.luokka}</span>
              <span className="text-slate-400 font-mono tabular-nums">
                {a.prosentti.toFixed(1)} %
              </span>
            </div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
              <div
                className={`h-full ${COLORS[a.luokka] ?? "bg-slate-500"} transition-all`}
                style={{ width: `${Math.min(100, Math.max(0, a.prosentti))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
