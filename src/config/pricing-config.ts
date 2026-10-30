/**
 * Chizzgy Price Calculator & Proposal Engine — Merkezi Fiyatlandırma Konfigürasyonu
 * PRD Dokümanı 6. Bölüm Birebir Referans Alınmıştır.
 * Para Birimi: AZN (Azerbaycan Manatı)
 */

export const PRICING_CONFIG = {
  currency: "AZN",
  currencySymbol: "₼",
  videos: {
    baseShootingRate: { none: 0, standard: 45, pro4k: 80, cinematic: 140 }, // video başı çekim
    baseEditingRate: { basic: 30, dynamic: 55, vfx3d: 110 },               // video başı kurgu
  },
  posters: {
    rates: { typographic: 15, manipulation: 30, render3d: 55 },
  },
  motion: {
    logoAnimation: 120,
    motionPoster: 75,
    explainerPer10Sec: 90,
  },
  branding: {
    none: 0,
    miniKit: 350,
    fullBrandbook: 950,
  },
  addons: {
    drone: 180,
    copywritingPerVideo: 20,
    voiceover: 100,
    expressMultiplier: 1.25, // %25 ek ücret
  },
} as const;

// Tip tanımları
export type ShootingQuality = keyof typeof PRICING_CONFIG.videos.baseShootingRate;
export type EditingQuality = keyof typeof PRICING_CONFIG.videos.baseEditingRate;
export type PosterQuality = keyof typeof PRICING_CONFIG.posters.rates;
export type BrandingOption = keyof typeof PRICING_CONFIG.branding;

// UI & Açıklama Etiketleri
export const PRICING_LABELS = {
  shooting: {
    none: { title: "Yok (Sadece Kurgu)", description: "Ham görüntüleri müşteri sağlar." },
    standard: { title: "Standart Çekim", description: "Mobil/Gimbal destekli hızlı dikey çekim." },
    pro4k: { title: "Pro 4K Çekim", description: "Profesyonel sinema kamerası, aydınlatma seti, ses kayıt ekipmanı." },
    cinematic: { title: "Cinematic Çekim", description: "Çift kamera, üst segment lensler, sanatsal ışık tasarımı ve prodüksiyon ekibi." },
  },
  editing: {
    basic: { title: "Temel Kurgu (Basic)", description: "Hızlı kesim, tempo montajı, standart dinamik altyazılar." },
    dynamic: { title: "Dinamik Motion Edit", description: "B-roll entegrasyonu, sound design, hook animasyonları, color grading." },
    vfx3d: { title: "Advanced VFX & 3D", description: "Ağır kompozisyon, 3D obje yerleşimi, özel efektler ve ritmik ses miksajı." },
  },
  posters: {
    typographic: { title: "2D Minimalist / Tipografik", description: "Sosyal medya için sade bilgi ve tipografi şablonları." },
    manipulation: { title: "Manipülasyon / Sanatsal", description: "Dekupe, kompozisyon, profesyonel retouch ve detaylı ışıklandırma." },
    render3d: { title: "3D Render Destekli", description: "Ürünlerin veya objelerin 3D modelleme/render çıktıları." },
  },
  motion: {
    logoAnimation: { title: "Hareketli Logo / İntro-Outro", description: "1-3 sn prestij logo animasyonu." },
    motionPoster: { title: "Motion Poster (Animasyonlu Afiş)", description: "5-10 saniyelik hareketli postlar." },
    explainerPer10Sec: { title: "Özel 2D/3D Tanıtım Animasyonu", description: "10 saniyelik birimler halinde animasyon üretimi." },
  },
  branding: {
    none: { title: "Hizmet İstemiyorum", description: "Mevcut kurumsal kimlik ile devam edilir." },
    miniKit: { title: "Logo & Renk Paleti (Mini Kit)", description: "Temel vektör logo, font ailesi, renk kodları." },
    fullBrandbook: { title: "Full Brandbook (Kapsamlı)", description: "Logo varyasyonları, rehber, gridler, tipografi, evraklar, sosyal medya kiti." },
  },
  addons: {
    drone: { title: "Drone Çekimi (FPV / Hava)", description: "Hava çekimleri ve dinamik geniş açılar." },
    copywriting: { title: "Senaryo & İçerik Metin Yazarlığı", description: "Video başı profesyonel senaryo ve kurgu metni." },
    voiceover: { title: "Profesyonel Seslendirme (Voiceover)", description: "Stüdyo ses kaydı ve ses miksajı." },
    express: { title: "Express Teslimat (+%25)", description: "Proje süresini yarıya indirir." },
  },
} as const;

// Hesaplayıcı Durumu Arayüzü
export interface CalculatorState {
  videoCount: number;
  shootingQuality: ShootingQuality;
  editingQuality: EditingQuality;
  posterCount: number;
  posterQuality: PosterQuality;
  motion: {
    logoAnimation: number;       // Adet
    motionPoster: number;        // Adet
    explainer10SecUnits: number; // 10 sn'lik birimler
  };
  branding: BrandingOption;
  addons: {
    drone: boolean;
    copywriting: boolean;
    voiceover: boolean;
    express: boolean;
  };
}

