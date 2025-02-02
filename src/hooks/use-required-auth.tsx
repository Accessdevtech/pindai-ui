"use client"
import { useAuthContext } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useRequiredAuth() {
  const { user, isAuthenticated } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && user === null) {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  return { user }
}
