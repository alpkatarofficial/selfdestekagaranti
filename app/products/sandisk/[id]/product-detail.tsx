"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle, HardDrive, Speaker, Zap, Database } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export interface SandiskProduct {
  id: string
  model_name: string
  name: string
  description: string
  storage_type?: string
  capacity?: string
  image_url?: string
  price?: number
  features?: string[]
  ports?: string[]
  created_at?: string
  updated_at?: string
}

interface ProductDetailProps {
  product: SandiskProduct
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Ürün Bulunamadı</h2>
          <p>Aradığınız ürün mevcut değil veya bir hata oluştu.</p>
          <Link href="/products/sandisk">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tüm Sandisk Ürünlerine Geri Dön
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
          <Link href="/products/sandisk" className="hover:text-primary">
            Sandisk
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
                <Database className="h-24 w-24 mb-4" />
                <p>Görsel mevcut değil</p>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                {product.storage_type && (
                  <div className="flex items-center">
                    <HardDrive className="h-5 w-5 text-primary mr-2" />
                    <span>Depolama Tipi: {product.storage_type}</span>
                  </div>
                )}
                {product.capacity && (
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-primary mr-2" />
                    <span>Kapasite: {product.capacity}</span>
                  </div>
                )}
              </div>

              {product.price && (
                <div className="text-4xl font-bold text-red-600 mb-6">₺{product.price.toLocaleString("tr-TR")}</div>
              )}
            </div>

            <Separator className="my-6" />

            {/* Features and Ports */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {Array.isArray(product.features) && product.features.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-lg mb-3">Özellikler</h3>
                          <ul className="space-y-2 text-gray-700">
                            {product.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {Array.isArray(product.ports) && product.ports.length > 0 && (
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
            
            </div>

            <Link href="/products/sandisk" className="mt-8 block text-center text-red-700 hover:underline">
              <ArrowLeft className="inline-block mr-2 h-4 w-4" />
              Tüm Sandisk Ürünlerine Geri Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
