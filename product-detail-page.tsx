"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Download, ShoppingCart, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Thomson TV modelleri
const thomsonModels = [
  {
    id: "32FA2S13",
    name: '32" Uydu Alıcılı Android Smart Led TV',
    price: 4999,
    description:
      "32 inç ekran boyutuna sahip, uydu alıcılı Android Smart Led TV. HD çözünürlük ve Android işletim sistemi ile çalışır.",
    features: [
      "32 inç ekran boyutu",
      "HD çözünürlük (1366 x 768)",
      "Android işletim sistemi",
      "Dahili uydu alıcısı",
      "Wi-Fi bağlantısı",
      "2 x HDMI, 1 x USB bağlantı noktaları",
      "16:9 ekran oranı",
      "60Hz yenileme hızı",
    ],
    specifications: {
      "Ekran Boyutu": "32 inç (81 cm)",
      Çözünürlük: "HD (1366 x 768)",
      "İşletim Sistemi": "Android TV",
      Bağlantılar: "2 x HDMI, 1 x USB, Wi-Fi, Bluetooth",
      "Ses Çıkışı": "2 x 8W",
      "Enerji Sınıfı": "A+",
      "Boyutlar (GxYxD)": "731 x 475 x 185 mm",
      Ağırlık: "4.2 kg",
    },
    compatibleParts: ["MAINBOARD-32", "PANEL-32", "TV-ACCESSORIES"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "40FG2S14",
    name: '40" FHD Google TV',
    price: 6499,
    description: "40 inç ekran boyutuna sahip, Google TV işletim sistemli, Full HD çözünürlüklü Smart TV.",
    features: [
      "40 inç ekran boyutu",
      "Full HD çözünürlük (1920 x 1080)",
      "Google TV işletim sistemi",
      "Dahili uydu alıcısı",
      "Wi-Fi ve Bluetooth bağlantısı",
      "3 x HDMI, 2 x USB bağlantı noktaları",
      "16:9 ekran oranı",
      "60Hz yenileme hızı",
      "HDR desteği",
    ],
    specifications: {
      "Ekran Boyutu": "40 inç (102 cm)",
      Çözünürlük: "Full HD (1920 x 1080)",
      "İşletim Sistemi": "Google TV",
      Bağlantılar: "3 x HDMI, 2 x USB, Wi-Fi, Bluetooth",
      "Ses Çıkışı": "2 x 10W",
      "Enerji Sınıfı": "A+",
      "Boyutlar (GxYxD)": "904 x 575 x 210 mm",
      Ağırlık: "6.5 kg",
    },
    compatibleParts: ["MAINBOARD-40", "PANEL-40", "TV-ACCESSORIES"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "55QG6C14",
    name: '55" QLED Plus Google TV',
    price: 12999,
    description:
      "55 inç ekran boyutuna sahip, QLED Plus ekran teknolojisine sahip Google TV. Üstün görüntü kalitesi ve geniş renk gamı sunar.",
    features: [
      "55 inç ekran boyutu",
      "4K UHD çözünürlük (3840 x 2160)",
      "QLED Plus ekran teknolojisi",
      "Google TV işletim sistemi",
      "Dahili uydu alıcısı",
      "Wi-Fi 6 ve Bluetooth 5.0 bağlantısı",
      "4 x HDMI 2.1, 2 x USB bağlantı noktaları",
      "16:9 ekran oranı",
      "120Hz yenileme hızı",
      "HDR10+, Dolby Vision desteği",
      "Dolby Atmos ses teknolojisi",
    ],
    specifications: {
      "Ekran Boyutu": "55 inç (139 cm)",
      Çözünürlük: "4K UHD (3840 x 2160)",
      "Panel Tipi": "QLED Plus",
      "İşletim Sistemi": "Google TV",
      Bağlantılar: "4 x HDMI 2.1, 2 x USB, Wi-Fi 6, Bluetooth 5.0",
      "Ses Çıkışı": "2 x 15W (Dolby Atmos)",
      "Enerji Sınıfı": "A++",
      "Boyutlar (GxYxD)": "1230 x 770 x 230 mm",
      Ağırlık: "15.8 kg",
    },
    compatibleParts: ["MAINBOARD-55-", "PANEL-55-", "TV-ACCESSORIES"],
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // URL'den gelen ID'ye göre ürünü bul
  // Gerçek uygulamada bu veri API'den gelecektir
  const productId = params?.id || "32FA2S13" // Varsayılan olarak ilk ürünü göster
  const product = thomsonModels.find((model) => model.id === productId) || thomsonModels[0]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">
          Ana Sayfa
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/products" className="hover:text-primary">
          Ürünler
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/products/thomson" className="hover:text-primary">
          Thomson TV
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900 font-medium">{product.id}</span>
      </div>

      {/* Ürün Detayı */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Ürün Görseli */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={400}
              className="max-h-[400px] w-auto object-contain"
            />
          </div>

          {/* Ürün Bilgileri */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.id}</h1>
            <h2 className="text-xl text-gray-700 mb-4">{product.name}</h2>

            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-primary">{product.price.toLocaleString("tr-TR")} ₺</span>
              <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Stokta</span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="flex flex-col space-y-4 mb-6">
              <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Sepete Ekle
              </Button>

              <Button variant="outline" className="w-full md:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Ürün Kataloğunu İndir
              </Button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Uyumlu Yedek Parçalar:</h3>
              <div className="flex flex-wrap gap-2">
                {product.compatibleParts.map((part) => (
                  <Link
                    key={part}
                    href={`/products/spare-parts?part=${part}`}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full transition-colors"
                  >
                    {part}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6 border-t border-gray-200">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
            <TabsTrigger value="specifications">Teknik Özellikler</TabsTrigger>
            <TabsTrigger value="documents">Dokümanlar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Ürün Özellikleri</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="specifications" className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Teknik Özellikler</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                        {key}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Dokümanlar</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-3 rounded-lg mr-4">
                    <Download className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Kullanım Kılavuzu</h4>
                    <p className="text-sm text-gray-500">PDF, 5.2 MB</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  İndir
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-3 rounded-lg mr-4">
                    <Download className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Teknik Şartname</h4>
                    <p className="text-sm text-gray-500">PDF, 2.1 MB</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  İndir
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-3 rounded-lg mr-4">
                    <Download className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Garanti Belgesi</h4>
                    <p className="text-sm text-gray-500">PDF, 1.3 MB</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  İndir
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
