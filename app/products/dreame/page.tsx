import DreameClientPage from "./DreameClientPage"
import { getProducts } from "@/app/actions/product-actions"

// Define the Product type to match the expected data structure from Supabase
interface Product {
  id: string
  name: string
  model_name?: string
  category: string
  description: string
  image_url?: string
  price?: number
  features?: string[]
  specs?: Record<string, string>
}

export default async function DreameProductsPage() {
  console.log("--- Dreame Page: Fetching products from 'dreames' table ---")
  const { products, error } = await getProducts("dreames")

  if (error) {
    console.error("Dreame Page Error: Failed to fetch products.", error)
  } else {
    console.log(`Dreame Page: Successfully fetched ${products.length} products.`)
    // Log the first product's image_url to verify its format on the server
    if (products.length > 0) {
      // Log the first product object directly to avoid strict property typing issues
      console.log("Dreame Page: Sample product data being sent to client:", products[0])
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dreame Ürünleri</h1>
          <p className="text-gray-600">
            Yenilikçi teknoloji ile hayatınızı kolaylaştıran tüm Dreame ürünlerini keşfedin.
          </p>
          {error ? (
            <div role="alert" aria-live="polite" className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">Ürünler Yüklenemedi: {String(error)}</p>
            </div>
          ) : null}
        </div>
  <DreameClientPage products={products as any} />
      </main>
    </div>
  )
}
