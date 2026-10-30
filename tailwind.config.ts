import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Apple 'Off-Black & Off-White' + Glassmorphism Renk Paleti (Rules.md)
        "bg-main": "#161617",                          // Apple Off-Black derin mat antrasit
        "glass-surface": "rgba(255, 255, 255, 0.03)", // Buzlu cam paneller için yarı saydam beyaz
        "glass-surface-hover": "rgba(255, 255, 255, 0.06)",
        "border-glass": "rgba(255, 255, 255, 0.08)",  // İnce zarif cam çerçevesi
        "border-glass-active": "rgba(255, 255, 255, 0.22)",

        // Metin Renkleri
        "text-primary": "#F5F5F7",    // Apple Off-White pürüzsüz kırık beyaz
        "text-secondary": "#86868B",  // Apple grisi açıklamalar ve pasif metinler
        "text-muted": "#515154",

        // Aksiyon & Buton
        "accent-primary": "#F5F5F7",       // Off-White birincil buton
        "accent-primary-text": "#161617",  // Off-Black buton metni
        "accent-whatsapp": "#25D366",      // WhatsApp butonu

        // Shorthand uyumluluk
        main: "#161617",
        surface: "rgba(255, 255, 255, 0.03)",
        "surface-hover": "rgba(255, 255, 255, 0.06)",
        primary: "#F5F5F7",
        secondary: "#86868B",
        muted: "#515154",
      },
      borderRadius: {
        "3xl": "24px",     // Apple kart köşeleri (radius-card)
        card: "24px",
        button: "9999px",  // Kapsül butonlar (rounded-full)
      },
      fontSize: {
        h1: ["3.5rem", { lineHeight: "1.1", fontWeight: "500", letterSpacing: "-0.03em" }],       // 56px Medium
        h2: ["2rem", { lineHeight: "1.25", fontWeight: "500", letterSpacing: "-0.02em" }],        // 32px Medium
        h3: ["1.375rem", { lineHeight: "1.35", fontWeight: "500", letterSpacing: "-0.01em" }],    // 22px Medium
        body: ["1.0625rem", { lineHeight: "1.5", fontWeight: "400" }],                             // 17px Regular
        small: ["0.875rem", { lineHeight: "1.4", fontWeight: "400" }],                             // 14px Regular
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "sans-serif",
        ],
      },
      backdropBlur: {
        "2xl": "40px",
        "3xl": "64px",
      },
    },
  },
  plugins: [],
};

export default config;
