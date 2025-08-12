"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import { WhatsAppButton } from "@/app/components/whatsapp-button"
import { WhatsAppIcon } from "@/app/components/whatsapp-icon"

// Logo bileşeni
function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="https://www.agaranti.com.tr/wp-content/uploads/2023/02/agaranti-Arena.png"
        alt="A-Garanti Logo"
        width={120}
        height={30}
        className="h-8 w-auto"
      />
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary/90 to-primary/70 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Hakkında */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-white/20 transition-all duration-300">
                <Logo />
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4">
              AGaranti, elektronik ürünleriniz için uzatılmış garanti ve teknik destek hizmetleri sunan lider bir
              kuruluş.
            </p>
            <div className="flex space-x-3 mt-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="h-4 w-4 text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter className="h-4 w-4 text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="h-4 w-4 text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin className="h-4 w-4 text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Youtube className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="col-span-1">
            <h3 className="text-white font-primary font-bold text-lg mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  Garanti Sorgulama
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  Servis Takibi
                </Link>
              </li>
              <li>
                <Link href="/#faq-section" className="text-white/80 hover:text-white transition-colors">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Yasal Bilgiler */}
          <div className="col-span-1">
            <h3 className="text-white font-primary font-bold text-lg mb-4">Yasal Bilgiler</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.agaranti.com.tr/kvkk-politikasi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  KVKK Politikası
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.agaranti.com.tr/kullanim-sartlari/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.agaranti.com.tr/kvkk-aydinlatma-beyani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  KVKK Aydınlatma Beyanı
                </Link>
              </li>
              <li>
                <Link
                  href="https://e-sirket.mkk.com.tr/?page=company&company=10150#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Bilgi Toplumu Hizmetleri
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div className="col-span-1">
            <h3 className="text-white font-primary font-bold text-lg mb-4">İletişim</h3>
            <p className="text-white/80 text-sm mb-2">
              <span className="font-medium">Adres:</span> Göktürk Merkez Mh., Göktürk Caddesi 4 Eyüpsultan/İstanbul,
              34077
            </p>
            <p className="text-white/80 text-sm mb-2">
              <span className="font-medium">Telefon:</span> +90 850 255 24 00
            </p>
            <p className="text-white/80 text-sm mb-4">
              <span className="font-medium">E-posta:</span> info@agaranti.com.tr
            </p>
            {/* WhatsApp butonunu güncelledim */}
            <WhatsAppButton
              phoneNumber="+908502552400"
              variant="outline"
              className="flex items-center gap-2 text-green-600 hover:text-green-700 border-green-600 hover:border-green-700"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp ile İletişim
            </WhatsAppButton>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-white/60 text-xs">© 2024 AGaranti. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
