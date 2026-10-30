import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chizzgy | Fiyat Hesaplayıcı & Teklif Motoru",
  description: "Apple tarzı Off-black & Glassmorphism sadeliğinde şeffaf prodüksiyon ve kreatif bütçelendirme sistemi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-bg-main text-text-primary antialiased selection:bg-border-glass-active selection:text-text-primary">
        {children}
      </body>
    </html>
  );
}
