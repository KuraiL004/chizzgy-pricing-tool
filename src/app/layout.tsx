import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  // latin-ext: Azərbaycan hərfləri (ə, ş, ğ, ı) üçün
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chizzgy | Fərdi təklif",
  description: "Çəkiliş və montaj üzrə Chizzgy-nin sizin üçün hazırladığı təqdimat və paketlər.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-canvas text-label antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
