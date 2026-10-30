"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CustomizerEngine } from "./CustomizerEngine";
import { SummaryPanel } from "./SummaryPanel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CalculatorSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(".calc-fade-up", { opacity: 0, y: 32 }, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="calculator" ref={containerRef} className="max-w-6xl mx-auto px-6 py-24">
      <div className="calc-fade-up text-center mb-16">
        <h2 className="text-h2 tracking-tight text-text-primary font-medium">Kendi Paketinizi Oluşturun</h2>
        <p className="text-body text-text-secondary mt-3">
          Video ve poster adetlerini kaydırarak karma paketinizi oluşturun.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sol Kolon — Customizer Engine */}
        <div className="calc-fade-up lg:col-span-7">
          <CustomizerEngine />
        </div>

        {/* Sağ Kolon — Sticky Özet */}
        <div className="calc-fade-up lg:col-span-5">
          <SummaryPanel />
        </div>
      </div>
    </section>
  );
}
