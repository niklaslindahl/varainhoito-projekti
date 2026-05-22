import type { RiskProfile as RiskProfileType, RiskLabel } from "@/lib/types";
import { RiskGlyph } from "@/components/Icons";

type Style = {
  badge: string;
  iconColor: string;
};

const STYLES: Record<RiskLabel, Style> = {
  varovainen: {
    badge:
      "bg-[var(--color-paper)] text-[var(--color-racing)] border-[var(--color-racing)]",
    iconColor: "var(--color-racing)",
  },
  maltillinen: {
    badge:
      "bg-[var(--color-paper)] text-[var(--color-ink-2)] border-[var(--color-ink-2)]",
    iconColor: "var(--color-ink-2)",
  },
  aktiivinen: {
    badge:
      "bg-[var(--color-paper)] text-[var(--color-goldenrod)] border-[var(--color-goldenrod)]",
    iconColor: "var(--color-goldenrod)",
  },
  aggressiivinen: {
    badge:
      "bg-[var(--color-oxblood)] text-[var(--color-paper)] border-[var(--color-oxblood)]",
    iconColor: "var(--color-paper)",
  },
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function RiskProfile({ profile }: { profile: RiskProfileType }) {
  const style = STYLES[profile.leima] ?? STYLES.maltillinen;

  return (
    <section aria-labelledby="riski-otsikko">
      <header className="mb-4">
        <p className="eyebrow">§ 02</p>
        <h2
          id="riski-otsikko"
          className="font-serif text-[1.75rem] font-semibold tracking-tight text-[var(--color-ink)] mt-1"
        >
          Riskiprofiili
        </h2>
      </header>

      <div className="flex flex-col sm:flex-row gap-6 sm:items-start">
        <div
          className={`inline-flex items-center gap-3 border px-4 py-3 ${style.badge}`}
          style={{ minWidth: "13rem" }}
        >
          <span style={{ color: style.iconColor }}>
            <RiskGlyph level={profile.leima} width={22} height={22} strokeWidth={1.2} />
          </span>
          <span className="font-serif text-[1.15rem] font-semibold tracking-tight">
            {capitalize(profile.leima)}
          </span>
        </div>

        <p
          className="font-serif italic text-[1rem] leading-relaxed text-[var(--color-ink-2)] max-w-[58ch]"
          style={{ fontWeight: 300 }}
        >
          {profile.perustelu}
        </p>
      </div>
    </section>
  );
}
