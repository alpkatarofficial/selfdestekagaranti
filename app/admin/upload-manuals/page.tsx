"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, FileText, Upload, Check, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { put } from "@vercel/blob"
import { useRouter } from "next/navigation"

export default function UploadManualsPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [manualType, setManualType] = useState<string>("android")
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
    } else {
      setFile(null)
      alert("Lütfen geçerli bir PDF dosyası seçin.")
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      alert("Lütfen bir PDF dosyası seçin.")
      return
    }

    try {
      setUploading(true)
      setUploadStatus("idle")

      // Create a filename based on the manual type
      let filename = ""
      switch (manualType) {
        case "android":
          filename = "Thomson_TV_ANDROID_MANUAL.pdf"
          break
        case "2k_google":
          filename = "Thomson_2K_GOOGLE_TV_USER_MANUAL.pdf"
          break
        case "4k_google":
          filename = "Thomson_4K_GOOGLE_TV_USER_MANUAL.pdf"
          break
        case "safety":
          filename = "Thomson_TV_SAFETY_MANUAL.pdf"
          break
        default:
          filename = `Thomson_${manualType.toUpperCase()}_MANUAL.pdf`
      }

      // Upload to Vercel Blob
      const blob = await put(`manuals/${filename}`, file, {
        access: "public",
        addRandomSuffix: false, // We want to use our own naming convention
      })

      setUploadStatus("success")
      setStatusMessage(`${filename} başarıyla yüklendi!`)

      // Refresh the manuals page
      router.refresh()

      // Reset form after successful upload
      setTimeout(() => {
        setFile(null)
        setUploadStatus("idle")
      }, 3000)
    } catch (error) {
      console.error("Error uploading PDF:", error)
      setUploadStatus("error")
      setStatusMessage("Yükleme sırasında bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto px-4 py-16 pt-24">
        <h1 className="text-3xl font-bold mb-8">Kullanım Kılavuzu Yükleme</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>PDF Kılavuz Yükle</CardTitle>
                <CardDescription>
                  Kullanım kılavuzlarını ve güvenlik kılavuzlarını buradan yükleyebilirsiniz.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="manualType">Kılavuz Tipi</Label>
                    <Select value={manualType} onValueChange={setManualType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kılavuz tipini seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="android">Android TV Kullanım Kılavuzu</SelectItem>
                        <SelectItem value="2k_google">2K Google TV Kullanım Kılavuzu</SelectItem>
                        <SelectItem value="4k_google">4K Google TV Kullanım Kılavuzu</SelectItem>
                        <SelectItem value="safety">Güvenlik Kılavuzu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">PDF Dosyası</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Input id="file" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                      <Label htmlFor="file" className="flex flex-col items-center justify-center cursor-pointer">
                        <FileText className="h-12 w-12 text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-gray-900">PDF dosyasını seçmek için tıklayın</span>
                        <span className="text-xs text-gray-500 mt-1">veya dosyayı buraya sürükleyin</span>
                      </Label>
                      {file && (
                        <div className="mt-4 text-sm text-gray-600">
                          <p className="font-medium">Seçilen dosya:</p>
                          <p>{file.name}</p>
                          <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {uploadStatus === "success" && (
                    <Alert className="bg-green-50 border-green-200">
                      <Check className="h-4 w-4 text-green-600" />
                      <AlertTitle>Başarılı!</AlertTitle>
                      <AlertDescription>{statusMessage}</AlertDescription>
                    </Alert>
                  )}

                  {uploadStatus === "error" && (
                    <Alert className="bg-red-50 border-red-200">
                      <X className="h-4 w-4 text-red-600" />
                      <AlertTitle>Hata!</AlertTitle>
                      <AlertDescription>{statusMessage}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={!file || uploading}>
                    {uploading ? (
                      <>
                        <Upload className="h-4 w-4 mr-2 animate-spin" />
                        Yükleniyor...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        PDF Kılavuzu Yükle
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Kılavuz Yükleme Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertTitle>Dosya Adlandırma</AlertTitle>
                  <AlertDescription>
                    Kılavuz tipi seçildiğinde dosya adı otomatik olarak oluşturulacaktır. Mevcut bir kılavuzu
                    güncellemek için aynı kılavuz tipini seçip yeni dosyayı yükleyebilirsiniz.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <h3 className="font-medium">Desteklenen Kılavuz Tipleri:</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary w-5 h-5 text-xs mr-2 flex-shrink-0">
                        1
                      </span>
                      <span>Android TV Kullanım Kılavuzu</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary w-5 h-5 text-xs mr-2 flex-shrink-0">
                        2
                      </span>
                      <span>2K Google TV Kullanım Kılavuzu</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary w-5 h-5 text-xs mr-2 flex-shrink-0">
                        3
                      </span>
                      <span>4K Google TV Kullanım Kılavuzu</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary w-5 h-5 text-xs mr-2 flex-shrink-0">
                        4
                      </span>
                      <span>Güvenlik Kılavuzu</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Dosya Gereksinimleri:</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Sadece PDF formatı desteklenmektedir</li>
                    <li>• Maksimum dosya boyutu: 10MB</li>
                    <li>• Önerilen sayfa boyutu: A4</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
