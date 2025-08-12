import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is not set.")
  // Depending on your environment, you might want to throw an error or handle this differently
  // For client-side, it's better to return a dummy client or null
  // For server-side, throwing an error is appropriate
  throw new Error("Supabase URL or Anon Key is not set. Please check your environment variables.")
}

// Client-side Supabase client (for use in client components)
// Use a singleton pattern to prevent multiple client instances
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

// Server-side Supabase client (for use in server components and API routes)
// This client can use the service role key for elevated privileges if needed,
// but for public data, the anon key is sufficient.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
