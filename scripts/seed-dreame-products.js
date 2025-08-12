import { createClient } from "@supabase/supabase-js"

// Supabase kimlik bilgilerinizi ortam değişkenlerinden alın
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Hata: SUPABASE_URL ve SUPABASE_SERVICE_KEY ortam değişkenleri ayarlanmamış.")
  console.error("Lütfen bunları Vercel proje ayarlarınızda ayarlayın.")
  process.exit(1)
}

// Supabase istemcisini başlatın (Service Role Key ile sunucu tarafı erişimi)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// Mevcut Dreame ürün verileri
const dreameProductsData = [
  // Robot Süpürge
  {
    id: "dreame-bot-l20-ultra",
    name: "Dreame Bot L20 Ultra",
    model_name: "L20 Ultra",
    category: "robot-supurge",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+L20+Ultra",
    description: "Otomatik su doldurma, boşaltma ve paspas temizleme özelliklerine sahip akıllı robot süpürge.",
    features: [
      "DuoScrub™ Paspas Sistemi",
      "MopExtend™ köşe temizlik teknolojisi",
      "Otomatik toz boşaltma",
      "AI akıllı navigasyon",
      "5300 Pa emiş gücü",
    ],
    specs: {
      "Emiş Gücü": "5300 Pa",
      "Pil Ömrü": "260 dakikaya kadar",
      "Toz Haznesi": "300 ml",
      "Su Tankı": "80 ml",
      Navigasyon: "LDS + AI",
    },
  },
  {
    id: "dreame-bot-x20-pro",
    name: "Dreame Bot X20 Pro",
    model_name: "X20 Pro",
    category: "robot-supurge",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+X20+Pro",
    description: "Gelişmiş yapay zeka ve otomatik temizleme istasyonu ile üstün temizlik deneyimi.",
    features: [
      "Otomatik paspas yıkama & kurutma",
      "Otomatik su doldurma",
      "Otomatik toz boşaltma",
      "AI engel tanıma",
      "6000 Pa emiş gücü",
    ],
    specs: {
      "Emiş Gücü": "6000 Pa",
      "Pil Ömrü": "220 dakikaya kadar",
      "Toz Haznesi": "400 ml",
      "Su Tankı": "100 ml",
      Navigasyon: "AI Action",
    },
  },
  // Dikey Süpürge
  {
    id: "dreame-r10-pro",
    name: "Dreame R10 Pro",
    model_name: "R10 Pro",
    category: "dikey-supurge",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+R10+Pro",
    description: "Güçlü emiş performansı ve uzun pil ömrü ile etkili temizlik sağlayan kablosuz dikey süpürge.",
    features: ["22000Pa Güçlü Emiş", "65 Dakika Pil Ömrü", "LED Ekran", "Çok Aşamalı Filtreleme", "Hafif Tasarım"],
    specs: {
      "Emiş Gücü": "22000 Pa",
      "Pil Ömrü": "65 dakikaya kadar",
      "Toz Haznesi": "600 ml",
      Ağırlık: "1.5 kg",
    },
  },
  {
    id: "dreame-h12-pro",
    name: "Dreame H12 Pro",
    model_name: "H12 Pro",
    category: "dikey-supurge",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+H12+Pro",
    description: "Hem süpürme hem de paspaslama yapabilen, kendi kendini temizleyen akıllı dikey süpürge.",
    features: [
      "Islak ve Kuru Temizlik",
      "Kendi Kendini Temizleyen Fırça",
      "Sesli Asistan",
      "LED Ekran",
      "Uzun Pil Ömrü",
    ],
    specs: {
      "Pil Ömrü": "35 dakikaya kadar",
      "Temiz Su Tankı": "900 ml",
      "Kirli Su Tankı": "500 ml",
      Ağırlık: "4.9 kg",
    },
  },
  {
    id: "dreame-k10-pro",
    name: "Dreame K10 Pro",
    model_name: "K10 Pro",
    category: "dikey-supurge",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+K10+Pro",
    description: "Kompakt tasarım ve güçlü performans bir arada sunan pratik dikey süpürge.",
    features: ["20000Pa Emiş Gücü", "40 Dakika Çalışma Süresi", "Kompakt Tasarım", "Çoklu Aksesuar", "Kolay Boşaltma"],
    specs: {
      "Emiş Gücü": "20000 Pa",
      "Pil Ömrü": "40 dakikaya kadar",
      "Toz Haznesi": "500 ml",
      Ağırlık: "1.3 kg",
    },
  },
  {
    id: "dreame-r20",
    name: "Dreame R20",
    model_name: "R20",
    category: "dikey-supurge",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+R20",
    description: "Yüksek performanslı motor ve akıllı sensörlerle donatılmış gelişmiş dikey süpürge.",
    features: [
      "25000Pa Maksimum Emiş",
      "90 Dakika Pil Ömrü",
      "Akıllı Toz Algılama",
      "Anti-Dolaşma Teknolojisi",
      "Hızlı Şarj",
    ],
    specs: {
      "Emiş Gücü": "25000 Pa",
      "Pil Ömrü": "90 dakikaya kadar",
      "Toz Haznesi": "650 ml",
      Ağırlık: "1.6 kg",
    },
  },
  {
    id: "dreame-z30",
    name: "Dreame Z30",
    model_name: "Z30",
    category: "dikey-supurge",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+Z30",
    description: "Premium özellikler ve üstün temizlik performansı sunan en gelişmiş dikey süpürge modeli.",
    features: [
      "27000Pa Ultra Güçlü Emiş",
      "100 Dakika Uzun Pil Ömrü",
      "Akıllı APP Kontrolü",
      "Otomatik Güç Ayarı",
      "Premium Aksesuarlar",
    ],
    specs: {
      "Emiş Gücü": "27000 Pa",
      "Pil Ömrü": "100 dakikaya kadar",
      "Toz Haznesi": "700 ml",
      Ağırlık: "1.7 kg",
    },
  },
  {
    id: "dreame-u20",
    name: "Dreame U20",
    model_name: "U20",
    category: "dikey-supurge",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+U20",
    description: "Günlük kullanım için ideal, ekonomik ve etkili temizlik çözümü sunan dikey süpürge.",
    features: ["18000Pa Emiş Gücü", "50 Dakika Pil Ömrü", "Basit Kullanım", "Hafif Gövde", "Ekonomik Fiyat"],
    specs: {
      "Emiş Gücü": "18000 Pa",
      "Pil Ömrü": "50 dakikaya kadar",
      "Toz Haznesi": "400 ml",
      Ağırlık: "1.2 kg",
    },
  },
  // Saç Bakım Ürünleri
  {
    id: "dreame-airstyle-pro",
    name: "Dreame AirStyle Pro",
    model_name: "AirStyle Pro",
    category: "sac-bakim",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+AirStyle+Pro",
    description: "Profesyonel saç şekillendirme için çok fonksiyonlu saç kurutma ve şekillendirme cihazı.",
    features: [
      "5-in-1 Çok Fonksiyonlu",
      "İyonik Teknoloji",
      "Akıllı Sıcaklık Kontrolü",
      "Çoklu Başlık",
      "Hızlı Kurutma",
    ],
    specs: {
      "Motor Gücü": "1400W",
      "Sıcaklık Ayarları": "3",
      "Hız Ayarları": "2",
      "Başlık Sayısı": "5",
    },
  },
  {
    id: "dreame-gleam",
    name: "Dreame Gleam",
    model_name: "Gleam",
    category: "sac-bakim",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+Gleam",
    description: "Kompakt tasarım ve güçlü performansla günlük saç bakımı için ideal saç kurutma makinesi.",
    features: ["Kompakt Tasarım", "Hızlı Kurutma", "İyonik Bakım", "Sessiz Çalışma", "Taşınabilir"],
    specs: {
      "Motor Gücü": "1200W",
      "Sıcaklık Ayarları": "2",
      "Hız Ayarları": "2",
      Ağırlık: "400g",
    },
  },
  {
    id: "dreame-straightener",
    name: "Dreame Straightener",
    model_name: "Straightener",
    category: "sac-bakim",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+Straightener",
    description: "Profesyonel saç düzleştirme için seramik kaplama ve akıllı sıcaklık kontrolü.",
    features: ["Seramik Kaplama", "Hızlı Isınma", "Akıllı Sıcaklık", "Otomatik Kapanma", "Ergonomik Tasarım"],
    specs: {
      "Maksimum Sıcaklık": "230°C",
      "Isınma Süresi": "30 saniye",
      "Plaka Genişliği": "25mm",
      "Kablo Uzunluğu": "2m",
    },
  },
  {
    id: "dreame-glory-mix",
    name: "Dreame Glory Mix",
    model_name: "Glory Mix",
    category: "sac-bakim",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+Glory+Mix",
    description: "Çok amaçlı saç şekillendirme seti ile her türlü saç stilini kolayca oluşturun.",
    features: [
      "3-in-1 Set",
      "Değiştirilebilir Başlıklar",
      "Hızlı Şekillendirme",
      "Profesyonel Sonuç",
      "Kolay Kullanım",
    ],
    specs: {
      "Motor Gücü": "1000W",
      "Başlık Sayısı": "3",
      "Sıcaklık Ayarları": "2",
      "Kablo Uzunluğu": "1.8m",
    },
  },
  {
    id: "dreame-hair-pocket",
    name: "Dreame Hair Pocket",
    model_name: "Hair Pocket",
    category: "sac-bakim",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+Hair+Pocket",
    description: "Seyahat için ideal, kompakt ve güçlü mini saç kurutma makinesi.",
    features: ["Ultra Kompakt", "Katlanabilir Tasarım", "Çift Voltaj", "Hızlı Kurutma", "Seyahat Çantası"],
    specs: {
      "Motor Gücü": "800W",
      Voltaj: "110-240V",
      Ağırlık: "300g",
      Boyut: "15x8x5 cm",
    },
  },
  {
    id: "dreame-miracle",
    name: "Dreame Miracle",
    model_name: "Miracle",
    category: "sac-bakim",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+Miracle",
    description: "Gelişmiş teknoloji ile saç sağlığını koruyarak mükemmel şekillendirme sağlar.",
    features: ["Saç Koruma Teknolojisi", "Negatif İyon", "Akıllı Sensör", "Çoklu Mod", "Premium Kalite"],
    specs: {
      "Motor Hızı": "110000 RPM",
      "İyon Yoğunluğu": "200 milyon/cm³",
      "Sıcaklık Ayarları": "4",
      Ağırlık: "350g",
    },
  },
  // Temizlik Ürünleri
  {
    id: "dreame-n10",
    name: "Dreame N10",
    model_name: "N10",
    category: "temizlik-urunleri",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+N10",
    description: "Evinizdeki havayı temizleyen ve alerjenleri azaltan akıllı hava temizleyici.",
    features: [
      "HEPA H13 Filtre",
      "Aktif Karbon Filtre",
      "Akıllı Sensörler",
      "Mobil Uygulama Kontrolü",
      "Sessiz Çalışma",
    ],
    specs: {
      CADR: "400 m³/h",
      "Kapsama Alanı": "48 m²'ye kadar",
      "Gürültü Seviyesi": "20-63 dB(A)",
      "Filtre Ömrü": "12 ay",
    },
  },
  {
    id: "dreame-pm20",
    name: "Dreame PM20",
    model_name: "PM20",
    category: "temizlik-urunleri",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+PM20",
    description: "Portatif ve güçlü temizlik için tasarlanmış çok amaçlı temizlik cihazı.",
    features: ["Portatif Tasarım", "Çoklu Başlık", "Güçlü Emiş", "Şarjlı Çalışma", "Kolay Temizlik"],
    specs: {
      "Emiş Gücü": "8000 Pa",
      "Pil Ömrü": "25 dakika",
      "Şarj Süresi": "3 saat",
      Ağırlık: "800g",
    },
  },
  {
    id: "dreame-ipl-d1186",
    name: "Dreame IPL D-1186",
    model_name: "IPL D-1186",
    category: "temizlik-urunleri",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+IPL+D-1186",
    description: "Evde profesyonel IPL epilasyon deneyimi için gelişmiş ışık teknolojisi.",
    features: [
      "IPL Teknolojisi",
      "5 Yoğunluk Seviyesi",
      "Otomatik Cilt Tonu Algılama",
      "Geniş Uygulama Alanı",
      "Güvenli Kullanım",
    ],
    specs: {
      "Işık Darbeleri": "600,000",
      "Yoğunluk Seviyeleri": "5",
      "Uygulama Alanı": "4 cm²",
      "Güvenlik Sertifikası": "FDA Onaylı",
    },
  },
  {
    id: "dreame-a1",
    name: "Dreame A1",
    model_name: "A1",
    category: "temizlik-urunleri",
    image_url: "/placeholder.svg?height=400&width=400&text=Dreame+A1",
    description: "Küçük alanlar için ideal, kompakt ve etkili temizlik çözümü.",
    features: ["Kompakt Boyut", "Güçlü Performans", "Kolay Kullanım", "Çok Amaçlı", "Ekonomik"],
    specs: {
      "Emiş Gücü": "10000 Pa",
      "Pil Ömrü": "30 dakika",
      "Toz Haznesi Kapasitesi": "200 ml",
      Ağırlık: "600g",
    },
  },
  // Aksesuarlar
  {
    id: "l10-prime-aksesuar-kiti",
    name: "L10 Prime Aksesuar Kiti",
    model_name: "L10 Prime Kit",
    category: "aksesuarlar",
    image_url: "/placeholder.svg?height=400&width=400&text=L10+Prime+Kit",
    description: "Dreame L10 Prime robot süpürge için kapsamlı yedek parça ve aksesuar kiti.",
    features: ["Kapsamlı Kit", "Orijinal Parçalar", "Kolay Değişim", "Uzun Ömürlü", "Uygun Fiyat"],
    specs: {
      "Kit İçeriği": "Fırça, Filtre, Paspas",
      Uyumluluk: "L10 Prime",
      "Parça Sayısı": "12",
      Garanti: "6 ay",
    },
  },
  {
    id: "ana-firca-kaucuk",
    name: "Ana Fırça (Kauçuk)",
    model_name: "Ana Fırça",
    category: "aksesuarlar",
    image_url: "/placeholder.svg?height=400&width=400&text=Ana+Fırça",
    description: "Robot süpürgeler için yüksek kaliteli kauçuk ana fırça.",
    features: ["Kauçuk Malzeme", "Anti-Dolaşma", "Uzun Ömürlü", "Kolay Temizlik", "Sessiz Çalışma"],
    specs: {
      Malzeme: "TPU Kauçuk",
      Uyumluluk: "Çoklu Model",
      Ömür: "6-12 ay",
      Boyut: "165mm",
    },
  },
  {
    id: "hepa-filtre",
    name: "HEPA Filtre",
    model_name: "HEPA Filtre",
    category: "aksesuarlar",
    image_url: "/placeholder.svg?height=400&width=400&text=HEPA+Filtre",
    description: "Yüksek verimli HEPA filtre ile üstün hava filtreleme performansı.",
    features: ["HEPA H13 Standart", "99.97% Filtreleme", "Allerjen Kontrolü", "Yıkanabilir", "Uzun Ömürlü"],
    specs: {
      "Filtreleme Oranı": "99.97%",
      "Parçacık Boyutu": "0.3 mikron",
      Ömür: "6-12 ay",
      Uyumluluk: "Çoklu Model",
    },
  },
  {
    id: "mop-pad-seti",
    name: "Mop Pad Seti",
    model_name: "Mop Pad Seti",
    category: "aksesuarlar",
    image_url: "/placeholder.svg?height=400&width=400&text=Mop+Pad+Seti",
    description: "Robot süpürgeler için orijinal yedek paspas pedleri seti.",
    features: [
      "Yüksek Kaliteli Mikrofiber",
      "Kolay Değişim",
      "Yıkanabilir ve Yeniden Kullanılabilir",
      "Güçlü Temizlik",
      "Çoklu Paket",
    ],
    specs: {
      Malzeme: "Mikrofiber",
      "Paket İçeriği": "6 adet",
      Uyumluluk: "L20 Ultra, X20 Pro",
      Yıkama: "300+ kez",
    },
  },
  {
    id: "yan-firca-seti",
    name: "Yan Fırça Seti",
    model_name: "Yan Fırça Seti",
    category: "aksesuarlar",
    image_url: "/placeholder.svg?height=400&width=400&text=Yan+Fırça+Seti",
    description: "Robot süpürge yan fırçaları için yedek parça seti.",
    features: ["Esnek Kıllar", "Köşe Temizliği", "Kolay Montaj", "Dayanıklı Malzeme", "Çift Paket"],
    specs: {
      "Paket İçeriği": "4 adet",
      Malzeme: "PP + Naylon",
      Uyumluluk: "Çoklu Model",
      Ömür: "3-6 ay",
    },
  },
  {
    id: "toz-toplama-torbasi",
    name: "Toz Toplama Torbası",
    model_name: "Toz Torbası",
    category: "aksesuarlar",
    image_url: "/placeholder.svg?height=400&width=400&text=Toz+Torbası",
    description: "Otomatik toz boşaltma istasyonu için yedek toz toplama torbaları.",
    features: ["Yüksek Kapasite", "Sızdırmaz Tasarım", "Kolay Değişim", "Hijyenik", "Çoklu Paket"],
    specs: {
      Kapasite: "3L",
      "Paket İçeriği": "3 adet",
      Malzeme: "Kağıt + Plastik",
      Uyumluluk: "Auto-Empty Station",
    },
  },
  {
    id: "yumusak-rulo-firca",
    name: "Yumuşak Rulo Fırça",
    model_name: "Yumuşak Rulo Fırça",
    category: "aksesuarlar",
    image_url: "/placeholder.svg?height=400&width=400&text=Yumuşak+Rulo+Fırça",
    description: "Hassas yüzeyler için özel olarak tasarlanmış yumuşak rulo fırça.",
    features: ["Yumuşak Malzeme", "Çizik Yapmaz", "Hassas Yüzeyler İçin", "Kolay Temizlik", "Uzun Ömürlü"],
    specs: {
      Malzeme: "Yumuşak Naylon",
      Uyumluluk: "V Serisi",
      Boyut: "250mm",
      Ömür: "6-12 ay",
    },
  },
  {
    id: "yedek-batarya",
    name: "Yedek Batarya",
    model_name: "Yedek Batarya",
    category: "aksesuarlar",
    image_url: "/placeholder.svg?height=400&width=400&text=Yedek+Batarya",
    description: "Dikey süpürgeler için yüksek kapasiteli yedek lityum batarya.",
    features: ["Yüksek Kapasite", "Uzun Ömür", "Hızlı Şarj", "Güvenli Kullanım", "Orijinal Kalite"],
    specs: {
      Kapasite: "2500mAh",
      Voltaj: "25.2V",
      "Şarj Süresi": "4 saat",
      Uyumluluk: "V Serisi",
    },
  },
]

async function seedProducts() {
  console.log("Veritabanına Dreame ürünleri ekleme işlemi başlatılıyor...")
  for (const product of dreameProductsData) {
    console.log(`Ürün '${product.name}' (${product.id}) ekleniyor/güncelleniyor...`)
    try {
      // Upsert (ekle veya güncelle) işlemi
      const { data, error } = await supabase.from("dreames").upsert(product, { onConflict: "id" })
      if (error) {
        console.error(`Hata: Ürün '${product.name}' eklenirken/güncellenirken hata oluştu:`, error.message)
        // Supabase'den gelen tam hata nesnesini de yazdırın
        console.error("Supabase hata detayları:", error)
      } else {
        console.log(`Başarılı: Ürün '${product.name}' başarıyla eklendi/güncellendi.`)
      }
    } catch (e) {
      console.error(`Beklenmeyen hata: Ürün '${product.name}' işlenirken bir hata oluştu:`, e)
    }
  }
  console.log("Dreame ürün ekleme işlemi tamamlandı.")
}

// Betiği çalıştır
seedProducts()
