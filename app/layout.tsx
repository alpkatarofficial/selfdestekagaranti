import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/footer-component"
import Header from "@/header-component"
import { AuthProvider } from "@/lib/auth-context"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AGaranti Self Servis Portalı",
  description: "AGaranti Self Servis Portalı - Ürün ve servis desteği",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  // Google Search Console doğrulama kodu buraya eklendi
  verification: {
    google: "NyLrHrL-K4kXVu2HS1VJwJaoTdt1qAlGsD4SNKnms9c",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {/* Google Analytics Script */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-N46R0KG68H" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N46R0KG68H');
          `}
        </Script>

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <Suspense fallback={null}>
              <Header />
              {children}
              <Analytics />
              <Footer />
            </Suspense>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
