"use client"

import { useState, useEffect } from "react"
import { ServiceRequestForm } from "@/app/components/service-request-form"

export default function ServiceRequestClientPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Servis Talebi Oluştur</h1>

          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="mb-6 text-gray-700">
              Teknik destek, kurulum, onarım veya diğer servis talepleriniz için aşağıdaki formu doldurarak bize
              ulaşabilirsiniz. Ekibimiz en kısa sürede talebinizi değerlendirip size geri dönüş yapacaktır.
            </p>

            <ServiceRequestForm />
          </div>

          <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Servis Talebi Hakkında Bilgiler</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  Servis talebiniz, mesai saatleri içinde (09:00-18:00) aynı gün, mesai saatleri dışında ise bir sonraki
                  iş günü değerlendirilecektir.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Garanti kapsamındaki ürünler için servis ücreti alınmamaktadır.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Servis işlemi öncesinde cihazınızdaki önemli verileri yedeklemenizi öneririz.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Acil durumlarda 0850 XXX XX XX numaralı müşteri hizmetleri hattımızı arayabilirsiniz.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
