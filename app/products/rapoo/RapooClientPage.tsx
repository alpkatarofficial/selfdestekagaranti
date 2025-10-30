"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  model_name?: string
  category?: string
  description?: string
  image_url?: string
  price?: number
  features?: string[] | string
  specs?: string | string[]
}

export default function RapooClientPage({ products }: { products: Product[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Helper to split features/specs from string/array/JSON
  const splitToItems = (val: any): string[] => {
    if (!val) return []
    if (Array.isArray(val)) return val.map((v) => String(v).trim()).filter(Boolean)
    if (typeof val === "string") return val.split(/[;,\n]+/).map((s) => s.trim()).filter(Boolean)
    return []
  }

  // Get unique categories from products
  const availableCategories = useMemo(() => {
    const categories = Array.from(new Set(products.map((product) => product.category).filter(Boolean)))
    return categories.sort()
  }, [products])

  // Filter products based on search term and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchTerm === "" ||
        (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
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

  if (!products || products.length === 0) {
    return <div className="text-gray-500 text-center">Henüz ürün bulunmuyor.</div>
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Ürünleri Filtrele</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Arama</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="ürün ara..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Tümü</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        {hasActiveFilters && (
          <div className="mt-4 flex gap-2">
            {searchTerm && (
              <Button variant="outline" onClick={clearSearch} size="sm">Aramayı Temizle</Button>
            )}
            {selectedCategory !== "all" && (
              <Button variant="outline" onClick={clearCategory} size="sm">Kategori Filtresini Temizle</Button>
            )}
            <Button onClick={clearAllFilters} size="sm">Tüm Filtreleri Temizle</Button>
          </div>
        )}
        <div className="mt-4 text-sm text-gray-600">
          {filteredProducts.length} ürün gösteriliyor (toplam {products.length} ürün)
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const features = splitToItems(product.features)
            return (
              <Link key={product.id} href={`/products/rapoo/${product.id}`} className="group">
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
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{product.description}</p>
                    {features && features.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {features.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{features.length - 2} daha
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
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
