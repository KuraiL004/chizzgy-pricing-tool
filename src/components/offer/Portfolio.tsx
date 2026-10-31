import { BRAND_COUNT, BRAND_LOGOS, BrandLogo } from "@/config/offer-config";

function Logo({ logo }: { logo: BrandLogo }) {
  if (logo.kind === "avatar") {
    return (
      <span className="flex items-center gap-2.5 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo.src} alt="" loading="lazy" className="w-9 h-9 rounded-full object-cover grayscale" />
        <span className="text-[17px] font-semibold text-label whitespace-nowrap">{logo.name}</span>
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={logo.name}
      loading="lazy"
      className={`h-8 w-auto max-w-[140px] object-contain shrink-0 ${logo.kind === "mono" ? "brightness-0 invert" : ""}`}
    />
  );
}

// Bizə etibar edən brendlər — sonsuz lent (Azərbaycan, Kanada, ABŞ bir yerdə)
export function Portfolio() {
  return (
    <section id="brendler" aria-label="Bizə etibar edən brendlər" className="py-10 sm:py-14 border-y border-white/[0.06]">
      <p className="text-center text-[13px] font-medium text-label-2 mb-8">
        Azərbaycan, Kanada və ABŞ-dan {BRAND_COUNT} brend bizə etibar edib
      </p>
      <div className="marquee-mask overflow-hidden">
        <ul className="marquee flex w-max items-center opacity-70">
          {/* Lent kəsilməsin deyə siyahı iki dəfə təkrarlanır */}
          {[0, 1].map((copy) =>
            BRAND_LOGOS.map((logo) => (
              <li key={`${copy}-${logo.name}`} aria-hidden={copy === 1} className="px-7 sm:px-10 flex items-center">
                <Logo logo={logo} />
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
