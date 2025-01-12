"use client"
import { useAuthContext } from "@/contexts/auth-context"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardKeuangan() {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, user } = useAuthContext()

  useEffect(() => {
    if (!isAuthenticated && user?.role !== pathname.split("/")[2]) {
      router.push(`/dashboard`)
    }
  }, [isAuthenticated, user, router])
  return (
    <div>
      <div>Dashboard Keuangan</div>
    </div>
  )
}
