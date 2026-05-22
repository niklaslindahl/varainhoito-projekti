"use client";

import type { Allocation, AllocationCategory } from "@/lib/types";

const COLORS: Record<AllocationCategory, string> = {
  Osakkeet: "var(--color-oxblood)",
  Korot: "var(--color-racing)",
  Vaihtoehtoiset: "var(--color-goldenrod)",
  Kateinen: "var(--color-rule)",
};

const LABELS: Record<AllocationCategory, string> = {
  Osakkeet: "Osakkeet",
  Korot: "Korot",
  Vaihtoehtoiset: "Vaihtoehtoiset",
  Kateinen: "Käteinen",
};

const ORDER: AllocationCategory[] = ["Osakkeet", "Korot", "Vaihtoehtoiset", "Kateinen"];

function sortByOrder(items: Allocation[]): Allocation[] {
  const byKey = new Map(items.map((i) => [i.luokka, i] as const));
  return ORDER.flatMap((k) => {
    const it = byKey.get(k);
    return it ? [it] : [];
  });
}

function clampPercent(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

function tickString(percent: number): string {
  const segments = Math.max(1, Math.round(percent / 4));
  return "—".repeat(segments);
}

export function AllocationBreakdown({ items }: { items: Allocation[] }) {
  const sorted = sortByOrder(items);
  const total = sorted.reduce((a, b) => a + clampPercent(b.prosentti), 0) || 100;

  return (
    <section aria-labelledby="allokaatio-otsikko">
      <header className="flex items-baseline justify-between mb-4">
        <div>
          <p className="eyebrow">§ 01</p>
          <h2
            id="allokaatio-otsikko"
            className="font-serif text-[1.75rem] font-semibold tracking-tight text-[var(--color-ink)] mt-1"
          >
            Allokaatio
          </h2>
        </div>
        <span className="tabular text-[0.72rem] text-[var(--color-ink-3)]">
          n = {sorted.length}
        </span>
      </header>

      <div className="bar-grow">
        <div
          className="flex h-12 w-full overflow-hidden border border-[var(--color-rule)]"
          role="img"
          aria-label="Allokaation jakauma"
        >
          {sorted.map((a) => {
            const w = (clampPercent(a.prosentti) / total) * 100;
            if (w <= 0) return null;
            return (
              <div
                key={a.luokka}
                title={`${LABELS[a.luokka]} ${a.prosentti.toFixed(1)} %`}
                style={{
                  width: `${w}%`,
                  background: COLORS[a.luokka],
                }}
                className="transition-[filter] duration-200 hover:brightness-90"
              />
            );
          })}
        </div>
      </div>

      <table className="w-full mt-6 border-collapse">
        <thead>
          <tr className="text-left text-[0.72rem] uppercase tracking-[0.14em] text-[var(--color-ink-3)]">
            <th className="py-2 font-normal w-[22%]">Luokka</th>
            <th className="py-2 font-normal w-[44%]">Osuus</th>
            <th className="py-2 font-normal text-right w-[16%]">Prosentti</th>
            <th className="py-2 font-normal text-right w-[18%]">Painopiste</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((a) => {
            const pct = clampPercent(a.prosentti);
            return (
              <tr
                key={a.luokka}
                className="border-t border-[var(--color-rule)]"
              >
                <td className="py-3 align-middle">
                  <span className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="inline-block h-2 w-2"
                      style={{ background: COLORS[a.luokka] }}
                    />
                    <span className="font-serif text-[0.95rem]">
                      {LABELS[a.luokka] ?? a.luokka}
                    </span>
                  </span>
                </td>
                <td
                  className="py-3 align-middle tabular text-[0.85rem] text-[var(--color-ink-2)]"
                  aria-hidden
                >
                  {tickString(pct)}
                </td>
                <td className="py-3 align-middle tabular text-right text-[0.95rem] text-[var(--color-ink)]">
                  {pct.toFixed(1).replace(".", ",")} %
                </td>
                <td className="py-3 align-middle text-right text-[0.78rem] text-[var(--color-ink-3)] tabular">
                  {pct >= 50 ? "ydin" : pct >= 20 ? "tukeva" : pct >= 5 ? "kevyt" : "marginaali"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
