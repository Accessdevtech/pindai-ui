"use client"

import DashboardLoader from "@/components/atom/dashboard-loader"
import { useAuthContext } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
  const { isAuthenticated, user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push(`/`)
      return
    }

    if (user?.role) {
      router.push(`/dashboard/${user.role}`)
    }
  }, [isAuthenticated, user, router])
  return <DashboardLoader />
}
