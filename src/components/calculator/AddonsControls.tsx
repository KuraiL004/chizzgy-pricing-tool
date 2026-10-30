"use client";

import { useCalculator } from "@/context/CalculatorContext";
import { PRICING_CONFIG, PRICING_LABELS } from "@/config/pricing-config";
import { PlusCircle, Plane, Pen, Mic, Zap } from "lucide-react";

// iOS-style toggle switch
function AppleToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none shrink-0 ${
        checked ? "bg-text-primary" : "bg-border-glass-active"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-bg-main shadow-md transition-transform duration-300 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

const iconMap = {
  drone: Plane,
  copywriting: Pen,
  voiceover: Mic,
  express: Zap,
};

export function AddonsControls() {
  const { state, toggleAddon } = useCalculator();

  const cfg = PRICING_CONFIG.addons;
  const labels = PRICING_LABELS.addons;

  const addonList: Array<{
    key: keyof typeof state.addons;
    title: string;
    description: string;
    rateText: string;
  }> = [
    {
      key: "drone",
      title: labels.drone.title,
      description: labels.drone.description,
      rateText: `+${cfg.drone} ${PRICING_CONFIG.currency}`,
    },
    {
      key: "copywriting",
      title: labels.copywriting.title,
      description: labels.copywriting.description,
      rateText: `+${cfg.copywritingPerVideo} ${PRICING_CONFIG.currency}/video`,
    },
    {
      key: "voiceover",
      title: labels.voiceover.title,
      description: labels.voiceover.description,
      rateText: `+${cfg.voiceover} ${PRICING_CONFIG.currency}`,
    },
    {
      key: "express",
      title: labels.express.title,
      description: labels.express.description,
      rateText: "+%25 katsayı",
    },
  ];

  return (
    <div className="rounded-3xl border border-border-glass bg-glass-surface backdrop-blur-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3.5 px-7 py-5 border-b border-border-glass">
        <div className="w-9 h-9 rounded-xl bg-bg-main/60 border border-border-glass flex items-center justify-center shrink-0">
          <PlusCircle className="w-4 h-4 text-text-primary" />
        </div>
        <div>
          <h3 className="text-body font-medium text-text-primary">E. Ek Hizmetler</h3>
          <p className="text-small text-text-secondary">Hız, hava çekimi ve profesyonel ses.</p>
        </div>
      </div>

      {/* iOS Settings rows */}
      <div className="divide-y divide-border-glass">
        {addonList.map((addon) => {
          const isChecked = Boolean(state.addons[addon.key]);
          const Icon = iconMap[addon.key];
          return (
            <div
              key={addon.key}
              className={`flex items-center justify-between px-7 py-4 transition-colors duration-200 ${
                isChecked ? "bg-glass-surface-hover" : ""
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-bg-main/60 border border-border-glass flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-text-secondary" />
                </div>
                <div className="min-w-0">
                  <p className={`text-body font-medium truncate ${isChecked ? "text-text-primary" : "text-text-secondary"}`}>
                    {addon.title}
                  </p>
                  <p className="text-small text-text-muted mt-0.5">{addon.rateText}</p>
                </div>
              </div>
              <AppleToggle
                checked={isChecked}
                onChange={() => toggleAddon(addon.key)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
