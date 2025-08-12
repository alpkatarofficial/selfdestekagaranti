"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Settings, Database, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function AdminPage() {
  const { user, isLoggedIn, logout } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={logout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Çıkış Yap
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Hoş Geldiniz, {user?.username || "Admin"}</CardTitle>
            <CardDescription>
              Yönetici paneline hoş geldiniz. Buradan ürün resimlerini yönetebilir ve diğer ayarları yapabilirsiniz.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>Upload and manage product images for Thomson TV models</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Upload high-quality images for each product model to display on the website.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/upload-product-images" className="w-full">
                <Button className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Manage Images
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Settings</CardTitle>
              <CardDescription>Manage product information and details</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Edit product descriptions, specifications, and other details.</p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/manage-products" className="w-full">
                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Products
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Database</CardTitle>
              <CardDescription>Manage product database and storage</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">View and manage Vercel Blob storage for product images.</p>
            </CardContent>
            <CardFooter>
              <Link href="/admin/manage-storage" className="w-full">
                <Button variant="outline" className="w-full">
                  <Database className="mr-2 h-4 w-4" />
                  Manage Storage
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kullanım Kılavuzları</CardTitle>
              <CardDescription>Ürün kullanım kılavuzlarını ve güvenlik kılavuzlarını yönetin.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/admin/upload-manuals">
                    <Upload className="h-4 w-4 mr-2" />
                    Kılavuz Yükle
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
