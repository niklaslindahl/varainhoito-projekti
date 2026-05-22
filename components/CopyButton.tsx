"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/types";

const CATEGORY_LABEL: Record<string, string> = {
  Osakkeet: "Osakkeet",
  Korot: "Korot",
  Vaihtoehtoiset: "Vaihtoehtoiset",
  Kateinen: "Käteinen",
};

const RISK_LABEL: Record<string, string> = {
  varovainen: "Varovainen",
  maltillinen: "Maltillinen",
  aktiivinen: "Aktiivinen",
  aggressiivinen: "Aggressiivinen",
};

function toMarkdown(a: AnalysisResult): string {
  const lines: string[] = [];
  lines.push("# Salkkuanalyysi");
  lines.push("");
  lines.push("## Allokaatio");
  for (const x of a.allokaatio) {
    lines.push(`- **${CATEGORY_LABEL[x.luokka] ?? x.luokka}**: ${x.prosentti.toFixed(1)} %`);
  }
  lines.push("");
  lines.push("## Riskiprofiili");
  lines.push(`**${RISK_LABEL[a.riskiprofiili.leima] ?? a.riskiprofiili.leima}** — ${a.riskiprofiili.perustelu}`);
  lines.push("");
  lines.push("## Hajautusvaroitukset");
  if (a.hajautusvaroitukset.length === 0) {
    lines.push("Ei merkittäviä keskittymiä.");
  } else {
    for (const w of a.hajautusvaroitukset) {
      lines.push(`- **${w.kohde}** (${w.tyyppi}, ${w.prosentti.toFixed(1)} %): ${w.kuvaus}`);
    }
  }
  lines.push("");
  lines.push("## Suositukset");
  a.suositukset.forEach((r, i) => {
    lines.push(`${i + 1}. **${r.otsikko}** (vaikutus: ${r.vaikutus}) — ${r.perustelu}`);
  });
  return lines.join("\n");
}

export function CopyButton({ analysis }: { analysis: AnalysisResult }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(toMarkdown(analysis));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 px-3 py-1.5 border border-[var(--color-rule)] hover:border-[var(--color-oxblood)] hover:text-[var(--color-oxblood)] text-[var(--color-ink-2)] eyebrow transition-colors"
      style={{ letterSpacing: "0.18em" }}
    >
      <span aria-hidden className="tabular text-[0.65rem]">{copied ? "✓" : "↘"}</span>
      <span>{copied ? "kopioitu" : "kopioi raportti"}</span>
    </button>
  );
}
