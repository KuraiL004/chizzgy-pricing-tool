# Chizzgy Price Calculator & Proposal Engine — PRD (Ürün Gereksinim Dokümanı)

Bu doküman, **Chizzgy** kreatif ve prodüksiyon ajansı için geliştirilecek interaktif fiyat hesaplama, portfolyo sunum ve otomatik teklif oluşturma aracının mimari, fonksiyonel ve görsel tasarım standartlarını belirler.

---

## 1. Proje Özeti & Temel Vizyon

* **Amaç:** Müşterilerin paket pazarlıklarını dijitalleştirmek; video, kurgu, poster, hareketli grafik (motion design) ve kurumsal kimlik (brandbook) ihtiyaçlarını dinamik parametrelerle seçip anında şeffaf fiyat görmelerini sağlamak.
* **Ana Hissiyat / Tasarım Kimliği:** Minimalist, teknolojik, karanlık mod (Dark Theme: `#09090b` / `#0f172a`), Linear/Vercel estetiğinde mikro etkileşimler, keskin tipografi ve pürüzsüz geçiş animasyonları.
* **Hedef Kitle:** Chizzgy'den içerik prodüksiyonu ve marka geliştirme teklifi bekleyen KOBİ'ler, kurumsal markalar, influencer'lar ve girişimler.
* **Para Birimi:** AZN (Manat).

---

## 2. Sayfa Hiyerarşisi ve Bölümler

### 2.1. Hero Bölümü
* **Başlık & Slogan:** Şık bir başlık (örn: *"Chizzgy ile Projenizi Ölçekleyin. Şeffaf Bütçe, Kesin Çıktı."*).
* **Hızlı Aksiyon:** 3'lü hazır pakete veya doğrudan hesaplayıcıya yönlendiren yumuşak scroll butonları.

### 2.2. Sabit 3'lü Fiyatlandırma Kartları (Fixed Tiers)
Kullanıcıya hazır, kanıtlanmış paketler sunar. Her kartın altında **"Bu Paketi Özelleştir"** butonu bulunur; tıklandığında aşağıdaki hesaplayıcıyı ilgili değerlerle anında doldurur.

1. **Starter (Temel Sosyal Medya):**
   * 8 Video (Standart Çekim, Hızlı Temel Kesim & Altyazı)
   * 4 Sosyal Medya Posteri (2D Tipografik)
   * Standart Teslimat
2. **Growth (Popüler / Varsayılan Paket):**
   * 15 Video (Pro 4K Çekim, Dinamik Kurgu & Ses Dizaynı)
   * 10 Poster (Manipülasyon & Özel Tipografi)
   * 1 Motion Graphic (Logo Animasyonu / İntro)
3. **Elite / Brand Transformation (Full Prodüksiyon):**
   * 20+ Video (Sinematik Çekim, İleri VFX & Motion)
   * 15 Poster (3D Destekli)
   * Kapsamlı Brand Identity / Brandbook Paketi
   * Öncelikli (Express) Teslimat

---

## 3. İnteraktif Fiyat Hesaplayıcı (The Customizer Engine)

Hesaplayıcı sol tarafta parametreler, sağ tarafta ise sürekli takip eden (sticky) canlı özet kartı olacak şekilde 2 kolonlu kurgulanır.

### Parametreler & Kontroller

#### A. Video Prodüksiyonu
1. **Video Adedi:** Slider veya Step Counter (0 ile 30 arası ayarlanabilir).
2. **Çekim Kalitesi Seviyeleri (Radio / Toggle):**
   * *Yok (Sadece Kurgu Hizmeti)*: Müşteri ham görüntüleri sağlar.
   * *Standart*: Mobil/Gimbal destekli hızlı dikey çekim.
   * *Pro 4K*: Profesyonel sinema kamerası, aydınlatma seti, ses kayıt ekipmanı.
   * *Cinematic*: Çift kamera, üst segment sinema lensleri, sanatsal ışık tasarımı ve prodüksiyon ekibi.
   * *(Her seviyenin yanında "Örnek İzle" butonu ile referans video modalı).*
3. **Edit / Kurgu Seviyesi (Radio / Toggle):**
   * *Temel (Basic):* Hızlı kesim, tempo montajı, standart dinamik altyazılar.
   * *Dinamik Motion Edit:* B-roll entegrasyonu, sound design, hook animasyonları, renk düzeltme (color grading).
   * *Advanced VFX & 3D:* Ağır kompozisyon, 3D obje yerleşimi, özel efektler ve ritmik ses miksajı.

#### B. Grafik & Poster Tasarımı
1. **Poster Sayısı:** Slider (0 ile 30 arası).
2. **Poster Tasarım Seviyesi:**
   * *2D Minimalist / Tipografik:* Sosyal medya için sade bilgi ve tipografi odaklı şablonlar.
   * *Manipülasyon / Sanatsal:* Dekupe, kompozisyon, profesyonel retouch ve detaylı ışıklandırma.
   * *3D Render Destekli:* Ürünlerin veya objelerin 3D modelleme/render çıktılarıyla zenginleştirilmiş afişler.

