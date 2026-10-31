"use client";

import { useState } from "react";
import { Check, SlidersHorizontal } from "lucide-react";
import { OFFER, PACKAGES, PRICING_NOTES, QUALITY_LEVELS, QualityId } from "@/config/offer-config";
import { ClientName } from "./ClientName";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { WhatsAppLink } from "./WhatsAppLink";

const formatPrice = (n: number) => n.toLocaleString("en-US").replace(/,/g, " ");

// Paketlər reels sayına görə, video səviyyəsi yuxarıdakı seçimlə dəyişir
export function Packages() {
  const [quality, setQuality] = useState<QualityId>("standard");
  const level = QUALITY_LEVELS.find((l) => l.id === quality)!;

  return (
    <section id="paketler" className="max-w-6xl mx-auto px-5 py-20 sm:py-28 scroll-mt-20">
      <Reveal>
        <SectionHeader
          eyebrow="Aylıq paketlər"
          title={
            <>
              <ClientName fallback="Sizin" /> üçün paketlər
            </>
          }
          description="Əvvəl video səviyyəsini seçin, sonra ayda neçə reels lazım olduğunu. Hər reels-ə çəkiliş, montaj və cover daxildir."
        />

        {/* Video səviyyəsi — iOS segmented control */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <span className="text-[13px] text-label-2">Video səviyyəsi</span>
          <div role="radiogroup" aria-label="Video səviyyəsi" className="grid grid-cols-3 p-1 rounded-full surface w-full max-w-sm">
            {QUALITY_LEVELS.map((l) => (
              <button
                key={l.id}
                type="button"
                role="radio"
                aria-checked={l.id === quality}
                onClick={() => setQuality(l.id)}
                className={`h-10 rounded-full text-[15px] font-semibold transition-colors ${
                  l.id === quality ? "bg-white text-black" : "text-label-2 hover:text-label"
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
          <a href="#seviyye" className="text-[13px] text-label-3 hover:text-label-2 transition-colors">
            {level.tagline} · fərqə baxın
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {PACKAGES.map((pkg) => {
            const price = pkg.prices[quality];
            return (
              <article
                key={pkg.id}
                className={`relative surface rounded-[24px] p-5 flex flex-col ${
                  pkg.recommended ? "surface-glow border-white/40" : ""
                }`}
              >
                {pkg.recommended && (
                  <span className="absolute -top-3 left-5 px-3 py-1 rounded-full bg-white text-black text-[12px] font-semibold">
                    Tövsiyə edirik
                  </span>
                )}

                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-[22px] font-semibold tracking-tight text-label">{pkg.name}</h3>
                  <span className="text-[15px] text-label">
                    <span className="font-semibold">{pkg.reels}</span> reels
                  </span>
                </div>
                <p className="text-[14px] text-label-2 mt-1 lg:min-h-[2lh] leading-snug">{pkg.audience}</p>

                <p key={quality} className="mt-6 flex items-baseline gap-1.5 animate-[fadeIn_0.3s_ease]">
                  <span className="text-[38px] font-light tracking-tight text-label leading-none tabular-nums">
                    {formatPrice(price)}
                  </span>
                  <span className="text-[15px] text-label-2">{OFFER.currency} / ay</span>
                </p>
                <p className="mt-2 text-[13px] text-label-3 tabular-nums">
                  1 reels ≈ {Math.round(price / pkg.reels)} {OFFER.currency}
                </p>

                <ul className="mt-5 pt-5 mb-7 border-t border-white/[0.08] space-y-2.5 flex-1">
                  {[
                    `${pkg.reels} reels — ${level.name} çəkiliş və montaj`,
                    `${pkg.reels} cover dizayn`,
                    `${pkg.posts} post dizayn`,
                    ...pkg.perks,
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5 text-[14px] text-label leading-snug">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-label-2" />
                      {item}
                    </li>
                  ))}
                </ul>

                <WhatsAppLink
                  intent={{ packageId: pkg.id, quality }}
                  className={`w-full h-12 inline-flex items-center justify-center rounded-full text-[15px] font-semibold active:opacity-70 transition-opacity ${
                    pkg.recommended ? "bg-white text-black" : "bg-white/[0.08] text-label hover:bg-white/[0.12]"
                  }`}
                >
                  Bu paketi seçirəm
                </WhatsAppLink>
              </article>
            );
          })}
        </div>

        {/* Fərdi paket */}
        <div className="mt-3 surface rounded-[24px] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5">
          <span className="w-12 h-12 rounded-[14px] bg-white text-black flex items-center justify-center shrink-0">
            <SlidersHorizontal className="w-5 h-5" />
          </span>
          <div className="flex-1">
            <h3 className="text-[20px] font-semibold text-label">Fərdi paket</h3>
            <p className="mt-1 text-[15px] text-label-2 leading-snug">
              Reels sayını, video səviyyələrini və əlavə xidmətləri hədəfinizə görə birlikdə quraq.
            </p>
          </div>
          <WhatsAppLink
            intent="custom"
            className="shrink-0 px-6 h-12 inline-flex items-center justify-center rounded-full bg-white/[0.08] text-label text-[15px] font-semibold hover:bg-white/[0.12] active:opacity-70 transition-opacity"
          >
            Fərdi təklif istəyirəm
          </WhatsAppLink>
        </div>

        <div className="mt-8 space-y-1 text-center text-[13px] text-label-2">
          {PRICING_NOTES.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
