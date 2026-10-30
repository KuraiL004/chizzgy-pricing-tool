"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import { useCalculator } from "@/context/CalculatorContext";
import { PRICING_CONFIG, PRICING_LABELS, ShootingQuality, EditingQuality } from "@/config/pricing-config";
import { Video, Film, Minus, Plus } from "lucide-react";
import gsap from "gsap";

// Apple pill-slide selection button (single item)
function SelectPill({
  isSelected,
  onClick,
  label,
  sub,
}: {
  isSelected: boolean;
  onClick: () => void;
  label: string;
  sub?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex-1 px-4 py-3 rounded-2xl text-center transition-all duration-200 text-body font-medium focus:outline-none ${
        isSelected
          ? "bg-glass-surface-active border border-border-glass-active text-text-primary scale-[1.01]"
          : "border border-border-glass text-text-secondary hover:text-text-primary hover:border-border-glass-active hover:bg-glass-surface"
      }`}
    >
      <span className="block">{label}</span>
      {sub && <span className="block text-[11px] mt-0.5 font-mono opacity-70">{sub}</span>}
    </button>
  );
}

export function VideoControls() {
  const { state, setVideoCount, setShootingQuality, setEditingQuality } = useCalculator();
  const sliderTrackRef = useRef<HTMLDivElement>(null);

  const shootingOptions: ShootingQuality[] = ["none", "standard", "pro4k", "cinematic"];
  const editingOptions: EditingQuality[] = ["basic", "dynamic", "vfx3d"];

  // Animate slider fill width on video count change
  useEffect(() => {
    if (!sliderTrackRef.current) return;
    const pct = (state.videoCount / 30) * 100;
    gsap.to(sliderTrackRef.current, {
      width: `${pct}%`,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [state.videoCount]);

  return (
    <div className="rounded-3xl border border-border-glass bg-glass-surface backdrop-blur-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3.5 px-7 py-5 border-b border-border-glass">
        <div className="w-9 h-9 rounded-xl bg-bg-main/60 border border-border-glass flex items-center justify-center shrink-0">
          <Video className="w-4 h-4 text-text-primary" />
        </div>
        <div>
          <h3 className="text-body font-medium text-text-primary">A. Video Prodüksiyonu</h3>
          <p className="text-small text-text-secondary">Aylık video adedi ve prodüksiyon kalitesi.</p>
        </div>
      </div>

      <div className="px-7 py-6 space-y-7">
        {/* 1. Video Count — Stepper + Custom Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-body text-text-primary font-medium">Video Adedi</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setVideoCount(state.videoCount - 1)}
                disabled={state.videoCount <= 0}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border-glass text-text-secondary hover:text-text-primary hover:border-border-glass-active hover:bg-glass-surface-hover disabled:opacity-20 transition-all"
                aria-label="Azalt"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-mono font-semibold text-h3 text-text-primary leading-none">
                {state.videoCount}
              </span>
              <button
                type="button"
                onClick={() => setVideoCount(state.videoCount + 1)}
                disabled={state.videoCount >= 30}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border-glass text-text-secondary hover:text-text-primary hover:border-border-glass-active hover:bg-glass-surface-hover disabled:opacity-20 transition-all"
                aria-label="Artır"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Custom slider track */}
          <div className="relative">
            <input
              type="range"
              min={0}
              max={30}
              value={state.videoCount}
              onChange={(e) => setVideoCount(Number(e.target.value))}
              className="w-full relative z-10"
              style={{ height: "3px" }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-text-muted font-mono">
            <span>0</span>
            <span>10</span>
            <span>20</span>
            <span>30</span>
          </div>
        </div>

        {/* 2. Çekim Kalitesi */}
        <div className="space-y-3 pt-4 border-t border-border-glass">
          <div className="flex items-center justify-between">
            <span className="text-body text-text-primary font-medium">Çekim Seviyesi</span>
            <span className="text-small text-text-secondary font-mono">video başı AZN</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {shootingOptions.map((opt) => {
              const rate = PRICING_CONFIG.videos.baseShootingRate[opt];
              const meta = PRICING_LABELS.shooting[opt];
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setShootingQuality(opt)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                    state.shootingQuality === opt
                      ? "border-border-glass-active bg-glass-surface-active text-text-primary"
                      : "border-border-glass bg-bg-main/30 text-text-secondary hover:border-border-glass-active hover:bg-glass-surface hover:text-text-primary"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-small font-semibold">{meta.title}</span>
                    <span className="text-[11px] font-mono font-medium text-text-primary">+{rate}</span>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-snug">{meta.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Kurgu Seviyesi */}
        <div className="space-y-3 pt-4 border-t border-border-glass">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-text-secondary" />
              <span className="text-body text-text-primary font-medium">Kurgu &amp; Edit</span>
            </div>
            <span className="text-small text-text-secondary font-mono">video başı AZN</span>
          </div>
          <div className="flex gap-2.5">
            {editingOptions.map((opt) => {
              const rate = PRICING_CONFIG.videos.baseEditingRate[opt];
              const meta = PRICING_LABELS.editing[opt];
              return (
                <SelectPill
                  key={opt}
                  isSelected={state.editingQuality === opt}
                  onClick={() => setEditingQuality(opt)}
                  label={meta.title}
                  sub={`+${rate}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
