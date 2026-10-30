"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export interface SegmentOption<T extends string> {
  value: T;
  title: string;
  badge?: string;
  description?: string;
}

interface AppleSegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  layout?: "horizontal" | "grid";
}

export function AppleSegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className = "",
  layout = "horizontal",
}: AppleSegmentedControlProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // GSAP ile Yumuşak Arka Plan Kayma/Dolma Animasyonu (Pill Slide Effect)
  useEffect(() => {
    const activeBtn = buttonRefs.current.get(value);
    const container = containerRef.current;
    const pill = pillRef.current;

    if (!activeBtn || !container || !pill) return;

    const btnRect = activeBtn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const targetX = btnRect.left - containerRect.left;
    const targetY = btnRect.top - containerRect.top;
    const targetWidth = btnRect.width;
    const targetHeight = btnRect.height;

    gsap.to(pill, {
      x: targetX,
      y: targetY,
      width: targetWidth,
      height: targetHeight,
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [value, options]);

  return (
    <div
      ref={containerRef}
      className={`relative p-1.5 rounded-2xl bg-bg-main/50 border border-border-glass backdrop-blur-md ${
        layout === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1.5"
          : "flex flex-wrap sm:flex-nowrap gap-1.5"
      } ${className}`}
    >
      {/* GSAP ile Kayan Arka Plan Pilli (Sliding Active Indicator) */}
      <div
        ref={pillRef}
        className="absolute top-0 left-0 rounded-xl bg-text-primary/10 border border-border-glass-active shadow-sm pointer-events-none opacity-0"
        style={{ willChange: "transform, width, height" }}
      />

      {options.map((opt) => {
        const isSelected = opt.value === value;

        return (
          <button
            key={opt.value}
            ref={(el) => {
              if (el) buttonRefs.current.set(opt.value, el);
              else buttonRefs.current.delete(opt.value);
            }}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`relative z-10 flex-1 p-3.5 rounded-xl text-left transition-colors duration-200 select-none flex flex-col justify-between ${
              isSelected ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <div className="flex items-center justify-between gap-2 w-full mb-1">
              <span className={`text-body font-medium leading-tight ${isSelected ? "text-text-primary" : "text-text-secondary"}`}>
                {opt.title}
              </span>
              {opt.badge && (
                <span className="text-small font-mono font-medium text-text-primary shrink-0">
                  {opt.badge}
                </span>
              )}
            </div>

            {opt.description && (
              <p className="text-[12px] text-text-secondary leading-snug line-clamp-2 mt-0.5">
                {opt.description}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}

