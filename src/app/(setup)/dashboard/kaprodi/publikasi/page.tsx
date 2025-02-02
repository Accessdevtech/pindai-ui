"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import KaprodiPublikasi from "@/modules/kaprodi/feature/publikasi/kaprodi-publikasi"

export default function DashboardPublikasi() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <KaprodiPublikasi />
}
