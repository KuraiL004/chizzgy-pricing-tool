import { COVER_SAMPLES, cld } from "@/config/offer-config";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

// Hər videoya hazırlanan cover — referans nümunələr
export function Covers() {
  return (
    <section id="cover" className="max-w-5xl mx-auto px-5 py-20 sm:py-28 scroll-mt-20">
      <Reveal>
        <SectionHeader
          eyebrow="Cover dizayn"
          title="Hər videoya — lentdə dayandıran cover"
          description="İnsan videonu açmazdan əvvəl cover-i görür. Bütün paketlərdə hər videoya ayrıca cover hazırlanır."
        />

        <ul className="grid grid-cols-3 gap-3 sm:gap-6 items-center">
          {COVER_SAMPLES.map((src, i) => (
            <li
              key={src}
              className={`surface rounded-[18px] sm:rounded-[28px] p-1.5 sm:p-2 ${i === 1 ? "surface-glow sm:scale-105 z-10" : "sm:mt-10"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cld(src, "w_600,q_auto,f_auto")}
                alt={`Cover nümunəsi ${i + 1}`}
                loading="lazy"
                className="w-full aspect-[9/16] object-cover rounded-[13px] sm:rounded-[22px]"
              />
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-[13px] text-label-3">Referans nümunələr — sizin brendinizin üslubunda hazırlanır.</p>
      </Reveal>
    </section>
  );
}
