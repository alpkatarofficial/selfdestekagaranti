"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { WhatsAppButton } from "@/app/components/whatsapp-button"
import { WhatsAppIcon } from "@/app/components/whatsapp-icon"

// Logo bileşeni
function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="https://www.agaranti.com.tr/wp-content/uploads/2023/02/agaranti-Arena.png"
        alt="A-Garanti Logo"
        width={120}
        height={30}
        className="h-8 w-auto"
      />
    </Link>
  )
}



export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary/90 to-primary/70 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>
        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          <Link href="/servis-talebi" className="text-white/90 hover:text-white font-medium transition-colors">
            Servis Talebi
          </Link>
          <Link href="/products" className="text-white/90 hover:text-white font-medium transition-colors">
            Ürünler
          </Link>
          <Link href="/iletisim" className="text-white/90 hover:text-white font-medium transition-colors">
            İletişim
          </Link>
        </nav>
        {/* WhatsApp Button */}
        <div className="hidden md:flex items-center">
          <WhatsAppButton
            phoneNumber="+908502552400"
            variant="outline"
            className="flex items-center gap-2 text-green-600 hover:text-green-700 border-green-600 hover:border-green-700"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span>İletişime Geç</span>
          </WhatsAppButton>
        </div>
      </div>
    </header>
  );
}
