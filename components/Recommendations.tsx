import type { Recommendation, Impact } from "@/lib/types";
import { ImpactGlyph } from "@/components/Icons";

const IMPACT_COLOR: Record<Impact, string> = {
  matala: "var(--color-ink-3)",
  keskitaso: "var(--color-racing)",
  korkea: "var(--color-oxblood)",
};

const IMPACT_LABEL: Record<Impact, string> = {
  matala: "matala vaikutus",
  keskitaso: "keskitason vaikutus",
  korkea: "korkea vaikutus",
};

export function Recommendations({ items }: { items: Recommendation[] }) {
  return (
    <section aria-labelledby="suositukset-otsikko">
      <header className="mb-5 flex items-baseline justify-between">
        <div>
          <p className="eyebrow">§ 04</p>
          <h2
            id="suositukset-otsikko"
            className="font-serif text-[1.75rem] font-semibold tracking-tight text-[var(--color-ink)] mt-1"
          >
            Suositukset
          </h2>
        </div>
        <span className="tabular text-[0.72rem] text-[var(--color-ink-3)]">
          {String(items.length).padStart(2, "0")} kpl
        </span>
      </header>

      <ol className="border-t border-[var(--color-rule)]">
        {items.map((r, i) => {
          const color = IMPACT_COLOR[r.vaikutus] ?? IMPACT_COLOR.matala;
          return (
            <li
              key={i}
              className="grid grid-cols-[3.5rem_1fr] gap-x-5 py-6 border-b border-[var(--color-rule)]"
            >
              <span
                aria-hidden
                className="font-serif text-[2.25rem] leading-none text-[var(--color-ink-3)] tabular self-start"
                style={{ fontWeight: 300 }}
              >
                {String(i + 1).padStart(2, "0")}
                <span className="text-[var(--color-oxblood)]">.</span>
              </span>

              <div className="min-w-0">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <h3 className="font-serif text-[1.2rem] font-semibold tracking-tight text-[var(--color-ink)] leading-snug max-w-[42ch]">
                    {r.otsikko}
                  </h3>
                  <span
                    className="inline-flex items-center gap-2 shrink-0"
                    style={{ color }}
                  >
                    <ImpactGlyph level={r.vaikutus} width={16} height={16} strokeWidth={1.2} />
                    <span
                      className="eyebrow"
                      style={{ color }}
                    >
                      {IMPACT_LABEL[r.vaikutus]}
                    </span>
                  </span>
                </div>
                <p className="font-serif text-[0.98rem] leading-relaxed text-[var(--color-ink-2)] mt-2 max-w-[62ch]">
                  {r.perustelu}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
