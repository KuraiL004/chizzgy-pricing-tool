"use client";

import { useState } from "react";
import { useCalculator } from "@/context/CalculatorContext";
import { generateWhatsAppMessage, PRICING_CONFIG, PRICING_LABELS } from "@/config/pricing-config";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { 
  Send, 
  Copy, 
  Check, 
  RotateCcw, 
  ShieldCheck, 
  ChevronRight, 
  ChevronUp, 
  X, 
  Printer, 
  FileText 
} from "lucide-react";

export function SummaryPanel() {
  const { state, breakdown, resetDefaults } = useCalculator();
  const [copied, setCopied] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // WhatsApp Teklif Mesajı ve Linki
  const message = generateWhatsAppMessage(state, breakdown);
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  // Panoya Kopyalama Fonksiyonu
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // PDF / Yazdırma Fonksiyonu
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <>
      {/* =========================================================================
          1. MASAÜSTÜ STICKY ÖZET PANELİ (Desktop - lg:block - Apple Glassmorphism)
          ========================================================================= */}
      <aside className="hidden lg:block lg:sticky lg:top-24 space-y-4">
        <div className="rounded-3xl border border-border-glass bg-glass-surface backdrop-blur-2xl p-7 xl:p-8 space-y-7">
          {/* Panel Başlığı ve Sıfırlama */}
          <div className="flex items-center justify-between pb-5 border-b border-border-glass">
            <div>
              <h3 className="text-h3 font-medium text-text-primary">Canlı Özet & Teklif</h3>
              <p className="text-small text-text-secondary mt-0.5">Sol paneldeki seçimlerinize göre anlık güncellenir.</p>
            </div>
            <button
              type="button"
              onClick={resetDefaults}
              title="Seçimleri Varsayılana Sıfırla"
              className="p-2 rounded-full border border-border-glass bg-bg-main/60 text-text-secondary hover:text-text-primary hover:border-border-glass-active transition-colors"
              aria-label="Formu sıfırla"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Kalem Kalem Maliyet Dökümü (Line Items) */}
          <div className="space-y-4 text-body">
            {/* A. Video Prodüksiyon */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-text-primary font-medium block">
                  Video Prodüksiyonu ({state.videoCount} video)
                </span>
                <span className="text-small text-text-secondary block leading-tight mt-0.5">
                  {PRICING_LABELS.shooting[state.shootingQuality]?.title} + {PRICING_LABELS.editing[state.editingQuality]?.title}
                </span>
              </div>
              <span className="font-mono text-text-primary font-medium shrink-0">
                <AnimatedNumber value={breakdown.videos.total} /> {breakdown.currency}
              </span>
            </div>

            {/* B. Grafik & Poster */}
            <div className="flex items-start justify-between gap-3 pt-3 border-t border-border-glass/60">
              <div>
                <span className="text-text-primary font-medium block">
                  Grafik & Poster ({state.posterCount} poster)
                </span>
                <span className="text-small text-text-secondary block leading-tight mt-0.5">
                  {PRICING_LABELS.posters[state.posterQuality]?.title}
                </span>
              </div>
              <span className="font-mono text-text-primary font-medium shrink-0">
                <AnimatedNumber value={breakdown.posters.total} /> {breakdown.currency}
              </span>
            </div>

            {/* C. Motion Design */}
            {breakdown.motion.total > 0 && (
              <div className="flex items-start justify-between gap-3 pt-3 border-t border-border-glass/60">
                <div>
                  <span className="text-text-primary font-medium block">Motion Design</span>
                  <span className="text-small text-text-secondary block leading-tight mt-0.5">
                    {[
                      state.motion.logoAnimation > 0 ? `${state.motion.logoAnimation} logo animasyonu` : null,
                      state.motion.motionPoster > 0 ? `${state.motion.motionPoster} motion afiş` : null,
                      state.motion.explainer10SecUnits > 0 ? `${state.motion.explainer10SecUnits * 10} sn tanıtım` : null,
                    ].filter(Boolean).join(" • ")}
                  </span>
                </div>
                <span className="font-mono text-text-primary font-medium shrink-0">
                  <AnimatedNumber value={breakdown.motion.total} /> {breakdown.currency}
                </span>
              </div>
            )}

            {/* D. Brand Identity */}
            {state.branding !== "none" && (
              <div className="flex items-start justify-between gap-3 pt-3 border-t border-border-glass/60">
                <div>
                  <span className="text-text-primary font-medium block">Markalama & Brandbook</span>
                  <span className="text-small text-text-secondary block leading-tight mt-0.5">
                    {PRICING_LABELS.branding[state.branding]?.title}
                  </span>
                </div>
                <span className="font-mono text-text-primary font-medium shrink-0">
                  <AnimatedNumber value={breakdown.branding.total} /> {breakdown.currency}
                </span>
              </div>
            )}

            {/* E. Ek Hizmetler */}
            {breakdown.addons.subtotal > 0 && (
              <div className="flex items-start justify-between gap-3 pt-3 border-t border-border-glass/60">
                <div>
                  <span className="text-text-primary font-medium block">Ek Hizmetler</span>
                  <span className="text-small text-text-secondary block leading-tight mt-0.5">
                    {[
                      state.addons.drone ? "Drone Çekimi" : null,
                      state.addons.copywriting ? "Metin Yazarlığı" : null,
                      state.addons.voiceover ? "Seslendirme" : null,
                    ].filter(Boolean).join(" • ")}
                  </span>
                </div>
                <span className="font-mono text-text-primary font-medium shrink-0">
                  <AnimatedNumber value={breakdown.addons.subtotal} /> {breakdown.currency}
                </span>
              </div>
            )}

            {/* F. Express Teslimat Ek Ücreti */}
            {state.addons.express && (
              <div className="flex items-start justify-between gap-3 pt-3 border-t border-border-glass/60">
                <div>
                  <span className="text-text-primary font-medium block">Express Teslimat</span>
                  <span className="text-small text-text-secondary block leading-tight mt-0.5">
                    Öncelikli teslimat takvimi (+%25 ek katsayı)
                  </span>
                </div>
                <span className="font-mono text-text-primary font-medium shrink-0">
                  +<AnimatedNumber value={breakdown.expressFee} /> {breakdown.currency}
                </span>
              </div>
            )}
          </div>

          {/* Canlı Animasyonlu Toplam Bütçe Alanı */}
          <div className="pt-6 border-t border-border-glass">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-body text-text-secondary font-medium">Toplam Tahmini Yatırım</span>
              <span className="text-small text-text-secondary font-mono">{PRICING_CONFIG.currency} ({PRICING_CONFIG.currencySymbol})</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-h1 font-medium text-text-primary tracking-tight font-mono leading-none">
                <AnimatedNumber value={breakdown.grandTotal} />
              </span>
              <span className="text-body font-medium text-text-secondary">
                {PRICING_CONFIG.currency}
              </span>
            </div>
            <span className="text-small text-text-secondary block mt-2">
              {state.addons.express ? "Express teslimat katsayısı dahildir." : "Standart teslimat dahildir."}
            </span>
          </div>

          {/* Kapsül CTA Butonları (rounded-full) */}
          <div className="space-y-3 pt-2">
            {/* 1. WhatsApp ile Teklif İste (Birincil Aksiyon - Canlı Yeşil) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-full bg-accent-whatsapp text-black font-semibold text-body hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 fill-black" />
              <span>WhatsApp ile Teklif İste</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            {/* 2. Konfigürasyonu Kopyala */}
            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-3 px-5 rounded-full border border-border-glass bg-glass-surface backdrop-blur-2xl text-text-primary text-body font-medium hover:border-border-glass-active hover:bg-glass-surface-hover transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-text-primary" />
                  <span>Teklif Panoya Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-text-secondary" />
                  <span>Konfigürasyonu Kopyala</span>
                </>
              )}
            </button>

            {/* 3. PDF / Yazdır */}
            <button
              type="button"
              onClick={handlePrint}
              className="w-full py-2.5 px-4 rounded-full text-small text-text-secondary hover:text-text-primary hover:bg-glass-surface transition-all flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-text-secondary" />
              <span>Teklifi Yazdır / PDF Olarak Kaydet</span>
            </button>
          </div>

          {/* Güvence Notu */}
          <div className="pt-4 border-t border-border-glass/60 flex items-center gap-2 text-small text-text-secondary">
            <ShieldCheck className="w-4 h-4 text-text-primary shrink-0" />
            <span>Şeffaf birim maliyetler ve kesin teslimat takvimi garantisi.</span>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          2. MOBİL YAPIŞKAN ALT BAR (Mobile Sticky Bottom Bar - lg:hidden)
          ========================================================================= */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-bg-main/80 backdrop-blur-2xl border-t border-border-glass p-4 z-50 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          {/* Sol Taraf: Tutar & Dökümü Aç/Kapat */}
          <div>
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="flex items-center gap-1 text-[12px] text-text-secondary font-medium hover:text-text-primary"
            >
              <span>Maliyet Dökümü</span>
              <ChevronUp className={`w-3.5 h-3.5 transition-transform ${mobileDrawerOpen ? "rotate-180" : ""}`} />
            </button>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-h3 font-medium text-text-primary font-mono">
                <AnimatedNumber value={breakdown.grandTotal} />
              </span>
              <span className="text-small font-medium text-text-secondary">
                {PRICING_CONFIG.currency}
              </span>
            </div>
          </div>

          {/* Sağ Taraf: WhatsApp Teklif Butonu */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-5 rounded-full bg-accent-whatsapp text-black font-semibold text-small hover:opacity-90 transition-opacity flex items-center gap-2 shrink-0"
          >
            <Send className="w-4 h-4 fill-black" />
            <span>WhatsApp Teklifi</span>
          </a>
        </div>
      </div>

      {/* =========================================================================
          3. MOBİL DÖKÜM AÇILIR PANELİ (Mobile Drawer)
          ========================================================================= */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end">
          <div className="bg-bg-main/90 border-t border-border-glass rounded-t-3xl p-6 sm:p-7 space-y-6 max-h-[85vh] overflow-y-auto">
            {/* Modal Başlığı */}
            <div className="flex items-center justify-between pb-4 border-b border-border-glass">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-text-primary" />
                <h4 className="text-body font-medium text-text-primary">Seçilen Kalemlerin Dökümü</h4>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-full text-text-secondary hover:text-text-primary"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Kalemler */}
            <div className="space-y-3.5 text-body">
              <div className="flex justify-between">
                <div>
                  <span className="text-text-primary font-medium block">Video ({state.videoCount} adet)</span>
                  <span className="text-small text-text-secondary">{PRICING_LABELS.shooting[state.shootingQuality]?.title} • {PRICING_LABELS.editing[state.editingQuality]?.title}</span>
                </div>
                <span className="font-mono text-text-primary font-medium">{breakdown.videos.total} {breakdown.currency}</span>
              </div>

              <div className="flex justify-between pt-2.5 border-t border-border-glass/60">
                <div>
                  <span className="text-text-primary font-medium block">Poster ({state.posterCount} adet)</span>
                  <span className="text-small text-text-secondary">{PRICING_LABELS.posters[state.posterQuality]?.title}</span>
                </div>
                <span className="font-mono text-text-primary font-medium">{breakdown.posters.total} {breakdown.currency}</span>
              </div>

              {breakdown.motion.total > 0 && (
                <div className="flex justify-between pt-2.5 border-t border-border-glass/60">
                  <span className="text-text-primary font-medium">Motion Design</span>
                  <span className="font-mono text-text-primary font-medium">{breakdown.motion.total} {breakdown.currency}</span>
                </div>
              )}

              {state.branding !== "none" && (
                <div className="flex justify-between pt-2.5 border-t border-border-glass/60">
                  <span className="text-text-primary font-medium">Brandbook</span>
                  <span className="font-mono text-text-primary font-medium">{breakdown.branding.total} {breakdown.currency}</span>
                </div>
              )}

              {breakdown.addons.subtotal > 0 && (
                <div className="flex justify-between pt-2.5 border-t border-border-glass/60">
                  <span className="text-text-primary font-medium">Ek Hizmetler</span>
                  <span className="font-mono text-text-primary font-medium">{breakdown.addons.subtotal} {breakdown.currency}</span>
                </div>
              )}

              {state.addons.express && (
                <div className="flex justify-between pt-2.5 border-t border-border-glass/60">
                  <span className="text-text-primary font-medium">Express Teslimat</span>
                  <span className="font-mono text-text-primary font-medium">+{breakdown.expressFee} {breakdown.currency}</span>
                </div>
              )}
            </div>

            {/* Toplam */}
            <div className="pt-4 border-t border-border-glass flex items-baseline justify-between">
              <span className="text-body font-medium text-text-secondary">Toplam Tutar:</span>
              <div className="text-right">
                <span className="text-h2 font-medium text-text-primary font-mono">
                  <AnimatedNumber value={breakdown.grandTotal} />
                </span>
                <span className="text-body font-medium text-text-secondary ml-1">
                  {breakdown.currency}
                </span>
              </div>
            </div>

            {/* Aksiyonlar */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full py-3.5 rounded-full bg-accent-whatsapp text-black font-semibold text-body hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 fill-black" />
                <span>WhatsApp ile Teklif İste</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-3 rounded-full border border-border-glass bg-glass-surface text-text-primary text-body font-medium flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-text-primary" /> : <Copy className="w-4 h-4 text-text-secondary" />}
                <span>{copied ? "Kopyalandı!" : "Konfigürasyonu Kopyala"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
