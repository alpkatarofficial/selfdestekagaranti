"use server"

import { list } from "@vercel/blob"
import { getCategoryDisplayName, dreameProducts } from "@/lib/dreame-products"
import { revalidatePath } from "next/cache"

/**
 * Shape of a single manual (PDF) record.
 */
export interface Manual {
  id: string
  productId: string
  productName: string
  category: string
  language: string
  fileName: string
  fileSize: string
  uploadDate: string
  downloadUrl: string
}

/**
 * Fetch all PDF manuals stored in Vercel&nbsp;Blob under the **manuals/** prefix.
 * The function is used on both the manuals page and the admin dashboard,
 * therefore it MUST be exported with the exact name `getPdfManuals`.
 */
export async function getPdfManuals(): Promise<Manual[]> {
  try {
    const { blobs } = await list({ prefix: "manuals/", mode: "folded" })

    const manuals: Manual[] = blobs
      .filter((blob) => blob.pathname.endsWith(".pdf"))
      .map((blob, idx) => {
        const fileName = blob.pathname.split("/").pop() ?? "manual.pdf"

        // Very light-weight brand/category detection; extend as needed.
        const lc = fileName.toLowerCase()
        let productId = "Unknown"
        let productName = "Unknown Product"
        let category = "Kullanım Kılavuzu"
        const language = "Türkçe"
        const fileSize = `${(blob.size / 1024 ** 2).toFixed(2)} MB`
        const uploadDate = new Date(blob.uploadedAt).toISOString().slice(0, 10)
        const downloadUrl = blob.url

        if (lc.includes("thomson")) {
          productId = "Thomson"
          productName = "Thomson Ürünü"
        } else if (lc.includes("dreame")) {
          productId = "Dreame"
          // For Dreame, try to match with dreameProducts
          const dreameProduct = dreameProducts.find(
            (p) => lc.includes(p.id.toLowerCase()) || lc.includes(p.name.toLowerCase()),
          )
          if (dreameProduct) {
            productName = dreameProduct.name
            category = getCategoryDisplayName(dreameProduct.category)
          } else {
            // Fallback for Dreame if not found in product list
            productName = lc.replace(/dreame/i, "").trim() || "Dreame Kılavuzu"
            category = "Dreame Ürünleri"
          }
        }

        return {
          id: `m${idx + 1}`,
          productId,
          productName,
          category,
          language,
          fileName,
          fileSize,
          uploadDate,
          downloadUrl,
        }
      })

    // Add placeholder Dreame manuals if none are found from Blob storage
    if (!manuals.some((m) => m.productId === "Dreame")) {
      manuals.push(
        {
          id: "m1",
          productId: "Dreame",
          productName: "Dreame Bot L20 Ultra",
          category: "Robot Süpürge",
          language: "Türkçe",
          fileName: "dreame-l20-ultra-manual.pdf",
          fileSize: "1.00 MB",
          uploadDate: new Date().toISOString().slice(0, 10),
          downloadUrl: "/placeholder.pdf",
        },
        {
          id: "m2",
          productId: "Dreame",
          productName: "Dreame H12 Pro",
          category: "Dikey Süpürge",
          language: "Türkçe",
          fileName: "dreame-h12-pro-manual.pdf",
          fileSize: "1.00 MB",
          uploadDate: new Date().toISOString().slice(0, 10),
          downloadUrl: "/placeholder.pdf",
        },
        {
          id: "m3",
          productId: "Dreame",
          productName: "Dreame Hair Glory",
          category: "Saç Bakım Ürünleri",
          language: "Türkçe",
          fileName: "dreame-hair-glory-manual.pdf",
          fileSize: "1.00 MB",
          uploadDate: new Date().toISOString().slice(0, 10),
          downloadUrl: "/placeholder.pdf",
        },
        {
          id: "m4",
          productId: "Dreame",
          productName: "Dreame Hava Temizleyici",
          category: "Temizlik Ürünleri",
          language: "Türkçe",
          fileName: "dreame-air-purifier-manual.pdf",
          fileSize: "1.00 MB",
          uploadDate: new Date().toISOString().slice(0, 10),
          downloadUrl: "/placeholder.pdf",
        },
        {
          id: "m5",
          productId: "Dreame",
          productName: "Dreame Mop Pedleri",
          category: "Aksesuarlar",
          language: "Türkçe",
          fileName: "dreame-mop-pads-manual.pdf",
          fileSize: "1.00 MB",
          uploadDate: new Date().toISOString().slice(0, 10),
          downloadUrl: "/placeholder.pdf",
        },
      )
    }

    return manuals
  } catch (err) {
    console.error("[getPdfManuals] failed:", err)
    return []
  }
}

/**
 * Some older code imports `getPdfs`, so we provide it as an alias.
 */
export const getPdfs = getPdfManuals

/**
 * Stub for uploading a new manual.
 * Extend to actually write to Blob if/when required.
 */
export async function uploadPdfManual(formData: FormData) {
  // TODO: implement real upload logic
  revalidatePath("/manuals")
  return { success: true, message: "PDF manual uploaded (mock)" }
}
