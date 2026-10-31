import { PARTNERS } from "@/config/offer-config";

// Chizzgy × Nemət Səfərov tərəfdaşlıq nişanı
export function PartnerLockup({ size = "lg" }: { size?: "sm" | "lg" }) {
  const img = size === "lg" ? "w-11 h-11" : "w-8 h-8";
  return (
    <div className="inline-flex items-center gap-2.5 min-w-0">
      <div className="flex -space-x-2 shrink-0">
        {PARTNERS.map((p) => (
          // Halqa ayrıca span-dadır ki, loqonun invert filtri onu ağ etməsin
          <span key={p.name} className={`${img} rounded-full overflow-hidden ring-2 ring-black block`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.name} className={`w-full h-full object-cover ${p.isLogo ? "invert" : ""}`} />
          </span>
        ))}
      </div>
      <span className={`truncate font-semibold text-label ${size === "lg" ? "text-[17px]" : "text-[14px] sm:text-[15px]"}`}>
        {PARTNERS[0].name} <span className="text-label-3 font-normal">×</span> {PARTNERS[1].name}
      </span>
    </div>
  );
}
