"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // Sayfa yüklendiğinde metinler aşağıdan yukarıya pürüzsüzce belirir (fade-up)
  useGSAP(
    () => {
      // fromTo: efekt iki kez çalışsa bile bitiş değeri her zaman görünür durumdur
      gsap.fromTo(
        ".hero-fade-up",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out", clearProps: "transform,opacity" }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[80vh] flex items-center justify-center px-6 py-32 bg-bg-main text-center"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="hero-fade-up text-5xl sm:text-h1 md:text-7xl font-medium tracking-tight text-text-primary leading-[1.05] mb-6">
          Chizzgy ile Projenizi Ölçekleyin
        </h1>

        <p className="hero-fade-up text-body sm:text-xl text-text-secondary max-w-xl mb-12 leading-relaxed">
          Şeffaf bütçe, kesin prodüksiyon çıktısı. Video ve poster ihtiyaçlarınızı
          gerçek birim maliyetlerle yapılandırın.
        </p>

        <a
          href="#calculator"
          className="hero-fade-up inline-flex px-8 py-3.5 rounded-full bg-accent-primary text-accent-primary-text text-body font-medium hover:opacity-90 transition-opacity"
        >
          Hesaplamaya Başla
        </a>
      </div>
    </section>
  );
}
