export interface Product {
  id: string
  model_name: string
  name: string
  category: string
  description: string
  image_url: string
  features: string[]
  specs: Record<string, string>
  price?: number
  created_at?: string
  updated_at?: string
}

// This array is now empty as data comes from Supabase
export const dreameProducts: Product[] = []

export function getCategoryDisplayName(category: string): string {
  switch (category) {
    case "robot-supurge":
      return "Robot Süpürge"
    case "dikey-supurge":
      return "Dikey Süpürge"
    case "sac-bakim":
      return "Saç Bakım"
    case "temizlik-urunleri":
      return "Temizlik Ürünleri"
    case "aksesuarlar":
      return "Aksesuarlar"
    default:
      return category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }
}

// These functions will now primarily interact with Supabase
// They are kept here for type consistency and potential future use with static data fallback
export function getProductsByCategory(category: string): Product[] {
  // In a real app, this would fetch from Supabase based on category
  return []
}

export function getProductById(id: string): Product | undefined {
  // In a real app, this would fetch from Supabase based on ID
  return undefined
}
