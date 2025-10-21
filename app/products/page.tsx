"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"

// Ürün kategorileri
const productCategories = [
  {
    id: "thomson-tv",
    title: "Thomson TV",
    description: "Akıllı televizyon modelleri ve teknolojileri",
    image: "/images/tv-models.jpeg",
    href: "/products/thomson",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "dreame",
    title: "Dreame",
    description: "Akıllı temizlik ve kişisel bakım ürünleri",
    image: "/placeholder.svg?height=300&width=400",
    href: "/products/dreame",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "sandisk",
    title: "Sandisk",
    description: "Depolama çözümleri ve hafıza kartları",
    image: "/images/sandisk.jpg",
    href: "/products/sandisk",
    color: "from-red-500 to-red-600",
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  // Sadece Thomson TV kategorisini göster
  const visibleCategories = productCategories.filter(
    (category) => category.id === "thomson-tv" || category.id === "dreame",
  )

  // Filtreleme fonksiyonu
  const filteredCategories = visibleCategories.filter((category) => {
    const searchFilter = searchQuery
      ? category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    const categoryFilter = selectedCategory && selectedCategory !== "all" ? category.id === selectedCategory : true

    return searchFilter && categoryFilter
  })

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Ürün Kategorileri</h1>

        {/* AGaranti Değer Önerisi */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">AGaranti Farkı</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Güvenilir Kalite</h3>
                <p className="text-gray-600 text-sm">Tüm ürünlerimiz kalite standartlarına uygun olarak seçilmiştir</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Uzman Servis</h3>
                <p className="text-gray-600 text-sm">Deneyimli teknik ekibimizle 7/24 destek sağlıyoruz</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Uzun Ömürlü</h3>
                <p className="text-gray-600 text-sm">Dayanıklı ve uzun ömürlü ürünlerle yatırımınızı koruyun</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Hızlı Teslimat</h3>
                <p className="text-gray-600 text-sm">Siparişlerinizi en kısa sürede kapınıza teslim ediyoruz</p>
              </div>
            </div>
          </div>
        </div>

        {/* Thomson TV Vitrini */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden mb-12 shadow-2xl min-h-[18rem] md:min-h-[24rem] flex items-stretch">
          <div className="absolute inset-0 z-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SmartTV_Banner_1920x800px_V3.png-7UhbUj1aFhiv6Po0ZLdK1CAJoF1VSb.jpeg"
              alt="Smart TV Özellikleri - 144Hz Yenileme Hızı, Çerçevesiz Tasarım"
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.7)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-1 items-center justify-center md:justify-start p-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center bg-primary text-white px-4 py-1 rounded-full text-sm mb-4">
                Premium Kalite
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Thomson TV</h2>
              <p className="text-white/90 mb-6 max-w-md">
                Farklı yenileme hızları, farklı çözünürlükler ve akıllı TV özellikleriyle üstün görüntü deneyimi yaşayın.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  144Hz Yenileme Hızı - Akıcı görüntü
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  4K Ultra HD Çözünürlük - Kristal netlik
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Akıllı TV Özellikleri - Sınırsız içerik
                </div>
              </div>
              <Link href="/products/thomson">
                <Button className="bg-white hover:bg-white/90 text-slate-900 font-semibold px-8 py-3">
                  Ürünleri İncele
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Sandisk Vitrini */}
        <div className="relative bg-gradient-to-br from-red-900 via-red-800 to-red-900 rounded-2xl overflow-hidden mb-12 shadow-2xl min-h-[18rem] md:min-h-[24rem] flex items-stretch">
          <div className="absolute inset-0 z-0">
            <video
              src="https://do5myoqjz9grji02.public.blob.vercel-storage.com/blade-sn670-background.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.7)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-1 items-center justify-center md:justify-start p-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center bg-red-600 text-white px-4 py-1 rounded-full text-sm mb-4">
                Yüksek Performans
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sandisk</h2>
              <p className="text-white/90 mb-6 max-w-md">
                Güvenilir depolama çözümleri, hafıza kartları ve USB belleklerle verilerinizi koruyun ve kolayca taşıyın.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Yüksek hızlı veri aktarımı
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Geniş ürün yelpazesi
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Dayanıklı ve güvenilir tasarım
                </div>
              </div>
              <Link href="/products/sandisk">
                <Button className="bg-white hover:bg-white/90 text-red-900 font-semibold px-8 py-3">
                  Ürünleri İncele
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Dreame Vitrini */}
        <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 rounded-2xl overflow-hidden mb-12 shadow-2xl min-h-[18rem] md:min-h-[24rem] flex items-stretch">
          <div className="absolute inset-0 z-0">
            <img
              src="https://global.dreametech.com/cdn/shop/files/PM20-KV-pc_3500x.png?v=1750734470"
              alt="Dreame Akıllı Temizlik Ürünleri"
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.7)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-1 items-center justify-center md:justify-start p-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center bg-purple-600 text-white px-4 py-1 rounded-full text-sm mb-4">
                Akıllı Temizlik
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Dreame</h2>
              <p className="text-white/90 mb-6 max-w-md">
                Robot süpürgeler, ıslak ve kuru süpürgeler, dikey süpürgeler ve kişisel bakım ürünleriyle akıllı yaşam deneyimi.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Robot Süpürgeler - Otomatik temizlik
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Dikey Süpürgeler - Güçlü performans
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Kişisel Bakım - Saç bakım ürünleri
                </div>
              </div>
              <Link href="/products/dreame">
                <Button className="bg-white hover:bg-white/90 text-purple-900 font-semibold px-8 py-3">
                  Ürünleri İncele
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Optoma Vitrini */}
        <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 rounded-2xl overflow-hidden mb-12 shadow-2xl min-h-[18rem] md:min-h-[24rem] flex items-stretch">
          <div className="absolute inset-0 z-0">
            <img
              src="https://region-resource.optoma.com/layouts/articles/cCU7R0gk6S6DnaS5Av9G8Da8HMiGHE9J5sriL2tB.jpg"
              alt="Optoma Projektör ve Görüntü Teknolojileri"
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.7)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-1 items-center justify-center md:justify-start p-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center bg-amber-600 text-white px-4 py-1 rounded-full text-sm mb-4">
                Yüksek Görüntü Kalitesi
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Optoma</h2>
              <p className="text-white/90 mb-6 max-w-md">
                Optoma projektörler ve görüntü çözümleri ile sinema kalitesinde deneyimler yaşayın; taşınabilir, ev sinema ve profesyonel seriler.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Taşınabilir Projektörler - Kompakt ve güçlü
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ev Sinema - Gerçek sinema deneyimi evinize gelsin
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Profesyonel Seri - Yüksek parlaklık ve renk doğruluğu
                </div>
              </div>
              <Link href="/products/optoma">
                <Button className="bg-white hover:bg-white/90 text-amber-900 font-semibold px-8 py-3">
                  Ürünleri İncele
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Philips Vitrini */}
        <div className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 rounded-2xl overflow-hidden mb-12 shadow-2xl min-h-[18rem] md:min-h-[24rem] flex items-stretch">
          <div className="absolute inset-0 z-0">
            <img
              src="https://www.philips.com.tr/c-dam/b2c/category-pages/sound-and-vision/monitors/redesign/tco/dual-monitor-setup-l-m.jpg"
              alt="Philips Sağlık ve Kişisel Bakım Ürünleri"
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.7)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-1 items-center justify-center md:justify-start p-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center bg-teal-600 text-white px-4 py-1 rounded-full text-sm mb-4">
                Sağlık & Bakım
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Philips</h2>
              <p className="text-white/90 mb-6 max-w-md">
                Philips ile kişisel bakım, sağlık ve ev elektroniklerinde yenilikçi çözümler. Kaliteli ürünlerle konfor ve performansı bir arada sunuyoruz.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Kişisel Bakım - Güçlü ve nazik performans
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Sağlık Teknolojileri - Hassas ve güvenilir
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Ev Elektroniği - Güvenilir günlük kullanım
                </div>
              </div>
              <Link href="/products/philips">
                <Button className="bg-white hover:bg-white/90 text-teal-900 font-semibold px-8 py-3">
                  Ürünleri İncele
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Rapoo Vitrini */}
        <div className="relative bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900 rounded-2xl overflow-hidden mb-12 shadow-2xl min-h-[18rem] md:min-h-[24rem] flex items-stretch">
          <div className="absolute inset-0 z-0">
            <img
              src="https://www.rapoo-tr.com/wp-content/uploads/2025/07/V-wireless-modifed.webp"
              alt="Rapoo Bilgisayar ve Aksesuar Ürünleri"
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.7)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-1 items-center justify-center md:justify-start p-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center bg-sky-600 text-white px-4 py-1 rounded-full text-sm mb-4">
                Bilgisayar & Aksesuar
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Rapoo</h2>
              <p className="text-white/90 mb-6 max-w-md">
                Rapoo kablosuz fare, klavye ve aksesuar çözümleri ile ofiste ve evde konforlu kullanım sunar. Şık tasarım ve dayanıklı performans.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Kablosuz Çözümler - Kesintisiz bağlantı
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Ergonomik Tasarım - Uzun süreli kullanım
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Dayanıklı Aksesuarlar - Uzun ömür
                </div>
              </div>
              <Link href="/products/rapoo">
                <Button className="bg-white hover:bg-white/90 text-sky-900 font-semibold px-8 py-3">
                  Ürünleri İncele
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Instant Vitrini */}
        <div className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 rounded-2xl overflow-hidden mb-12 shadow-2xl min-h-[18rem] md:min-h-[24rem] flex items-stretch">
          <div className="absolute inset-0 z-0">
            <img
              src="https://www.seriouseats.com/thmb/lkulsyN6KaFNRVvFK8pfoZA4cuU=/fit-in/1500x3335/filters:no_upscale():max_bytes(150000):strip_icc()/sea-instant-pots-test-duo-plus-8qt-multi-use-pressure-cooker-v4-rkilgore-7-54-e7331741804249b89efc9749ca660180.jpg"
              alt="Instant Ürünleri - Hızlı ve Pratik Çözümler"
              className="w-full h-full object-cover object-center"
              style={{ filter: "brightness(0.7)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-1 items-center justify-center md:justify-start p-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center bg-indigo-600 text-white px-4 py-1 rounded-full text-sm mb-4">
                Hızlı & Pratik
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Instant</h2>
              <p className="text-white/90 mb-6 max-w-md">
                Günlük kullanım için tasarlanmış, kompakt ve pratik Instant ürünleri ile hayatınızı kolaylaştırın.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Hızlı Kurulum - Anında kullanıma hazır
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Kompakt Tasarım - Taşınabilir ve şık
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Günlük Kullanım - Güvenilir performans
                </div>
              </div>
              <Link href="/products/instant">
                <Button className="bg-white hover:bg-white/90 text-indigo-900 font-semibold px-8 py-3">
                  Ürünleri İncele
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
