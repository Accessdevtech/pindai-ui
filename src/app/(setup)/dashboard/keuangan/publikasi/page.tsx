"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import KeuanganPublikasi from "@/modules/keuangan/feature/publikasi/keuangan-publikasi"

export default function DashboardPublikasi() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <KeuanganPublikasi />
}
