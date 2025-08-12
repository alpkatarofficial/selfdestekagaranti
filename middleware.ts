import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check for authentication in localStorage instead of cookies
  // Since we can't access localStorage directly in middleware,
  // we'll rely on the auth context to handle this

  // For demo purposes, we'll just let the client-side auth handle protection
  // In a real app, you would use a server-side session or JWT token

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
