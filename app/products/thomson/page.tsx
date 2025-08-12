import { supabase } from "@/lib/supabase"
import ProductList from "./product-list"

export default async function ThomsonPage() {
  console.log("Fetching Thomson products from Supabase...")

  let products = []
  let error = null

  try {
    const { data, error: fetchError } = await supabase.from("thomson").select("*").order("name", { ascending: true })

    if (fetchError) {
      console.error("Error fetching Thomson products:", fetchError)
      error = fetchError
    } else {
      console.log(`Successfully fetched ${data?.length || 0} Thomson products`)
      products = data || []
    }
  } catch (err) {
    console.error("Unexpected error fetching Thomson products:", err)
    error = err
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto px-4 py-16 pt-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Thomson Ürünleri</h1>
          <p className="text-gray-600">Kaliteli Thomson televizyon ve elektronik ürünleri</p>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">Ürünler yüklenirken hata oluştu: {error.message}</p>
            </div>
          )}
        </div>
        <ProductList products={products} />
      </div>
    </div>
  )
}
