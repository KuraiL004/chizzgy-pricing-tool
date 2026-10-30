"use client";

import { useCalculator } from "@/context/CalculatorContext";
import { PRICING_CONFIG, PRICING_LABELS, PosterQuality } from "@/config/pricing-config";
import { Image as ImageIcon, Minus, Plus } from "lucide-react";

export function PosterControls() {
  const { state, setPosterCount, setPosterQuality } = useCalculator();
  const qualityOptions: PosterQuality[] = ["typographic", "manipulation", "render3d"];

  return (
    <div className="rounded-3xl border border-border-glass bg-glass-surface backdrop-blur-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3.5 px-7 py-5 border-b border-border-glass">
        <div className="w-9 h-9 rounded-xl bg-bg-main/60 border border-border-glass flex items-center justify-center shrink-0">
          <ImageIcon className="w-4 h-4 text-text-primary" />
        </div>
        <div>
          <h3 className="text-body font-medium text-text-primary">B. Grafik &amp; Poster</h3>
          <p className="text-small text-text-secondary">Feed afişleri, kampanya görselleri ve 3D render.</p>
        </div>
      </div>

      <div className="px-7 py-6 space-y-6">
        {/* Poster Count */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-body text-text-primary font-medium">Poster Adedi</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPosterCount(state.posterCount - 1)}
                disabled={state.posterCount <= 0}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border-glass text-text-secondary hover:text-text-primary hover:border-border-glass-active hover:bg-glass-surface-hover disabled:opacity-20 transition-all"
                aria-label="Azalt"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-mono font-semibold text-h3 text-text-primary leading-none">
                {state.posterCount}
              </span>
              <button
                type="button"
                onClick={() => setPosterCount(state.posterCount + 1)}
                disabled={state.posterCount >= 30}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border-glass text-text-secondary hover:text-text-primary hover:border-border-glass-active hover:bg-glass-surface-hover disabled:opacity-20 transition-all"
                aria-label="Artır"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={30}
            value={state.posterCount}
            onChange={(e) => setPosterCount(Number(e.target.value))}
            className="w-full"
            style={{ height: "3px" }}
          />
          <div className="flex justify-between text-[11px] text-text-muted font-mono">
            <span>0</span><span>10</span><span>20</span><span>30</span>
          </div>
        </div>

        {/* Quality */}
        <div className="space-y-3 pt-4 border-t border-border-glass">
          <div className="flex items-center justify-between">
            <span className="text-body text-text-primary font-medium">Tasarım Seviyesi</span>
            <span className="text-small text-text-secondary font-mono">afiş başı AZN</span>
          </div>
          <div className="flex gap-2.5">
            {qualityOptions.map((opt) => {
              const rate = PRICING_CONFIG.posters.rates[opt];
              const meta = PRICING_LABELS.posters[opt];
              const isSelected = state.posterQuality === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setPosterQuality(opt)}
                  className={`flex-1 p-3.5 rounded-2xl border text-center transition-all duration-200 ${
                    isSelected
                      ? "border-border-glass-active bg-glass-surface-active text-text-primary scale-[1.01]"
                      : "border-border-glass bg-bg-main/30 text-text-secondary hover:border-border-glass-active hover:bg-glass-surface hover:text-text-primary"
                  }`}
                >
                  <span className="block text-small font-semibold">{meta.title}</span>
                  <span className="block text-[11px] font-mono mt-1 opacity-80">+{rate}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
