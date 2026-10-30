"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PRESET_TIERS, PRICING_CONFIG, calculatePricing } from "@/config/pricing-config";
import { useCalculator } from "@/context/CalculatorContext";
import { Check, Sparkles, Video, Layers, Sliders, ArrowRight } from "lucide-react";

// GSAP ScrollTrigger eklentisini güvenli şekilde kaydet
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function PricingTiers() {
  const containerRef = useRef<HTMLElement>(null);
  const { loadPreset } = useCalculator();

  const starter = PRESET_TIERS.starter;
  const growth = PRESET_TIERS.growth;
  const elite = PRESET_TIERS.elite;

  // PRD formülleriyle hesaplanan fiyatlar
  const starterBreakdown = calculatePricing(starter.config);
  const growthBreakdown = calculatePricing(growth.config);
  const eliteBreakdown = calculatePricing(elite.config);

  // GSAP ScrollTrigger ile Staggered Fade-in & Scale Animasyonu (0.95 -> 1.0)
  useGSAP(
    () => {
      // Section header slides up
      gsap.from(".pricing-header-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      // Cards stagger with scale + y
      gsap.from(".pricing-glass-card", {
        scrollTrigger: {
          trigger: ".pricing-glass-card",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.94,
        y: 40,
        duration: 1.0,
        stagger: 0.14,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="packages"
      className="max-w-6xl mx-auto px-6 py-16 sm:py-20 border-t border-border-glass"
    >
      {/* Bölüm Başlığı (Bol negatif boşluk) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
        <div>
          <div className="pricing-header-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-glass bg-glass-surface backdrop-blur-2xl text-small text-text-secondary mb-3">
            <Layers className="w-3.5 h-3.5 text-text-primary" />
            <span>Hazır Çözümler</span>
          </div>
          <h2 className="pricing-header-anim text-h2 tracking-tight text-text-primary font-medium">
            Kanıtlanmış Prodüksiyon Paketleri
          </h2>
          <p className="pricing-header-anim text-body text-text-secondary mt-1.5 max-w-xl">
            Ajans standartlarında test edilmiş hazır paketler. Tek tıkla hesaplayıcıya aktarabilir ve özelleştirebilirsiniz.
          </p>
        </div>

        <div className="pricing-header-anim flex items-center gap-2 text-small text-text-secondary font-mono self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-accent-whatsapp" />
          <span>Şeffaf Fiyatlandırma ({PRICING_CONFIG.currency})</span>
        </div>
      </div>

      {/* 3'lü Sabit Paket Grid Yapısı (Glassmorphism + rounded-3xl) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* 1. Starter (Temel Sosyal Medya) */}
        <div className="pricing-glass-card rounded-3xl border border-border-glass bg-glass-surface backdrop-blur-2xl p-8 sm:p-9 flex flex-col justify-between hover:bg-glass-surface-hover hover:border-border-glass-active transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-small text-text-secondary font-medium px-3.5 py-1 rounded-full border border-border-glass bg-bg-main/60">
                {starter.badge}
              </span>
              <Video className="w-4 h-4 text-text-secondary" />
            </div>

            <h3 className="text-h3 font-medium text-text-primary mb-2">
              {starter.name}
            </h3>
            <p className="text-small text-text-secondary mb-8 leading-relaxed">
              {starter.description}
            </p>

            {/* Fiyat Bilgisi */}
            <div className="mb-8 pb-8 border-b border-border-glass">
              <div className="flex items-baseline gap-1.5">
                <span className="text-h1 font-medium text-text-primary font-mono tracking-tight">
                  {starterBreakdown.grandTotal}
                </span>
                <span className="text-body text-text-secondary font-medium">
                  {PRICING_CONFIG.currency}
                </span>
              </div>
              <span className="text-small text-text-secondary mt-1 block">Aylık sabit prodüksiyon</span>
            </div>

            {/* PRD İçerik Maddeleri (Yalnızca Off-white ve Apple Grisi) */}
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3 text-body text-text-secondary">
                <Check className="w-4 h-4 text-text-primary mt-1 shrink-0" />
                <span>
                  <strong className="text-text-primary font-medium">8 Video</strong> (Standart Çekim: Mobil/Gimbal)
                </span>
              </li>
              <li className="flex items-start gap-3 text-body text-text-secondary">
                <Check className="w-4 h-4 text-text-primary mt-1 shrink-0" />
                <span>Hızlı Temel Kesim & Dinamik Altyazı</span>
              </li>
              <li className="flex items-start gap-3 text-body text-text-secondary">
                <Check className="w-4 h-4 text-text-primary mt-1 shrink-0" />
                <span>
                  <strong className="text-text-primary font-medium">4 Poster</strong> (2D Tipografik Şablonlar)
                </span>
              </li>
              <li className="flex items-start gap-3 text-body text-text-secondary">
                <Check className="w-4 h-4 text-text-primary mt-1 shrink-0" />
                <span>Standart Teslimat Takvimi</span>
              </li>
              <li className="flex items-start gap-3 text-small text-text-muted">
                <span className="w-4 h-4 flex items-center justify-center shrink-0">—</span>
                <span>Motion & Brandbook dahil değildir</span>
              </li>
            </ul>
          </div>

          {/* Kapsül Buton (rounded-full) */}
          <button
            type="button"
            onClick={() => loadPreset("starter")}
            className="w-full py-3.5 rounded-full border border-border-glass bg-glass-surface backdrop-blur-2xl text-text-primary text-body font-medium hover:border-border-glass-active hover:bg-glass-surface-hover hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Sliders className="w-4 h-4 text-text-secondary" />
            <span>Bu Paketi Özelleştir</span>
          </button>
        </div>

        {/* 2. Growth (Popüler / Varsayılan Paket) */}
        <div className="pricing-glass-card rounded-3xl border-2 border-border-glass-active bg-glass-surface backdrop-blur-2xl p-8 sm:p-9 flex flex-col justify-between relative hover:bg-glass-surface-hover transition-all duration-300">
          {/* En Popüler Rozeti */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-primary text-accent-primary-text rounded-full text-small font-semibold tracking-wide shadow-lg">
            {growth.badge}
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-small text-text-primary font-medium px-3.5 py-1 rounded-full border border-border-glass-active bg-bg-main/60">
                Önerilen Paket
              </span>
              <Sparkles className="w-4 h-4 text-text-primary" />
            </div>

            <h3 className="text-h3 font-medium text-text-primary mb-2">
              {growth.name}
            </h3>
            <p className="text-small text-text-secondary mb-8 leading-relaxed">
              {growth.description}
            </p>

            {/* Fiyat Bilgisi */}
            <div className="mb-8 pb-8 border-b border-border-glass">
              <div className="flex items-baseline gap-1.5">
                <span className="text-h1 font-medium text-text-primary font-mono tracking-tight">
                  {growthBreakdown.grandTotal}
                </span>
                <span className="text-body text-text-secondary font-medium">
                  {PRICING_CONFIG.currency}
                </span>
              </div>
              <span className="text-small text-text-secondary mt-1 block">Dinamik kurgu & viral etki</span>
            </div>

            {/* PRD İçerik Maddeleri (Yalnızca Off-white ve Apple Grisi) */}
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3 text-body text-text-primary">
                <Check className="w-4 h-4 text-text-primary mt-1 shrink-0" />
                <span>
                  <strong className="text-text-primary font-medium">15 Video</strong> (Pro 4K Sinema Kamerası & Işık)
                </span>
              </li>
              <li className="flex items-start gap-3 text-body text-text-primary">
                <Check className="w-4 h-4 text-text-primary mt-1 shrink-0" />
                <span>Dinamik Motion Kurgu & Sound Design</span>
              </li>
              <li className="flex items-start gap-3 text-body text-text-primary">
                <Check className="w-4 h-4 text-text-primary mt-1 shrink-0" />
                <span>
                  <strong className="text-text-primary font-medium">10 Poster</strong> (Manipülasyon & Özel Tipografi)
                </span>
              </li>
              <li className="flex items-start gap-3 text-body text-text-primary">
                <Check className="w-4 h-4 text-text-primary mt-1 shrink-0" />
                <span>
                  <strong className="text-text-primary font-medium">1 Motion Graphic</strong> (Logo Animasyonu / İntro)
                </span>
              </li>
              <li className="flex items-start gap-3 text-body text-text-secondary">
                <Check className="w-4 h-4 text-text-primary mt-1 shrink-0" />
                <span>Renk Düzenleme (Color Grading) dahil</span>
              </li>
            </ul>
          </div>

          {/* Kapsül Buton (Off-White Vurgulu) */}
          <button
            type="button"
            onClick={() => loadPreset("growth")}
            className="w-full py-3.5 rounded-full bg-accent-primary text-accent-primary-text text-body font-medium hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <span>Bu Paketi Özelleştir</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3. Elite / Brand Transformation */}
        <div className="pricing-glass-card rounded-3xl border border-border-glass bg-glass-surface backdrop-blur-2xl p-8 sm:p-9 flex flex-col justify-between hover:bg-glass-surface-hover hover:border-border-glass-active transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-small text-text-secondary font-medium px-3.5 py-1 rounded-full border border-border-glass bg-bg-main/60">
                {elite.badge}
              </span>
              <Layers className="w-4 h-4 text-text-secondary" />
            </div>

            <h3 className="text-h3 font-medium text-text-primary mb-2">
              {elite.name}
            </h3>
            <p className="text-small text-text-secondary mb-8 leading-relaxed">
              {elite.description}
            </p>

            {/* Fiyat Bilgisi */}
            <div className="mb-8 pb-8 border-b border-border-glass">
              <div className="flex items-baseline gap-1.5">
                <span className="text-h1 font-medium text-text-primary font-mono tracking-tight">
                  {eliteBreakdown.grandTotal}
                </span>
                <span className="text-body text-text-secondary font-medium">
                  {PRICING_CONFIG.currency}
                </span>
              </div>
              <span className="text-small text-text-secondary mt-1 block">Kapsamlı 360° marka dönüşümü</span>
            </div>

            {/* PRD İçerik Maddeleri (Yalnızca Off-white ve Apple Grisi) */}
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3 text-body text-text-secondary">
                <Check className="w-4 h-4 text-text-primary mt-1 shrink-0" />
                <span>
                  <strong className="text-text-primary font-medium">20+ Video</strong> (Sinematik Çekim Ekibi)
                </span>
              </li>
              <li className="flex items-start gap-3 text-body text-text-secondary">
                <Check className="w-4 h-4 text-text-primary mt-1 shrink-0" />
                <span>İleri VFX, 3D Obje Entegrasyonu & Miksaj</span>
              </li>
              <li className="flex items-start gap-3 text-body text-text-secondary">
                <Check className="w-4 h-4 text-text-primary mt-1 shrink-0" />
                <span>
                  <strong className="text-text-primary font-medium">15 Poster</strong> (3D Render Destekli)
                </span>
              </li>
              <li className="flex items-start gap-3 text-body text-text-secondary">
                <Check className="w-4 h-4 text-text-primary mt-1 shrink-0" />
                <span>Kapsamlı <strong className="text-text-primary font-medium">Full Brandbook</strong> Paketi</span>
              </li>
              <li className="flex items-start gap-3 text-body text-text-secondary">
                <Check className="w-4 h-4 text-text-primary mt-1 shrink-0" />
                <span>Öncelikli (Express) Teslimat Desteği</span>
              </li>
            </ul>
          </div>

          {/* Kapsül Buton (rounded-full) */}
          <button
            type="button"
            onClick={() => loadPreset("elite")}
            className="w-full py-3.5 rounded-full border border-border-glass bg-glass-surface backdrop-blur-2xl text-text-primary text-body font-medium hover:border-border-glass-active hover:bg-glass-surface-hover hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Sliders className="w-4 h-4 text-text-secondary" />
            <span>Bu Paketi Özelleştir</span>
          </button>
        </div>
      </div>
    </section>
  );
}
