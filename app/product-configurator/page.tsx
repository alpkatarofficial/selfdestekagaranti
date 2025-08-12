"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

// Example data for product attributes (can be fetched from an API in a real app)
const productTypes = [
  { id: "tv", name: "TV" },
  // { id: 'smartphone', name: 'Akıllı Telefon' },
  // { id: 'sound-system', name: 'Ses Sistemi' },
  // { id: 'computer', name: 'Bilgisayar' },
  // { id: 'speaker', name: 'Hoparlör' },
]

const tvResolutions = [
  { id: "fhd", name: "FHD (1920 x 1080)" },
  { id: "uhd", name: "UHD (3840 x 2160)" },
]

const tvColors = [
  { id: "black", name: "Siyah" },
  { id: "white", name: "Beyaz" },
  { id: "silver", name: "Gümüş" },
]

const tvScreenSizes = [
  { id: "24", name: "24 inç" },
  { id: "32", name: "32 inç" },
  { id: "40", name: "40 inç" },
  { id: "43", name: "43 inç" },
  { id: "50", name: "50 inç" },
  { id: "55", name: "55 inç" },
  { id: "65", name: "65 inç" },
  { id: "75", name: "75 inç" },
  { id: "77", name: "77 inç" },
  { id: "85", name: "85 inç" },
  { id: "100", name: "100 inç" },
]

const tvOperatingSystems = [
  { id: "android-tv", name: "Android TV" },
  { id: "google-tv", name: "Google TV" },
]

const tvDisplayTechnologies = [
  { id: "led", name: "LED" },
  { id: "qled", name: "QLED" },
  { id: "oled", name: "OLED" },
]

export default function ProductConfigurator() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  const [productType, setProductType] = useState<string>("tv")
  const [resolution, setResolution] = useState<string>("")
  const [color, setColor] = useState<string>("")
  const [screenSize, setScreenSize] = useState<string>("")
  const [operatingSystem, setOperatingSystem] = useState<string>("")
  const [displayTechnology, setDisplayTechnology] = useState<string>("")
  const [generatedConfig, setGeneratedConfig] = useState<any | null>(null)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  // Set default values for Thomson TV example
  useEffect(() => {
    if (productType === "tv") {
      setResolution("uhd") // 4K UHD
      setColor("black") // Siyah
      setScreenSize("55") // 55 inç
      setOperatingSystem("google-tv") // Google TV
      setDisplayTechnology("qled") // QLED
    } else {
      // Reset for other types if they were enabled
      setResolution("")
      setColor("")
      setScreenSize("")
      setOperatingSystem("")
      setDisplayTechnology("")
    }
  }, [productType])

  const handleGenerateConfig = () => {
    const config = {
      productType: productTypes.find((t) => t.id === productType)?.name,
      resolution: tvResolutions.find((r) => r.id === resolution)?.name,
      color: tvColors.find((c) => c.id === color)?.name,
      subcategories: {
        screenSize: tvScreenSizes.find((s) => s.id === screenSize)?.name,
        operatingSystem: tvOperatingSystems.find((os) => os.id === operatingSystem)?.name,
        displayTechnology: tvDisplayTechnologies.find((dt) => dt.id === displayTechnology)?.name,
      },
    }
    setGeneratedConfig(config)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Ürün Yapılandırma Aracı</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ürün Özelliklerini Seçin</CardTitle>
            <CardDescription>Geliştiriciler için ürün özelliklerini yapılandırma aracı.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-type">Ürün Tipi</Label>
                <Select value={productType} onValueChange={setProductType}>
                  <SelectTrigger id="product-type">
                    <SelectValue placeholder="Ürün Tipi Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {productType === "tv" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="resolution">Çözünürlük</Label>
                    <Select value={resolution} onValueChange={setResolution}>
                      <SelectTrigger id="resolution">
                        <SelectValue placeholder="Çözünürlük Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {tvResolutions.map((res) => (
                          <SelectItem key={res.id} value={res.id}>
                            {res.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Renk</Label>
                    <Select value={color} onValueChange={setColor}>
                      <SelectTrigger id="color">
                        <SelectValue placeholder="Renk Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {tvColors.map((col) => (
                          <SelectItem key={col.id} value={col.id}>
                            {col.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="screen-size">Ekran Boyutu</Label>
                    <Select value={screenSize} onValueChange={setScreenSize}>
                      <SelectTrigger id="screen-size">
                        <SelectValue placeholder="Ekran Boyutu Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {tvScreenSizes.map((size) => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="operating-system">İşletim Sistemi</Label>
                    <Select value={operatingSystem} onValueChange={setOperatingSystem}>
                      <SelectTrigger id="operating-system">
                        <SelectValue placeholder="İşletim Sistemi Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {tvOperatingSystems.map((os) => (
                          <SelectItem key={os.id} value={os.id}>
                            {os.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="display-technology">Ekran Teknolojisi</Label>
                    <Select value={displayTechnology} onValueChange={setDisplayTechnology}>
                      <SelectTrigger id="display-technology">
                        <SelectValue placeholder="Ekran Teknolojisi Seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {tvDisplayTechnologies.map((dt) => (
                          <SelectItem key={dt.id} value={dt.id}>
                            {dt.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>

            <Button onClick={handleGenerateConfig} className="w-full md:w-auto">
              Yapılandırma Oluştur
            </Button>
          </CardContent>
        </Card>

        {generatedConfig && (
          <Card>
            <CardHeader>
              <CardTitle>Oluşturulan Yapılandırma</CardTitle>
              <CardDescription>Seçilen ürün özellikleri aşağıdadır.</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
                {JSON.stringify(generatedConfig, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
