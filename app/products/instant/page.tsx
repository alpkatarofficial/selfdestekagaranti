import InstantClientPage from "./InstantClientPage";
import { getProducts } from "@/app/actions/product-actions";

interface Product {
  id: string;
  name: string;
  model_name?: string;
  category: string;
  description: string;
  image_url?: string;
  price?: number;
  features?: string[];
  specs?: Record<string, string>;
}

export const metadata = {
  title: 'Instant ürünleri',
  description: 'Instant ürünleri',
};

export default async function InstantPage() {
  console.log("--- Instant Page: Fetching products from 'instant' table ---");
  const { products, error } = await getProducts("instant");
  if (error) {
    console.error("Instant Page Error: Failed to fetch products.", error);
  } else {
    console.log(`Instant Page: Successfully fetched ${products.length} products.`);
    if (products.length > 0) {
      // Avoid accessing specific properties which can trigger parser types from Supabase generics
      console.log("Instant Page: Sample product data being sent to client:", products[0]);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Instant ürünleri</h1>
          <p className="text-gray-600">Instant ürünleri.</p>
          {error ? (
            <div role="alert" aria-live="polite" className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">Ürünler Yüklenemedi: {String(error)}</p>
            </div>
          ) : null}
        </div>
        <InstantClientPage products={products as Product[]} />
      </main>
    </div>
  );
}
