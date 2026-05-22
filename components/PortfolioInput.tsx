"use client";

import { useEffect, useState } from "react";
import { SAMPLE_PORTFOLIO } from "@/lib/sample-portfolio";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onAnalyze: () => void;
  loading: boolean;
};

const LOADING_PHASES: readonly string[] = [
  "Lukee positioita",
  "Laskee allokaatiota",
  "Arvioi riskiä",
  "Muotoilee suositukset",
];

export function PortfolioInput({ value, onChange, onAnalyze, loading }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!loading) {
      setPhase(0);
      return;
    }
    setPhase(0);
    const tick = setInterval(() => {
      setPhase((p) => Math.min(p + 1, LOADING_PHASES.length - 1));
    }, 1100);
    return () => clearInterval(tick);
  }, [loading]);

  const counter = `[${String(phase + 1).padStart(2, "0")}/${String(LOADING_PHASES.length).padStart(2, "0")}]`;
  const phaseLabel = LOADING_PHASES[phase];

  return (
    <section className="flex flex-col h-full">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="eyebrow">Syöte</h2>
        <span className="tabular text-[0.7rem] text-[var(--color-ink-3)]">
          rivi / positio
        </span>
      </div>

      <label htmlFor="salkku" className="sr-only">
        Salkku — yksi rivi per positio
      </label>
      <textarea
        id="salkku"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"OMXH25 ETF, 30 000 €\nNokia Oyj, 12 000 €\nNordea Korkorahasto Plus, 15 000 €\niShares Core MSCI World, 8 000 €\n…"}
        className="w-full min-h-[18rem] flex-1 bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-none p-4 text-[var(--color-ink)] tabular text-[0.92rem] leading-relaxed placeholder:text-[var(--color-ink-3)] focus:outline-none focus:border-[var(--color-oxblood)] focus:bg-[var(--color-paper)] resize-none transition-colors"
        disabled={loading}
        spellCheck={false}
        maxLength={8000}
      />

      <div className="flex flex-wrap items-center gap-3 mt-5">
        <button
          type="button"
          onClick={() => onChange(SAMPLE_PORTFOLIO)}
          disabled={loading}
          className="px-4 py-2.5 border border-[var(--color-rule)] text-[var(--color-ink-2)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] text-sm font-serif disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Käytä esimerkkidataa
        </button>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={loading || !value.trim()}
          className="relative ml-auto px-5 py-2.5 bg-[var(--color-oxblood)] hover:bg-[#651818] text-[var(--color-paper)] text-sm font-serif tracking-wide disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-3 min-w-[12rem] justify-center"
        >
          {loading ? (
            <>
              <span className="tabular text-[0.72rem] opacity-80">{counter}</span>
              <span className="font-serif italic">{phaseLabel}…</span>
            </>
          ) : (
            <>
              <span>Analysoi salkku</span>
              <span aria-hidden className="tabular text-[0.72rem] opacity-70">→</span>
            </>
          )}
        </button>
      </div>

      <p className="mt-4 text-[0.78rem] text-[var(--color-ink-3)] leading-relaxed max-w-[36ch]">
        Liitä salkku tekstinä — yksi rivi per positio. Mukaan voi laittaa rahastot,
        ETF:t, yksittäiset osakkeet ja käteisen.
      </p>
    </section>
  );
}
