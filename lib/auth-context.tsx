"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  username: string
  role: string
}

type AuthContextType = {
  user: User | null
  isLoggedIn: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true"
        setIsLoggedIn(loggedIn)

        if (loggedIn) {
          const userData = localStorage.getItem("user")
          if (userData) {
            setUser(JSON.parse(userData))
          }
        }
      } catch (error) {
        console.error("Error checking login status:", error)
      } finally {
        setLoading(false)
      }
    }

    checkLoginStatus()
  }, [])

  // Protect admin routes
  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn && pathname?.startsWith("/admin")) {
        router.push("/login")
      }
    }
  }, [loading, isLoggedIn, pathname, router])

  const login = async (username: string, password: string): Promise<boolean> => {
    // For demo purposes, we'll use a simple hardcoded check
    if (username === "admin" && password === "admin123") {
      const userData = { username, role: "admin" }
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    setUser(null)
    setIsLoggedIn(false)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
