"use client"
import { useAuthContext } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { PropsWithChildren, useEffect } from "react"

export default function Layout({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/dashboard`)
    }
  }, [isAuthenticated, router])
  return children
}
