"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X, ChevronDown, User, Settings, LogOut, Package, BookText, FileText, Home } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isLoggedIn, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg pb-4">
          <nav className="flex flex-col items-center space-y-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Anasayfa
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                Ürünler <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/products/thomson" onClick={() => setMobileMenuOpen(false)}>
                    Thomson TV
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/dreame" onClick={() => setMobileMenuOpen(false)}>
                    Dreame
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/manuals"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kılavuzlar
            </Link>
            <Link
              href="/servis-talebi"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Servis Talebi
            </Link>
            <Link
              href="/iletisim"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              İletişim
            </Link>
            {isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  Admin <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                      <Home className="mr-2 h-4 w-4" /> Admin Paneli
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/manage-products" onClick={() => setMobileMenuOpen(false)}>
                      <Package className="mr-2 h-4 w-4" /> Ürünleri Yönet
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/upload-manuals" onClick={() => setMobileMenuOpen(false)}>
                      <BookText className="mr-2 h-4 w-4" /> Kılavuz Yükle
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/manage-storage" onClick={() => setMobileMenuOpen(false)}>
                      <FileText className="mr-2 h-4 w-4" /> Depolamayı Yönet
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {isLoggedIn ? (
              <Button variant="outline" onClick={handleLogout} className="w-full max-w-[200px] bg-transparent">
                <LogOut className="mr-2 h-4 w-4" /> Çıkış Yap
              </Button>
            ) : (
              <Link href="/login" className="w-full max-w-[200px]">
                <Button variant="outline" className="w-full bg-transparent">
                  Giriş Yap
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
