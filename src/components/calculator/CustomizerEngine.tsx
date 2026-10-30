"use client";

import { SLIDERS, CalculatorState } from "@/config/pricing-config";
import { useCalculator } from "@/context/CalculatorContext";
import { GlassSlider } from "@/components/ui/GlassSlider";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

// Apple ayarlar menüsü sadeliğinde, yalnızca slider'lardan oluşan paket oluşturucu
export function CustomizerEngine() {
  const { state, setCount, setTier } = useCalculator();

  return (
    <div className="rounded-3xl border border-border-glass bg-glass-surface backdrop-blur-2xl divide-y divide-border-glass">
      {SLIDERS.map((s) => {
        if (s.kind === "count") {
          return (
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
              <GlassSlider value={state[s.key]} max={s.max} label={s.title} onChange={(v) => setCount(s.key, v)} />
            </div>
          );
        }

        // Kalite slider'ı: her adım bir seviyeye karşılık gelir
        const index = s.options.findIndex((o) => o.value === state[s.key]);
        return (
          <div key={s.key} className="px-7 py-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="block text-body font-medium text-text-primary">{s.title}</span>
                <span className="block text-small text-text-secondary mt-0.5">{s.description}</span>
              </div>
              <span className="text-body font-medium text-text-primary text-right shrink-0">
                {s.options[index].label}
              </span>
            </div>
            <GlassSlider
              value={index}
              max={s.options.length - 1}
              label={s.title}
              valueText={s.options[index].label}
              onChange={(i) => setTier(s.key, s.options[i].value as CalculatorState[typeof s.key])}
            />
            {/* Etiketler slider noktalarıyla aynı konumda hizalanır */}
            <div className="relative h-5 mt-2 text-[12px] text-text-secondary">
              {s.options.map((o, i) => {
                const pct = (i / (s.options.length - 1)) * 100;
                return (
                  <button
                    key={o.value}
                    type="button"
                    tabIndex={-1}
                    onClick={() => setTier(s.key, o.value as CalculatorState[typeof s.key])}
                    style={{ left: `${pct}%`, transform: `translateX(-${pct}%)` }}
                    className={`absolute top-0 whitespace-nowrap transition-colors hover:text-text-primary ${
                      i === index ? "text-text-primary" : ""
                    }`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
