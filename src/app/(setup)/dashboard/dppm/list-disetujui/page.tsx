"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import DisetujuiPage from "@/modules/dppm/feature/disetujui/disetujui-page"

export default function DashboardListDisetujui() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <DisetujuiPage />
}
