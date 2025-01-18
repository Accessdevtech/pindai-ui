"use client"
import { useAuthContext } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
  const { isAuthenticated, user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && user) {
      return router.push(`/dashboard/${user?.role}`)
    } else {
      return router.push("/")
    }
  })

  return null
}
