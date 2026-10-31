/**
 * Chizzgy — Satış təqdimatı konfiqurasiyası
 * Səhifədəki bütün mətn, qiymət və media buradan idarə olunur.
 *
 * Personallaşdırma: link sonuna ?ad=Şirkət əlavə edin (məs. /?ad=Pasha%20Holding).
 * Ad verilməyəndə səhifə ümumi "Sizin üçün" müraciəti ilə açılır.
 */

export const OFFER = {
  brand: "Chizzgy",
  currency: "₼",
  // Beynəlxalq formatda, "+" və boşluqsuz
  whatsappNumber: "994557795504",
  whatsappDisplay: "+994 55 779 55 04",
  clientParam: "ad",
  discountNote: "3 aylıq ödənişdə 10%, 6 aylıq ödənişdə 15% endirim tətbiq olunur.",
} as const;

// Cloudinary linkinə ölçü/keyfiyyət transformasiyası əlavə edir (yüngül yükləmə üçün)
export function cld(url: string, transform: string, ext?: string) {
  const out = url.replace("/upload/", `/upload/${transform}/`);
  return ext ? out.replace(/\.[a-z0-9]+$/i, `.${ext}`) : out;
}

// ---------------------------------------------------------------------------
// Tərəfdaşlıq — paketlər Chizzgy və Nemət Səfərov əməkdaşlığının nəticəsidir
// ---------------------------------------------------------------------------
export const PARTNERS = [
  { name: "Chizzgy", role: "Dynamic Design Studio", image: "/brands/chizzgy.jpg", isLogo: true },
  { name: "Nemət Səfərov", role: "Reels və Motion Dizayn", image: "/brands/nemat-safarov.jpg", isLogo: false },
] as const;

// Ümumi brend sayı (lentdə yalnız bir hissəsinin loqosu göstərilir)
export const BRAND_COUNT = "35+";

// Rəqəmlər (Nemət Səfərovun profilindəki göstəricilər və brend portfeli əsasında)
export const STATS = [
  { value: "10M+", label: "Montaj etdiyimiz videolarda baxış" },
  { value: BRAND_COUNT, label: "Yerli və beynəlxalq brend" },
  { value: "3", label: "Ölkə: Azərbaycan, Kanada, ABŞ" },
] as const;

// ---------------------------------------------------------------------------
// Bizə etibar edən brendlər — yalnız bizim əməkdaşlıq etdiyimiz şirkətlər
// kind "mark": şəffaf ağ loqo (public/logos), "mono": rəngli loqo ağa çevrilir, "avatar": Instagram profil şəkli
// ---------------------------------------------------------------------------
export type BrandLogo = { name: string; src: string; kind: "mark" | "mono" | "avatar" };

const mark = (file: string, name: string): BrandLogo => ({ name, src: `/logos/${file}.png`, kind: "mark" });
const mono = (path: string, name: string): BrandLogo => ({
  name,
  src: `https://res.cloudinary.com/o7779yth/image/upload/w_240,q_auto,f_auto/${path}`,
  kind: "mono",
});
const avatar = (file: string, name: string): BrandLogo => ({ name, src: `/brands/${file}.jpg`, kind: "avatar" });

export const BRAND_LOGOS: BrandLogo[] = [
  mark("samsung", "Samsung"),
  mono("v1793397312/Pasha_Holding_logo.png", "Pasha Holding"),
  mark("pepsi", "Pepsi"),
  mono("v1793397308/audi-14-logo-black-and-white.png", "Audi"),
  mark("lays", "Lay's"),
  mono("v1793397309/Binance_Logo.png", "Binance"),
  mark("abb", "ABB"),
  avatar("graco", "Graco"),
  avatar("titan", "Titan"),
  avatar("skytemplex", "SkyTemple X"),
  avatar("auropainting", "Auro Painting"),
  avatar("papropainting", "Papro Painting"),
  avatar("vvs-autodetail", "VVS Auto Detail"),
  avatar("john-rothman", "John Rothman"),
  avatar("illustration-ca", "Illustration"),
];

// ---------------------------------------------------------------------------
// Hall of Fame — bizim işlərimiz
// ---------------------------------------------------------------------------
// Böyük ekran filmləri (16:9)
export const FEATURED_FILMS = [
  { title: "Pasha Kapital", src: "https://res.cloudinary.com/dtb73ihs1/video/upload/v1793401716/Pasha_Kapital_23.06.2026_phpe9o.mp4" },
  { title: "Pasha Kapital — VFX", src: "https://res.cloudinary.com/dtb73ihs1/video/upload/v1793401714/Pasha_Capital_Vfx_Master_File_rg0bqf.mp4" },
  { title: "Farid — Michael Jackson", src: "https://res.cloudinary.com/dtb73ihs1/video/upload/v1793401705/Farid_Michael_Jackson_pnywnn.mp4" },
] as const;

