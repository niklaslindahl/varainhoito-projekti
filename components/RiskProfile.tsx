import type { RiskProfile as RiskProfileType, RiskLabel } from "@/lib/types";

const COLORS: Record<RiskLabel, string> = {
  varovainen: "bg-emerald-500/15 border-emerald-400/40 text-emerald-200",
  maltillinen: "bg-sky-500/15 border-sky-400/40 text-sky-200",
  aktiivinen: "bg-amber-500/15 border-amber-400/40 text-amber-200",
  aggressiivinen: "bg-rose-500/15 border-rose-400/40 text-rose-200",
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function RiskProfile({ profile }: { profile: RiskProfileType }) {
  return (
    <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
      <h2 className="text-slate-200 font-semibold mb-4 text-xs uppercase tracking-widest">
        Riskiprofiili
      </h2>
      <div className="flex flex-col items-start gap-3">
        <span
          className={`inline-block px-4 py-1.5 rounded-full border text-sm font-medium ${
            COLORS[profile.leima] ?? "bg-slate-700 border-slate-600 text-slate-200"
          }`}
        >
          {capitalize(profile.leima)}
        </span>
        <p className="text-slate-300 text-sm leading-relaxed">{profile.perustelu}</p>
      </div>
    </section>
  );
}
