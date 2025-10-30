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
  model_name?: string
  category: string
  description: string
  image_url?: string
  price?: number
  features?: string[] | string
  specs?: Record<string, string> | string
}

interface OptomaClientPageProps {
  products: Product[]
}

// Category display names mapping
const categoryDisplayNames: Record<string, string> = {
  "projeksiyon": "Projeksiyon",
  "aksesuarlar": "Aksesuarlar",
}

export default function OptomaClientPage({ products }: OptomaClientPageProps) {
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
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))

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

  // Normalize features to array
  const getFeatures = (product: Product): string[] => {
    if (!product.features) return []
    if (Array.isArray(product.features)) return product.features
    if (typeof product.features === 'string') {
      return (product.features as string).split(/[;,\n]+/).map((s: string) => s.trim()).filter(Boolean)
    }
    return []
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Aramayı temizle"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-64">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {categoryDisplayNames[category] || category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearAllFilters} className="whitespace-nowrap">
              <X className="h-4 w-4 mr-2" />
              Filtreleri Temizle
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4">
            {searchTerm && (
              <Badge variant="secondary" className="px-3 py-1">
                Arama: "{searchTerm}"
                <button onClick={clearSearch} className="ml-2 hover:text-red-600">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="px-3 py-1">
                Kategori: {categoryDisplayNames[selectedCategory] || selectedCategory}
                <button onClick={clearCategory} className="ml-2 hover:text-red-600">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          {filteredProducts.length} ürün bulundu
          {hasActiveFilters && ` (${products.length} toplam ürün)`}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/optoma/${product.id}`} className="group">
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
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{product.description}</p>
                  )}
                  {getFeatures(product).length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {getFeatures(product).slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {getFeatures(product).length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{getFeatures(product).length - 2} daha
                        </Badge>
                      )}
                    </div>
                  )}
                  {product.price && (
                    <div className="text-red-600 font-bold text-lg mt-2">
                      ₺{product.price.toLocaleString("tr-TR")}
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
