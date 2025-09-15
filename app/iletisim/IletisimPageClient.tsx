"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Mail, MapPin, Phone, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { WhatsAppButton } from "@/app/components/whatsapp-button"
import { WhatsAppIcon } from "@/app/components/whatsapp-icon"

export default function IletisimPageClient() {
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
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Bize Ulaşın</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* İletişim Bilgileri */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">İletişim Bilgilerimiz</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">E-posta Adreslerimiz</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      <Link
                        href="mailto:info@agaranti.com"
                        className="hover:underline hover:text-primary transition-colors"
                      >
                        info@agaranti.com
                      </Link>
                    </p>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      <Link
                        href="mailto:agaranti@arena.com.tr"
                        className="hover:underline hover:text-primary transition-colors"
                      >
                        info@agaranti.com
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Telefon</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">+90 (212) 555 44 33</p>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">Müşteri Hizmetleri: 0850 255 24 00</p>
                    <div className="mt-3">
                      <WhatsAppButton
                        phoneNumber="+905454500011"
                        message="Merhaba, AGaranti hakkında bilgi almak istiyorum."
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 text-green-600 border-green-600 hover:bg-green-50"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        WhatsApp ile İletişime Geçin
                      </WhatsAppButton>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Adres</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      Atatürk Mah. Ertuğrul Gazi Sok. No:21
                      <br />
                      Ataşehir, İstanbul, 34758
                      <br />
                      Türkiye
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Çalışma Saatleri</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      Pazartesi - Cuma: 09:00 - 18:00
                      <br />
                      Cumartesi: 09:00 - 13:00
                      <br />
                      Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-3">Sosyal Medya</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://twitter.com/agaranti" target="_blank" rel="noopener noreferrer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                      <span className="sr-only">Twitter</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://facebook.com/agaranti" target="_blank" rel="noopener noreferrer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://instagram.com/agaranti" target="_blank" rel="noopener noreferrer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://linkedin.com/company/agaranti" target="_blank" rel="noopener noreferrer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* İletişim Formu */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Bize Mesaj Gönderin</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Adınız Soyadınız
                    </label>
                    <Input id="name" placeholder="Adınız Soyadınız" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      E-posta Adresiniz
                    </label>
                    <Input id="email" type="email" placeholder="ornek@email.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Konu
                  </label>
                  <Input id="subject" placeholder="Mesajınızın konusu" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mesajınız
                  </label>
                  <Textarea id="message" placeholder="Mesajınızı buraya yazın..." rows={5} required />
                </div>
                <Button type="submit" className="w-full">
                  Mesaj Gönder
                </Button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  * Formunuz gönderildikten sonra en kısa sürede size dönüş yapılacaktır.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Harita */}
        <Card className="shadow-lg mb-12">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary">Konum</h2>
            <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <MapPin className="h-12 w-12 mx-auto mb-2 text-primary" />
                  <p className="text-lg font-medium">Harita görüntüsü</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Atatürk Mah. Ertuğrul Gazi Sok. No:21, Ataşehir, İstanbul
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <span>Google Maps'te Görüntüle</span>
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SSS */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary">Sık Sorulan Sorular</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Ürün garantisi nasıl sorgulanır?</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  Ürün garantinizi sorgulamak için web sitemizin "Garanti Sorgulama" bölümünden ürün seri numaranızı
                  girerek sorgulama yapabilirsiniz.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Servis talebinde bulunmak istiyorum, ne yapmalıyım?</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  Servis talebinde bulunmak için "Servis Talebi Oluştur" sayfamızdan gerekli bilgileri doldurarak
                  talebinizi iletebilirsiniz.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Ürün iadesi nasıl yapılır?</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  Ürün iadesi için müşteri hizmetlerimizle iletişime geçmeniz gerekmektedir. Size en kısa sürede
                  yardımcı olacağız.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link href="/destek">Tüm SSS'leri Görüntüle</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
