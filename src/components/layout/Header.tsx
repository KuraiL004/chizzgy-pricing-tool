import { PartnerLockup } from "@/components/offer/PartnerLockup";
import { WhatsAppLink } from "@/components/offer/WhatsAppLink";

const LINKS = [
  { href: "#islerimiz", label: "İşlər" },
  { href: "#seviyye", label: "Fərq" },
  { href: "#paketler", label: "Paketlər" },
];

// Üzən şüşə naviqasiya paneli
export function Header() {
  return (
    <header className="fixed top-3 inset-x-0 z-50 px-3">
      <div className="max-w-5xl mx-auto h-14 pl-3 pr-2 rounded-full surface bg-black/60 backdrop-blur-xl flex items-center justify-between gap-4">
        <a href="#" aria-label="Səhifənin əvvəlinə" className="min-w-0">
          <PartnerLockup size="sm" />
        </a>
        <nav className="hidden md:flex items-center gap-7 text-[15px] text-label-2">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-label transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <WhatsAppLink className="shrink-0 px-4 h-10 inline-flex items-center rounded-full bg-white text-black text-[15px] font-semibold active:opacity-70 transition-opacity">
          Əlaqə
        </WhatsAppLink>
      </div>
    </header>
  );
}
