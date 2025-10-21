"use client"
import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, HardDrive, Zap, ArrowRight, Database } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import type { OptomaProduct } from "./[id]"

export default function OptomaProductList({ products = [] }: { products: OptomaProduct[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStorage, setSelectedStorage] = useState<string>("all")
  const [selectedCapacity, setSelectedCapacity] = useState<string>("all")

  const storageTypes = useMemo(() => {
    return [...new Set(products.map((p) => p.storage_type).filter(Boolean))]
  }, [products])
  const capacities = useMemo(() => {
    return [...new Set(products.map((p) => p.capacity).filter(Boolean))]
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchQuery ||
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStorage = selectedStorage === "all" || product.storage_type === selectedStorage
      const matchesCapacity = selectedCapacity === "all" || product.capacity === selectedCapacity
      return matchesSearch && matchesStorage && matchesCapacity
    })
  }, [products, searchQuery, selectedStorage, selectedCapacity])

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">💾</div>
        <h3 className="text-xl font-semibold mb-2">Henüz ürün bulunamadı</h3>
        <p className="text-gray-600">Optoma ürünleri yakında eklenecek.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Ürünleri Filtrele</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Arama</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="ürün ara..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Depolama Tipi</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedStorage}
              onChange={(e) => setSelectedStorage(e.target.value)}
            >
              <option value="all">Tümü</option>
              {storageTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kapasite</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedCapacity}
              onChange={(e) => setSelectedCapacity(e.target.value)}
            >
              <option value="all">Tümü</option>
              {capacities.map((cap) => (
                <option key={cap} value={cap}>{cap}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          {filteredProducts.length} ürün gösteriliyor (toplam {products.length} ürün)
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Arama kriterlerinize uygun ürün bulunamadı</h3>
          <p className="text-gray-600">Lütfen farklı filtreler kullanarak tekrar deneyin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/optoma/${product.id}`}>
              <Card className="group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={product.image_url || "/placeholder.svg?height=192&width=300&query=Optoma"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      <HardDrive className="h-4 w-4 mr-1" />
                      <span>{product.storage_type || "-"}</span>
                    </Badge>
                  </div>
                  {product.capacity && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className="bg-white/90 text-gray-800 border-gray-300">
                        {product.capacity}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{product.model_name}</p>

                  <div className="space-y-2 mb-4">
                    {product.features && (Array.isArray(product.features) ? product.features : [product.features]).length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {(Array.isArray(product.features) ? product.features : [product.features]).slice(0, 2).map((feature: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-red-100 text-red-700">
                            {feature}
                          </Badge>
                        ))}
                        {(Array.isArray(product.features) ? product.features : [product.features]).length > 2 && (
                          <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                            +{(Array.isArray(product.features) ? product.features : [product.features]).length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  {product.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
                  )}

                  {product.price && (
                    <div className="text-red-600 font-bold text-base mb-2">₺{product.price.toLocaleString("tr-TR")}</div>
                  )}

                  <Button
                    variant="ghost"
                    className="w-full text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-300"
                  >
                    Detayları İncele
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
