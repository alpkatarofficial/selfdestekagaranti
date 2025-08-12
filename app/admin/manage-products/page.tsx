"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Edit, RefreshCw, Search, Save, Plus } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Import getProducts Server Action
import { getProducts, updateProduct } from "@/app/actions/product-actions"

// Define Product interfaces
interface DreameProduct {
  id: string
  name: string
  category: string
  description: string
  features: string[]
  specs: Record<string, string>
  image_url: string
  updated_at: string
}

interface ThomsonProduct {
  id: string
  model_name: string
  name: string
  description: string
  tv_type: "Google TV" | "Android TV"
  resolution: "HD" | "Full HD" | "4K UHD"
  image_url: string
  screen_size_inches: number
  smart_features: string[]
  ports: string[]
  audio_output_watts: number
  created_at?: string
  updated_at?: string
}

type Product = DreameProduct | ThomsonProduct

// Category display names for Dreame products
const getCategoryDisplayName = (category: string): string => {
  const categoryNames: Record<string, string> = {
    "robot-supurge": "Robot Süpürge",
    "dikey-supurge": "Dikey Süpürge",
    "sac-bakim": "Saç Bakım",
    "temizlik-urunleri": "Temizlik Ürünleri",
    aksesuarlar: "Aksesuarlar",
  }
  return categoryNames[category] || category
}

