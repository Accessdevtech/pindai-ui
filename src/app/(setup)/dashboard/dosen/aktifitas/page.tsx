"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import AktifitasPage from "@/modules/dosen/feature/aktifitas/aktifitas-page"

export default function AktifitasDashboard() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <AktifitasPage />
}
