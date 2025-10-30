import Image from "next/image"
import { notFound } from "next/navigation"
import { getProducts } from "@/app/actions/product-actions"
import { getCategoryDisplayName } from "@/lib/dreame-products"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, CheckCircle, Info, Wrench } from "lucide-react"
import Link from "next/link"

type ProductDetailPageProps = {
  params: {
    category: string
    id: string
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { products, error } = await getProducts("dreames")

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Hata!</h2>
          <p>Ürünler yüklenirken bir sorun oluştu: {error}</p>
        </div>
      </div>
    )
  }

  const product = products.find((p: any) => p.id === params.id && p.category === params.category)

  if (!product) {
    console.error(`Dreame Detail Page: Product not found with id: ${params.id} and category: ${params.category}`)
    notFound()
  }

  console.log("Dreame Detail Page: Rendering product. Image URL:", product.image_url)

  const categoryDisplayName = getCategoryDisplayName(product.category)

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto px-4 py-16 pt-24">
        <Link href={`/products/dreame`} className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tüm Dreame Ürünleri
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="relative w-full h-[400px] md:h-[550px] rounded-xl overflow-hidden shadow-lg bg-gray-100">
            <Image
              src={
                product.image_url && product.image_url.startsWith("http")
                  ? product.image_url
                  : "/placeholder.svg?height=550&width=550&text=Görsel+Yok"
              }
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {Array.isArray(product.features) && product.features.length > 0 && (
                <AccordionItem value="features" className="bg-white rounded-lg shadow-sm border-0">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 rounded-t-lg">
                    <div className="flex items-center text-xl font-semibold text-gray-800">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Öne Çıkan Özellikler
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
                      {product.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-purple-500 mr-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}

              {product.specs && Object.keys(product.specs).length > 0 && (
                <AccordionItem value="specs" className="bg-white rounded-lg shadow-sm border-0">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 rounded-t-lg">
                    <div className="flex items-center text-xl font-semibold text-gray-800">
                      <Info className="w-5 h-5 mr-2 text-purple-500" />
                      Teknik Özellikler
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ul className="space-y-2 text-gray-600">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <li key={key} className="flex items-start">
                          <span className="w-2 h-2 rounded-full bg-purple-500 mr-2 flex-shrink-0 mt-2"></span>
                          <span>
                            <span className="font-medium">{key}:</span> {String(value)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
