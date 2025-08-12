"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

// Yedek parça veri modeli
type SparePart = {
  id: string
  productCode: string
  description: string
  compatibleModels: string[]
}

// Update the sparePartsDatabase with the new product IDs
const sparePartsDatabase: SparePart[] = [
  {
    id: "mainboard-32",
    productCode: "MAINBOARD-32",
    description: "32FA2S13 ANAKART Thomson",
    compatibleModels: ["32FA2S13", "32HA2S13W-HD"],
  },
  {
    id: "mainboard-40",
    productCode: "MAINBOARD-40",
    description: "40FA2S13 ANAKART Thomson",
    compatibleModels: ["40FA2S13", "40FG2S14"],
  },
  {
    id: "mainboard-43",
    productCode: "MAINBOARD-43",
    description: "43FG2S14 ANAKART Thomson",
    compatibleModels: ["43FG2S14"],
  },
  {
    id: "mainboard-50",
    productCode: "MAINBOARD-50",
    description: "50UG4S14 ANAKART Thomson",
    compatibleModels: ["50UG4S14"],
  },
  {
    id: "mainboard-55",
    productCode: "MAINBOARD-55",
    description: "55UG5C14 ANAKART Thomson",
    compatibleModels: ["55UG5C14", "55OG9C14"],
  },
  {
    id: "mainboard-55-",
    productCode: "MAINBOARD-55-",
    description: "55QG6C14 ANAKART Thomson",
    compatibleModels: ["55QG6C14"],
  },
  {
    id: "mainboard-65",
    productCode: "MAINBOARD-65",
    description: "65UG4S14 ANAKART Thomson",
    compatibleModels: ["65UG4S14", "65OG8C14", "65QG5C14"],
  },
  {
    id: "mainboard-75",
    productCode: "MAINBOARD-75",
    description: "75QG5C14 ANAKART Thomson",
    compatibleModels: ["75QG5C14"],
  },
  {
    id: "mainboard-75-",
    productCode: "MAINBOARD-75-",
    description: "75QG7C14 ANAKART Thomson",
    compatibleModels: ["75QG7C14", "77OG8C14"],
  },
  {
    id: "mainboard-85",
    productCode: "MAINBOARD-85",
    description: "85QG5S14 ANAKART Thomson",
    compatibleModels: ["85QG5S14"],
  },
  {
    id: "panel-32",
    productCode: "PANEL-32",
    description: "32FA2S13 PANEL Thomson",
    compatibleModels: ["32FA2S13", "32HA2S13W-HD"],
  },
  {
    id: "panel-40",
    productCode: "PANEL-40",
    description: "40FA2S13 PANEL Thomson",
    compatibleModels: ["40FA2S13", "40FG2S14"],
  },
  {
    id: "panel-43",
    productCode: "PANEL-43",
    description: "43FG2S14 PANEL Thomson",
    compatibleModels: ["43FG2S14"],
  },
  {
    id: "panel-50",
    productCode: "PANEL-50",
    description: "50UG4S14 PANEL Thomson",
    compatibleModels: ["50UG4S14"],
  },
  {
    id: "panel-55",
    productCode: "PANEL-55",
    description: "55UG5C14 PANEL Thomson",
    compatibleModels: ["55UG5C14", "55OG9C14"],
  },
  {
    id: "panel-55-",
    productCode: "PANEL-55-",
    description: "55QG6C14 PANEL Thomson",
    compatibleModels: ["55QG6C14"],
  },
  {
    id: "panel-65",
    productCode: "PANEL-65",
    description: "65UG4S14 PANEL Thomson",
    compatibleModels: ["65UG4S14", "65OG8C14", "65QG5C14"],
  },
  {
    id: "panel-75",
    productCode: "PANEL-75",
    description: "75QG5C14 PANEL Thomson",
    compatibleModels: ["75QG5C14"],
  },
  {
    id: "panel-75-",
    productCode: "PANEL-75-",
    description: "75QG7C14 PANEL Thomson",
    compatibleModels: ["75QG7C14", "77OG8C14"],
  },
  {
    id: "panel-85",
    productCode: "PANEL-85",
    description: "85QG5S14 PANEL Thomson",
    compatibleModels: ["85QG5S14"],
  },
  {
    id: "tv-accessories",
    productCode: "TV-ACCESSORIES",
    description: "Assembly parts for TV",
    compatibleModels: [
      "32FA2S13",
      "32HA2S13W-HD",
      "40FA2S13",
      "40FG2S14",
      "43FG2S14",
      "50UG4S14",
      "55OG9C14",
      "55QG6C14",
      "55UG5C14",
      "65OG8C14",
      "65QG5C14",
      "65UG4S14",
      "75QG5C14",
      "75QG7C14",
      "77OG8C14",
      "85QG5S14",
    ],
  },
]

