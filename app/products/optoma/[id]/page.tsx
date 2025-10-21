import { Suspense } from "react"
import ProductDetail from "./index"
import { supabase } from "@/lib/supabase"

interface OptomaProduct {
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

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = params?.id

  if (!productId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Ürün ID'si bulunamadı.</p>
      </div>
    )
  }

  let product: OptomaProduct | null = null
  let error: string | null = null

  try {
    // Try by `id` first (string)
    let { data, error: fetchError } = await supabase.from("optoma").select("*").eq("id", productId).limit(1)

    if (fetchError) throw fetchError

    // If not found and the id looks numeric (e.g. "001"), try numeric lookup as well
    const isNumeric = /^[0-9]+$/.test(productId)
    if ((!data || data.length === 0) && isNumeric) {
      try {
        const numericId = parseInt(productId, 10)
        const numericRes = await supabase.from("optoma").select("*").eq("id", numericId).limit(1)
        if (numericRes.error) throw numericRes.error
        if (numericRes.data && numericRes.data.length > 0) {
          data = numericRes.data
        }
      } catch (innerErr) {
        console.warn("Numeric id lookup failed:", innerErr)
      }
    }

    // 2) if still nothing found → try by model_name
    if (!data || data.length === 0) {
      const alt = await supabase.from("optoma").select("*").eq("model_name", productId).limit(1)
      if (alt.error) throw alt.error
      data = alt.data
    }

    if (data && data.length > 0) {
      product = data[0] as OptomaProduct
    } else {
      error = `ID'si “${productId}” olan ürün bulunamadı.`
    }
  } catch (e: any) {
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
