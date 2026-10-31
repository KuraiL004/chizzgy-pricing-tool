import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Backdrop } from "@/components/layout/Backdrop";
import { PersonalIntro } from "@/components/offer/PersonalIntro";
import { Portfolio } from "@/components/offer/Portfolio";
import { HallOfFame } from "@/components/offer/HallOfFame";
import { QualityExplainer } from "@/components/offer/QualityExplainer";
import { Covers } from "@/components/offer/Covers";
import { Process } from "@/components/offer/Process";
import { Packages } from "@/components/offer/Packages";
import { Extras } from "@/components/offer/Extras";
import { FinalCta } from "@/components/offer/FinalCta";

// Satış təqdimatı: fərdi giriş → brendlər → işlər → səviyyə fərqi → cover → proses → paketlər → əlavələr → əlaqə
export default function Home() {
  return (
    <div className="relative isolate min-h-screen flex flex-col bg-canvas text-label">
      <Backdrop />
      <Header />
      <main className="relative flex-1">
        <PersonalIntro />
        <Portfolio />
        <HallOfFame />
        <QualityExplainer />
        <Covers />
        <Process />
        <Packages />
        <Extras />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
