"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { 
  CalculatorState, 
  PricingBreakdown, 
  ShootingQuality, 
  EditingQuality, 
  PosterQuality, 
  BrandingOption,
  calculatePricing,
  PRESET_TIERS
} from "@/config/pricing-config";

interface CalculatorContextType {
  state: CalculatorState;
  breakdown: PricingBreakdown;
  setVideoCount: (count: number) => void;
  setShootingQuality: (quality: ShootingQuality) => void;
  setEditingQuality: (quality: EditingQuality) => void;
  setPosterCount: (count: number) => void;
  setPosterQuality: (quality: PosterQuality) => void;
  setLogoAnimation: (count: number) => void;
  setMotionPoster: (count: number) => void;
  setExplainerUnits: (units: number) => void;
  setBranding: (branding: BrandingOption) => void;
  toggleAddon: (addonKey: keyof CalculatorState["addons"]) => void;
  loadPreset: (presetKey: keyof typeof PRESET_TIERS) => void;
  resetDefaults: () => void;
}

// Varsayılan hesaplayıcı başlangıç durumu (PRD Growth veya Starter)
const initialCalculatorState: CalculatorState = {
  videoCount: 8,
  shootingQuality: "standard",
  editingQuality: "basic",
  posterCount: 4,
  posterQuality: "typographic",
  motion: {
    logoAnimation: 0,
    motionPoster: 0,
    explainer10SecUnits: 0,
  },
  branding: "none",
  addons: {
    drone: false,
    copywriting: false,
    voiceover: false,
    express: false,
  },
};

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CalculatorState>(initialCalculatorState);

  // Canlı maliyet dökümü
  const breakdown = useMemo(() => calculatePricing(state), [state]);

  const setVideoCount = (count: number) => {
    const validCount = Math.max(0, Math.min(30, count));
    setState((prev) => ({ ...prev, videoCount: validCount }));
  };

  const setShootingQuality = (quality: ShootingQuality) => {
    setState((prev) => ({ ...prev, shootingQuality: quality }));
  };

  const setEditingQuality = (quality: EditingQuality) => {
    setState((prev) => ({ ...prev, editingQuality: quality }));
  };

  const setPosterCount = (count: number) => {
    const validCount = Math.max(0, Math.min(30, count));
    setState((prev) => ({ ...prev, posterCount: validCount }));
  };

  const setPosterQuality = (quality: PosterQuality) => {
    setState((prev) => ({ ...prev, posterQuality: quality }));
  };

  const setLogoAnimation = (count: number) => {
    setState((prev) => ({
      ...prev,
      motion: { ...prev.motion, logoAnimation: Math.max(0, count) },
    }));
  };

  const setMotionPoster = (count: number) => {
    setState((prev) => ({
      ...prev,
      motion: { ...prev.motion, motionPoster: Math.max(0, count) },
    }));
  };

  const setExplainerUnits = (units: number) => {
    setState((prev) => ({
      ...prev,
      motion: { ...prev.motion, explainer10SecUnits: Math.max(0, units) },
    }));
  };

  const setBranding = (branding: BrandingOption) => {
    setState((prev) => ({ ...prev, branding }));
  };

  const toggleAddon = (addonKey: keyof CalculatorState["addons"]) => {
    setState((prev) => ({
      ...prev,
      addons: {
        ...prev.addons,
        [addonKey]: !prev.addons[addonKey],
      },
    }));
  };

  const loadPreset = (presetKey: keyof typeof PRESET_TIERS) => {
    const preset = PRESET_TIERS[presetKey];
    if (preset) {
      setState({
        videoCount: preset.config.videoCount,
        shootingQuality: preset.config.shootingQuality,
        editingQuality: preset.config.editingQuality,
        posterCount: preset.config.posterCount,
        posterQuality: preset.config.posterQuality,
        motion: { ...preset.config.motion },
        branding: preset.config.branding,
        addons: { ...preset.config.addons },
      });

      // Hesaplayıcıya yumuşak kaydırma
      const el = document.getElementById("calculator");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const resetDefaults = () => {
    setState(initialCalculatorState);
  };

  return (
    <CalculatorContext.Provider
      value={{
        state,
        breakdown,
        setVideoCount,
        setShootingQuality,
        setEditingQuality,
        setPosterCount,
        setPosterQuality,
        setLogoAnimation,
        setMotionPoster,
        setExplainerUnits,
        setBranding,
        toggleAddon,
        loadPreset,
        resetDefaults,
      }}
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

