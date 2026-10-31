"use client";

import { useSyncExternalStore } from "react";
import { ArrowDownRight } from "lucide-react";
import { STATS } from "@/config/offer-config";
import { ClientName } from "./ClientName";
import { PartnerLockup } from "./PartnerLockup";

const noopSubscribe = () => () => {};
// Bəzi brauzerlərdə "az-AZ" lokalı yoxdur, ay adları əl ilə verilir
const MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"];
const getToday = () => {
  const d = new Date();
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

// Tarix yalnız brauzerdə hesablanır, build vaxtı köhnə tarix qalmasın deyə
function TodayLabel() {
  const today = useSyncExternalStore(noopSubscribe, getToday, () => null);
  return <>{today}</>;
}

// Başlıq sözləri bir-bir bulanıqlıqdan aydınlaşır
const HEADLINE = ["üçün", "hazırladığımız", "təklif"];
const delay = (i: number) => ({ animationDelay: `${0.15 + i * 0.12}s` });

export function PersonalIntro() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-glow" aria-hidden />
      <div className="absolute inset-0 stars opacity-70" aria-hidden />

      <div className="relative max-w-5xl mx-auto px-5 pt-36 pb-16 sm:pt-44 sm:pb-24 text-center flex flex-col items-center">
        <div className="blur-in" style={delay(0)}>
          <PartnerLockup />
        </div>

        <span className="badge mt-8 blur-in" style={delay(1)}>          <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden />
          Fərdi təqdimat · <TodayLabel />
        </span>

        <h1 className="mt-6 text-[44px] leading-[1.02] sm:text-[84px] font-semibold tracking-[-0.035em] max-w-4xl">
          <span className="inline-block blur-in text-gradient pb-2" style={delay(2)}>
            <ClientName fallback="Sizin" />
          </span>{" "}
          {HEADLINE.map((w, i) => (
            <span key={w}>
              <span className="inline-block blur-in text-gradient pb-2" style={delay(3 + i)}>
                {w}
              </span>{" "}
            </span>
          ))}
        </h1>

        <p className="mt-6 text-[17px] sm:text-[21px] leading-relaxed text-label-2 max-w-2xl blur-in" style={delay(6)}>
          Chizzgy studiyası və Nemət Səfərovun birgə komandası. İdeyadan paylaşıma qədər videonun bütün
          mərhələsini biz üzərimizə götürürük — siz yalnız nəticəni görürsünüz.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3 blur-in" style={delay(7)}>
          <a
            href="#paketler"
            className="inline-flex items-center gap-2 px-7 h-[52px] rounded-full bg-white text-black text-[17px] font-semibold active:opacity-70 transition-opacity"
          >
            Paketlərə baxın
            <ArrowDownRight className="w-4 h-4" />
          </a>
          <a
            href="#islerimiz"
            className="inline-flex items-center px-7 h-[52px] rounded-full surface text-label text-[17px] font-semibold active:opacity-70 transition-opacity"
          >
            İşlərimiz
          </a>
        </div>

        {/* Rəqəmlər */}
        <dl className="mt-16 sm:mt-20 w-full grid grid-cols-3 gap-2 sm:gap-4 blur-in" style={delay(8)}>
          {STATS.map((s) => (
            <div key={s.label} className="surface surface-glow rounded-[22px] px-3 py-5 sm:px-6 sm:py-8 text-left">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-[30px] sm:text-[56px] font-light tracking-tight text-label leading-none tabular-nums">{s.value}</dd>
              <dd className="mt-3 text-[12px] sm:text-[15px] text-label-2 leading-snug">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
