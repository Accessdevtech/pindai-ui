"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import KeuanganPage from "@/modules/keuangan/keuangan.page"

export default function DashboardKeuangan() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <KeuanganPage />
}
