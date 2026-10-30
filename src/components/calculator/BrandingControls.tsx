"use client";

import { useCalculator } from "@/context/CalculatorContext";
import { PRICING_CONFIG, PRICING_LABELS, BrandingOption } from "@/config/pricing-config";
import { Compass } from "lucide-react";

export function BrandingControls() {
  const { state, setBranding } = useCalculator();

  const options: BrandingOption[] = ["none", "miniKit", "fullBrandbook"];

  return (
    <div className="rounded-3xl border border-border-glass bg-glass-surface backdrop-blur-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3.5 px-7 py-5 border-b border-border-glass">
        <div className="w-9 h-9 rounded-xl bg-bg-main/60 border border-border-glass flex items-center justify-center shrink-0">
          <Compass className="w-4 h-4 text-text-primary" />
        </div>
        <div>
          <h3 className="text-body font-medium text-text-primary">D. Markalama &amp; Brandbook</h3>
          <p className="text-small text-text-secondary">Kurumsal kimlik rehberi ve marka kiti.</p>
        </div>
      </div>

      <div className="px-7 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {options.map((opt) => {
            const isSelected = state.branding === opt;
            const rate = PRICING_CONFIG.branding[opt];
            const meta = PRICING_LABELS.branding[opt];

            return (
              <button
                key={opt}
                type="button"
                onClick={() => setBranding(opt)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col gap-3 ${
                  isSelected
                    ? "border-border-glass-active bg-glass-surface-active text-text-primary"
                    : "border-border-glass bg-bg-main/30 text-text-secondary hover:border-border-glass-active hover:bg-glass-surface hover:text-text-primary"
                }`}
              >
                {/* Radio dot */}
                <div className="flex items-center gap-2">
                  <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? "border-text-primary" : "border-border-glass-active"
                  }`}>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-text-primary block" />}
                  </span>
                  <span className={`text-small font-semibold ${isSelected ? "text-text-primary" : "text-text-secondary"}`}>
                    {meta.title}
                  </span>
                </div>

                <p className="text-[11px] text-text-muted leading-relaxed">{meta.description}</p>

                <div className="pt-2 border-t border-border-glass/50">
                  <span className="text-[11px] font-mono font-semibold text-text-primary">
                    {rate > 0 ? `+${rate} ${PRICING_CONFIG.currency}` : "Dahil"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
