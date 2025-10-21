
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle, HardDrive, Zap, Database } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export interface InstantProduct {
  id: string
  model_name?: string
  name: string
  description?: string
  storage_type?: string
  capacity?: string
  image_url?: string
  price?: number
  // features can be an array or a comma-separated string in the DB
  features?: string[] | string
  // some products store ingredients or content as comma-separated strings
  content?: string
  ingredients?: string
  components?: string
  ports?: string[]
  user_manual?: string
  created_at?: string
  updated_at?: string
  [key: string]: any
}

interface ProductDetailProps {
  product: InstantProduct
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [scrolled, setScrolled] = useState(false)

  // normalize different DB shapes into a single list of main features
  const splitToItems = (val: any): string[] => {
    if (!val) return []
    if (Array.isArray(val)) return val.map((v) => String(v).trim()).filter(Boolean)
    if (typeof val === "string") return val.split(/[;,\n]+/).map((s) => s.trim()).filter(Boolean)
    return []
  }

  const mainFeatures = Array.from(
    new Set([
      ...splitToItems(product.features),
      ...splitToItems(product.content),
      ...splitToItems(product.ingredients),
      ...splitToItems(product.components),
    ])
  )

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
          <Link href="/products/instant">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tüm Instant Ürünlerine Geri Dön
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
          <Link href="/" className="hover:text-primary">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">Ürünler</Link>
          <span>/</span>
          <Link href="/products/instant" className="hover:text-primary">Instant</Link>
          <span>/</span>
          <span className="text-primary font-medium">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 rounded-xl shadow-lg">
          {/* Product Image */}
          <div className="relative h-80 md:h-[450px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            {product.image_url ? (
              // next/image requires a loader or external config for remote images; project likely configures this already
              <Image src={product.image_url || "/placeholder.svg"} alt={product.name} fill className="object-contain" priority />
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

              {/* Dynamic Specs Section: Show all columns from Supabase */}
              <div className="mb-6">
                {/* Main Features (Ana Özellikler) */}
                <h3 className="font-semibold text-lg mb-3">Ana Özellikler</h3>
                <ul className="list-disc pl-4 text-gray-700 text-sm mb-6">
                  {mainFeatures.length > 0 ? (
                    mainFeatures.map((feature, idx) => <li key={idx}>{feature}</li>)
                  ) : (
                    <li className="text-gray-400">Özellik bilgisi bulunamadı.</li>
                  )}
                </ul>

                {/* Technical Features (Teknik Özellikler) */}
                <h3 className="font-semibold text-lg mb-3">Teknik Özellikler</h3>
                <ul className="list-disc pl-4 text-gray-700 text-sm">
                  {Object.entries(product)
                    .filter(([key, value]) =>
                      value !== undefined &&
                      value !== null &&
                      !["id", "image_url", "created_at", "updated_at", "features", "ports", "name", "description", "category", "user_manual"].includes(key)
                    )
                    .map(([key, value]) => {
                      if (key === "specs" && typeof value === "string") {
                        // Split by comma and show each spec as a separate item
                        return value.split(",").map((spec, idx) => (
                          <li key={"spec-" + idx} className="flex items-center">
                            <span>{spec.trim()}</span>
                          </li>
                        ))
                      }
                      return (
                        <li key={key} className="flex items-center">
                          <span className="font-bold mr-2">{key.replace(/_/g, " ")}: </span>
                          <span>{Array.isArray(value) ? (value as any).join(", ") : value?.toString()}</span>
                        </li>
                      )
                    })}
                  {/* User manual button, if present */}
                  {typeof product.user_manual === "string" && (product.user_manual as string).trim() !== "" && (
                    <li className="flex items-center mt-4">
                      <a href={product.user_manual as string} target="_blank" rel="noopener noreferrer">
                        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition">Kılavuzu Görüntüle</button>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Features and Ports */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

            <div className="flex gap-4 mt-6"></div>

            <Link href="/products/instant" className="mt-8 block text-center text-red-700 hover:underline">
              <ArrowLeft className="inline-block mr-2 h-4 w-4" />
              Tüm Instant Ürünlerine Geri Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

