/**
 * Chizzgy Tasarım Sistemi ve Tema Yapılandırması (theme-config.ts)
 * 
 * Tasarım dili: Apple ekosistemine özgü premium sadelik, geniş negatif boşluklar,
 * Off-Black/Off-White kontrastı, Glassmorphism (buzlu cam) paneller ve GSAP destekli pürüzsüz animasyonlar.
 */

export const THEME_CONFIG = {
  colors: {
    // 1. Arka Plan & Cam Materyali (Apple Off-Black & Glass)
    bgMain: "#161617",                          // Apple Off-Black - Derin mat antrasit/siyah
    glassSurface: "rgba(255, 255, 255, 0.03)", // Kartlar ve paneller için yarı saydam beyaz
    glassSurfaceHover: "rgba(255, 255, 255, 0.06)",
    glassBlur: "backdrop-blur-2xl",             // Arkası bulanık Apple cam efekti

    // 2. Metin Renkleri (Apple Off-White & Neutral Grey)
    textPrimary: "#F5F5F7",    // Apple Off-White - Pürüzsüz kırık beyaz
    textSecondary: "#86868B",  // Açıklamalar ve pasif metinler için Apple grisi
    textMuted: "#515154",      // Çok silik kılavuz metinler

    // 3. Aksiyon & Çerçeve
    borderGlass: "rgba(255, 255, 255, 0.08)",       // Cam panellerin etrafındaki çok ince, zarif çerçeveler
    borderGlassActive: "rgba(255, 255, 255, 0.22)", // Seçili kartlar ve aktif elemanlar
    accentPrimary: "#F5F5F7",                       // Birincil buton arka planı - Off-white
    accentPrimaryText: "#161617",                   // Birincil buton metni - Off-black
    accentWhatsapp: "#25D366",                      // WhatsApp butonu
  },

  // 2. Tipografi ve Yuvarlatma (Border Radius)
  typography: {
    fonts: {
      sans: ["SF Pro Display", "SF Pro Text", "Inter", "-apple-system", "sans-serif"],
    },
    sizes: {
      h1: { size: "3.5rem", px: "56px", weight: "500", tracking: "-0.03em", usage: "Ana slogan (Tracking-tight)" },
      h2: { size: "2rem", px: "32px", weight: "500", tracking: "-0.02em", usage: "Bölüm başlıkları" },
      h3: { size: "1.375rem", px: "22px", weight: "500", tracking: "-0.01em", usage: "Kart başlıkları" },
      body: { size: "1.0625rem", px: "17px", weight: "400", usage: "Genel Apple okuma boyutu" },
      small: { size: "0.875rem", px: "14px", weight: "400", usage: "İnce detaylar, rozetler" },
    },
  },

  geometry: {
    radiusCard: "24px",    // rounded-3xl - Apple tarzı yumuşak köşeler
    radiusButton: "9999px",// rounded-full - Kapsül şeklinde butonlar
  },
} as const;

export type ThemeConfig = typeof THEME_CONFIG;
