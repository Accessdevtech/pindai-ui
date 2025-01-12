"use client"

import { useAuthContext } from "@/contexts/auth-context"
import DosenPage from "@/modules/dosen/dosen.page"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardDosen() {
  const pathanme = usePathname()
  const router = useRouter()
  const { isAuthenticated, user } = useAuthContext()

  useEffect(() => {
    if (!isAuthenticated && user?.role !== pathanme.split("/")[2]) {
      router.push(`/dashboard`)
    }
  }, [user, router])
  return <DosenPage role={user?.role} />
}
