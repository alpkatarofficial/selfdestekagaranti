"use client"

import { CardDescription } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, FileText, RefreshCw } from "lucide-react"
import { getPdfs, type Manual } from "@/app/actions/pdf-actions" // getPdfs'i import edin

export default function ManualsPage() {
  const [scrolled, setScrolled] = useState(false)
  const [manuals, setManuals] = useState<Manual[]>([])
  const [filteredManuals, setFilteredManuals] = useState<Manual[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState("all")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fetchManuals = async () => {
    setIsLoading(true)
    try {
      const fetchedManuals = await getPdfs()
      setManuals(fetchedManuals)
      setFilteredManuals(fetchedManuals)
    } catch (error) {
      console.error("Kılavuzlar çekilirken hata oluştu:", error)
      // Hata durumunda boş bir dizi veya uygun bir hata mesajı gösterebilirsiniz.
      setManuals([])
      setFilteredManuals([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchManuals()
  }, [])

  useEffect(() => {
    let currentFiltered = manuals

    if (searchQuery) {
      currentFiltered = currentFiltered.filter(
        (manual) =>
          manual.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          manual.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          manual.productId.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      currentFiltered = currentFiltered.filter((manual) => manual.category === selectedCategory)
    }

    if (selectedBrand !== "all") {
      currentFiltered = currentFiltered.filter((manual) => manual.productId === selectedBrand)
    }

    setFilteredManuals(currentFiltered)
  }, [searchQuery, selectedCategory, selectedBrand, manuals])

  const uniqueCategories = ["all", ...new Set(manuals.map((m) => m.category))]
  const uniqueBrands = ["all", ...new Set(manuals.map((m) => m.productId))]

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto px-4 py-16 pt-24">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8 flex items-start">
          <div className="bg-primary/20 p-2 rounded-full mr-3 mt-1">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-primary-foreground mb-1">Kullanım Kılavuzları</h2>
            <p className="text-primary-foreground/80 text-sm">
              Ürünlerinizin kullanım kılavuzlarına buradan ulaşabilirsiniz. Arama ve filtreleme seçeneklerini kullanarak
              istediğiniz kılavuzu kolayca bulun.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Mevcut Kılavuzlar</CardTitle>
                <CardDescription>Yüklenmiş tüm kullanım kılavuzlarını görüntüleyin ve yönetin.</CardDescription>
              </div>
              <Button variant="outline" onClick={fetchManuals} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Yenile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Kılavuz ara..."
                    className="pl-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="p-2 border rounded-md bg-white text-gray-700 w-full sm:w-auto"
                >
                  {uniqueBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand === "all" ? "Tüm Markalar" : brand}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2 border rounded-md bg-white text-gray-700 w-full sm:w-auto"
                >
                  {uniqueCategories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "Tüm Kategoriler" : category}
                    </option>
                  ))}
                </select>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : filteredManuals.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Dosya Adı</TableHead>
                        <TableHead>Ürün Adı</TableHead>
                        <TableHead>Marka</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Boyut</TableHead>
                        <TableHead>Yükleme Tarihi</TableHead>
                        <TableHead className="text-right">İndir</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredManuals.map((manual) => (
                        <TableRow key={manual.id}>
                          <TableCell className="font-medium">{manual.fileName}</TableCell>
                          <TableCell>{manual.productName}</TableCell>
                          <TableCell>{manual.productId}</TableCell>
                          <TableCell>{manual.category}</TableCell>
                          <TableCell>{manual.fileSize}</TableCell>
                          <TableCell>{manual.uploadDate}</TableCell>
                          <TableCell className="text-right">
                            <a href={manual.downloadUrl} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-md">
                  <p>Kılavuz bulunamadı.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
