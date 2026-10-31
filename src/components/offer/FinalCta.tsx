import { MessageCircle } from "lucide-react";
import { OFFER } from "@/config/offer-config";
import { ClientName } from "./ClientName";
import { Reveal } from "./Reveal";
import { WhatsAppLink } from "./WhatsAppLink";

export function FinalCta() {
  return (
    <section className="max-w-5xl mx-auto px-5 py-20 sm:py-28">
      <Reveal>
        <div className="relative overflow-hidden surface surface-glow rounded-[36px] px-6 py-16 sm:py-24 text-center">
          <div className="absolute inset-0 stars opacity-60" aria-hidden />
          <div className="relative">
            <h2 className="text-[36px] sm:text-[60px] leading-[1.05] font-semibold tracking-tight text-gradient pb-1">
              Gəlin çəkilişə başlayaq.
            </h2>
            <p className="mt-4 text-[17px] text-label-2 max-w-md mx-auto">
              <ClientName fallback="Sizin üçün" suffix=" üçün" /> ən uyğun paketi birlikdə seçək. Bir mesaj kifayətdir.
            </p>
            <WhatsAppLink className="mt-10 inline-flex items-center gap-2 px-8 h-14 rounded-full bg-white text-black text-[17px] font-semibold active:opacity-70 transition-opacity">
              <MessageCircle className="w-5 h-5" />
              WhatsApp-da yazın
            </WhatsAppLink>
            <p className="mt-4 text-[15px] text-label-2 tabular-nums">{OFFER.whatsappDisplay}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