#### C. Motion Design (Hareketli Grafikler)
* **Opsiyonlar (Çoklu Seçim / Adet):**
  * *Hareketli Logo / İntro-Outro:* 1-3 sn prestij logo animasyonu.
  * *Sosyal Medya Motion Poster (Animasyonlu Afiş):* 5-10 saniyelik hareketli postlar.
  * *Özel 2D/3D Tanıtım Animasyonu (Explainer):* Saniye/dakika bazlı animasyon üretimi.

#### D. Markalama & Brand Identity (Brandbook)
* **Paket Seçimi (Opsiyonel / Checkbox):**
  * *Hizmet İstemiyorum* (Varsayılan: Kapalı)
  * *Logo & Renk Paleti (Mini Kit):* Temel vektör logo, font ailesi, renk kodları.
  * *Full Brandbook (Kapsamlı Kurumsal Kimlik):* Logo varyasyonları, kullanım rehberi, grid sistemleri, tipografi hiyerarşisi, kurumsal evraklar, ambalaj / giydirme kuralları, sosyal medya kiti.

#### E. Ek Hizmetler (Upsell Checkbox'ları)
* [ ] **Drone Çekimi (FPV / Hava Çekimi)**
* [ ] **Senaryo & İçerik Metin Yazarlığı**
* [ ] **Profesyonel Seslendirme (Voiceover)**
* [ ] **Express Teslimat:** Proje süresini yarıya indirir (+%25 fiyat çarpanı).

---

## 4. Canlı Özet & Satış Kapatma (Sticky Summary Panel)

Sağ panelde (mobilde ekran altında yapışkan bar) kullanıcı seçim yaptıkça anlık güncellenen alan:

* **Maliyet Kalemleri Dökümü:**
  * Video Prodüksiyon (Çekim + Kurgu)
  * Grafik & Poster
  * Motion Design
  * Brand Identity
  * Ek Hizmetler & Teslimat Katsayısı
* **Canlı Toplam:** Animasyonlu rakam geçişi ile `XXXX AZN`.
* **CTA Butonları:**
  1. **"WhatsApp ile Teklif İste" (Birincil Aksiyon):** Seçilen tüm konfigürasyonu okunaklı, maddeli bir WhatsApp mesajına dönüştürür ve ajans yetkilisinin WhatsApp bağlantısına tıklar.
  2. **"Konfigürasyonu Kopyala" (İkincil Aksiyon):** Tek tıkla panoya kopyalar.
  3. **"PDF Olarak Kaydet" (İsteğe bağlı):** Yazdırma/teklif dökümü formatında dışa aktarır.

---

## 5. Örnek Referans Sistemi (Portfolio / Showreel Pop-up)

* Her çekim kalitesi, edit seviyesi ve motion seçeneğinin yanında küçük bir **"Örneği Gör" (Eye/Play ikonu)** yer alır.
* Tıklandığında sayfa yenilenmeden hafif bir `Dialog / Modal` açılır.
* İçerisinde ilgili kalitede çekilmiş 10-15 saniyelik dikey Reel veya hareketli grafik demosu oynatılır. Bu sayede müşteri "Cinematic" ile "Standart" arasındaki farkı gözüyle görür.

---

## 6. Teknik Altyapı ve Konfigürasyon Dosyası Mantığı

Formüllerin ve taban maliyetlerin ajans ortakları tarafından kolayca güncellenebilmesi için kod yapısında tek bir `pricing-config.js` dosyası bulunacaktır:

```javascript
export const PRICING_CONFIG = {
  currency: "AZN",
  videos: {
    baseShootingRate: { none: 0, standard: 45, pro4k: 80, cinematic: 140 }, // video başı çekim
    baseEditingRate: { basic: 30, dynamic: 55, vfx3d: 110 },               // video başı kurgu
  },
  posters: {
    rates: { typographic: 15, manipulation: 30, render3d: 55 }
  },
  motion: {
    logoAnimation: 120,
    motionPoster: 75,
    explainerPer10Sec: 90
  },
  branding: {
    none: 0,
    miniKit: 350,
    fullBrandbook: 950
  },
  addons: {
    drone: 180,
    copywritingPerVideo: 20,
    voiceover: 100,
    expressMultiplier: 1.25 // %25 ek ücret
  }
};
```

---

## 7. Geliştirme Yol Haritası (Roadmap)

1. **Faz 1:** Next.js + Tailwind + Lucide Icons projesinin kurulması ve `pricing-config.js` yapısının tanımlanması.
2. **Faz 2:** 3'lü sabit paket kartları ve interaktif hesaplayıcı bileşenlerinin kodlanması.
3. **Faz 3:** Canlı özet kartı ve dinamik WhatsApp teklif metni oluşturucusunun bağlanması.
4. **Faz 4:** Örnek iş video oynatıcı modalının eklenmesi ve mobil uyumluluk (responsive testleri).
5. **Faz 5:** Vercel üzerine canlı deploy ve test yayını.