// Kalem Bazlı Maliyet Çıktısı
export interface PricingBreakdown {
  currency: string;
  videos: {
    count: number;
    shootingPerUnit: number;
    editingPerUnit: number;
    totalShooting: number;
    totalEditing: number;
    total: number;
  };
  posters: {
    count: number;
    ratePerUnit: number;
    total: number;
  };
  motion: {
    logoAnimationTotal: number;
    motionPosterTotal: number;
    explainerTotal: number;
    total: number;
  };
  branding: {
    type: BrandingOption;
    total: number;
  };
  addons: {
    droneTotal: number;
    copywritingTotal: number;
    voiceoverTotal: number;
    subtotal: number;
  };
  subtotalBeforeExpress: number;
  expressMultiplierApplied: boolean;
  expressFee: number;
  grandTotal: number;
}

// PRD 2.2 Sabit 3'lü Paket Tanımları
export const PRESET_TIERS = {
  starter: {
    id: "starter",
    name: "Starter",
    badge: "Temel Sosyal Medya",
    description: "Sosyal medyada düzenli ve profesyonel varlık göstermek isteyen markalar için.",
    fixedPrice: 660,
    config: {
      videoCount: 8,
      shootingQuality: "standard" as ShootingQuality,
      editingQuality: "basic" as EditingQuality,
      posterCount: 4,
      posterQuality: "typographic" as PosterQuality,
      motion: {
        logoAnimation: 0,
        motionPoster: 0,
        explainer10SecUnits: 0,
      },
      branding: "none" as BrandingOption,
      addons: {
        drone: false,
        copywriting: false,
        voiceover: false,
        express: false,
      },
    },
  },
  growth: {
    id: "growth",
    name: "Growth",
    badge: "En Popüler",
    popular: true,
    description: "Hızlı büyümek, etkileşim rekorları kırmak ve dinamik kurgular isteyenler için.",
    fixedPrice: 2445,
    config: {
      videoCount: 15,
      shootingQuality: "pro4k" as ShootingQuality,
      editingQuality: "dynamic" as EditingQuality,
      posterCount: 10,
      posterQuality: "manipulation" as PosterQuality,
      motion: {
        logoAnimation: 1,
        motionPoster: 0,
        explainer10SecUnits: 0,
      },
      branding: "none" as BrandingOption,
      addons: {
        drone: false,
        copywriting: false,
        voiceover: false,
        express: false,
      },
    },
  },
  elite: {
    id: "elite",
    name: "Elite / Brand Transformation",
    badge: "Full Prodüksiyon",
    description: "Sektör liderliği, üst düzey marka algısı ve 360 derece sinematik dönüşüm paketi.",
    fixedPrice: 9381.25,
    config: {
      videoCount: 20,
      shootingQuality: "cinematic" as ShootingQuality,
      editingQuality: "vfx3d" as EditingQuality,
      posterCount: 15,
      posterQuality: "render3d" as PosterQuality,
      motion: {
        logoAnimation: 1,
        motionPoster: 2,
        explainer10SecUnits: 0,
      },
      branding: "fullBrandbook" as BrandingOption,
      addons: {
        drone: true,
        copywriting: true,
        voiceover: true,
        express: true,
      },
    },
  },
} as const;

/**
 * Dinamik hesaplama formülü (PRD 3 & 4)
 */
