"use client";

import { useState } from "react";
import { PortfolioInput } from "@/components/PortfolioInput";
import { AnalysisReport } from "@/components/AnalysisReport";
import type { ApiResponse } from "@/lib/types";

export default function Home() {
  const [salkku, setSalkku] = useState("");
  const [analysis, setAnalysis] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <main className="min-h-screen px-6 py-8 lg:px-12 lg:py-12 max-w-7xl mx-auto">
      <header className="mb-8 lg:mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Niklas Lindahl</p>
        <h1 className="text-2xl lg:text-3xl font-semibold text-slate-100 mt-2">
          Varainhoidon AI-avustaja
          <span className="text-slate-500 font-normal"> — salkkuanalyysi</span>
        </h1>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioInput value={salkku} onChange={setSalkku} onAnalyze={analyze} loading={loading} />
        <AnalysisReport analysis={analysis} loading={loading} error={error} />
      </div>
      <footer className="mt-12 text-center text-xs text-slate-600">
        Analyysi perustuu syötteeseesi ja kielimallin tuottamaan arvioon. Ei ole sijoitusneuvonta.
      </footer>
    </main>
  );
}
