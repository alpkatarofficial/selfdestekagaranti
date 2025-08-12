"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Search, Filter, Star, Wrench, Package, Settings, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "../../../../header-component"
import Image from "next/image"
import Link from "next/link"
import { getProducts as fetchAllProducts } from "@/app/actions/product-actions"
import type { Product } from "@/lib/dreame-products"

export default function DikeySupurgePage() {
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<string>("popularity")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      const allProducts = await fetchAllProducts()
      const dikeySupurgeProducts = allProducts.filter((p) => p.category === "dikey-supurge")
      setProducts(dikeySupurgeProducts)
      setIsLoading(false)
    }
    loadProducts()
  }, [])

  // Filtreleme ve sıralama
  const filteredAndSortedProducts = products
    .filter((product) => {
      const searchFilter = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.id.toLowerCase().includes(searchQuery.toLowerCase())
        : true

      return searchFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "id":
          return a.id.localeCompare(b.id)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header scrolled={scrolled} />

      <div className="container mx-auto px-4 py-16 pt-24">
        {/* Hero Section with Banner */}
        <div className="relative mb-16 rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/dreame-cordless-vacuum.webp"
              alt="Dreame Dikey Süpürgeler"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-blue-800/60 to-transparent backdrop-blur-sm"></div>
          </div>
          <div className="relative z-10 text-center py-24 px-8">
            <div className="inline-flex items-center justify-center bg-gray-100/90 text-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Wrench className="w-4 h-4 mr-2" />
              Kablosuz Güç
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">Dreame Dikey Süpürgeler</h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto drop-shadow-md">
              Kablosuz özgürlük ve güçlü emiş gücüyle ev temizliğini yeniden tanımlayın.
            </p>
            <Button className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 text-lg rounded-full shadow-lg">
              Ürünleri Keşfet
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Öne Çıkan Özellikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 mx-auto">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Yüksek Emiş Gücü</h3>
            <p className="text-gray-600 text-sm">Derinlemesine temizlik için güçlü motorlar</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4 mx-auto">
              <Settings className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Uzun Pil Ömrü</h3>
            <p className="text-gray-600 text-sm">Kesintisiz temizlik için uzun süreli kullanım</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4 mx-auto">
              <Package className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Hafif ve Ergonomik</h3>
            <p className="text-gray-600 text-sm">Kolay kullanım ve taşıma</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-4 mx-auto">
              <Star className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Çok Yönlü Kullan��m</h3>
            <p className="text-gray-600 text-sm">Farklı zeminler ve yüzeyler için uygun</p>
          </div>
        </div>

        {/* Filtreler */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Dikey Süpürgeleri Filtrele</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Arama</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Ürün ara..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sırala</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popülerlik (Varsayılan)</SelectItem>
                  <SelectItem value="name">İsim (A-Z)</SelectItem>
                  <SelectItem value="id">Model ID</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Ürün Kartları */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {filteredAndSortedProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 mb-1">{product.id}</p>
                    <p className="text-xs text-gray-600">{product.description.substring(0, 100)}...</p>
                  </div>

                  {/* Özellikler */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {product.features.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{product.features.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Link href={`/products/dreame/${product.category}/${product.id}`}>
                    <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white text-sm">
                      Detayları İncele
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-md">
            <p>Bu kategoride ürün bulunamadı.</p>
          </div>
        )}

        {/* Bakım Rehberi */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-8">Dikey Süpürge Bakım Rehberi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 mx-auto">
                <Settings className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Düzenli Temizlik</h3>
              <p className="text-gray-600">
                Fırçaları ve filtreleri düzenli olarak temizleyerek optimal performans sağlayın.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4 mx-auto">
                <Package className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Doğru Saklama</h3>
              <p className="text-gray-600">Yedek parçaları kuru ve temiz bir yerde saklayarak ömürlerini uzatın.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4 mx-auto">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Zamanında Değişim</h3>
              <p className="text-gray-600">Aşınmış parçaları zamanında değiştirerek cihazınızın sağlığını koruyun.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
