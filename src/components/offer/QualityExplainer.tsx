"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { QUALITY_LEVELS, QUALITY_METRICS, cld } from "@/config/offer-config";
import { AutoVideo } from "./AutoVideo";
import { ClientName } from "./ClientName";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

// 5 bölməli göstərici — səviyyələr arasındakı fərq bir baxışda görünsün
function Meter({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[13px] text-label-2">{label}</span>
      <span className="flex gap-1" role="img" aria-label={`${label}: ${score} / 5`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`w-4 sm:w-5 h-1.5 rounded-full ${n <= score ? "bg-white" : "bg-white/10"}`} />
        ))}
      </span>
    </div>
  );
}

function TierCard({ level, step }: { level: (typeof QUALITY_LEVELS)[number]; step: number }) {
  const [sample, setSample] = useState(0);
  const src = level.samples[sample];
  const top = level.id === "premium";

  return (
    <article
      className={`surface rounded-[28px] p-3 sm:p-4 flex flex-col w-[80%] shrink-0 snap-center md:w-auto ${
        top ? "surface-glow border-white/30" : ""
      }`}
    >
      <header className="flex items-start justify-between gap-3 px-2 pt-1 pb-4">
        <div>
          <h3 className="text-[24px] font-semibold tracking-tight text-label">{level.name}</h3>
          <p className="text-[15px] text-label-2">{level.tagline}</p>
        </div>
        <span className="text-[13px] text-label-3 tabular-nums pt-1.5">0{step}</span>
      </header>

      <AutoVideo
        key={src}
        src={cld(src, "w_540,q_auto")}
        poster={cld(src, "so_1,w_540,q_auto", "jpg")}
        label={`${level.name} səviyyəsi üçün nümunə video`}
        className="aspect-[9/16] rounded-[20px]"
      />

      {level.samples.length > 1 && (
        <div role="tablist" aria-label={`${level.name} nümunələri`} className="mt-3 flex justify-center gap-2">
          {level.samples.map((s, i) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={i === sample}
              onClick={() => setSample(i)}
              className={`px-3.5 h-8 rounded-full text-[13px] font-medium transition-colors ${
                i === sample ? "bg-white text-black" : "bg-white/[0.06] text-label-2 hover:text-label"
              }`}
            >
              Nümunə {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="px-2 mt-6 space-y-3">
        {QUALITY_METRICS.map((m, i) => (
          <Meter key={m} label={m} score={level.scores[i]} />
        ))}
      </div>

      <ul className="px-2 mt-6 mb-2 space-y-2.5 border-t border-white/[0.06] pt-5">
        {level.includes.map((item) => (
          <li key={item} className="flex gap-2.5 text-[15px] text-label leading-snug">
            <Check className="w-4 h-4 mt-0.5 shrink-0 text-label-2" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

// "Sizi necə görürük": üç səviyyə yan-yana, fərq gözlə görünür
export function QualityExplainer() {
  return (
    <section id="seviyye" className="max-w-6xl mx-auto px-5 py-20 sm:py-28 scroll-mt-20">
      <Reveal>
        <SectionHeader
          eyebrow="Sizi necə görürük"
          title={
            <>
              <ClientName fallback="Brendiniz" /> hansı səviyyədə görünməlidir?
            </>
          }
          description="Paketlər arasındakı fərq videonun səviyyəsidir. Üç səviyyəni yan-yana qoyduq — nəyə ödəniş etdiyinizi özünüz görün."
        />

        <div className="flex md:grid md:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-5 px-5 md:mx-0 md:px-0 items-start">
          {QUALITY_LEVELS.map((level, i) => (
            <TierCard key={level.id} level={level} step={i + 1} />
          ))}
        </div>

        <p className="mt-6 text-center text-[13px] text-label-3 max-w-xl mx-auto">
          Nümunələr istiqamət üçün seçilmiş referanslardır. Biz bu səviyyəni sizin brendiniz üçün, sıfırdan yaradırıq.
        </p>
      </Reveal>
    </section>
  );
}
