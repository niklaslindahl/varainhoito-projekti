import type { DiversificationWarning, WarningType } from "@/lib/types";
import { WarningTypeGlyph } from "@/components/Icons";

const LABELS: Record<WarningType, string> = {
  yhtio: "Yhtiö",
  sektori: "Sektori",
  alue: "Alue",
};

function severityColor(w: DiversificationWarning): string {
  if (w.tyyppi === "yhtio") {
    return w.prosentti > 20 ? "var(--color-oxblood)" : "var(--color-goldenrod)";
  }
  if (w.tyyppi === "sektori") {
    return w.prosentti > 55 ? "var(--color-oxblood)" : "var(--color-goldenrod)";
  }
  return w.prosentti > 85 ? "var(--color-oxblood)" : "var(--color-goldenrod)";
}

export function DiversificationWarnings({ items }: { items: DiversificationWarning[] }) {
  return (
    <section aria-labelledby="varoitukset-otsikko">
      <header className="mb-4 flex items-baseline justify-between">
        <div>
          <p className="eyebrow">§ 03</p>
          <h2
            id="varoitukset-otsikko"
            className="font-serif text-[1.75rem] font-semibold tracking-tight text-[var(--color-ink)] mt-1"
          >
            Hajautusvaroitukset
          </h2>
        </div>
        <span className="tabular text-[0.72rem] text-[var(--color-ink-3)]">
          {items.length === 0 ? "puhdas" : `${items.length} havainto${items.length === 1 ? "" : "a"}`}
        </span>
      </header>

      {items.length === 0 ? (
        <p className="font-serif italic text-[var(--color-ink-2)] text-[1rem]" style={{ fontWeight: 300 }}>
          Ei merkittäviä keskittymiä — hajautus on tasapainossa kynnyslukemilla mitattuna.
        </p>
      ) : (
        <ul className="divide-y divide-[var(--color-rule)] border-t border-b border-[var(--color-rule)]">
          {items.map((w, i) => {
            const accent = severityColor(w);
            return (
              <li key={i} className="py-4 grid grid-cols-[auto_1fr_auto] gap-x-5 gap-y-1 items-baseline">
                <span
                  className="row-span-2 self-start mt-0.5"
                  style={{ color: accent }}
                  aria-hidden
                >
                  <WarningTypeGlyph type={w.tyyppi} width={18} height={18} />
                </span>

                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="eyebrow" style={{ color: "var(--color-ink-3)" }}>
                    {LABELS[w.tyyppi]}
                  </span>
                  <span className="font-serif font-semibold text-[1.05rem] text-[var(--color-ink)]">
                    {w.kohde}
                  </span>
                </div>

                <span
                  className="tabular text-[1.05rem] font-medium"
                  style={{ color: accent }}
                >
                  {w.prosentti.toFixed(1).replace(".", ",")} %
                </span>

                <p className="col-span-2 font-serif text-[0.92rem] leading-relaxed text-[var(--color-ink-2)] max-w-[58ch]">
                  {w.kuvaus}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
