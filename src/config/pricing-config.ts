/**
 * Chizzgy Price Calculator — Merkezi Fiyatlandırma Motoru
 * Tüm UI bu dosyaya referans verir. Para Birimi: AZN (Azerbaycan Manatı)
 *
 * Model: Müşteri Fiyatı = Ajans Maliyeti (Cost) × Kâr Marjı Çarpanı (profitMargin)
 */

export const PRICING_CONFIG = {
  currency: "AZN",
  currencySymbol: "₼",

  // Ajansın kâr marjı çarpanı (1.5 = maliyetin %50 üstü)
  profitMargin: 1.5,

  shooting: {
    // 1 tam çekim günü ortalama 3.5 video çıkarır → Gün = Video Sayısı / 3.5
    videosPerDay: 3.5,
    // Günlük çekim maliyetleri
    dailyCost: { podcast: 125, standard: 230, premium: 500 },
  },

  // Video başı kurgu maliyetleri
  editing: { basic: 35, medium: 50, premium: 300 },

  // Adet başı poster maliyetleri
  posters: { standard: 20, premium: 100 },
} as const;

export type ShootingTier = keyof typeof PRICING_CONFIG.shooting.dailyCost;
export type EditingTier = keyof typeof PRICING_CONFIG.editing;
export type PosterTier = keyof typeof PRICING_CONFIG.posters;

// Her video türü bir çekim seviyesi + bir kurgu seviyesinden oluşur
export const VIDEO_TYPES = {
  podcast: { shooting: "podcast", editing: "basic" },
  standard: { shooting: "standard", editing: "medium" },
  premium: { shooting: "premium", editing: "premium" },
} as const satisfies Record<string, { shooting: ShootingTier; editing: EditingTier }>;

export type VideoType = keyof typeof VIDEO_TYPES;

// Hesaplayıcı durumu — her slider ayrı bir state alanıdır
export interface CalculatorState {
  podcastVideos: number;
  standardVideos: number;
  premiumVideos: number;
  standardPosters: number;
  premiumPosters: number;
}

export type SliderKey = keyof CalculatorState;

// Slider tanımları (UI sırası, etiketler ve sınırlar)
export const SLIDERS: readonly {
  key: SliderKey;
  title: string;
  description: string;
  max: number;
}[] = [
  { key: "podcastVideos", title: "Podcast / Tripod Video", description: "Sabit kamera çekimi + Basic kurgu (Cut & Altyazı)", max: 30 },
  { key: "standardVideos", title: "Standart Video", description: "Standart çekim + Orta kurgu (Hafif Motion)", max: 30 },
  { key: "premiumVideos", title: "Premium Video", description: "Premium çekim + İleri kurgu", max: 30 },
  { key: "standardPosters", title: "Standart Poster", description: "Sosyal medya için sade tasarım", max: 30 },
  { key: "premiumPosters", title: "Premium Poster", description: "Manipülasyon, retouch ve detaylı kompozisyon", max: 30 },
];

export const EMPTY_STATE: CalculatorState = {
  podcastVideos: 0,
  standardVideos: 0,
  premiumVideos: 0,
  standardPosters: 0,
  premiumPosters: 0,
};

// Hazır paketler — applyPreset bu değerleri slider'lara doldurur
export const PRESET_TIERS = {
  starter: {
    id: "starter",
    name: "Starter",
    description: "Sosyal medyada düzenli ve profesyonel varlık göstermek isteyen markalar için.",
    config: { podcastVideos: 4, standardVideos: 4, premiumVideos: 0, standardPosters: 4, premiumPosters: 0 },
  },
  growth: {
    id: "growth",
    name: "Growth",
    description: "Hızlı büyümek ve dinamik kurgularla etkileşimi artırmak isteyenler için.",
    popular: true,
    config: { podcastVideos: 2, standardVideos: 8, premiumVideos: 2, standardPosters: 6, premiumPosters: 2 },
  },
  elite: {
    id: "elite",
    name: "Elite",
    description: "Üst düzey marka algısı ve sinematik prodüksiyon isteyen markalar için.",
    config: { podcastVideos: 0, standardVideos: 8, premiumVideos: 6, standardPosters: 6, premiumPosters: 6 },
  },
} as const satisfies Record<string, { id: string; name: string; description: string; popular?: boolean; config: CalculatorState }>;

