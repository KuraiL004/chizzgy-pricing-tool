# Chizzgy Tasarım Sistemi ve Tema Yapılandırması (theme-config.ts)

Bu doküman, Chizzgy fiyat hesaplama uygulamasının tek kaynak tasarım sistemidir. Tasarım dili: Apple ekosistemine özgü premium sadelik, geniş negatif boşluklar, Off-Black/Off-White kontrastı, Glassmorphism (buzlu cam) paneller ve GSAP destekli pürüzsüz animasyonlar.

## 1. Renk Paleti ve Materyal (Apple Sadelik & Glass)

Koyu gri/siyah arka plan üzerine yarı saydam, bulanıklaştırılmış (frosted glass) kartlar ve yumuşak beyaz metinler kullanılacaktır.

- **Arka Plan (Backgrounds):**
  - `bg-main`: `#161617` (Apple Off-Black - Derin mat antrasit/siyah)
  - `glass-surface`: `rgba(255, 255, 255, 0.03)` (Kartlar ve paneller için yarı saydam beyaz)
  - `glass-blur`: `backdrop-blur-2xl` (Arkası bulanık Apple cam efekti)
- **Metin (Typography Colors):**
  - `text-primary`: `#F5F5F7` (Apple Off-White - Pürüzsüz kırık beyaz)
  - `text-secondary`: `#86868B` (Açıklamalar ve pasif metinler için Apple grisi)
- **Aksiyon & Çerçeve (Borders & Accents):**
  - `border-glass`: `rgba(255, 255, 255, 0.08)` (Cam panellerin etrafındaki çok ince, zarif çerçeveler)
  - `accent-primary`: `#F5F5F7` (Birincil buton arka planı - Off-white)
  - `accent-primary-text`: `#161617` (Birincil buton metni - Off-black)
  - `accent-whatsapp`: `#25D366` (WhatsApp butonu için)

## 2. Tipografi ve Yuvarlatma (Border Radius)

Kullanılacak Font: **SF Pro Display** (Mümkünse) veya **Inter**. Font ağırlıkları sadece Regular, Medium ve Semi-bold olacak.

- `radius-card`: `24px` (`rounded-3xl` - Apple tarzı yumuşak köşeler)
- `radius-button`: `9999px` (`rounded-full` - Kapsül şeklinde butonlar)
- `text-h1` (56px / 3.5rem, Medium, Tracking-tight): Minimalist, harf arası sıkışık ana slogan.
- `text-h2` (32px / 2rem, Medium): Bölüm başlıkları.
- `text-body` (17px / 1.06rem, Regular): Genel Apple standart okuma boyutu.

## 3. Mimari Kural

Tüm paneller (hesaplayıcı kutuları, fiyat kartları, sticky özet) düz arka plan rengi yerine **`bg-glass-surface` + `backdrop-blur-2xl` + `border border-glass`** kombinasyonuyla inşa edilecek. İç içe geçen tüm elementlerde gölge (shadow) yerine sadece blur ve ince transparan border kullanılacaktır.
