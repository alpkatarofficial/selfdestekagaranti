"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload, Check, AlertCircle, Trash2, RefreshCw } from "lucide-react"
import { uploadProductImage, deleteProductImage } from "../../actions/blob-actions"
import { useAuth } from "@/lib/auth-context"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


// Product tables/categories
const productTables = [
  { value: "thomson", label: "Thomson" },
  { value: "dreames", label: "Dreame" },
  // Add more tables/categories here if needed
]

export default function UploadProductImages() {
  // Hydration fix: only render dropdowns after mount
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  // 2-stage dropdown state
  const [selectedTable, setSelectedTable] = useState("")
  const [productOptions, setProductOptions] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [loadingProducts, setLoadingProducts] = useState(false)
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  // Remove selectedModel, use selectedProduct instead
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [modelImages, setModelImages] = useState<any[]>([])
  const [isDeleting, setIsDeleting] = useState(false)
  const [imageToDelete, setImageToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // Create a preview URL
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreviewUrl(objectUrl)

      // Clean up the preview URL when component unmounts
      return () => URL.revokeObjectURL(objectUrl)
    }
  }

  const fetchExistingImages = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch("/api/blob/list?prefix=products/")
      if (response.ok) {
        const data = await response.json()
        // Group images by model ID
        const imagesByModel = {}
        data.blobs.forEach((blob) => {
          const modelIdMatch = blob.pathname.match(/products\/([^-]+)-/)
          if (modelIdMatch && modelIdMatch[1]) {
            const modelId = modelIdMatch[1]
            if (!imagesByModel[modelId]) {
              imagesByModel[modelId] = []
            }
            imagesByModel[modelId].push(blob)
          }
        })

        // If a product is selected, show its images
        if (selectedProduct && imagesByModel[selectedProduct]) {
          setModelImages(imagesByModel[selectedProduct])
        } else {
          setModelImages([])
        }
      }
    } catch (error) {
      console.error("Error fetching existing images:", error)
    } finally {
      setIsRefreshing(false)
    }
  }


  // Fetch products when table changes
  useEffect(() => {
    if (!selectedTable) {
      setProductOptions([])
      setSelectedProduct("")
      return
    }
    setLoadingProducts(true)
    const fetchProducts = async () => {
      const supabase = getSupabaseClient()
      // Try to fetch id, name, model_name, image_url, image
      let { data, error } = await supabase.from(selectedTable).select("id, name, model_name, image_url, image").order("name", { ascending: true })
      if (error) {
        setProductOptions([])
      } else {
        setProductOptions(
          (data || []).map((p: any) => {
            let label = p.name || p.model_name || p.id
            // If both name and model_name are missing, try to use another string column if available
            if (!label) {
              const stringCol = Object.keys(p).find(
                (k) => typeof p[k] === "string" && k !== "id" && k !== "image_url" && k !== "image"
              )
              label = stringCol ? p[stringCol] : p.id
            }
            return {
              value: p.id,
              label,
              image: p.image_url || p.image || "",
            }
          })
        )
      }
      setLoadingProducts(false)
    }
    fetchProducts()
  }, [selectedTable])

  // Fetch images for selected product
  useEffect(() => {
    if (selectedProduct) {
      fetchExistingImages()
    }
  }, [selectedProduct])

  const handleUpload = async () => {
    if (!file || !selectedProduct) {
      setUploadStatus({
        success: false,
        message: "Please select both a product and an image file",
      })
      return
    }

    setUploading(true)
    setUploadStatus(null)

    try {
      // Create a FormData object
      const formData = new FormData()
      formData.append("file", file)
      formData.append("modelId", selectedProduct)

      // Call the server action to upload the image
      const result = await uploadProductImage(formData)

      setUploadStatus({
        success: true,
        message: `Image uploaded successfully!`,
      })

      // Reset the file input
      setFile(null)
      setPreviewUrl(null)

      // Refresh the image list
      fetchExistingImages()
    } catch (error) {
      console.error("Upload error:", error)
      setUploadStatus({
        success: false,
        message: `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteClick = (imageUrl: string) => {
    setImageToDelete(imageUrl)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!imageToDelete) return

    setIsDeleting(true)
    try {
      await deleteProductImage(imageToDelete)
      setUploadStatus({
        success: true,
        message: "Image deleted successfully",
      })
      fetchExistingImages()
    } catch (error) {
      console.error("Delete error:", error)
      setUploadStatus({
        success: false,
        message: `Delete failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
      setImageToDelete(null)
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

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Upload Product Images</h1>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Product Image Upload</CardTitle>
            <CardDescription>
              Upload images for Thomson TV models. Images will be stored in Vercel Blob and linked to the product.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {mounted && (
              <>
                <div className="space-y-2">
                  <Label>Product Category</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedTable}
                    onChange={e => {
                      setSelectedTable(e.target.value)
                      setSelectedProduct("")
                    }}
                    required
                    name="productTable"
                    id="productTable"
                  >
                    <option value="">Select a category</option>
                    {productTables.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Select Product</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedProduct}
                    onChange={e => setSelectedProduct(e.target.value)}
                    required
                    name="productModel"
                    id="productModel"
                    disabled={!selectedTable || loadingProducts}
                  >
                    <option value="">{loadingProducts ? "Loading..." : "Select a product"}</option>
                    {productOptions.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  {/* Show image preview for selected product */}
                  {selectedProduct && productOptions.find(p => p.value === selectedProduct)?.image && (
                    <div className="mt-2 border rounded-md overflow-hidden max-w-xs">
                      <img
                        src={productOptions.find(p => p.value === selectedProduct)?.image || "/placeholder.svg"}
                        alt={productOptions.find(p => p.value === selectedProduct)?.label || "Product image"}
                        className="max-h-[200px] w-auto mx-auto object-contain"
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer"
                value={file ? undefined : ""}
              />
              <p className="text-sm text-gray-500">Recommended size: 600x400 pixels. Max file size: 5MB.</p>
            </div>

            {previewUrl && (
              <div className="mt-4">
                <Label>Preview</Label>
                <div className="mt-2 border rounded-md overflow-hidden">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="max-h-[300px] w-auto mx-auto object-contain"
                  />
                </div>
              </div>
            )}

            {selectedProduct && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <Label>Existing Images for {selectedProduct}</Label>
                  <Button variant="outline" size="sm" onClick={fetchExistingImages} disabled={isRefreshing}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </div>

                {modelImages.length > 0 ? (
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {modelImages.map((image, index) => (
                      <div key={index} className="border rounded-md overflow-hidden group relative">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={`${selectedProduct} image ${index + 1}`}
                          className="h-40 w-full object-contain"
                        />
                        <div className="p-2 text-xs text-gray-500 truncate">{image.pathname.split("/").pop()}</div>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteClick(image.url)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-md">
                    {isRefreshing ? (
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : (
                      <p>No images found for this product</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {uploadStatus && (
              <div
                className={`p-4 rounded-md ${
                  uploadStatus.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                }`}
              >
                <div className="flex items-start">
                  {uploadStatus.success ? (
                    <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  )}
                  <p>{uploadStatus.message}</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleUpload} disabled={uploading || !file || !selectedProduct} className="w-full">
              {uploading ? "Uploading..." : "Upload Image"}
              {!uploading && <Upload className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the image from storage.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
