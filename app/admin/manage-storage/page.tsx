"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Check, RefreshCw, Search, Trash2 } from "lucide-react"
import { deleteProductImage } from "../../actions/blob-actions"
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

export default function ManageStorage() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [blobs, setBlobs] = useState<any[]>([])
  const [filteredBlobs, setFilteredBlobs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [blobToDelete, setBlobToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ success: boolean; message: string } | null>(null)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  const fetchBlobs = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/blob/list")
      if (response.ok) {
        const data = await response.json()
        setBlobs(data.blobs || [])
        setFilteredBlobs(data.blobs || [])
      }
    } catch (error) {
      console.error("Error fetching blobs:", error)
      setStatusMessage({
        success: false,
        message: `Failed to fetch storage data: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchBlobs()
    }
  }, [isLoggedIn])

  useEffect(() => {
    // Filter blobs based on search query and active tab
    let filtered = blobs

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((blob) => blob.pathname.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((blob) => {
        if (activeTab === "products") {
          return blob.pathname.startsWith("products/")
        }
        if (activeTab === "other") {
          return !blob.pathname.startsWith("products/")
        }
        return true
      })
    }

    setFilteredBlobs(filtered)
  }, [searchQuery, activeTab, blobs])

  const handleDeleteClick = (url: string) => {
    setBlobToDelete(url)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!blobToDelete) return

    setIsDeleting(true)
    try {
      await deleteProductImage(blobToDelete)
      setStatusMessage({
        success: true,
        message: "File deleted successfully",
      })
      fetchBlobs() // Refresh the list
    } catch (error) {
      console.error("Delete error:", error)
      setStatusMessage({
        success: false,
        message: `Delete failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
      setBlobToDelete(null)
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
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
        <h1 className="text-3xl font-bold mb-8">Manage Storage</h1>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Vercel Blob Storage</CardTitle>
                <CardDescription>Manage all files stored in Vercel Blob</CardDescription>
              </div>
              <Button variant="outline" onClick={fetchBlobs} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
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
                  {statusMessage.success ? (
                    <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  )}
                  <p>{statusMessage.message}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search files..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                  <TabsList>
                    <TabsTrigger value="all">All Files</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="other">Other</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : filteredBlobs.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Uploaded</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBlobs.map((blob, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span className="truncate max-w-[300px]">{blob.pathname}</span>
                              <a
                                href={blob.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 hover:underline truncate max-w-[300px]"
                              >
                                {blob.url}
                              </a>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {blob.pathname.split(".").pop()?.toUpperCase() || "UNKNOWN"}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatSize(blob.size)}</TableCell>
                          <TableCell>{formatDate(blob.uploadedAt)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(blob.url)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-md">
                  <p>No files found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the file from storage.
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
