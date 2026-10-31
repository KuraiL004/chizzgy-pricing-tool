// Bölmə başlığı: kiçik nişan, böyük başlıq, qısa izah
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div className={`mb-10 sm:mb-14 ${center ? "text-center flex flex-col items-center" : ""}`}>
      <span className="badge">
        <span className="w-3 h-px bg-white/30" aria-hidden />
        {eyebrow}
        <span className="w-3 h-px bg-white/30" aria-hidden />
      </span>
      <h2 className="mt-5 text-[32px] sm:text-[52px] leading-[1.08] font-semibold tracking-tight text-gradient max-w-3xl pb-1">
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-[17px] leading-relaxed text-label-2 max-w-2xl ${center ? "mx-auto" : ""}`}>{description}</p>
      )}
    </div>
  );
}
