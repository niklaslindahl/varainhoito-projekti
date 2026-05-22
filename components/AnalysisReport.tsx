"use client";

import type { ApiResponse } from "@/lib/types";
import { isAnalysisError } from "@/lib/types";
import { AllocationBars } from "./AllocationBars";
import { DiversificationWarnings } from "./DiversificationWarnings";
import { RiskProfile } from "./RiskProfile";
import { Recommendations } from "./Recommendations";
import { CopyButton } from "./CopyButton";

type Props = {
  analysis: ApiResponse | null;
  loading: boolean;
  error: string | null;
};

export function AnalysisReport({ analysis, loading, error }: Props) {
  if (loading) {
    return (
      <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 flex items-center justify-center min-h-[400px]">
        <div className="text-slate-400 text-sm flex items-center gap-3">
          <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
          Analysoidaan salkkua…
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-slate-800/50 border border-amber-500/40 rounded-lg p-5">
        <h2 className="text-amber-400 font-semibold mb-2">Verkkovirhe</h2>
        <p className="text-slate-300 text-sm">{error}</p>
      </section>
    );
  }

  if (!analysis) {
    return (
      <section className="bg-slate-800/30 border border-dashed border-slate-700 rounded-lg p-5 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-slate-500 text-sm max-w-xs">
          Liitä salkku vasemmalle ja klikkaa &quot;Analysoi salkku&quot; — raportti ilmestyy tähän.
        </div>
      </section>
    );
  }

  if (isAnalysisError(analysis)) {
    return (
      <section className="bg-slate-800/50 border border-amber-500/40 rounded-lg p-5">
        <h2 className="text-amber-400 font-semibold mb-2">Analyysiä ei voitu tehdä</h2>
        <p className="text-slate-300 text-sm">{analysis.selitys}</p>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <CopyButton analysis={analysis} />
      <AllocationBars items={analysis.allokaatio} />
      <DiversificationWarnings items={analysis.hajautusvaroitukset} />
      <RiskProfile profile={analysis.riskiprofiili} />
      <Recommendations items={analysis.suositukset} />
    </div>
  );
}
