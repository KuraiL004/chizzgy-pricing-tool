import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { PricingTiers } from "@/components/pricing/PricingTiers";
import { CalculatorSection } from "@/components/calculator/CalculatorSection";
import { CalculatorProvider } from "@/context/CalculatorContext";

export default function Home() {
  return (
    <CalculatorProvider>
      <div className="min-h-screen flex flex-col bg-main text-primary pb-24 lg:pb-0">
        {/* 1. Header (Üst Navigasyon) */}
        <Header />

        <main className="flex-1">
          {/* 2. Hero Bölümü */}
          <Hero />

          {/* 3. Sabit 3'lü Fiyatlandırma Paketleri (Starter, Growth, Elite) */}
          <PricingTiers />

          {/* 4. Customizer Engine (İnteraktif Fiyat Hesaplayıcı - 2 Kolonlu) */}
          <CalculatorSection />
        </main>

        {/* 5. Footer */}
        <Footer />
      </div>
    </CalculatorProvider>
  );
}