export default function ManageProducts() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [selectedBrand, setSelectedBrand] = useState<"thomson" | "dreame">("thomson")
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [editedProduct, setEditedProduct] = useState<Product | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ success: boolean; message: string } | null>(null)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  // Fetch products based on selected brand
  const fetchProductsData = async () => {
    try {
      setIsLoading(true)
      console.log(`Fetching products for brand: ${selectedBrand}`)

      const tableName = selectedBrand === "thomson" ? "thomson" : "dreames"
      const result = await getProducts(tableName)

      if (result.error) {
        console.error(`Error fetching ${selectedBrand} products:`, result.error)
        setStatusMessage({
          success: false,
          message: `Failed to fetch ${selectedBrand} products: ${result.error}`,
        })
        setProducts([])
      } else {
        console.log(`Successfully fetched ${result.products.length} ${selectedBrand} products`)
        setProducts(result.products)
      }

      setSearchQuery("") // Reset search when brand changes
      setActiveTab("all") // Reset tab when brand changes
    } catch (error) {
      console.error("Error fetching products:", error)
      setStatusMessage({
        success: false,
        message: `Failed to fetch products: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchProductsData()
    }
  }, [isLoggedIn, selectedBrand]) // Re-fetch when brand changes

  useEffect(() => {
    let filtered = [...products]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((product) => {
        const searchLower = searchQuery.toLowerCase()
        const nameMatch = product.name.toLowerCase().includes(searchLower)
        const idMatch = product.id.toLowerCase().includes(searchLower)
        const descriptionMatch = product.description.toLowerCase().includes(searchLower)

        // For Thomson products, also search model_name
        if (selectedBrand === "thomson" && "model_name" in product) {
          const modelMatch = product.model_name.toLowerCase().includes(searchLower)
          return nameMatch || idMatch || descriptionMatch || modelMatch
        }

        return nameMatch || idMatch || descriptionMatch
      })
    }

    // Filter by tab
    if (activeTab !== "all") {
      if (selectedBrand === "thomson") {
        filtered = filtered.filter((product) => {
          if ("tv_type" in product) {
            if (activeTab === "android") {
              return product.tv_type === "Android TV"
            }
            if (activeTab === "google") {
              return product.tv_type === "Google TV"
            }
            if (activeTab === "qled") {
              return product.name.toLowerCase().includes("qled")
            }
          }
          return true
        })
      } else if (selectedBrand === "dreame") {
        filtered = filtered.filter((product) => {
          if ("category" in product) {
            return product.category === activeTab
          }
          return true
        })
      }
    }

    setFilteredProducts(filtered)
  }, [searchQuery, activeTab, products, selectedBrand])

  const handleEditClick = (product: Product) => {
    setCurrentProduct(product)
    setEditedProduct({ ...product })
    setIsEditDialogOpen(true)
  }

  const handleSave = async () => {
    if (!editedProduct) return

    setIsSaving(true)
    try {
      const tableName = selectedBrand === "thomson" ? "thomson" : "dreames"

      // Create a clean payload for the update
      const updatePayload = { ...editedProduct }

      const result = await updateProduct(tableName, editedProduct.id, updatePayload)

      if (result.error) {
        setStatusMessage({
          success: false,
          message: `Update failed: ${result.error}`,
        })
      } else {
        // On successful update, refresh the local state with the data from the server
        setProducts((prevProducts) => prevProducts.map((p) => (p.id === result.product.id ? result.product : p)))

        setStatusMessage({
          success: true,
          message: `Product ${editedProduct.id} updated successfully`,
        })

        // Close the dialog
        setIsEditDialogOpen(false)
        setCurrentProduct(null)
        setEditedProduct(null)
      }
    } catch (error) {
      console.error("Save error:", error)
      setStatusMessage({
        success: false,
        message: `Update failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setIsSaving(false)
    }
  }

  const updateFeature = (index: number, value: string) => {
    if (!editedProduct) return

    let newFeatures: string[] = []

    if ("features" in editedProduct && Array.isArray(editedProduct.features)) {
      newFeatures = [...editedProduct.features]
    } else if ("smart_features" in editedProduct && Array.isArray(editedProduct.smart_features)) {
      newFeatures = [...editedProduct.smart_features]
    }

    newFeatures[index] = value

    if ("features" in editedProduct) {
      setEditedProduct({
        ...editedProduct,
        features: newFeatures,
      })
    } else if ("smart_features" in editedProduct) {
      setEditedProduct({
        ...editedProduct,
        smart_features: newFeatures,
      })
    }
  }

  const addFeature = () => {
    if (!editedProduct) return

    if ("features" in editedProduct) {
      setEditedProduct({
        ...editedProduct,
        features: [...editedProduct.features, ""],
      })
    } else if ("smart_features" in editedProduct) {
      setEditedProduct({
        ...editedProduct,
        smart_features: [...editedProduct.smart_features, ""],
      })
    }
  }

  const updateSpecificationKey = (oldKey: string, newKey: string) => {
    if (!editedProduct) return

    if ("specs" in editedProduct) {
      const newSpecs = { ...editedProduct.specs }
      const value = newSpecs[oldKey]
      delete newSpecs[oldKey]
      newSpecs[newKey] = value
      setEditedProduct({
        ...editedProduct,
        specs: newSpecs,
      })
    }
  }

  const updateSpecificationValue = (key: string, value: string) => {
    if (!editedProduct) return

    if ("specs" in editedProduct) {
      setEditedProduct({
        ...editedProduct,
        specs: {
          ...editedProduct.specs,
          [key]: value,
        },
      })
    }
  }

  const addSpecification = () => {
    if (!editedProduct) return
    if ("specs" in editedProduct) {
      setEditedProduct({
        ...editedProduct,
        specs: {
          ...editedProduct.specs,
          "": "", // Add an empty key-value pair
        },
      })
    }
  }

  // Don't render anything until we know the auth state
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const thomsonTabs = [
    { value: "all", label: "Tümü" },
    { value: "android", label: "Android TV" },
    { value: "google", label: "Google TV" },
    { value: "qled", label: "QLED" },
  ]

  const dreameTabs = [
    { value: "all", label: "Tümü" },
    { value: "robot-supurge", label: "Robot Süpürge" },
    { value: "dikey-supurge", label: "Dikey Süpürge" },
    { value: "sac-bakim", label: "Saç Bakım" },
    { value: "temizlik-urunleri", label: "Temizlik Ürünleri" },
    { value: "aksesuarlar", label: "Aksesuarlar" },
  ]

  const currentTabs = selectedBrand === "thomson" ? thomsonTabs : dreameTabs

  // Get features array for editing
  const getProductFeatures = (product: Product): string[] => {
    if ("features" in product && Array.isArray(product.features)) {
      return product.features
    } else if ("smart_features" in product && Array.isArray(product.smart_features)) {
      return product.smart_features
    }
    return []
  }

  // Get specs object for editing
  const getProductSpecs = (product: Product): Record<string, string> => {
    if ("specs" in product && typeof product.specs === "object") {
      return product.specs
    }
    return {}
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Ürünleri Yönet</h1>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{selectedBrand === "thomson" ? "Thomson TV Ürünleri" : "Dreame Ürünleri"}</CardTitle>
                <CardDescription>Ürün bilgilerini ve detaylarını yönetin</CardDescription>
              </div>
              <Button variant="outline" onClick={fetchProductsData} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Yenile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {statusMessage && (
              <div
                className={`p-4 rounded-md mb-4 ${
                  statusMessage.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                }`}
              >
                <div className="flex items-start">
                  <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p>{statusMessage.message}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Ürün ara..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs
                  value={selectedBrand}
                  onValueChange={(value) => setSelectedBrand(value as "thomson" | "dreame")}
                  className="w-auto"
                >
                  <TabsList>
                    <TabsTrigger value="thomson">Thomson</TabsTrigger>
                    <TabsTrigger value="dreame">Dreame</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                  <TabsList>
                    {currentTabs.map((tab) => (
                      <TabsTrigger key={tab.value} value={tab.value}>
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Model ID</TableHead>
                        <TableHead>Adı</TableHead>
                        <TableHead>Açıklama</TableHead>
                        {selectedBrand === "dreame" && <TableHead>Kategori</TableHead>}
                        {selectedBrand === "thomson" && <TableHead>Model</TableHead>}
                        <TableHead className="text-right">Eylemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.id}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell className="max-w-[400px] truncate">{product.description}</TableCell>
                          {selectedBrand === "dreame" && "category" in product && (
                            <TableCell>{getCategoryDisplayName(product.category)}</TableCell>
                          )}
                          {selectedBrand === "thomson" && "model_name" in product && (
                            <TableCell>{product.model_name}</TableCell>
                          )}
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => handleEditClick(product)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Düzenle
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-md">
                  <p>Ürün bulunamadı</p>
                  {selectedBrand === "dreame" && (
                    <p className="text-sm mt-2">Dreame ürünleri Supabase veritabanından yükleniyor...</p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ürünü Düzenle</DialogTitle>
            <DialogDescription>Ürün bilgilerini ve detaylarını güncelleyin</DialogDescription>
          </DialogHeader>

          {editedProduct && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="id">Model ID</Label>
                  <Input id="id" value={editedProduct.id} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Adı</Label>
                  <Input
                    id="name"
                    value={editedProduct.name}
                    onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                  />
                </div>
              </div>

              {selectedBrand === "dreame" && "category" in editedProduct && (
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    value={editedProduct.category}
                    onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
                  />
                </div>
              )}

              {selectedBrand === "thomson" && "model_name" in editedProduct && (
                <div className="space-y-2">
                  <Label htmlFor="model_name">Model Adı</Label>
                  <Input
                    id="model_name"
                    value={editedProduct.model_name}
                    onChange={(e) => setEditedProduct({ ...editedProduct, model_name: e.target.value })}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={editedProduct.description}
                  onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Özellikler</Label>
                {getProductFeatures(editedProduct).map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={feature} onChange={(e) => updateFeature(index, e.target.value)} />
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addFeature}>
                  <Plus className="h-4 w-4 mr-2" />
                  Özellik Ekle
                </Button>
              </div>

              {selectedBrand === "dreame" && "specs" in editedProduct && (
                <div className="space-y-2">
                  <Label>Teknik Özellikler</Label>
                  {Object.entries(getProductSpecs(editedProduct)).map(([key, value], index) => (
                    <div key={key + index} className="grid grid-cols-2 gap-4">
                      <Input value={key} onChange={(e) => updateSpecificationKey(key, e.target.value)} />
                      <Input value={value} onChange={(e) => updateSpecificationValue(key, e.target.value)} />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addSpecification}>
                    <Plus className="h-4 w-4 mr-2" />
                    Özellik Ekle
                  </Button>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Değişiklikleri Kaydet
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
