"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle, HardDrive, Speaker, Zap, Database, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export interface SandiskProduct {
  id: string
  name: string
  category?: string
  description?: string
  features?: string | string[]
  specs?: string
  image_url?: string
  user_manual?: string
  created_at?: string
  updated_at?: string
  [key: string]: any
}

interface ProductDetailProps {
  product: SandiskProduct
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [scrolled, setScrolled] = useState(false)

  // Normalize features to array
  const getFeatures = (): string[] => {
    if (!product.features) return []
    if (Array.isArray(product.features)) return product.features
    if (typeof product.features === 'string') {
      return product.features.split(/[;,\n]+/).map((s: string) => s.trim()).filter(Boolean)
    }
    return []
  }

  // Parse specs from text field
  const getSpecs = (): string[] => {
    if (!product.specs) return []
    if (typeof product.specs === 'string') {
      // Split by comma, semicolon, or newline and return as array of strings
      return product.specs.split(/[,;\n]+/).map((s: string) => s.trim()).filter(Boolean)
    }
    return []
  }

  const features = getFeatures()
  const specs = getSpecs()

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
        <Link href={`/products/sandisk`} className="inline-flex items-center text-red-600 hover:text-red-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tüm Sandisk Ürünleri
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="relative w-full h-[400px] md:h-[550px] rounded-xl overflow-hidden shadow-lg bg-gray-100">
            <Image
              src={
                product.image_url && product.image_url.startsWith("http")
                  ? product.image_url
                  : "/placeholder.svg?height=550&width=550&text=Görsel+Yok"
              }
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
            />
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              {product.description && (
                <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
              )}
            </div>

            {/* Price */}
            {product.price && (
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <div className="text-3xl font-bold text-red-600">
                  ₺{product.price.toLocaleString("tr-TR")}
                </div>
              </div>
            )}

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4">
              {product.storage_type && (
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                  <HardDrive className="h-8 w-8 text-red-500 mr-3" />
                  <div>
                    <div className="text-xs text-gray-500">Depolama Tipi</div>
                    <div className="font-semibold">{product.storage_type}</div>
                  </div>
                </div>
              )}
              {product.capacity && (
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                  <Zap className="h-8 w-8 text-red-500 mr-3" />
                  <div>
                    <div className="text-xs text-gray-500">Kapasite</div>
                    <div className="font-semibold">{product.capacity}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Features - Accordion */}
            {features.length > 0 && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="features" className="border rounded-lg px-4 bg-white shadow-sm">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center text-xl font-semibold text-gray-800">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Öne Çıkan Özellikler
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600 pt-2">
                      {features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-red-500 mr-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* Technical Specs - Accordion */}
            {specs && specs.length > 0 && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="specs" className="border rounded-lg px-4 bg-white shadow-sm">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center text-xl font-semibold text-gray-800">
                      <Info className="w-5 h-5 mr-2 text-blue-500" />
                      Teknik Özellikler
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600 pt-2">
                      {specs.map((spec: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 flex-shrink-0"></span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* Ports */}
            {Array.isArray(product.ports) && product.ports.length > 0 && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
                    <Info className="w-5 h-5 mr-2 text-blue-500" />
                    Bağlantı Noktaları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    {product.ports.map((port: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {port}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* User Manual */}
            {typeof product.user_manual === "string" && product.user_manual.trim() !== "" && (
              <div>
                <a
                  href={product.user_manual}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full"
                >
                  <Button className="w-full max-w-md bg-[#86cbe8] hover:bg-[#5be4cb] text-base py-6">
                    Kullanım Kılavuzunu Görüntüle
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
