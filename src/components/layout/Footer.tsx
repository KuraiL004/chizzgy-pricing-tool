import { OFFER, PARTNERS } from "@/config/offer-config";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-5 py-8 flex flex-wrap items-center justify-between gap-3 text-[13px] text-label-2">
        <span>
          © {PARTNERS[0].name} × {PARTNERS[1].name}
        </span>
        <a href={`https://wa.me/${OFFER.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="tabular-nums hover:text-label">
          {OFFER.whatsappDisplay}
        </a>
        <span>Bakı, Azərbaycan</span>
      </div>
    </footer>
  );
}
