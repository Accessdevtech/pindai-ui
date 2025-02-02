"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import PengabdianKaprodiPage from "@/modules/kaprodi/feature/pengabdian/kaprodi.pengabdian.page"

export default function DashboardPengabdian() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <PengabdianKaprodiPage />
}
