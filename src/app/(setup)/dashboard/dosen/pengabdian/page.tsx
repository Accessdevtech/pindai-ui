"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import PengabdianDosenPage from "@/modules/dosen/feature/pengabdian/pengabdian-page-dosen"

export default function DashboardPengabdian() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <PengabdianDosenPage />
}
