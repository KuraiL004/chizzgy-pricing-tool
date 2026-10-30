"use client";

import { useState } from "react";
import { useCalculator } from "@/context/CalculatorContext";
import {
  generateWhatsAppMessage,
  PRICING_CONFIG,
  SHOOTING_LABELS,
  EDITING_LABELS,
  POSTER_LABELS,
} from "@/config/pricing-config";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Send, Copy, Check, RotateCcw, ChevronUp, X, Printer } from "lucide-react";

export function SummaryPanel() {
  const { state, breakdown, resetDefaults } = useCalculator();
  const [copied, setCopied] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const message = generateWhatsAppMessage(state, breakdown);
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  const isEmpty = breakdown.grandTotal === 0;

  // Yalnızca adedi sıfırdan büyük kalemler
  const lineItems = [
    {
      key: "shooting",
      label: `Çekim · ${SHOOTING_LABELS[state.shootingTier]}`,
      detail: `${state.videoCount} video · ${breakdown.shootingDays.toLocaleString("tr-TR")} gün`,
      count: state.videoCount,
      price: breakdown.shootingPrice,
    },
    {
      key: "editing",
      label: `Kurgu · ${EDITING_LABELS[state.editingTier]}`,
      detail: `${state.videoCount} video`,
      count: state.videoCount,
      price: breakdown.editingPrice,
    },
    {
      key: "posters",
      label: `Poster · ${POSTER_LABELS[state.posterTier]}`,
      detail: `${state.posterCount} adet`,
      count: state.posterCount,
      price: breakdown.posterPrice,
    },
  ].filter((item) => item.count > 0);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Pano erişimi reddedildi
    }
  };

  const items = (
    <div className="space-y-4">
      {lineItems.length === 0 ? (
        <p className="text-small text-text-secondary">Başlamak için bir paket seçin veya slider&apos;ları kaydırın.</p>
      ) : (
        lineItems.map((item) => (
          <div key={item.key} className="flex items-baseline justify-between gap-3 text-body">
            <span>
              <span className="block text-text-primary">{item.label}</span>
              <span className="block text-small text-text-secondary">{item.detail}</span>
            </span>
            <span className="text-text-primary tabular-nums shrink-0">
              <AnimatedNumber value={item.price} /> {breakdown.currency}
            </span>
          </div>
        ))
      )}
    </div>
  );

  return (
    <>
      {/* Masaüstü sticky özet */}
      <aside className="hidden lg:block lg:sticky lg:top-24">
        <div className="rounded-3xl border border-border-glass bg-glass-surface backdrop-blur-2xl p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-h3 font-medium text-text-primary">Özet</h3>
            <button
              type="button"
              onClick={resetDefaults}
              title="Sıfırla"
              aria-label="Seçimleri sıfırla"
              className="p-2 rounded-full text-text-secondary hover:text-text-primary transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {items}

          <div className="pt-8 border-t border-border-glass">
            <span className="block text-small text-text-secondary mb-2">Toplam Tahmini Yatırım</span>
            <div className="flex items-baseline gap-2">
              <span className="text-h1 font-medium text-text-primary tracking-tight leading-none tabular-nums">
                <AnimatedNumber value={breakdown.grandTotal} />
              </span>
              <span className="text-body text-text-secondary">{PRICING_CONFIG.currency}</span>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={isEmpty ? undefined : whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={isEmpty}
              className={`w-full py-3.5 rounded-full bg-accent-primary text-accent-primary-text font-medium text-body flex items-center justify-center gap-2 transition-opacity ${
                isEmpty ? "opacity-40 pointer-events-none" : "hover:opacity-90"
              }`}
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp ile Teklif İste</span>
            </a>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCopy}
                disabled={isEmpty}
                className="flex-1 py-3 rounded-full border border-border-glass text-text-primary text-small font-medium hover:border-border-glass-active transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 text-text-secondary" />}
                <span>{copied ? "Kopyalandı" : "Kopyala"}</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                disabled={isEmpty}
                className="flex-1 py-3 rounded-full border border-border-glass text-text-primary text-small font-medium hover:border-border-glass-active transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
              >
                <Printer className="w-4 h-4 text-text-secondary" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobil alt bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-bg-main/80 backdrop-blur-2xl border-t border-border-glass p-4 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="text-left"
          >
            <span className="flex items-center gap-1 text-[12px] text-text-secondary">
              Döküm <ChevronUp className="w-3.5 h-3.5" />
            </span>
            <span className="text-h3 font-medium text-text-primary tabular-nums">
              <AnimatedNumber value={breakdown.grandTotal} />{" "}
              <span className="text-small text-text-secondary">{PRICING_CONFIG.currency}</span>
            </span>
          </button>
          <a
            href={isEmpty ? undefined : whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={isEmpty}
            className={`py-3 px-5 rounded-full bg-accent-primary text-accent-primary-text font-medium text-small flex items-center gap-2 shrink-0 ${
              isEmpty ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Teklif İste</span>
          </a>
        </div>
      </div>

      {/* Mobil döküm paneli */}
      {mobileDrawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col justify-end"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="bg-bg-main border-t border-border-glass rounded-t-3xl p-6 space-y-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-body font-medium text-text-primary">Özet</h4>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-full text-text-secondary hover:text-text-primary"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {items}
            <div className="pt-4 border-t border-border-glass flex items-baseline justify-between">
              <span className="text-body text-text-secondary">Toplam</span>
              <span className="text-h2 font-medium text-text-primary tabular-nums">
                <AnimatedNumber value={breakdown.grandTotal} />{" "}
                <span className="text-body text-text-secondary">{breakdown.currency}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