// Reels işləri (9:16)
export const REELS = [
  "https://res.cloudinary.com/o7779yth/video/upload/v1793397034/Instagram_12.mp4",
  "https://res.cloudinary.com/o7779yth/video/upload/v1793397025/Instagram_11.mp4",
  "https://res.cloudinary.com/o7779yth/video/upload/v1793396942/L17Marketing_l17.marketing_Instagram_Reels_videosu.mp4",
  "https://res.cloudinary.com/o7779yth/video/upload/v1793396907/Instagram_8.mp4",
  "https://res.cloudinary.com/o7779yth/video/upload/v1793396904/Instagram_4.mp4",
  "https://res.cloudinary.com/o7779yth/video/upload/v1793396895/Instagram_3.mp4",
  "https://res.cloudinary.com/o7779yth/video/upload/v1793396891/Instagram_1.mp4",
  "https://res.cloudinary.com/o7779yth/video/upload/v1793396865/Instagram_5.mp4",
  "https://res.cloudinary.com/o7779yth/video/upload/v1793396847/Instagram_9.mp4",
  "https://res.cloudinary.com/o7779yth/video/upload/v1793396833/Karyl_Allen_Prince_William_Fauquier_County_VA_Realtor_karyl.alle.mp4",
  "https://res.cloudinary.com/o7779yth/video/upload/v1793396818/Instagram_6.mp4",
] as const;

// ---------------------------------------------------------------------------
// Keyfiyyət səviyyələri — referans nümunələr (bizim portfolio deyil, hədəf səviyyə)
// Müştəri nəyə pul verdiyini və fərqi gözü ilə görsün
// ---------------------------------------------------------------------------
export type QualityId = "basic" | "standard" | "premium";

// Hər göstərici 1–5 şkalası ilə; fərqi vizual göstərmək üçün
export const QUALITY_METRICS = ["Çəkiliş", "İşıq və kadr", "Montaj", "Rəng", "Motion və effekt"] as const;

export const QUALITY_LEVELS: readonly {
  id: QualityId;
  name: string;
  tagline: string;
  samples: string[];
  scores: number[]; // QUALITY_METRICS sırası ilə
  includes: string[];
}[] = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Səliqəli, aydın, ardıcıl",
    samples: [
      "https://res.cloudinary.com/dtb73ihs1/video/upload/v1793405887/Düzgün_qamət_və_çiyin_sağlamlığı_üçün_məşq_edirsiniz_amma_nə_qədər_effektiv_olur_%EF%B8%8FƏn_bəyəndiyini_xqwqn1.mp4",
    ],
    scores: [2, 2, 3, 2, 1],
    includes: [
      "Bir məkanda danışan kadr",
      "Peşəkar mikrofon və təbii işıq",
      "Dinamik kəsim və altyazı",
      "Sadə başlıq lövhələri",
    ],
  },
  {
    id: "standard",
    name: "Standart",
    tagline: "Hekayə, məkan, atmosfer",
    samples: [
      "https://res.cloudinary.com/dtb73ihs1/video/upload/v1793405770/Mənzil_seçərkən_eyni_metrajda_olan_planlaşdırmalar_tam_fərqli_imkanlar_verə_bilər.При_выборе_ква_wgb2vv.mp4",
      "https://res.cloudinary.com/dtb73ihs1/video/upload/v1793405865/Portfoliomuzdakı_hər_qüsursuz_kadrın_arxasında_bütöv_bir_komandanın_saatlarla_davam_edən_zəhməti_q0v3vk.mp4",
    ],
    scores: [4, 3, 4, 4, 2],
    includes: [
      "Bir neçə məkan və B-roll kadrlar",
      "Kamera, optika və işıq qurulumu",
      "Ssenari üzrə hekayəli montaj",
      "Rəng korreksiyası və animasiyalı mətn",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Kino dili və motion dizayn",
    samples: [
      "https://res.cloudinary.com/dtb73ihs1/video/upload/v1793405662/High_quality_production_can_amplify_great_content_but_it_can_t_replace_the_skill_of_finding_s_x9iz46.mp4",
      "https://res.cloudinary.com/dtb73ihs1/video/upload/v1793405661/aftereffects_videoediting_motiondesign_jkkfwj.mp4",
    ],
    scores: [5, 5, 5, 5, 5],
    includes: [
      "Kino kamerası və çəkiliş qrupu",
      "İşıq dizaynı və səhnə hazırlığı",
      "Color grading və səs dizaynı",
      "After Effects motion, 3D və VFX",
    ],
  },
];

// Hər videoya hazırlanan cover nümunələri (referans)
export const COVER_SAMPLES = [
  "https://res.cloudinary.com/dtb73ihs1/image/upload/v1793405953/dc954f02c89fb0be84a24a3e84570575_v5a6ci.jpg",
  "https://res.cloudinary.com/dtb73ihs1/image/upload/v1793405954/bab9de6aba4236547e9949f7851d6f55_i98j97.jpg",
  "https://res.cloudinary.com/dtb73ihs1/image/upload/v1793405955/859b35fc60e7a9a13fd8c03553aa3a28_bxxadd.png",
] as const;

