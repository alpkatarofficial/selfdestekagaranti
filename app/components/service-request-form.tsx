"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { sendEmailSMTP } from "@/app/actions/email-smtp-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { parsePhoneNumberFromString } from "libphonenumber-js"

export function ServiceRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFormStatus({})

    const formData = new FormData(event.currentTarget)
    const serviceType = (formData.get("serviceType") as string) || "Genel"
    formData.append("subject", `Servis Talebi: ${serviceType}`)
    try {
      // Build a WhatsApp message from the form fields
      const name = (formData.get("name") as string) || ""
      const email = (formData.get("email") as string) || ""
      const phone = (formData.get("phone") as string) || ""
      const phoneCountry = (formData.get("phoneCountry") as string) || "+90"
      // normalize combined phone number and attempt E.164/international formatting
      const rawCombined = `${phoneCountry}${phone}`.replace(/\s+/g, "").trim()
      let combinedPhone = `${phoneCountry} ${phone}`.replace(/\s+/g, " ").trim()
      try {
        const parsed = parsePhoneNumberFromString(rawCombined)
        if (parsed && parsed.isValid()) {
          combinedPhone = parsed.formatInternational()
        }
      } catch (e) {
        // ignore parse errors and fallback to combinedPhone
      }
      const productTable = (formData.get("productTable") as string) || ""
      const productModel = (formData.get("productModel") as string) || ""
      const messageBody = (formData.get("message") as string) || ""

      // Format service type for display (e.g. tv-kurulum -> TV Kurulum)
      const formatServiceType = (s: string) => {
        if (!s) return "Genel"
        return s
          .split("-")
          .map((w) => (w.toLowerCase() === "tv" ? "TV" : w.charAt(0).toUpperCase() + w.slice(1)))
          .join(" ")
      }

      const productTableLabel = (productTables.find((t) => t.value === productTable) || { label: productTable }).label
      const serviceTypeLabel = formatServiceType(serviceType)

      const parts: string[] = []
      parts.push("📩 Servis Talebi")
      parts.push("")
      parts.push(`Ad Soyad: ${name || "-"}`)
      parts.push(`Telefon: ${combinedPhone || "-"}`)
      parts.push(`E-posta: ${email || "-"}`)
      parts.push(`Servis Tipi: ${serviceTypeLabel}`)
      parts.push(`Kategori: ${productTableLabel || "-"}`)
      parts.push(`Model: ${productModel || "-"}`)
      parts.push("")
      parts.push("Açıklama")
      parts.push(messageBody || "-")
      parts.push("")

      const waMessage = parts.join("\n")

      const waNumber = "908502552400" // +90 850 255 2400 without + and spaces
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`

      // Open WhatsApp in a new tab (works on desktop/mobile)
      window.open(waUrl, "_blank")

      setFormStatus({
        success: true,
        message: "WhatsApp ile iletişim penceresi açıldı. Mesajınız uygulamada hazırlandı.",
      })

      // Optionally reset the form
      formRef.current?.reset()
    } catch (error) {
      setFormStatus({
        success: false,
        message: "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // --- 2-stage dropdown state ---
  const [productTables] = useState([
    { value: "thomson", label: "Thomson" },
    { value: "dreames", label: "Dreame" },
    { value: "sandisk", label: "SanDisk" },
    { value: "philips", label: "Philips" },
    { value: "optoma", label: "Optoma" },
    { value: "rapoo", label: "Rapoo" },
    { value: "instant", label: "Instant" },
  ])
  const [selectedTable, setSelectedTable] = useState("")
  const [productOptions, setProductOptions] = useState<{ value: string; label: string }[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [loadingProducts, setLoadingProducts] = useState(false)

  // Country options with emoji flags
  const countryOptions = [
    { value: "+90", label: "Türkiye", flag: "🇹🇷" },
    { value: "+1", label: "USA", flag: "🇺🇸" },
    { value: "+44", label: "UK", flag: "🇬🇧" },
    { value: "+49", label: "Germany", flag: "🇩🇪" },
    { value: "+33", label: "France", flag: "🇫🇷" },
    { value: "+39", label: "Italy", flag: "🇮🇹" },
    { value: "+34", label: "Spain", flag: "🇪🇸" },
    { value: "+31", label: "Netherlands", flag: "🇳🇱" },
    { value: "+41", label: "Switzerland", flag: "🇨🇭" },
    { value: "+46", label: "Sweden", flag: "🇸🇪" },
    { value: "+61", label: "Australia", flag: "🇦🇺" },
    { value: "+91", label: "India", flag: "🇮🇳" },
    { value: "+86", label: "China", flag: "🇨🇳" },
    { value: "+81", label: "Japan", flag: "🇯🇵" },
    { value: "+55", label: "Brazil", flag: "🇧🇷" },
    { value: "+27", label: "South Africa", flag: "🇿🇦" },
  ]

  useEffect(() => {
    if (!selectedTable) {
      setProductOptions([])
      setSelectedProduct("")
      return
    }
    setLoadingProducts(true)
    const fetchProducts = async () => {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase.from(selectedTable).select("id, name").order("name", { ascending: true })
      if (error) {
        setProductOptions([])
      } else {
        setProductOptions(
          (data || []).map((p: any) => ({ value: p.id, label: p.name || p.model_name || p.id }))
        )
      }
      setLoadingProducts(false)
    }
    fetchProducts()
  }, [selectedTable])

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {formStatus.message && (
        <div
          className={`p-4 mb-4 rounded-md ${
            formStatus.success
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {formStatus.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Adınız Soyadınız
          </label>
          <Input id="name" name="name" placeholder="Adınız Soyadınız" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            E-posta Adresiniz
          </label>
          <Input id="email" name="email" type="email" placeholder="ornek@email.com" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Telefon Numaranız
          </label>
          <div className="flex gap-2">
            <select
              id="phoneCountry"
              name="phoneCountry"
              defaultValue="+90"
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              aria-label="Ülke kodu"
            >
              {countryOptions.map((c) => (
                <option key={c.value} value={c.value}>{`${c.flag} ${c.value} ${c.label}`}</option>
              ))}
            </select>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="5XXXXXXXXX"
              required
              maxLength={25}
              pattern="^[0-9 ()\\-]{6,}$"
              title="Lütfen geçerli bir telefon numarası girin. Örn: 5XXXXXXXXX"
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const el = e.currentTarget as HTMLInputElement
                // Remove any characters except digits, whitespace, parentheses and hyphen (no plus here)
                  el.value = el.value.replace(/[^0-9()\-\s]/g, "")
              }}
              className="w-full"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Uluslararası format desteklenir; ülke kodunu seçin, sonra numarayı girin.</p>
        </div>
        <div className="space-y-2">
          <label htmlFor="serviceType" className="text-sm font-medium">
            Servis Tipi
          </label>
          <select
            id="serviceType"
            name="serviceType"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="">Servis tipi seçin</option>
            <option value="tv-kurulum">TV Kurulum</option>
            <option value="tv-tamir">TV Tamir/Onarım</option>
            <option value="ses-sorunlari">Ses Sorunları</option>
            <option value="goruntu-sorunlari">Görüntü Sorunları</option>
            <option value="kanal-ayarlari">Kanal Ayarları</option>
            <option value="yazilim-guncelleme">Yazılım Güncelleme</option>
            <option value="uzaktan-kumanda">Uzaktan Kumanda Sorunları</option>
            <option value="baglanti-sorunlari">Bağlantı Sorunları</option>
            <option value="garanti-islemleri">Garanti İşlemleri</option>
            <option value="yedek-parca">Yedek Parça Talebi</option>
            <option value="diger">Diğer</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Marka ve Model</label>
        <div className="flex flex-col md:flex-row gap-2">
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-1/2"
            value={selectedTable}
            onChange={e => {
              setSelectedTable(e.target.value)
              setSelectedProduct("")
            }}
            required
            name="productTable"
            id="productTable"
          >
            <option value="">Marka seçin</option>
            {productTables.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-1/2"
            value={selectedProduct}
            onChange={e => setSelectedProduct(e.target.value)}
            required
            name="productModel"
            id="productModel"
            disabled={!selectedTable || loadingProducts}
          >
            <option value="">{loadingProducts ? "Yükleniyor..." : "Model seçin"}</option>
            {productOptions.map((p) => (
              <option key={p.value} value={p.label}>{p.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Sorun Açıklaması
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Lütfen yaşadığınız sorunu detaylı bir şekilde açıklayın..."
          rows={5}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Gönderiliyor..." : "Servis Talebi Gönder"}
      </Button>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        * Servis talebiniz gönderildikten sonra en kısa sürede size dönüş yapılacaktır.
      </p>
    </form>
  )
}
