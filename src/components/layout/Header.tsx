import Link from "next/link";
import { PRICING_CONFIG } from "@/config/pricing-config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-glass bg-bg-main/70 backdrop-blur-2xl transition-all">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Apple Logo & Marka */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full border border-border-glass bg-glass-surface backdrop-blur-2xl flex items-center justify-center text-text-primary font-semibold text-body group-hover:border-border-glass-active transition-all">
            C
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-text-primary text-body tracking-tight leading-none">
              Chizzgy
            </span>
            <span className="text-[11px] text-text-secondary tracking-widest uppercase leading-tight mt-0.5">
              Prodüksiyon & Kreatif
            </span>
          </div>
        </Link>

        {/* Menü ve Para Birimi Rozeti */}
        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex items-center gap-6">
            <a
              href="#packages"
              className="text-small text-text-secondary hover:text-text-primary transition-colors"
            >
              Hazır Paketler
            </a>
            <a
              href="#calculator"
              className="text-small text-text-secondary hover:text-text-primary transition-colors"
            >
              Hesaplayıcı
            </a>
          </nav>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-glass bg-glass-surface backdrop-blur-2xl text-small font-mono text-text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-whatsapp" />
            <span>{PRICING_CONFIG.currency} ({PRICING_CONFIG.currencySymbol})</span>
          </div>
        </div>
      </div>
    </header>
  );
}
