"use client"

import React from "react"
import Link from "next/link"

export type InstantProduct = {
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
  if (!product) return <div className="p-8">Ürün bulunamadı</div>

  return (
    <div className="p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      {product.model_name && <p className="text-sm text-gray-600 mb-2">Model: {product.model_name}</p>}
      {product.description && <p className="text-gray-700 mb-4">{product.description}</p>}
      <div className="mt-6">
        <Link href="/products/instant" className="text-red-600">← Tüm Instant ürünlerine Geri Dön</Link>
      </div>
    </div>
  )
}
