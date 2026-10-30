import { PRICING_CONFIG } from "@/config/pricing-config";

export function Footer() {
  return (
    <footer className="w-full border-t border-border-glass bg-bg-main mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-medium text-text-primary text-body">Chizzgy</span>
            <span className="text-text-secondary text-small">•</span>
            <span className="text-small text-text-secondary">Apple Glassmorphism Tasarım Sistemi</span>
          </div>
          <p className="text-small text-text-secondary">
            Tüm birim maliyetler {PRICING_CONFIG.currency} cinsindendir ve şeffaf formüllerle hesaplanır.
          </p>
        </div>

        <div className="flex items-center gap-6 text-small text-text-secondary">
          <span>Off-Black & Off-White</span>
          <span>•</span>
          <span>© 2026 Chizzgy Studio</span>
        </div>
      </div>
    </footer>
  );
}