export function calculatePricing(state: CalculatorState): PricingBreakdown {
  const cfg = PRICING_CONFIG;

  // Video
  const shootingRate = cfg.videos.baseShootingRate[state.shootingQuality] ?? 0;
  const editingRate = cfg.videos.baseEditingRate[state.editingQuality] ?? 0;
  const totalShooting = state.videoCount * shootingRate;
  const totalEditing = state.videoCount * editingRate;
  const totalVideos = totalShooting + totalEditing;

  // Poster
  const posterRate = cfg.posters.rates[state.posterQuality] ?? 0;
  const totalPosters = state.posterCount * posterRate;

  // Motion
  const logoTotal = (state.motion?.logoAnimation ?? 0) * cfg.motion.logoAnimation;
  const motionPosterTotal = (state.motion?.motionPoster ?? 0) * cfg.motion.motionPoster;
  const explainerTotal = (state.motion?.explainer10SecUnits ?? 0) * cfg.motion.explainerPer10Sec;
  const totalMotion = logoTotal + motionPosterTotal + explainerTotal;

  // Branding
  const totalBranding = cfg.branding[state.branding] ?? 0;

  // Ek Hizmetler (Addons)
  const droneTotal = state.addons.drone ? cfg.addons.drone : 0;
  const copywritingTotal = state.addons.copywriting ? state.videoCount * cfg.addons.copywritingPerVideo : 0;
  const voiceoverTotal = state.addons.voiceover ? cfg.addons.voiceover : 0;
  const addonsSubtotal = droneTotal + copywritingTotal + voiceoverTotal;

  // Express öncesi ara toplam
  const subtotalBeforeExpress = totalVideos + totalPosters + totalMotion + totalBranding + addonsSubtotal;

  // Express Teslimat Katsayısı (%25 ek)
  const expressMultiplierApplied = Boolean(state.addons.express);
  const expressFee = expressMultiplierApplied
    ? subtotalBeforeExpress * (cfg.addons.expressMultiplier - 1)
    : 0;
  const grandTotal = subtotalBeforeExpress + expressFee;

  return {
    currency: cfg.currency,
    videos: {
      count: state.videoCount,
      shootingPerUnit: shootingRate,
      editingPerUnit: editingRate,
      totalShooting,
      totalEditing,
      total: totalVideos,
    },
    posters: {
      count: state.posterCount,
      ratePerUnit: posterRate,
      total: totalPosters,
    },
    motion: {
      logoAnimationTotal: logoTotal,
      motionPosterTotal,
      explainerTotal,
      total: totalMotion,
    },
    branding: {
      type: state.branding,
      total: totalBranding,
    },
    addons: {
      droneTotal,
      copywritingTotal,
      voiceoverTotal,
      subtotal: addonsSubtotal,
    },
    subtotalBeforeExpress,
    expressMultiplierApplied,
    expressFee: Math.round(expressFee * 100) / 100,
    grandTotal: Math.round(grandTotal * 100) / 100,
  };
}

/**
 * WhatsApp Teklif Metni Oluşturucu (PRD 4. CTA)
 */
export function generateWhatsAppMessage(state: CalculatorState, breakdown: PricingBreakdown): string {
  const shootingLabel = PRICING_LABELS.shooting[state.shootingQuality]?.title || state.shootingQuality;
  const editingLabel = PRICING_LABELS.editing[state.editingQuality]?.title || state.editingQuality;
  const posterLabel = PRICING_LABELS.posters[state.posterQuality]?.title || state.posterQuality;
  const brandingLabel = PRICING_LABELS.branding[state.branding]?.title || state.branding;

  const lines: string[] = [
    `*Chizzgy Fiyat Teklifi Talebi* ⚡`,
    `----------------------------------------`,
    `📹 *Video Prodüksiyonu:*`,
    `• Adet: ${state.videoCount} video`,
    `• Çekim Seviyesi: ${shootingLabel}`,
    `• Kurgu Seviyesi: ${editingLabel}`,
    `• Tutar: ${breakdown.videos.total} ${breakdown.currency}`,
    ``,
    `🎨 *Grafik & Poster:*`,
    `• Adet: ${state.posterCount} poster`,
    `• Kalite: ${posterLabel}`,
    `• Tutar: ${breakdown.posters.total} ${breakdown.currency}`,
  ];

  if (breakdown.motion.total > 0) {
    lines.push(
      ``,
      `✨ *Motion Design:*`,
      state.motion.logoAnimation > 0 ? `• Hareketli Logo: ${state.motion.logoAnimation} adet` : "",
      state.motion.motionPoster > 0 ? `• Motion Poster: ${state.motion.motionPoster} adet` : "",
      state.motion.explainer10SecUnits > 0 ? `• Tanıtım Animasyonu: ${state.motion.explainer10SecUnits * 10} sn` : "",
      `• Tutar: ${breakdown.motion.total} ${breakdown.currency}`
    );
  }

  if (state.branding !== "none") {
    lines.push(
      ``,
      `📐 *Markalama & Brandbook:*`,
      `• Seçim: ${brandingLabel}`,
      `• Tutar: ${breakdown.branding.total} ${breakdown.currency}`
    );
  }

  const selectedAddons: string[] = [];
  if (state.addons.drone) selectedAddons.push("Drone Çekimi (FPV/Hava)");
  if (state.addons.copywriting) selectedAddons.push(`Senaryo & Metin Yazarlığı (${state.videoCount} video)`);
  if (state.addons.voiceover) selectedAddons.push("Profesyonel Seslendirme");

  if (selectedAddons.length > 0) {
    lines.push(
      ``,
      `➕ *Ek Hizmetler:*`,
      ...selectedAddons.map((addon) => `• ${addon}`),
      `• Ek Hizmetler Tutarı: ${breakdown.addons.subtotal} ${breakdown.currency}`
    );
  }

  if (state.addons.express) {
    lines.push(
      ``,
      `⚡ *Express Teslimat:* Aktif (+%25 öncelik katsayısı - ${breakdown.expressFee} ${breakdown.currency})`
    );
  }

  lines.push(
    `----------------------------------------`,
    `💰 *TOPLAM BÜTÇE:* *${breakdown.grandTotal} ${breakdown.currency}*`,
    `----------------------------------------`,
    `Detayları görüşmek ve prodüksiyona başlamak için bu teklif üzerinden devam etmek istiyorum.`
  );

  return lines.filter(Boolean).join("\n");
}