// Update the thomsonModels array in the spare-parts-page.tsx
const thomsonModels = [
  { id: "32FA2S13", name: '32" Android Smart Led TV' },
  { id: "32HA2S13W-HD", name: '32" Android Smart Led TV Beyaz' },
  { id: "40FA2S13", name: '40" Android Smart Led TV' },
  { id: "40FG2S14", name: '40" FHD Google TV' },
  { id: "43FG2S14", name: '43" Google Smart Led TV' },
  { id: "50UG4S14", name: '50" Google Smart Led TV' },
  { id: "55OG9C14", name: '55" Lucid OLED TV' },
  { id: "55QG6C14", name: '55" Google QLED Plus TV' },
  { id: "55UG5C14", name: '55" Google UHD TV' },
  { id: "65OG8C14", name: '65" Google OLED TV' },
  { id: "65QG5C14", name: '65" Google OLED TV2' },
  { id: "65UG4S14", name: '65" Google UHD TV Side Feet' },
  { id: "75QG5C14", name: '75" Google TV' },
  { id: "75QG7C14", name: '75" Google QLED Pro TV' },
  { id: "77OG8C14", name: '77" Google OLED TV' },
  { id: "85QG5S14", name: '85" Google QLED TV' },
]

export default function SparePartsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [selectedPartType, setSelectedPartType] = useState<string>("")

  // Filtreleme fonksiyonu
  const filteredParts = sparePartsDatabase.filter((part) => {
    // Model filtresi
    const modelFilter = selectedModel ? part.compatibleModels.includes(selectedModel) : true

    // Parça tipi filtresi (MAINBOARD, PANEL, vb.)
    const partTypeFilter = selectedPartType
      ? part.productCode.toLowerCase().includes(selectedPartType.toLowerCase())
      : true

    // Arama sorgusu filtresi
    const searchFilter = searchQuery
      ? part.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.productCode.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    return modelFilter && partTypeFilter && searchFilter
  })

  // Benzersiz parça tiplerini al
  const uniquePartTypes = Array.from(
    new Set(
      sparePartsDatabase.map((part) => {
        // MAINBOARD-32 gibi bir koddan MAINBOARD kısmını çıkar
        const match = part.productCode.match(/^([A-Z-]+)/)
        return match ? match[1] : part.productCode
      }),
    ),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Thomson TV Yedek Parçaları</h1>

      {/* Filtreler */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Filtreler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Arama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Arama</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Ürün kodu veya açıklama ara..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Model filtresi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TV Modeli</label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue placeholder="Tüm modeller" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm modeller</SelectItem>
                {thomsonModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.id} - {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Parça tipi filtresi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parça Tipi</label>
            <Select value={selectedPartType} onValueChange={setSelectedPartType}>
              <SelectTrigger>
                <SelectValue placeholder="Tüm parça tipleri" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm parça tipleri</SelectItem>
                {uniquePartTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filtreleri temizle butonu */}
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedModel("all")
              setSelectedPartType("all")
            }}
          >
            Filtreleri Temizle
          </Button>
        </div>
      </div>

      {/* Sonuçlar */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Yedek Parçalar ({filteredParts.length})</h2>

        {filteredParts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Arama kriterlerinize uygun yedek parça bulunamadı.</p>
            <p className="mt-2">Lütfen farklı filtreler kullanarak tekrar deneyin.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ürün Kodu
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Açıklama
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Uyumlu Modeller
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    İşlem
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredParts.map((part) => (
                  <tr key={part.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {part.productCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{part.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {part.compatibleModels.join(", ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Sipariş Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
