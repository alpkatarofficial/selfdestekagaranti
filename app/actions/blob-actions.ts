"use server"

import { put, del, list } from "@vercel/blob"
import { revalidatePath } from "next/cache"

export async function uploadProductImage(formData: FormData) {
  try {
    const file = formData.get("file") as File
    const modelId = formData.get("modelId") as string

    if (!file || !modelId) {
      throw new Error("File and model ID are required")
    }

    // Create a filename based on the model ID
    const filename = `${modelId}-${Date.now()}.${file.name.split(".").pop()}`

    // Upload to Vercel Blob
    const blob = await put(`products/${filename}`, file, {
      access: "public",
      addRandomSuffix: false, // We want to use our own naming convention
    })

    // Revalidate the product pages to show the new image
    revalidatePath(`/products/thomson/${modelId}`)
    revalidatePath("/products/thomson")

    return {
      success: true,
      url: blob.url,
      filename,
    }
  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error)
    throw error
  }
}

export async function deleteProductImage(url: string) {
  try {
    // Extract the pathname from the URL
    const urlObj = new URL(url)
    const pathname = urlObj.pathname.split("/").pop()

    if (!pathname) {
      throw new Error("Invalid URL")
    }

    // Delete the blob
    await del(url)

    // Revalidate all product pages
    revalidatePath("/products/thomson")
    revalidatePath("/admin/upload-product-images")

    return {
      success: true,
      message: "Image deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting from Vercel Blob:", error)
    throw error
  }
}

export async function getAllBlobs() {
  try {
    const { blobs } = await list()
    return { blobs }
  } catch (error) {
    console.error("Error listing blobs:", error)
    throw error
  }
}
