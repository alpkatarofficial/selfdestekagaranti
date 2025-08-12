import type { Metadata } from "next"
import IletisimPageClient from "./IletisimPageClient"

export const metadata: Metadata = {
  title: "İletişim | AGaranti Self Servis Portalı",
  description: "AGaranti ile iletişime geçin. Sorularınız ve talepleriniz için bize ulaşın.",
}

export default function IletisimPage() {
  return <IletisimPageClient />
}
