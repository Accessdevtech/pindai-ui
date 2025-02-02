"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import DibatalkanPage from "@/modules/dppm/feature/dibatalkan/dibatalkan-page"

export default function DashboardListDibatalkan() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <DibatalkanPage />
}
