import { createClient } from "@supabase/supabase-js"

// Test Supabase connection and check thomson and dreames tables
async function testSupabaseConnection() {
  console.log("🔍 Testing Supabase Connection...\n")

  // Check environment variables
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log("📋 Environment Variables:")
  console.log(`SUPABASE_URL: ${supabaseUrl ? "✅ Set" : "❌ Missing"}`)
  console.log(`SUPABASE_SERVICE_KEY: ${supabaseServiceKey ? "✅ Set" : "❌ Missing"}`)
  console.log(`SUPABASE_ANON_KEY: ${supabaseAnonKey ? "✅ Set" : "❌ Missing"}\n`)

  if (!supabaseUrl) {
    console.error("❌ Supabase URL is missing!")
    return
  }

  // Test with service key (admin access)
  if (supabaseServiceKey) {
    console.log("🔑 Testing with Service Key (Admin Access)...")
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    try {
      // Test thomson table
      console.log("\n📊 Testing THOMSON table:")
      const { data: thomsonData, error: thomsonError } = await supabaseAdmin.from("thomson").select("*").limit(5)

      if (thomsonError) {
        console.error("❌ Thomson table error:", thomsonError.message)
      } else {
        console.log(`✅ Thomson table: ${thomsonData?.length || 0} records found`)
        if (thomsonData && thomsonData.length > 0) {
          console.log("📝 Sample Thomson record:")
          console.log(JSON.stringify(thomsonData[0], null, 2))
        }
      }

      // Test dreames table
      console.log("\n📊 Testing DREAMES table:")
      const { data: dreamData, error: dreamError } = await supabaseAdmin.from("dreames").select("*").limit(5)

      if (dreamError) {
        console.error("❌ Dreames table error:", dreamError.message)
      } else {
        console.log(`✅ Dreames table: ${dreamData?.length || 0} records found`)
        if (dreamData && dreamData.length > 0) {
          console.log("📝 Sample Dreame record:")
          console.log(JSON.stringify(dreamData[0], null, 2))
        }
      }

      // Get total counts
      console.log("\n📈 Total Record Counts:")
      const { count: thomsonCount } = await supabaseAdmin.from("thomson").select("*", { count: "exact", head: true })

      const { count: dreamCount } = await supabaseAdmin.from("dreames").select("*", { count: "exact", head: true })

      console.log(`Thomson products: ${thomsonCount || 0}`)
      console.log(`Dreame products: ${dreamCount || 0}`)
    } catch (error) {
      console.error("❌ Service key test failed:", error)
    }
  }

  // Test with anon key (public access)
  if (supabaseAnonKey) {
    console.log("\n🌐 Testing with Anonymous Key (Public Access)...")
    const supabasePublic = createClient(supabaseUrl, supabaseAnonKey)

    try {
      const { data: publicData, error: publicError } = await supabasePublic.from("dreames").select("id, name").limit(3)

      if (publicError) {
        console.error("❌ Public access error:", publicError.message)
        console.log("💡 This might be due to Row Level Security (RLS) policies")
      } else {
        console.log(`✅ Public access works: ${publicData?.length || 0} records accessible`)
      }
    } catch (error) {
      console.error("❌ Public access test failed:", error)
    }
  }

  console.log("\n✨ Connection test completed!")
}

// Run the test
testSupabaseConnection().catch(console.error)
