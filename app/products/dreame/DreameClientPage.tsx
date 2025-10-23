"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Product {
  id: string
  name: string
  category: string
  description: string
  features: string[]
  specs: Record<string, string>
  image_url: string
  updated_at: string
}

interface DreameClientPageProps {
  products: Product[]
}

// Category display names mapping
const categoryDisplayNames: Record<string, string> = {
  "robot-supurge": "Robot Süpürge",
  "dikey-supurge": "Dikey Süpürge",
  "sac-bakim": "Saç Bakım",
  "temizlik-urunleri": "Temizlik Ürünleri",
  aksesuarlar: "Aksesuarlar",
}

export default function DreameClientPage({ products }: DreameClientPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Get unique categories from products
  const availableCategories = useMemo(() => {
    const categories = Array.from(new Set(products.map((product) => product.category)))
    return categories.sort()
  }, [products])

  // Filter products based on search term and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  const clearSearch = () => setSearchTerm("")
  const clearCategory = () => setSelectedCategory("all")
  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
  }

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== "all"

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/dreame/${product.category}/${product.id}`} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative aspect-square bg-gray-100 p-4">
                  <Image
                    src={
                      product.image_url && product.image_url.startsWith("http")
                        ? product.image_url
                        : "/placeholder.svg?height=300&width=300&text=Görsel+Yok"
                    }
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700">
                      {categoryDisplayNames[product.category] || product.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{product.description}</p>
                  {product.features && product.features.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {product.features.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.features.length - 2} daha
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ürün bulunamadı</h3>
            <p className="text-gray-600 mb-4">
              {hasActiveFilters
                ? "Arama kriterlerinize uygun ürün bulunamadı. Filtreleri değiştirmeyi deneyin."
                : "Henüz ürün bulunmuyor."}
            </p>
            {hasActiveFilters && (
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                {searchTerm && (
                  <Button variant="outline" onClick={clearSearch}>
                    Aramayı Temizle
                  </Button>
                )}
                {selectedCategory !== "all" && (
                  <Button variant="outline" onClick={clearCategory}>
                    Kategori Filtresini Temizle
                  </Button>
                )}
                <Button onClick={clearAllFilters}>Tüm Filtreleri Temizle</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
