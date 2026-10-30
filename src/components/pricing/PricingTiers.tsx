"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  PRESET_TIERS,
  PRICING_CONFIG,
  SHOOTING_LABELS,
  EDITING_LABELS,
  POSTER_LABELS,
  PresetTier,
  calculatePricing,
} from "@/config/pricing-config";
import { useCalculator } from "@/context/CalculatorContext";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TIER_ORDER: PresetTier[] = ["starter", "growth", "elite"];

export function PricingTiers() {
  const containerRef = useRef<HTMLElement>(null);
  const { applyPreset, activePreset } = useCalculator();

  // Kartlar ekrana girerken sırayla fade-in
  useGSAP(
    () => {
      gsap.fromTo(".pricing-glass-card", { opacity: 0, y: 40 }, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="packages" className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-h2 tracking-tight text-text-primary font-medium">Paketler</h2>
        <p className="text-body text-text-secondary mt-3">
          Bir paket seçin, hesaplayıcı otomatik olarak dolsun. Sonra dilediğiniz gibi özelleştirin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {TIER_ORDER.map((tier) => {
          const preset = PRESET_TIERS[tier];
          const { grandTotal } = calculatePricing(preset.config);
          const isActive = activePreset === tier;
          const { videoCount, shootingTier, editingTier, posterCount, posterTier } = preset.config;
          const items: [string, string][] = [
            [`${videoCount}`, "Video"],
            [SHOOTING_LABELS[shootingTier], "Çekim"],
            [EDITING_LABELS[editingTier], "Kurgu"],
            [`${posterCount} ${POSTER_LABELS[posterTier]}`, "Poster"],
          ];

          return (
            <div
              key={tier}
              className={`pricing-glass-card rounded-3xl border bg-glass-surface backdrop-blur-2xl p-8 flex flex-col transition-colors duration-300 ${
                isActive ? "border-border-glass-active" : "border-border-glass"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-h3 font-medium text-text-primary">{preset.name}</h3>
                {"popular" in preset && preset.popular && (
                  <span className="text-small text-text-secondary">En Popüler</span>
                )}
              </div>
              <p className="text-small text-text-secondary leading-relaxed mb-8">{preset.description}</p>

              <div className="flex items-baseline gap-1.5 mb-8 pb-8 border-b border-border-glass">
                <span className="text-h1 font-medium text-text-primary tracking-tight">
                  {grandTotal.toLocaleString("tr-TR")}
                </span>
                <span className="text-body text-text-secondary">{PRICING_CONFIG.currency}</span>
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {items.map(([value, label]) => (
                  <li key={label} className="flex items-center gap-3 text-body text-text-secondary">
                    <Check className="w-4 h-4 text-text-primary shrink-0" />
                    <span>
                      <span className="text-text-primary">{value}</span> {label}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => applyPreset(tier)}
                className={`w-full py-3.5 rounded-full text-body font-medium transition-all ${
                  isActive
                    ? "bg-accent-primary text-accent-primary-text"
                    : "border border-border-glass text-text-primary hover:border-border-glass-active hover:bg-glass-surface-hover"
                }`}
              >
                {isActive ? "Seçildi" : "Seç"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
