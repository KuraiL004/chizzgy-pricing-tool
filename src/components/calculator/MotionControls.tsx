"use client";

import { useCalculator } from "@/context/CalculatorContext";
import { PRICING_CONFIG, PRICING_LABELS } from "@/config/pricing-config";
import { Sparkles, Minus, Plus } from "lucide-react";

function MotionRow({
  title,
  description,
  rateLabel,
  count,
  countLabel,
  onDecrement,
  onIncrement,
  active,
}: {
  title: string;
  description: string;
  rateLabel: string;
  count: number;
  countLabel: string;
  onDecrement: () => void;
  onIncrement: () => void;
  active: boolean;
}) {
  return (
    <div className={`flex items-center justify-between gap-4 px-7 py-4 transition-colors duration-200 ${active ? "bg-glass-surface-hover" : ""}`}>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-body font-medium text-text-primary truncate">{title}</p>
          <span className="text-[11px] font-mono text-text-secondary shrink-0">{rateLabel}</span>
        </div>
        <p className="text-small text-text-muted leading-snug">{description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-small text-text-secondary font-mono w-14 text-right">{countLabel}</span>
        <div className="flex items-center gap-1.5 rounded-full border border-border-glass bg-bg-main/60 px-2 py-1">
          <button
            type="button"
            onClick={onDecrement}
            disabled={count <= 0}
            className="w-6 h-6 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary disabled:opacity-20 transition-colors"
            aria-label="Azalt"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-6 text-center font-mono text-small font-semibold text-text-primary">{count}</span>
          <button
            type="button"
            onClick={onIncrement}
            className="w-6 h-6 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Artır"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function MotionControls() {
  const { state, setLogoAnimation, setMotionPoster, setExplainerUnits } = useCalculator();

  return (
    <div className="rounded-3xl border border-border-glass bg-glass-surface backdrop-blur-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3.5 px-7 py-5 border-b border-border-glass">
        <div className="w-9 h-9 rounded-xl bg-bg-main/60 border border-border-glass flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-text-primary" />
        </div>
        <div>
          <h3 className="text-body font-medium text-text-primary">C. Motion Design</h3>
          <p className="text-small text-text-secondary">Logo jenerikleri, animasyonlu afişler ve tanıtım videoları.</p>
        </div>
      </div>

      <div className="divide-y divide-border-glass">
        <MotionRow
          title={PRICING_LABELS.motion.logoAnimation.title}
          description={PRICING_LABELS.motion.logoAnimation.description}
          rateLabel={`+${PRICING_CONFIG.motion.logoAnimation} AZN/adet`}
          count={state.motion.logoAnimation}
          countLabel={`${state.motion.logoAnimation} adet`}
          onDecrement={() => setLogoAnimation(state.motion.logoAnimation - 1)}
          onIncrement={() => setLogoAnimation(state.motion.logoAnimation + 1)}
          active={state.motion.logoAnimation > 0}
        />
        <MotionRow
          title={PRICING_LABELS.motion.motionPoster.title}
          description={PRICING_LABELS.motion.motionPoster.description}
          rateLabel={`+${PRICING_CONFIG.motion.motionPoster} AZN/adet`}
          count={state.motion.motionPoster}
          countLabel={`${state.motion.motionPoster} adet`}
          onDecrement={() => setMotionPoster(state.motion.motionPoster - 1)}
          onIncrement={() => setMotionPoster(state.motion.motionPoster + 1)}
          active={state.motion.motionPoster > 0}
        />
        <MotionRow
          title={PRICING_LABELS.motion.explainerPer10Sec.title}
          description={PRICING_LABELS.motion.explainerPer10Sec.description}
          rateLabel={`+${PRICING_CONFIG.motion.explainerPer10Sec} AZN/10sn`}
          count={state.motion.explainer10SecUnits}
          countLabel={`${state.motion.explainer10SecUnits * 10} sn`}
          onDecrement={() => setExplainerUnits(state.motion.explainer10SecUnits - 1)}
          onIncrement={() => setExplainerUnits(state.motion.explainer10SecUnits + 1)}
          active={state.motion.explainer10SecUnits > 0}
        />
      </div>
    </div>
  );
}
