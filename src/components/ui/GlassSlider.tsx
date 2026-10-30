"use client";

interface GlassSliderProps {
  value: number;
  max: number;
  min?: number;
  label: string;
  onChange: (value: number) => void;
}

// İnce bir cam çizgi üzerinde kayan beyaz nokta. Erişilebilirlik için görünmez native input kullanılır.
export function GlassSlider({ value, max, min = 0, label, onChange }: GlassSliderProps) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  // Thumb 18px: merkezini native input thumb'ı ile hizalı tutar
  const thumbLeft = `calc(${pct}% - ${pct * 0.18}px)`;

  return (
    <div className="relative h-6 flex items-center">
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="absolute inset-x-0 h-1 rounded-full bg-glass-surface border border-border-glass" />
      <div
        className="absolute left-0 h-1 rounded-full bg-text-primary/25 transition-[width] duration-100"
        style={{ width: `calc(${thumbLeft} + 9px)` }}
      />
      <div
        className="absolute w-[18px] h-[18px] rounded-full bg-text-primary transition-[left] duration-100 peer-focus-visible:ring-4 peer-focus-visible:ring-border-glass-active"
        style={{ left: thumbLeft }}
      />
    </div>
  );
}
