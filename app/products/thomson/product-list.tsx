"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Tv, Monitor, Smartphone, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ThomsonProduct {
  id: string
  name: string
  model: string
  category: string
  screen_size: string
  resolution: string
  tv_type: string
  features: string[]
  price?: number
  image_url?: string
  description?: string
}

interface ProductListProps {
  products: ThomsonProduct[]
}

export default function ProductList({ products = [] }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedResolution, setSelectedResolution] = useState<string>("all")
  const [selectedTvType, setSelectedTvType] = useState<string>("all")

  // Get unique values for filters
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))].filter(Boolean)
    return cats
  }, [products])

  const resolutions = useMemo(() => {
    const res = [...new Set(products.map((p) => p.resolution))].filter(Boolean)
    return res
  }, [products])

  const tvTypes = useMemo(() => {
    const types = [...new Set(products.map((p) => p.tv_type))].filter(Boolean)
    return types
  }, [products])

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchQuery ||
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesResolution = selectedResolution === "all" || product.resolution === selectedResolution
      const matchesTvType = selectedTvType === "all" || product.tv_type === selectedTvType

      return matchesSearch && matchesCategory && matchesResolution && matchesTvType
    })
  }, [products, searchQuery, selectedCategory, selectedResolution, selectedTvType])

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case "tv":
      case "television":
        return <Tv className="h-4 w-4" />
      case "monitor":
        return <Monitor className="h-4 w-4" />
      case "mobile":
      case "phone":
        return <Smartphone className="h-4 w-4" />
      default:
        return <Tv className="h-4 w-4" />
    }
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📺</div>
        <h3 className="text-xl font-semibold mb-2">Henüz ürün bulunamadı</h3>
        <p className="text-gray-600">Thomson ürünleri yakında eklenecek.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters (no header) */}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Arama kriterlerinize uygun ürün bulunamadı</h3>
          <p className="text-gray-600">Lütfen farklı filtreler kullanarak tekrar deneyin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/thomson/${product.id}`}>
              <Card className="group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={product.image_url || "/placeholder.svg?height=192&width=300&query=Thomson TV"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {getCategoryIcon(product.category)}
                      <span className="ml-1">{product.category}</span>
                    </Badge>
                  </div>
                  {product.screen_size && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="bg-white/90 text-gray-800 border-gray-300">
                        {product.screen_size}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{product.model}</p>

                  <div className="space-y-2 mb-4">
                    {product.resolution && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Çözünürlük:</span>
                        <Badge variant="outline" className="text-xs">
                          {product.resolution}
                        </Badge>
                      </div>
                    )}
                    {product.tv_type && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Tip:</span>
                        <Badge variant="outline" className="text-xs">
                          {product.tv_type}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {product.features && product.features.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                            {feature}
                          </Badge>
                        ))}
                        {product.features.length > 2 && (
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                            +{product.features.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {product.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
