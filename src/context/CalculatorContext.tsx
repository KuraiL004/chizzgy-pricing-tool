"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import {
  CalculatorState,
  PricingBreakdown,
  CountKey,
  TierKey,
  PresetTier,
  EMPTY_STATE,
  PRESET_TIERS,
  calculatePricing,
} from "@/config/pricing-config";

interface CalculatorContextType {
  state: CalculatorState;
  breakdown: PricingBreakdown;
  activePreset: PresetTier | null;
  setCount: (key: CountKey, value: number) => void;
  setTier: <K extends TierKey>(key: K, value: CalculatorState[K]) => void;
  applyPreset: (tier: PresetTier) => void;
  resetDefaults: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CalculatorState>(EMPTY_STATE);
  const [activePreset, setActivePreset] = useState<PresetTier | null>(null);

  // Canlı maliyet dökümü
  const breakdown = useMemo(() => calculatePricing(state), [state]);

  // Manuel ayar yapıldığında paket artık karma pakettir
  const setCount = (key: CountKey, value: number) => {
    setState((prev) => ({ ...prev, [key]: Math.max(0, Math.round(value)) }));
    setActivePreset(null);
  };

  const setTier = <K extends TierKey>(key: K, value: CalculatorState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null);
  };

  // Paket seçimi slider değerlerini otomatik doldurur
  const applyPreset = (tier: PresetTier) => {
    setState({ ...PRESET_TIERS[tier].config });
    setActivePreset(tier);
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  const resetDefaults = () => {
    setState(EMPTY_STATE);
    setActivePreset(null);
  };

  return (
    <CalculatorContext.Provider
      value={{ state, breakdown, activePreset, setCount, setTier, applyPreset, resetDefaults }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return context;
}
