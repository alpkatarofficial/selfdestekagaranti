import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
}

export function WhatsAppButton({
  phoneNumber,
  message = "",
  className,
  variant = "default",
  size = "default",
  children,
}: WhatsAppButtonProps) {
  // Format phone number: remove any non-digit characters and ensure no leading +
  const formattedNumber = phoneNumber.replace(/\D/g, "").replace(/^\+/, "")

  // Create WhatsApp URL with optional pre-filled message
  const whatsappUrl = `https://wa.me/${formattedNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`

  return (
    <Button
      variant={variant}
      size={size}
      className={`bg-[#25D366] hover:bg-[#20b858] text-white ${className || ""}`}
      asChild
    >
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    </Button>
  )
}