export type PresetTier = keyof typeof PRESET_TIERS;

export interface VideoLine {
  type: VideoType;
  count: number;
  shootingDays: number;
  shootingCost: number;
  editingCost: number;
  cost: number;
  price: number;
}

export interface PosterLine {
  tier: PosterTier;
  count: number;
  cost: number;
  price: number;
}

export interface PricingBreakdown {
  currency: string;
  videos: VideoLine[];
  posters: PosterLine[];
  totalVideos: number;
  totalPosters: number;
  totalShootingDays: number;
  totalCost: number;
  grandTotal: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

const VIDEO_COUNT_KEY: Record<VideoType, SliderKey> = {
  podcast: "podcastVideos",
  standard: "standardVideos",
  premium: "premiumVideos",
};

const POSTER_COUNT_KEY: Record<PosterTier, SliderKey> = {
  standard: "standardPosters",
  premium: "premiumPosters",
};

/**
 * Hesaplama motoru: maliyetleri kalem kalem çıkarır, kâr marjını uygular.
 */
export function calculatePricing(
  state: CalculatorState,
  profitMargin: number = PRICING_CONFIG.profitMargin
): PricingBreakdown {
  const cfg = PRICING_CONFIG;

  const videos: VideoLine[] = (Object.keys(VIDEO_TYPES) as VideoType[]).map((type) => {
    const { shooting, editing } = VIDEO_TYPES[type];
    const count = state[VIDEO_COUNT_KEY[type]];
    const shootingDays = count / cfg.shooting.videosPerDay;
    const shootingCost = shootingDays * cfg.shooting.dailyCost[shooting];
    const editingCost = count * cfg.editing[editing];
    const cost = shootingCost + editingCost;
    return {
      type,
      count,
      shootingDays: round2(shootingDays),
      shootingCost: round2(shootingCost),
      editingCost,
      cost: round2(cost),
      price: Math.round(cost * profitMargin),
    };
  });

  const posters: PosterLine[] = (Object.keys(cfg.posters) as PosterTier[]).map((tier) => {
    const count = state[POSTER_COUNT_KEY[tier]];
    const cost = count * cfg.posters[tier];
    return { tier, count, cost, price: Math.round(cost * profitMargin) };
  });

  const lines = [...videos, ...posters];
  const totalCost = lines.reduce((sum, l) => sum + l.cost, 0);

  return {
    currency: cfg.currency,
    videos,
    posters,
    totalVideos: videos.reduce((sum, v) => sum + v.count, 0),
    totalPosters: posters.reduce((sum, p) => sum + p.count, 0),
    totalShootingDays: round2(videos.reduce((sum, v) => sum + v.shootingDays, 0)),
    totalCost: round2(totalCost),
    grandTotal: lines.reduce((sum, l) => sum + l.price, 0),
  };
}

export const VIDEO_LABELS: Record<VideoType, string> = {
  podcast: "Podcast / Tripod Video",
  standard: "Standart Video",
  premium: "Premium Video",
};

export const POSTER_LABELS: Record<PosterTier, string> = {
  standard: "Standart Poster",
  premium: "Premium Poster",
};

/**
 * WhatsApp Teklif Metni Oluşturucu
 */
export function generateWhatsAppMessage(breakdown: PricingBreakdown): string {
  const lines: string[] = [`*Chizzgy Fiyat Teklifi Talebi*`, `----------------------------------------`];

  for (const v of breakdown.videos) {
    if (v.count > 0) lines.push(`• ${VIDEO_LABELS[v.type]}: ${v.count} adet — ${v.price} ${breakdown.currency}`);
  }
  for (const p of breakdown.posters) {
    if (p.count > 0) lines.push(`• ${POSTER_LABELS[p.tier]}: ${p.count} adet — ${p.price} ${breakdown.currency}`);
  }

  lines.push(
    `----------------------------------------`,
    `*TOPLAM BÜTÇE:* *${breakdown.grandTotal} ${breakdown.currency}*`,
    ``,
    `Detayları görüşmek ve prodüksiyona başlamak için bu teklif üzerinden devam etmek istiyorum.`
  );

  return lines.join("\n");
}
