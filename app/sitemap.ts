import type { MetadataRoute } from "next"
import { getProducts } from "./actions/product-actions"

/**
 * Generates the XML sitemap for the site.
 * – Static pages are listed first.
 * – Dynamic product pages from the “thomson” table are appended.
 *
 * NOTE:
 * • Uses the generic `getProducts("thomson")` helper exported from
 *   `app/actions/product-actions.ts`.
 * • `getProducts` returns an object → { products, error }.
 * • We only proceed with the `products` array (falls back to `[]` on error).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://selfservis.agaranti.com.tr"

  /* ---------- static routes ---------- */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/servis-talebi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/manuals`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/admin/manage-products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ]

  /* ---------- dynamic product routes ---------- */
  const { products } = await getProducts("thomson")

  const productPages: MetadataRoute.Sitemap = (products ?? []).map((product) => ({
    url: `${baseUrl}/products/thomson/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  return [...staticPages, ...productPages]
}
