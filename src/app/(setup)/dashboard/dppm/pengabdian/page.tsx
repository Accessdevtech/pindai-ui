"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import PengabdianDppmPage from "@/modules/dppm/feature/pengabdian/dppm.pengabdian.page"

export default function DashboardPengabdian() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <PengabdianDppmPage />
}
