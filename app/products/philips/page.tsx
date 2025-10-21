import PhilipsClientPage from "./index";
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
  title: 'Philips ürünleri',
  description: 'Philips ürünleri',
};

export default async function PhilipsPage() {
  console.log("--- Philips Page: Fetching products from 'philips' table ---");
  const { products, error } = await getProducts("philips");
  if (error) {
    console.error("Philips Page Error: Failed to fetch products.", error);
  } else {
    console.log(`Philips Page: Successfully fetched ${products.length} products.`);
    if (products.length > 0) {
      console.log("Philips Page: Sample product data being sent to client:", products[0]);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-red-700">Philips ürünleri</h1>
          <p className="mt-4 text-lg text-gray-600">Philips ürünleri.</p>
        </div>
        {error ? (
          <div className="text-center text-red-500 bg-red-50 p-6 rounded-lg">
            <h2 className="font-semibold">Ürünler Yüklenemedi</h2>
            <p>Bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
            <p className="text-xs mt-2">Hata Detayı: {error}</p>
          </div>
        ) : (
          <PhilipsClientPage products={products as Product[]} />
        )}
      </main>
    </div>
  );
}
