"use client";

import { useEffect, useState } from "react";
import { PortfolioInput } from "@/components/PortfolioInput";
import { AnalysisReport } from "@/components/AnalysisReport";
import type { ApiResponse } from "@/lib/types";

function formatDateFI(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

export default function Home() {
  const [salkku, setSalkku] = useState("");
  const [analysis, setAnalysis] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [dateStr, setDateStr] = useState<string>("");
  useEffect(() => {
    setDateStr(formatDateFI(new Date()));
  }, []);

  const analyze = async () => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ salkku }),
      });
      const data = (await res.json()) as ApiResponse;
      setAnalysis(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Tuntematon virhe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      {/* Top hairline header */}
      <header className="border-b border-[var(--color-rule)]">
        <div className="max-w-[88rem] mx-auto px-6 lg:px-12 py-5 flex items-start justify-between gap-6">
          <div>
            <p className="font-serif font-semibold text-[1.5rem] leading-none tracking-tight">
              NL<span className="text-[var(--color-oxblood)]">.</span>
            </p>
            <p className="eyebrow mt-2">Niklas Lindahl — Wealth Advisory</p>
          </div>
          <div className="text-right">
            <p className="tabular text-[0.78rem] text-[var(--color-ink-2)]">{dateStr || " "}</p>
            <p className="eyebrow mt-2">v0.1 · demo</p>
          </div>
        </div>
      </header>

      {/* Page title */}
      <section className="border-b border-[var(--color-rule)]">
        <div className="max-w-[88rem] mx-auto px-6 lg:px-12 pt-10 pb-8 lg:pt-14 lg:pb-12">
          <p className="eyebrow" style={{ color: "var(--color-oxblood)" }}>
            Salkkuanalyysi
          </p>
          <h1 className="headline mt-3 text-[var(--color-ink)]">
            Hajautus, riski ja
            <br />
            seuraavat askeleet<span className="text-[var(--color-oxblood)]">.</span>
          </h1>
          <p
            className="headline-italic text-[var(--color-ink-2)] mt-5"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)", maxWidth: "52ch" }}
          >
            Tekoälypohjainen näkemys — yhdellä luennalla, ilman myyntipuhetta.
          </p>
        </div>
      </section>

      {/* Main: 40 / 60 split with vertical rule on desktop */}
      <section className="max-w-[88rem] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_1px_minmax(0,3fr)] gap-10 lg:gap-0">
          <div className="lg:pr-12">
            <PortfolioInput
              value={salkku}
              onChange={setSalkku}
              onAnalyze={analyze}
              loading={loading}
            />
          </div>

          <div aria-hidden className="hidden lg:block bg-[var(--color-rule)]" />

          <div className="lg:pl-12">
            <AnalysisReport analysis={analysis} loading={loading} error={error} />
          </div>
        </div>
      </section>

      {/* Footer / disclaimer */}
      <footer className="border-t border-[var(--color-rule)]">
        <div className="max-w-[88rem] mx-auto px-6 lg:px-12 py-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-start">
          <p
            className="font-serif italic text-[0.875rem] text-[var(--color-ink-2)] leading-relaxed max-w-[68ch]"
            style={{ fontWeight: 400 }}
          >
            <span className="text-[var(--color-oxblood)] not-italic font-semibold mr-1">*</span>
            Tämä työkalu tuottaa havainnollistuksia ja näkemyksiä keskustelun tueksi.
            Se ei ole henkilökohtaista sijoitusneuvontaa eikä toimeksiantosuositusta.
            Tarkista lukemat aina riippumattomista lähteistä.
          </p>
          <p className="eyebrow text-right lg:text-left">
            Rakentanut Niklas Lindahl · Claude Code
          </p>
        </div>
      </footer>
    </main>
  );
}
