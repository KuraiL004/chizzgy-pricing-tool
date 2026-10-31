import { Megaphone, Palette, PenLine, CircleDot } from "lucide-react";
import { EXTRAS, ExtraId } from "@/config/offer-config";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const ICONS: Record<ExtraId, typeof PenLine> = {
  content: PenLine,
  story: CircleDot,
  ads: Megaphone,
  design: Palette,
};

// Əlavə xidmətlər — paketə daxil deyil, ehtiyaca görə əlavə olunur
export function Extras() {
  return (
    <section id="elave" className="max-w-5xl mx-auto px-5 py-20 sm:py-28 scroll-mt-20">
      <Reveal>
        <SectionHeader
          eyebrow="Əlavə xidmətlər"
          title="İstənilən paketə əlavə edin"
          description="Bu xidmətlər paketə daxil deyil, ehtiyacınıza görə ayrıca əlavə olunur."
        />

        <ul className="grid gap-3 sm:grid-cols-2">
          {EXTRAS.map((extra) => {
            const Icon = ICONS[extra.id];
            return (
              <li key={extra.id} className="surface rounded-[22px] p-5 flex items-center gap-4">
                <span className="w-11 h-11 rounded-[12px] bg-white text-black flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[17px] font-medium text-label">{extra.title}</span>
                  <span className="block text-[14px] text-label-2">{extra.description}</span>
                </span>
                <span className="text-[13px] text-label-2 shrink-0">Sorğu ilə</span>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
