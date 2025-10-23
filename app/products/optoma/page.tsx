import OptomaClientPage from "./OptomaClientPage";
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
  title: 'Optoma ürünleri',
  description: 'Optoma ürünleri',
};

export default async function OptomaPage() {
  console.log("--- Optoma Page: Fetching products from 'optoma' table ---");
  const { products, error } = await getProducts("optoma");
  if (error) {
    console.error("Optoma Page Error: Failed to fetch products.", error);
  } else {
    console.log(`Optoma Page: Successfully fetched ${products.length} products.`);
    if (products.length > 0) {
      console.log("Optoma Page: Sample product data being sent to client:", products[0]);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Optoma ürünleri</h1>
          <p className="text-gray-600">Optoma ürünleri.</p>
          {error ? (
            <div role="alert" aria-live="polite" className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">Ürünler Yüklenemedi: {String(error)}</p>
            </div>
          ) : null}
        </div>
        <OptomaClientPage products={products as Product[]} />
      </main>
    </div>
  );
}
