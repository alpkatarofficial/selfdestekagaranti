"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ServiceRequestButton() {
  return (
    <Link href="/servis-talebi">
      <Button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md transition-colors">
        Servis Talebi Oluştur
      </Button>
    </Link>
  )
}
