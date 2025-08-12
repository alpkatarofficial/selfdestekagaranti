"use server"

import { supabase } from "@/lib/supabase"

export async function getProducts(table: string) {
  try {
    // Alias the 'image' column to 'image_url' for the 'dreames' table
    const selectQuery = table === "dreames" ? "*, image:image_url" : "*"
    const { data, error } = await supabase.from(table).select(selectQuery).order("name", { ascending: true })

    if (error) {
      console.error(`Error fetching products from ${table}:`, error)
      return { products: [], error: error.message }
    }

    console.log(`Successfully fetched ${data?.length || 0} products from ${table}`)
    return { products: data || [], error: null }
  } catch (err) {
    console.error(`Unexpected error fetching products from ${table}:`, err)
    return { products: [], error: "Unexpected error occurred" }
  }
}

export async function getProductById(table: string, id: string) {
  try {
    // Alias the 'image' column to 'image_url' for the 'dreames' table
    const selectQuery = table === "dreames" ? "*, image:image_url" : "*"
    const { data, error } = await supabase.from(table).select(selectQuery).eq("id", id).single()

    if (error) {
      console.error(`Error fetching product ${id} from ${table}:`, error)
      return { product: null, error: error.message }
    }

    return { product: data, error: null }
  } catch (err) {
    console.error(`Unexpected error fetching product ${id} from ${table}:`, err)
    return { product: null, error: "Unexpected error occurred" }
  }
}

export async function searchProducts(table: string, query: string) {
  try {
    let selectQuery = "*"
    // Base search query for columns that exist in both tables
    let orQuery = `name.ilike.%${query}%,description.ilike.%${query}%`

    if (table === "dreames") {
      selectQuery = "*, image:image_url"
      // 'dreames' table does not have 'model_name', so we don't search it.
    } else if (table === "thomson") {
      // 'thomson' table has 'model_name', so we add it to the search.
      orQuery += `,model_name.ilike.%${query}%`
    }

    const { data, error } = await supabase
      .from(table)
      .select(selectQuery)
      .or(orQuery)
      .order("name", { ascending: true })

    if (error) {
      console.error(`Error searching products in ${table}:`, error)
      return { products: [], error: error.message }
    }

    return { products: data || [], error: null }
  } catch (err) {
    console.error(`Unexpected error searching products in ${table}:`, err)
    return { products: [], error: "Unexpected error occurred" }
  }
}

export async function updateProduct(table: string, id: string, updates: any) {
  try {
    // Supabase client requires the column name to be 'image' for the 'dreames' table
    if (table === "dreames" && updates.image_url) {
      updates.image = updates.image_url
      delete updates.image_url
    }

    // Remove fields that should not be updated directly
    delete updates.id
    delete updates.created_at
    delete updates.updated_at

    const { data, error } = await supabase.from(table).update(updates).eq("id", id).select().single()

    if (error) {
      console.error(`Error updating product ${id} in ${table}:`, error)
      return { product: null, error: error.message }
    }

    console.log(`Successfully updated product ${id} in ${table}`)

    // Normalize the response to use 'image_url' for consistency on the client
    if (table === "dreames" && data && data.image) {
      data.image_url = data.image
      delete data.image
    }

    return { product: data, error: null }
  } catch (err) {
    console.error(`Unexpected error updating product ${id} in ${table}:`, err)
    return { product: null, error: "Unexpected error occurred" }
  }
}
