"use server"

import { list } from "@vercel/blob"
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
    const { blobs } = await list({ prefix: "manuals/" })

    if (!blobs?.length) return []

    return blobs
      .filter((b) => b.pathname.endsWith(".pdf"))
      .map((blob, idx) => {
        const fileName = blob.pathname.split("/").pop() ?? "manual.pdf"

        // Very light-weight brand/category detection; extend as needed.
        const lc = fileName.toLowerCase()
        let productId = "Unknown"
        let productName = "Unknown Product"
        const category = "Kullanım Kılavuzu"

        if (lc.includes("thomson")) {
          productId = "Thomson"
          productName = "Thomson Ürünü"
        } else if (lc.includes("dreame")) {
          productId = "Dreame"
          productName = "Dreame Ürünü"
        }

        return {
          id: `m${idx + 1}`,
          productId,
          productName,
          category,
          language: "Türkçe",
          fileName,
          fileSize: `${(blob.size / 1024 ** 2).toFixed(2)} MB`,
          uploadDate: new Date(blob.uploadedAt).toISOString().slice(0, 10),
          downloadUrl: blob.url,
        }
      })
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
