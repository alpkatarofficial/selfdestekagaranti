"use client"

import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">AGaranti</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Ürün ve servis desteği</p>
          </div>

          <div className="md:col-span-2">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>İstanbul Genel Müdürlük</strong>
                  <div className="mt-1">
                    Premier Kampüs
                    <br />
                    Gürsel Mahallesi, İmrahor Caddesi No:29 A Blok/212
                    <br />
                    Kağıthane / İstanbul
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Telefon numarası</strong>
                  <div className="mt-1">+90 212 364 64 64</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>E-posta</strong>
                  <div className="mt-1">
                    <Link href="mailto:musteri.hizmetleri@arena.com.tr" className="hover:underline text-primary">
                      musteri.hizmetleri@arena.com.tr
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4">
          © {new Date().getFullYear()} AGaranti. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  )
}
