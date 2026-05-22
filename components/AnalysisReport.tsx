"use client";

import type { ApiResponse } from "@/lib/types";
import { isAnalysisError } from "@/lib/types";
import { AllocationBreakdown } from "./AllocationBreakdown";
import { DiversificationWarnings } from "./DiversificationWarnings";
import { RiskProfile } from "./RiskProfile";
import { Recommendations } from "./Recommendations";
import { CopyButton } from "./CopyButton";

type Props = {
  analysis: ApiResponse | null;
  loading: boolean;
  error: string | null;
};

function SkeletonBlock({ height, delay = 0 }: { height: string; delay?: number }) {
  return (
    <div
      className="shimmer w-full border border-[var(--color-rule)]"
      style={{ height, animationDelay: `${delay}ms` }}
    />
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-10 crossfade">
      <div className="space-y-4">
        <p className="eyebrow">§ 01 — Allokaatio</p>
        <SkeletonBlock height="3rem" />
        <div className="space-y-2 pt-2">
          <SkeletonBlock height="1.5rem" delay={100} />
          <SkeletonBlock height="1.5rem" delay={200} />
          <SkeletonBlock height="1.5rem" delay={300} />
          <SkeletonBlock height="1.5rem" delay={400} />
        </div>
      </div>
      <div className="space-y-3">
        <p className="eyebrow">§ 02 — Riskiprofiili</p>
        <div className="flex gap-6 items-start">
          <div className="shimmer h-14 w-52 border border-[var(--color-rule)]" />
          <div className="flex-1 space-y-2">
            <SkeletonBlock height="0.9rem" delay={200} />
            <SkeletonBlock height="0.9rem" delay={300} />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <p className="eyebrow">§ 03 — Hajautusvaroitukset</p>
        <SkeletonBlock height="3.5rem" delay={400} />
        <SkeletonBlock height="3.5rem" delay={500} />
      </div>
      <div className="space-y-3">
        <p className="eyebrow">§ 04 — Suositukset</p>
        <SkeletonBlock height="5rem" delay={600} />
        <SkeletonBlock height="5rem" delay={700} />
        <SkeletonBlock height="5rem" delay={800} />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-dashed border-[var(--color-rule)] p-10 flex flex-col items-start justify-center min-h-[24rem]">
      <p className="eyebrow mb-3">Odottaa syötettä</p>
      <p
        className="font-serif italic text-[1.15rem] text-[var(--color-ink-2)] max-w-[42ch] leading-snug"
        style={{ fontWeight: 300 }}
      >
        Liitä salkku vasemmalle ja paina <span className="not-italic text-[var(--color-oxblood)]">Analysoi salkku</span> —
        raportti rakentuu tähän kuten päivän pääkirjoitus.
      </p>
    </div>
  );
}

function ErrorState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-[var(--color-oxblood)] p-6 bg-[var(--color-paper-2)]">
      <p className="eyebrow mb-2" style={{ color: "var(--color-oxblood)" }}>
        {title}
      </p>
      <p className="font-serif text-[var(--color-ink-2)] leading-relaxed">{body}</p>
    </div>
  );
}

export function AnalysisReport({ analysis, loading, error }: Props) {
  if (loading) return <LoadingSkeleton />;

  if (error) {
    return <ErrorState title="Verkkovirhe" body={error} />;
  }

  if (!analysis) return <EmptyState />;

  if (isAnalysisError(analysis)) {
    return <ErrorState title="Analyysiä ei voitu tehdä" body={analysis.selitys} />;
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-end">
        <CopyButton analysis={analysis} />
      </div>

      <div className="fade-up" style={{ animationDelay: "0ms" }}>
        <AllocationBreakdown items={analysis.allokaatio} />
      </div>

      <div className="fade-up" style={{ animationDelay: "150ms" }}>
        <RiskProfile profile={analysis.riskiprofiili} />
      </div>

      <div className="fade-up" style={{ animationDelay: "300ms" }}>
        <DiversificationWarnings items={analysis.hajautusvaroitukset} />
      </div>

      <div className="fade-up" style={{ animationDelay: "450ms" }}>
        <Recommendations items={analysis.suositukset} />
      </div>
    </div>
  );
}
