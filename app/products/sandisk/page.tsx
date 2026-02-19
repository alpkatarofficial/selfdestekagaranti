import SandiskClientPage from "./SandiskClientPage";
import { getProducts } from "@/app/actions/product-actions";

// Define the Product type to match the expected data structure from Supabase
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
  title: 'Sandisk Ürünleri',
  description: 'Sandisk markalı depolama çözümleri ve hafıza kartları',
};

export default async function SandiskPage() {
  console.log("--- Sandisk Page: Fetching products from 'sandisk' table ---");
  const { products, error } = await getProducts("sandisk");

  if (error) {
    console.error("Sandisk Page Error: Failed to fetch products.", error);
  } else {
    console.log(`Sandisk Page: Successfully fetched ${products.length} products.`);
    if (products.length > 0) {
      console.log("Sandisk Page: Sample product data being sent to client:", {
        id: products[0].id,
        name: products[0].name,
        image_url: products[0].image_url,
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-red-700">Sandisk Ürünleri</h1>
          <p className="mt-4 text-lg text-gray-600">
            Güvenilir depolama çözümleri, hafıza kartları ve USB belleklerle verilerinizi koruyun ve kolayca taşıyın.
          </p>
        </div>
        {error ? (
          <div className="text-center text-red-500 bg-red-50 p-6 rounded-lg">
            <h2 className="font-semibold">Ürünler Yüklenemedi</h2>
            <p>Bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
            <p className="text-xs mt-2">Hata Detayı: {error}</p>
          </div>
        ) : (
          <SandiskClientPage products={products as Product[]} />
        )}
      </main>
    </div>
  );
}
