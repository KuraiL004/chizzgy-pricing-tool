"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { FEATURED_FILMS, REELS, cld } from "@/config/offer-config";
import { AutoVideo } from "./AutoVideo";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { WhatsAppLink } from "./WhatsAppLink";

const poster = (src: string, w: number) => cld(src, `so_1,w_${w},q_auto`, "jpg");

// Tam ekran baxış (iOS modal üslubunda). Esc ilə bağlanır, oxlarla keçid.
function ReelViewer({ index, onClose, onMove }: { index: number; onClose: () => void; onMove: (d: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onMove]);

  const src = REELS[index];
  const navBtn = "w-11 h-11 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white active:opacity-60";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`İş ${index + 1} / ${REELS.length}`}
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-[fadeIn_0.25s_ease]"
      onClick={onClose}
    >
      <div className="relative h-full max-h-[86vh] aspect-[9/16]" onClick={(e) => e.stopPropagation()}>
        <video
          key={src}
          src={cld(src, "w_720,q_auto")}
          poster={poster(src, 400)}
          autoPlay
          controls
          playsInline
          className="w-full h-full rounded-3xl bg-elevated object-cover"
        />
      </div>
      <button type="button" onClick={onClose} aria-label="Bağla" className={`absolute top-4 right-4 ${navBtn}`}>
        <X className="w-5 h-5" />
      </button>
      <div className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={() => onMove(-1)} aria-label="Əvvəlki" className={navBtn}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-[15px] text-white/70 tabular-nums">
          {index + 1} / {REELS.length}
        </span>
        <button type="button" onClick={() => onMove(1)} aria-label="Növbəti" className={navBtn}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export function HallOfFame() {
  const [film, setFilm] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);
  const active = FEATURED_FILMS[film];

  const move = (d: number) => setViewer((i) => (i === null ? i : (i + d + REELS.length) % REELS.length));

  return (
    <section id="islerimiz" className="max-w-6xl mx-auto px-5 py-20 sm:py-28 scroll-mt-20">
      <Reveal>
        <SectionHeader
          eyebrow="Hall of Fame"
          title="Seçilmiş işlərimiz"
          description="Böyük brendlər üçün çəkdiyimiz filmlər və satış gətirən reels-lər."
        />

        {/* Böyük ekran: seçilmiş film */}
        <div className="surface surface-glow rounded-[32px] p-1.5 sm:p-2">
          <AutoVideo
            key={active.src}
            src={cld(active.src, "w_1600,q_auto")}
            poster={poster(active.src, 1600)}
            label={active.title}
            className="aspect-video rounded-[26px]"
          />
        </div>

        {/* Film seçimi */}
        <div role="tablist" aria-label="Filmlər" className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
          {FEATURED_FILMS.map((f, i) => (
            <button
              key={f.src}
              type="button"
              role="tab"
              aria-selected={i === film}
              onClick={() => setFilm(i)}
              className="group text-left"
            >
              <span
                className={`block relative aspect-video rounded-2xl overflow-hidden bg-elevated transition-opacity ${
                  i === film ? "ring-2 ring-white" : "opacity-50 group-hover:opacity-80"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={poster(f.src, 480)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </span>
              <span className={`block mt-2 text-[13px] sm:text-[15px] truncate ${i === film ? "text-label font-semibold" : "text-label-2"}`}>
                {f.title}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      {/* Reels divarı */}
      <Reveal className="mt-16">
        <h3 className="text-[24px] font-semibold tracking-tight text-label mb-5">Reels</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {REELS.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setViewer(i)}
                aria-label={`Reels ${i + 1}-ə bax`}
                className="group relative block w-full aspect-[9/16] rounded-2xl overflow-hidden bg-elevated"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={poster(src, 400)}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white" />
                </span>
              </button>
            </li>
          ))}
          {/* Son kart: növbəti iş sizin brendiniz */}
          <li>
            <WhatsAppLink className="flex flex-col justify-end w-full h-full aspect-[9/16] rounded-2xl bg-white text-black p-4 active:opacity-70 transition-opacity">
              <span className="text-[17px] font-bold leading-tight">Növbəti iş sizin brendiniz olsun</span>
              <span className="mt-2 text-[13px] text-black/60">Bizə yazın →</span>
            </WhatsAppLink>
          </li>
        </ul>
      </Reveal>

      {viewer !== null && <ReelViewer index={viewer} onClose={() => setViewer(null)} onMove={move} />}
    </section>
  );
}
