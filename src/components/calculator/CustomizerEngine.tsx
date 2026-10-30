"use client";

import { SLIDERS } from "@/config/pricing-config";
import { useCalculator } from "@/context/CalculatorContext";
import { GlassSlider } from "@/components/ui/GlassSlider";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

// Apple ayarlar menüsü sadeliğinde, yalnızca slider'lardan oluşan karma paket oluşturucu
export function CustomizerEngine() {
  const { state, setSlider } = useCalculator();

  return (
    <div className="rounded-3xl border border-border-glass bg-glass-surface backdrop-blur-2xl divide-y divide-border-glass">
      {SLIDERS.map((s) => (
        <div key={s.key} className="px-7 py-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="block text-body font-medium text-text-primary">{s.title}</span>
              <span className="block text-small text-text-secondary mt-0.5">{s.description}</span>
            </div>
            <AnimatedNumber
              value={state[s.key]}
              className="text-h3 font-medium text-text-primary tabular-nums min-w-[2ch] text-right"
            />
          </div>
          <GlassSlider
            value={state[s.key]}
            max={s.max}
            label={s.title}
            onChange={(v) => setSlider(s.key, v)}
          />
        </div>
      ))}
    </div>
  );
}
