import { Suspense } from "react"
import ProductDetail from "./product-detail"
import { supabase } from "@/lib/supabase"

// Define the ThomsonProduct interface to match your Supabase table schema
interface ThomsonProduct {
  id: string
  model_name: string
  name: string
  description: string
  tv_type: string
  resolution: string
  image_url?: string
  price?: number
  screen_size?: string
  smart_features?: string[]
  ports?: string[]
  audio_output_watts?: number
  created_at?: string
  updated_at?: string
}

// This is a Server Component that fetches data for a specific product
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = params?.id

  if (!productId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Ürün ID'si bulunamadı.</p>
      </div>
    )
  }

  let product: ThomsonProduct | null = null
  let error: string | null = null

  try {
    // 1) try by `id`
    let { data, error: fetchError } = await supabase.from("thomson").select("*").eq("id", productId).limit(1)

    if (fetchError) throw fetchError

    // 2) if nothing found → try by model_name
    if (!data || data.length === 0) {
      const alt = await supabase.from("thomson").select("*").eq("model_name", productId).limit(1)
      if (alt.error) throw alt.error
      data = alt.data
    }

    if (data && data.length > 0) {
      product = data[0] as ThomsonProduct
      console.log(`Thomson product resolved: ${product.name} (${product.id})`)
    } else {
      error = `ID'si “${productId}” olan ürün bulunamadı.`
    }
  } catch (e: any) {
    console.error("Supabase fetch error:", e.message)
    error = `Ürün detayları yüklenirken bir hata oluştu: ${e.message}`
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Hata!</h2>
          <p>{error}</p>
          <p className="mt-2">Lütfen daha sonra tekrar deneyin veya yöneticinizle iletişime geçin.</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Ürün bulunamadı.</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Yükleniyor...</div>}>
      <ProductDetail product={product} />
    </Suspense>
  )
}
