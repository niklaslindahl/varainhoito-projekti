"use client";

import { SAMPLE_PORTFOLIO } from "@/lib/sample-portfolio";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onAnalyze: () => void;
  loading: boolean;
};

export function PortfolioInput({ value, onChange, onAnalyze, loading }: Props) {
  return (
    <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 flex flex-col">
      <label htmlFor="salkku" className="text-sm font-medium text-slate-300 mb-2">
        Salkku — yksi rivi per positio
      </label>
      <textarea
        id="salkku"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"OMXH25 ETF, 30 000 €\nNokia Oyj, 8 000 €\nNordea Korkorahasto Plus, 15 000 €\n..."}
        className="w-full h-80 bg-slate-950 border border-slate-700 rounded-md p-3 text-slate-100 font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 resize-none"
        disabled={loading}
      />
      <div className="flex flex-wrap gap-3 mt-4">
        <button
          type="button"
          onClick={() => onChange(SAMPLE_PORTFOLIO)}
          disabled={loading}
          className="px-4 py-2 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-300 rounded-md text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Käytä esimerkkidataa
        </button>
        <button
          type="button"
          onClick={onAnalyze}
          disabled={loading || !value.trim()}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-medium rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-2 h-2 bg-slate-950 rounded-full animate-pulse" />
              Analysoidaan…
            </>
          ) : (
            "Analysoi salkku"
          )}
        </button>
      </div>
    </section>
  );
}
