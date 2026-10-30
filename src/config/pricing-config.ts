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

export const SHOOTING_LABELS: Record<ShootingTier, string> = {
  podcast: "Podcast / Tripod",
  standard: "Standart",
  premium: "Premium",
};

export const EDITING_LABELS: Record<EditingTier, string> = {
  basic: "Basic",
  medium: "Orta",
  premium: "Premium",
};

export const POSTER_LABELS: Record<PosterTier, string> = {
  standard: "Standart",
  premium: "Premium",
};

// Hesaplayıcı durumu — her slider ayrı bir state alanıdır
export interface CalculatorState {
  videoCount: number;
  shootingTier: ShootingTier;
  editingTier: EditingTier;
  posterCount: number;
  posterTier: PosterTier;
}

export type CountKey = "videoCount" | "posterCount";
export type TierKey = "shootingTier" | "editingTier" | "posterTier";

export type SliderDef =
  | { kind: "count"; key: CountKey; title: string; description: string; max: number }
  | { kind: "tier"; key: TierKey; title: string; description: string; options: readonly { value: string; label: string }[] };

const toOptions = (labels: Record<string, string>) =>
  Object.entries(labels).map(([value, label]) => ({ value, label }));

// Slider tanımları (UI sırası): adet → çekim kalitesi → kurgu kalitesi → poster adedi → poster kalitesi
export const SLIDERS: readonly SliderDef[] = [
  { kind: "count", key: "videoCount", title: "Video Sayısı", description: "Çekilecek toplam video adedi", max: 30 },
  { kind: "tier", key: "shootingTier", title: "Çekim Kalitesi", description: "Podcast (tripod), standart veya premium prodüksiyon", options: toOptions(SHOOTING_LABELS) },
  { kind: "tier", key: "editingTier", title: "Kurgu Kalitesi", description: "Basic (cut + altyazı), orta (hafif motion) veya premium", options: toOptions(EDITING_LABELS) },
  { kind: "count", key: "posterCount", title: "Poster Sayısı", description: "Tasarlanacak toplam poster adedi", max: 30 },
  { kind: "tier", key: "posterTier", title: "Poster Kalitesi", description: "Standart tasarım veya premium kompozisyon", options: toOptions(POSTER_LABELS) },
];

export const EMPTY_STATE: CalculatorState = {
  videoCount: 0,
  shootingTier: "podcast",
  editingTier: "basic",
  posterCount: 0,
  posterTier: "standard",
};

// Hazır paketler — applyPreset bu değerleri slider'lara doldurur
export const PRESET_TIERS = {
  starter: {
    id: "starter",
    name: "Starter",
    description: "Sosyal medyada düzenli ve profesyonel varlık göstermek isteyen markalar için.",
    config: { videoCount: 8, shootingTier: "podcast", editingTier: "basic", posterCount: 4, posterTier: "standard" },
  },
  growth: {
    id: "growth",
    name: "Growth",
    description: "Hızlı büyümek ve dinamik kurgularla etkileşimi artırmak isteyenler için.",
    popular: true,
    config: { videoCount: 12, shootingTier: "standard", editingTier: "medium", posterCount: 8, posterTier: "standard" },
  },
  elite: {
    id: "elite",
    name: "Elite",
    description: "Üst düzey marka algısı ve sinematik prodüksiyon isteyen markalar için.",
    config: { videoCount: 15, shootingTier: "premium", editingTier: "premium", posterCount: 10, posterTier: "premium" },
  },
} as const satisfies Record<string, { id: string; name: string; description: string; popular?: boolean; config: CalculatorState }>;

export type PresetTier = keyof typeof PRESET_TIERS;

export interface PricingBreakdown {
  currency: string;
  shootingDays: number;
  shootingCost: number;
  editingCost: number;
  posterCost: number;
  totalCost: number;
  shootingPrice: number;
  editingPrice: number;
  posterPrice: number;
  grandTotal: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Hesaplama motoru: maliyetleri kalem kalem çıkarır, kâr marjını uygular.
 */
export function calculatePricing(
  state: CalculatorState,
  profitMargin: number = PRICING_CONFIG.profitMargin
): PricingBreakdown {
  const cfg = PRICING_CONFIG;

  const shootingDays = state.videoCount / cfg.shooting.videosPerDay;
  const shootingCost = shootingDays * cfg.shooting.dailyCost[state.shootingTier];
  const editingCost = state.videoCount * cfg.editing[state.editingTier];
  const posterCost = state.posterCount * cfg.posters[state.posterTier];

  const shootingPrice = Math.round(shootingCost * profitMargin);
  const editingPrice = Math.round(editingCost * profitMargin);
  const posterPrice = Math.round(posterCost * profitMargin);

  return {
    currency: cfg.currency,
    shootingDays: round2(shootingDays),
    shootingCost: round2(shootingCost),
    editingCost,
    posterCost,
    totalCost: round2(shootingCost + editingCost + posterCost),
    shootingPrice,
    editingPrice,
    posterPrice,
    grandTotal: shootingPrice + editingPrice + posterPrice,
  };
}

/**
 * WhatsApp Teklif Metni Oluşturucu
 */
export function generateWhatsAppMessage(state: CalculatorState, breakdown: PricingBreakdown): string {
  const c = breakdown.currency;
  const lines: string[] = [`*Chizzgy Fiyat Teklifi Talebi*`, `----------------------------------------`];

  if (state.videoCount > 0) {
    lines.push(
      `• ${state.videoCount} video`,
      `• Çekim: ${SHOOTING_LABELS[state.shootingTier]} (${breakdown.shootingDays} gün) — ${breakdown.shootingPrice} ${c}`,
      `• Kurgu: ${EDITING_LABELS[state.editingTier]} — ${breakdown.editingPrice} ${c}`
    );
  }
  if (state.posterCount > 0) {
    lines.push(`• ${state.posterCount} ${POSTER_LABELS[state.posterTier]} poster — ${breakdown.posterPrice} ${c}`);
  }

  lines.push(
    `----------------------------------------`,
    `*TOPLAM BÜTÇE:* *${breakdown.grandTotal} ${c}*`,
    ``,
    `Detayları görüşmek ve prodüksiyona başlamak için bu teklif üzerinden devam etmek istiyorum.`
  );

  return lines.join("\n");
}
