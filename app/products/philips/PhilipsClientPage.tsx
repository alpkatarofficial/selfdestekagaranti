import Image from 'next/image';
import Link from 'next/link';

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

export default function PhilipsClientPage({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return <div className="text-gray-500 text-center">Henüz ürün bulunmuyor.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/products/philips/${product.id}`} className="block group">
          <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
            <div className="relative w-full h-48">
              {product.image_url && (
                <Image src={product.image_url} alt={product.name} fill className="object-contain" />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1 group-hover:text-red-600 transition">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              {product.price && (
                <div className="text-red-600 font-bold text-base">{product.price} TL</div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
