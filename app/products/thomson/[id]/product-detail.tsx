"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle, HardDrive, Speaker, Tv, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getPdfManuals } from "../../../actions/pdf-actions"

interface ThomsonProduct {
  id: string
  model_name: string
  name: string
  description: string
  tv_type: string
  resolution: string
  image_url?: string
  price?: number
  screen_size?: string
  smart_features?: string[]
  ports?: string[]
  audio_output_watts?: number
  created_at?: string
  updated_at?: string
}

interface ProductDetailProps {
  product: ThomsonProduct
}

const thomsonModels = [
  {
    id: "32FA2S13",
    model_name: "32FA2S13",
    name: '32" FHD Android Smart Led TV',
    description:
      "32 inç ekran boyutuna sahip, Full HD çözünürlüklü Android Smart Led TV. Android işletim sistemi ile Netflix, YouTube gibi popüler uygulamalara erişim sağlayın. Dahili uydu alıcısı ve geniş bağlantı seçenekleriyle evinizin eğlence merkezi olacak.",
    tv_type: "Android Smart Led TV",
    resolution: "Full HD (1920 x 1080)",
    image_url: "/path/to/image.jpg",
    price: 1500,
    screen_size: "32 inç (81 cm)",
    smart_features: [
      "Google Play Store ile binlerce uygulama ve oyuna erişim",
      "Chromecast built-in ile telefonunuzdan TV'ye içerik aktarma",
      "Google Assistant ile sesli komut desteği",
    ],
    ports: ["2 x HDMI", "2 x USB bağlantı noktaları", "Wi-Fi ve Bluetooth bağlantısı"],
    audio_output_watts: 16,
  },
  {
    id: "32HA2S13W-HD",
    model_name: "32HA2S13W-HD",
    name: '32" HD Android Smart Led TV Beyaz',
    description:
      "32 inç ekran boyutuna sahip, şık beyaz renkli Android Smart Led TV. Modern beyaz tasarımı ile evinizin dekorasyonuna uyum sağlayan bu model, Android işletim sistemi ile Netflix, YouTube gibi popüler uygulamalara kolay erişim imkanı sunar. Beyaz rengi sayesinde evinize ferah bir görünüm katar.",
    tv_type: "Android Smart Led TV",
    resolution: "HD (1366 x 768)",
    image_url: "/path/to/image.jpg",
    price: 1200,
    screen_size: "32 inç (81 cm)",
    smart_features: [
      "Google Play Store ile binlerce uygulama ve oyuna erişim",
      "Chromecast built-in ile telefonunuzdan TV'ye içerik aktarma",
      "Google Assistant ile sesli komut desteği",
    ],
    ports: ["2 x HDMI", "1 x USB bağlantı noktaları", "Wi-Fi ve Bluetooth bağlantısı"],
    audio_output_watts: 16,
  },
  // Other models can be added here
]