// İdeyadan paylaşıma qədər — bütün iş bizdədir
export const PROCESS = [
  { title: "İdeya və ssenari", description: "Brendinizi öyrənir, hər video üçün hook və ssenari yazırıq." },
  { title: "Çəkiliş", description: "Komanda, kamera, işıq və səs — hamısı bizdən." },
  { title: "Montaj", description: "Saxlayan tempdə montaj, rəng, səs və motion." },
  { title: "Cover", description: "Lentdə dayandıran, brendə uyğun cover dizaynı." },
  { title: "Təhvil", description: "Paylaşıma hazır fayllar, razılaşdırılmış qrafiklə." },
] as const;

// ---------------------------------------------------------------------------
// Aylıq paketlər — reels sayına görə 4 paket, video səviyyəsini müştəri seçir.
// Hər reels-ə cover daxildir. Böyük paketdə bir reels-in qiyməti aşağı düşür.
// Qiymətlər vergisizdir (ƏDV ayrıca hesablanır).
// ---------------------------------------------------------------------------
export type PackageId = "start" | "biznes" | "pro" | "lider";

export const PACKAGES: readonly {
  id: PackageId;
  name: string;
  audience: string;
  reels: number;
  posts: number;
  prices: Record<QualityId, number>;
  recommended?: boolean;
  perks: string[];
}[] = [
  {
    id: "start",
    name: "Start",
    audience: "Sosial mediaya yeni başlayanlar üçün",
    reels: 4,
    posts: 2,
    prices: { basic: 699, standard: 1199, premium: 1849 },
    perks: [],
  },
  {
    id: "biznes",
    name: "Biznes",
    audience: "Ardıcıl satış istəyən bizneslər üçün",
    reels: 8,
    posts: 4,
    prices: { basic: 1349, standard: 2299, premium: 3449 },
    recommended: true,
    perks: ["Video ssenariləri"],
  },
  {
    id: "pro",
    name: "Pro",
    audience: "Bazarda seçilmək istəyən brendlər üçün",
    reels: 12,
    posts: 6,
    prices: { basic: 1899, standard: 3199, premium: 4899 },
    perks: ["Video ssenariləri", "Aylıq kontent planı"],
  },
  {
    id: "lider",
    name: "Lider",
    audience: "Sektorunda lider brendlər üçün",
    reels: 16,
    posts: 8,
    prices: { basic: 2499, standard: 4149, premium: 6299 },
    perks: ["Video ssenariləri", "Aylıq kontent planı", "Şəxsi prodüser"],
  },
];

export const PRICING_NOTES = [
  "Qiymətlər vergisiz göstərilib. Rəsmi qaydalara uyğun olaraq ƏDV ayrıca hesablanır.",
  OFFER.discountNote,
] as const;

// Əlavə xidmətlər — istənilən paketə əlavə edilə bilər
export const EXTRAS = [
  { id: "content", title: "Kontent planı və ssenari", description: "Aylıq mövzular, ssenarilər və çəkiliş planı" },
  { id: "story", title: "Story idarəsi", description: "Gündəlik story hazırlanması və paylaşımı" },
  { id: "ads", title: "Meta Ads", description: "Instagram və Facebook reklam kampaniyaları" },
  { id: "design", title: "Əlavə qrafik dizayn", description: "Paketdən əlavə post və banner dizaynı" },
] as const;

export type ExtraId = (typeof EXTRAS)[number]["id"];

// WhatsApp mesajı
export type WhatsAppIntent = { packageId: PackageId; quality: QualityId } | "custom";

export function buildWhatsAppUrl(clientName: string | null, intent?: WhatsAppIntent) {
  const greeting = clientName ? `Salam, mən ${clientName} adından yazıram.` : "Salam.";
  let body = `${OFFER.brand} təqdimatına baxdım, ətraflı danışmaq istərdim.`;
  if (intent === "custom") {
    body = `${OFFER.brand} təqdimatına baxdım, fərdi paket hazırlamaq istərdim.`;
  } else if (intent) {
    const pkg = PACKAGES.find((p) => p.id === intent.packageId)!;
    const level = QUALITY_LEVELS.find((l) => l.id === intent.quality)!;
    body = `${OFFER.brand} təqdimatındakı ${pkg.name} paketi (${pkg.reels} reels, ${level.name} səviyyə, ${pkg.prices[intent.quality]} ${OFFER.currency}/ay) ilə maraqlanıram.`;
  }
  const text = encodeURIComponent(`${greeting} ${body}`);
  return `https://wa.me/${OFFER.whatsappNumber}?text=${text}`;
}
