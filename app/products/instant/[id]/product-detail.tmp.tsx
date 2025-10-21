"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { getPdfManuals } from "../../../actions/pdf-actions"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"

type InstantProduct = {
  id: string
  model_name?: string
  name: string
  description?: string
  image_url?: string
  price?: number
  features?: string[] | string
  ports?: string[]
  user_manual?: string
  [key: string]: any
}

export default function ProductDetail({ product }: { product: InstantProduct }) {
  const [manuals, setManuals] = useState<any[] | null>(null)

  useEffect(() => {
    let mounted = true
    getPdfManuals()
      .then((m) => { if (mounted) setManuals(m) })
      .catch(() => { if (mounted) setManuals([]) })
    return () => { mounted = false }
  }, [])

  const manual = manuals?.find((m: any) => (m.fileName || '').toLowerCase().includes((product.model_name || product.name || '').toLowerCase()))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Ürün Bulunamadı</h2>
          <p>Aradığınız ürün mevcut değil veya bir hata oluştu.</p>
          <Link href="/products/instant">
            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Tüm Instant ürünlerine Geri Dön</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto px-4 py-16 pt-24">
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
          <div className="relative h-80 md:h-[450px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            {product.image_url ? (
              <Image src={product.image_url || "/placeholder.svg"} alt={product.name} fill className="object-contain" priority />
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center text-gray-500">
                <p>Görsel mevcut değil</p>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-xl text-gray-600 mb-4">Model: {product.model_name}</p>
              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

              {product.price && <div className="text-4xl font-bold text-red-600 mb-6">₺{product.price.toLocaleString("tr-TR")}</div>}

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Ana Özellikler</h3>
                <ul className="list-disc pl-4 text-gray-700 text-sm mb-6">
                  {Array.isArray(product.features) && product.features.length > 0 ? (
                    product.features.map((feature, idx) => <li key={idx}>{feature}</li>)
                  ) : typeof product.features === "string" && product.features.trim() !== "" ? (
                    product.features.split(",").map((feature, idx) => <li key={idx}>{feature.trim()}</li>)
                  ) : (
                    <li className="text-gray-400">Özellik bilgisi bulunamadı.</li>
                  )}
                </ul>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex gap-4 mt-6"></div>

            <Link href="/products/instant" className="mt-8 block text-center text-red-700 hover:underline">
              <ArrowLeft className="inline-block mr-2 h-4 w-4" /> Tüm Instant ürünlerine Geri Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
