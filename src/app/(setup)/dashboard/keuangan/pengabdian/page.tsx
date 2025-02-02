"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import PengabdianKeuanganPage from "@/modules/keuangan/feature/pengabdian/keuangan.pengabdian"

export default function DashboardPengabdian() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <PengabdianKeuanganPage />
}
