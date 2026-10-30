"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Subtle ambient glow pulse on background
      tl.from(".hero-glow", {
        opacity: 0,
        scale: 0.6,
        duration: 2.4,
        ease: "power2.out",
      }, 0);

      // Eyebrow label
      tl.from(".hero-eyebrow", {
        opacity: 0,
        y: 16,
        duration: 0.9,
      }, 0.1);

      // Headline — split into words for stagger
      tl.from(".hero-title", {
        opacity: 0,
        y: 48,
        duration: 1.1,
      }, 0.25);

      // Subtext
      tl.from(".hero-sub", {
        opacity: 0,
        y: 24,
        duration: 0.9,
      }, 0.55);

      // CTA button — slight spring feel
      tl.from(".hero-cta", {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.8,
        ease: "back.out(1.4)",
      }, 0.75);

      // Floating scroll indicator
      tl.from(".hero-scroll", {
        opacity: 0,
        y: 10,
        duration: 0.6,
      }, 1.1);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full flex items-center justify-center pt-24 pb-20 sm:pt-32 sm:pb-28 px-6 bg-bg-main text-center overflow-hidden"
    >
      {/* Ambient radial glow — purely visual, no layout impact */}
      <div
        className="hero-glow pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow label */}
        <div className="hero-eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-glass bg-glass-surface backdrop-blur-2xl text-small text-text-secondary mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-whatsapp animate-pulse" />
          <span>Prodüksiyon &amp; Kreatif Hesaplayıcı</span>
        </div>

        {/* Headline */}
        <h1 className="hero-title text-h1 tracking-tight text-text-primary font-medium mb-5 max-w-3xl leading-[1.08] select-none">
          Chizzgy ile Projenizi<br className="hidden sm:block" /> Ölçekleyin
        </h1>

        {/* Subtext */}
        <p className="hero-sub text-body text-text-secondary max-w-md mx-auto mb-10 leading-relaxed font-normal">
          Şeffaf bütçe, kesin prodüksiyon çıktısı. Video, poster ve hareketli grafik
          ihtiyaçlarınızı gerçek birim maliyetlerle yapılandırın.
        </p>

        {/* CTA */}
        <div className="hero-cta">
          <a
            href="#calculator"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-accent-primary text-accent-primary-text font-medium text-body hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm group"
          >
            <span>Hesaplayıcıyı Başlat</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Subtle scroll hint */}
        <div className="hero-scroll mt-16 flex flex-col items-center gap-2 text-text-muted">
          <span className="text-[11px] tracking-widest uppercase font-medium">Keşfet</span>
          <div className="w-px h-8 bg-gradient-to-b from-border-glass-active to-transparent" />
        </div>
      </div>
    </section>
  );
}
