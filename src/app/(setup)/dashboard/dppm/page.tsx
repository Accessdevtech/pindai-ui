"use client"
import { useAuthContext } from "@/contexts/auth-context"
import DashboardDppm from "@/modules/dppm/dashboard.dppm"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuthContext()
  const route = useRouter()
  useEffect(() => {
    if (!isAuthenticated && user?.role !== pathname.split("/")[2]) {
      return route.push("/dashboard")
    }
  }, [isAuthenticated, user, route])
  return <DashboardDppm />
}