export default function ProductDetail({ product }: ProductDetailProps) {
  const [scrolled, setScrolled] = useState(false)
  const [manuals, setManuals] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    async function fetchManuals() {
      try {
        setLoading(true)
        const fetchedManuals = await getPdfManuals()
        setManuals(fetchedManuals)
      } catch (error) {
        console.error("Error fetching manuals:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchManuals()
  }, [])

  const getManualForProduct = () => {
    if (!manuals || manuals.length === 0) return null

    return manuals.find(
      (manual) =>
        manual.fileName.toLowerCase().includes(product.tv_type.toLowerCase()) &&
        manual.category === "Kullanım Kılavuzu",
    )
  }

  const getSafetyManual = () => {
    if (!manuals || manuals.length === 0) return null

    return manuals.find(
      (manual) =>
        (manual.fileName.toLowerCase().includes("safety") || manual.fileName.toLowerCase().includes("guvenlik")) &&
        manual.category === "Güvenlik Kılavuzu",
    )
  }

  const userManual = getManualForProduct()
  const safetyManual = getSafetyManual()

  const handleDownload = (manual: any, type: string) => {
    try {
      setDownloading(type)

      window.open(manual.downloadUrl, "_blank")

      setTimeout(() => {
        setDownloading(null)
      }, 1500)
    } catch (error) {
      console.error("Error downloading manual:", error)
      alert("İndirme sırasında bir hata oluştu. Lütfen tekrar deneyin.")
      setDownloading(null)
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Ürün Bulunamadı</h2>
          <p>Aradığınız ürün mevcut değil veya bir hata oluştu.</p>
          <Link href="/products/thomson">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tüm Thomson Ürünlerine Geri Dön
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto px-4 py-16 pt-24">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">
            Ana Sayfa
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">
            Ürünler
          </Link>
          <span>/</span>
          <Link href="/products/thomson" className="hover:text-primary">
            Thomson TV
          </Link>
          <span>/</span>
          <span className="text-primary font-medium">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 rounded-xl shadow-lg">
          {/* Product Image */}
          <div className="relative h-80 md:h-[450px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            {product.image_url ? (
              <Image
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center text-gray-500">
                <Tv className="h-24 w-24 mb-4" />
                <p>Görsel mevcut değil</p>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-xl text-gray-600 mb-4">Model: {product.model_name}</p>
              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div className="flex items-center">
                  <Tv className="h-5 w-5 text-primary mr-2" />
                  <span>Çözünürlük: {product.resolution}</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-primary mr-2" />
                  <span>TV Tipi: {product.tv_type}</span>
                </div>
                {product.screen_size && (
                  <div className="flex items-center">
                    <HardDrive className="h-5 w-5 text-primary mr-2" />
                    <span>Ekran Boyutu: {product.screen_size}</span>
                  </div>
                )}
                {product.audio_output_watts && (
                  <div className="flex items-center">
                    <Speaker className="h-5 w-5 text-primary mr-2" />
                    <span>Ses Çıkışı: {product.audio_output_watts}W</span>
                  </div>
                )}
              </div>

              {product.price && (
                <div className="text-4xl font-bold text-green-600 mb-6">₺{product.price.toLocaleString("tr-TR")}</div>
              )}
            </div>

            <Separator className="my-6" />

            {/* Features and Ports */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {product.smart_features && product.smart_features.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Akıllı Özellikler</h3>
                  <ul className="space-y-2 text-gray-700">
                    {product.smart_features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {product.ports && product.ports.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Bağlantı Noktaları</h3>
                  <ul className="space-y-2 text-gray-700">
                    {product.ports.map((port, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {port}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

              <div className="flex gap-4 mt-6">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded transition flex-1 text-lg"
                  onClick={() =>
                    userManual ? handleDownload(userManual, "user") : window.open("/manuals", "_blank")
                  }
                >
                  Kılavuzu Görüntüle
                </button>
              </div>

            <Link href="/products/thomson" className="mt-8 block text-center text-primary hover:underline">
              <ArrowLeft className="inline-block mr-2 h-4 w-4" />
              Tüm Thomson TV Modellerine Geri Dön
            </Link>
          </div>
        </div>

        {/* Documents Section */}
        <div className="container mx-auto px-4 py-8 mt-12">
          <Card className="bg-white rounded-lg shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle>Dokümanlar</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Tv className="h-8 w-8 text-primary animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div
                    className={`flex items-center justify-between p-4 border ${
                      product.id === "32FA2S13"
                        ? "border-primary/20 bg-primary/5"
                        : product.id === "32HA2S13W-HD"
                          ? "border-gray-200 bg-gray-50"
                          : "border-gray-200"
                    } rounded-lg`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`${
                          product.id === "32FA2S13"
                            ? "bg-primary/10"
                            : product.id === "32HA2S13W-HD"
                              ? "bg-white border border-gray-200"
                              : "bg-gray-100"
                        } p-3 rounded-lg mr-4`}
                      >
                        <Tv
                          className={`h-6 w-6 ${
                            product.id === "32FA2S13"
                              ? "text-primary"
                              : product.id === "32HA2S13W-HD"
                                ? "text-primary"
                                : "text-gray-500"
                          }`}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {product.id === "32FA2S13"
                            ? "Android TV Kullanım Kılavuzu"
                            : product.id === "32HA2S13W-HD"
                              ? "Beyaz Android TV Kullanım Kılavuzu"
                              : "Kullanım Kılavuzu"}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {userManual ? `PDF, ${userManual.fileSize}` : "PDF, 3-5 MB"}
                        </p>
                        {product.id === "32FA2S13" && (
                          <p className="text-xs text-primary mt-1">32FA2S13 modeli için özel kullanım kılavuzu</p>
                        )}
                        {product.id === "32HA2S13W-HD" && (
                          <p className="text-xs text-primary mt-1">
                            Beyaz 32HA2S13W-HD modeli için özel kullanım kılavuzu
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant={product.id === "32FA2S13" || product.id === "32HA2S13W-HD" ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        userManual ? handleDownload(userManual, "user") : window.open("/manuals", "_blank")
                      }
                      disabled={downloading === "user"}
                      className={
                        product.id === "32FA2S13" || product.id === "32HA2S13W-HD"
                          ? "bg-primary hover:bg-primary/90"
                          : ""
                      }
                    >
                      {downloading === "user" ? (
                        <>
                          <Tv className="h-4 w-4 mr-2 animate-spin" />
                          İndiriliyor...
                        </>
                      ) : (
                        <>
                          <Tv className="h-4 w-4 mr-2" />
                          İndir
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-3 rounded-lg mr-4">
                        <Tv className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Teknik Şartname</h4>
                        <p className="text-sm text-gray-500">PDF, 2.1 MB</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Tv className="h-4 w-4 mr-2" />
                      İndir
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-yellow-100 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                        <Tv className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Güvenlik Kılavuzu</h4>
                        <p className="text-sm text-gray-500">
                          {safetyManual ? `PDF, ${safetyManual.fileSize}` : "PDF, 1-2 MB"}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-yellow-200 text-yellow-700 hover:bg-yellow-100 bg-transparent"
                      onClick={() =>
                        safetyManual ? handleDownload(safetyManual, "safety") : window.open("/manuals", "_blank")
                      }
                      disabled={downloading === "safety"}
                    >
                      {downloading === "safety" ? (
                        <>
                          <Tv className="h-4 w-4 mr-2 animate-spin" />
                          İndiriliyor...
                        </>
                      ) : (
                        <>
                          <Tv className="h-4 w-4 mr-2" />
                          İndir
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
