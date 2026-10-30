"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { VideoControls } from "./VideoControls";
import { PosterControls } from "./PosterControls";
import { MotionControls } from "./MotionControls";
import { BrandingControls } from "./BrandingControls";
import { AddonsControls } from "./AddonsControls";
import { SummaryPanel } from "./SummaryPanel";
import { Calculator } from "lucide-react";
import { PRICING_CONFIG } from "@/config/pricing-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CalculatorSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Section header fade-up
      gsap.from(".calc-header-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      // Form blocks stagger in
      gsap.from(".calc-block-anim", {
        scrollTrigger: {
          trigger: ".calc-block-anim",
          start: "top 88%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      // Summary panel slides from right
      gsap.from(".calc-summary-anim", {
        scrollTrigger: {
          trigger: ".calc-summary-anim",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: 24,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="calculator" ref={containerRef} className="max-w-6xl mx-auto px-6 py-16 sm:py-20 border-t border-border-glass">
      {/* Bölüm Başlığı */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <div className="calc-header-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-glass bg-glass-surface backdrop-blur-2xl text-small text-text-secondary mb-3">
            <Calculator className="w-3.5 h-3.5 text-text-primary" />
            <span>Customizer Engine</span>
          </div>
          <h2 className="calc-header-anim text-h2 tracking-tight text-text-primary font-medium">
            İnteraktif Fiyat Hesaplayıcı
          </h2>
          <p className="calc-header-anim text-body text-text-secondary mt-1.5 max-w-xl">
            Tüm prodüksiyon parametrelerini canlı olarak yapılandırın. Değişiklikleriniz anında sağdaki cam paneline yansır.
          </p>
        </div>

        <div className="calc-header-anim flex items-center gap-2 text-small text-text-secondary font-mono self-start sm:self-auto">
          <span>Para Birimi:</span>
          <span className="text-text-primary font-medium">{PRICING_CONFIG.currency}</span>
        </div>
      </div>

      {/* 2 Kolonlu Mimari */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sol Kolon — Form Parametreleri */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-5">
          <div className="calc-block-anim"><VideoControls /></div>
          <div className="calc-block-anim"><PosterControls /></div>
          <div className="calc-block-anim"><MotionControls /></div>
          <div className="calc-block-anim"><BrandingControls /></div>
          <div className="calc-block-anim"><AddonsControls /></div>
        </div>

        {/* Sağ Kolon — Sticky Özet Paneli */}
        <div className="calc-summary-anim lg:col-span-5 xl:col-span-4">
          <SummaryPanel />
        </div>
      </div>
    </section>
  );
}
