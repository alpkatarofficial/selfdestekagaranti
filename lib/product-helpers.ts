"use server"

import { list } from "@vercel/blob"

// Function to get the image URL for a specific product model
export async function getProductImageUrl(modelId: string): Promise<string | null> {
  try {
    console.log(`Looking for images for model ${modelId}...`)

    // List all blobs in the products directory
    const { blobs } = await list({ prefix: "products/" })

    if (!blobs || blobs.length === 0) {
      console.log("No blobs found in the products directory")
      return null
    }

    // Try different patterns to find the best match
    // 1. First try to find an exact match for the model ID with "main" or no descriptor
    let productBlob = blobs.find(
      (blob) =>
        blob.pathname.includes(`products/${modelId}-main`) ||
        blob.pathname.match(new RegExp(`products/${modelId}-[0-9]+`)),
    )

    // 2. If no main image found, try any image with the model ID
    if (!productBlob) {
      productBlob = blobs.find((blob) => blob.pathname.includes(`products/${modelId}-`))
    }

    // 3. Special case for white models
    if (!productBlob && modelId.includes("W")) {
      console.log("Looking for white model variant image")
      const baseModelId = modelId.replace("W", "")
      // Try to find white variant or base model with white descriptor
      productBlob = blobs.find(
        (blob) =>
          blob.pathname.includes(`products/${modelId}-`) || blob.pathname.includes(`products/${baseModelId}-white`),
      )
    }

    if (productBlob) {
      console.log(`Found image for model ${modelId}: ${productBlob.url}`)
      return productBlob.url
    }

    console.log(`No image found for model ${modelId}`)
    return null
  } catch (error) {
    console.error("Error getting product image:", error)
    return null
  }
}

// Function to get all product images
export async function getAllProductImages() {
  try {
    const { blobs } = await list({ prefix: "products/" })

    // Create a map of model IDs to image URLs
    const imageMap = new Map<string, string>()

    blobs.forEach((blob) => {
      // Extract the model ID from the pathname
      const pathname = blob.pathname
      const match = pathname.match(/products\/([^-]+)-/)

      if (match && match[1]) {
        const modelId = match[1]
        imageMap.set(modelId, blob.url)
      }
    })

    return imageMap
  } catch (error) {
    console.error("Error getting all product images:", error)
    return new Map()
  }
}
