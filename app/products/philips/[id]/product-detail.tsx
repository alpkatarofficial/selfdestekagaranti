"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle, HardDrive, Zap, Database, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export interface PhilipsProduct {
  id: string
  name: string
  category?: string
  description?: string
  image_url?: string
  price?: number
  features?: string[] | string
  specs?: string
  content?: string
  ingredients?: string
  components?: string
  ports?: string[] | string
  user_manual?: string | string[]
  created_at?: string
  updated_at?: string
  [key: string]: any
}

interface ProductDetailProps {
  product: PhilipsProduct
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [scrolled, setScrolled] = useState(false)

  const splitToItems = (val: any): string[] => {
    if (!val) return []
    if (Array.isArray(val)) return val.map((v) => String(v).trim()).filter(Boolean)
    if (typeof val === "string") return val.split(/[;,\n]+/).map((s) => s.trim()).filter(Boolean)
    return []
  }

  // Normalize various fields into a deduplicated main features list
  const mainFeatures = Array.from(
    new Set([
      ...splitToItems(product.features),
      ...splitToItems(product.content),
      ...splitToItems(product.ingredients),
      ...splitToItems(product.components),
    ])
  )

  // Parse specs from text field
  const getSpecs = (): string[] => {
    if (!product.specs) return []
    if (typeof product.specs === 'string') {
      return product.specs.split(/[,;\n]+/).map((s: string) => s.trim()).filter(Boolean)
    }
    return []
  }

  const specs = getSpecs()

  // Normalize ports to support both string (comma-separated) and array formats
  const portsList: string[] = Array.isArray(product.ports)
    ? product.ports.map((p) => String(p).trim()).filter(Boolean)
    : splitToItems(product.ports)

  // Normalize user_manual: support string or array, prefer first valid URL
  let manualUrl: string | null = null
  if (Array.isArray(product.user_manual)) {
    manualUrl = (product.user_manual as any[]).find((u) => typeof u === "string" && u.trim()) || null
  } else if (typeof product.user_manual === "string") {
    manualUrl = product.user_manual.trim() || null
  }

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
          <Link href="/products/philips">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tüm Philips Ürünlerine Geri Dön
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto px-4 py-16 pt-24">
        <Link href={`/products/philips`} className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tüm Philips Ürünleri
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
            {product.price !== undefined && product.price !== null && !Number.isNaN(Number(product.price)) && (
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="text-3xl font-bold text-blue-600">
                  ₺{Number(product.price).toLocaleString("tr-TR")}
                </div>
              </div>
            )}

            {/* Features - Accordion */}
            {mainFeatures.length > 0 && (
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
                      {mainFeatures.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 flex-shrink-0"></span>
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
            {portsList && portsList.length > 0 && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
                    <Info className="w-5 h-5 mr-2 text-blue-500" />
                    Bağlantı Noktaları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    {portsList.map((port: string, index: number) => (
                      <li key={port + index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {port}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* User Manual */}
            {manualUrl && (
              <div>
                <a
                  href={manualUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
