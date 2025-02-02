"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import DosenPublikasi from "@/modules/dosen/feature/publikasi/dosen-publikasi"

export default function DashboardPublikasi() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <DosenPublikasi />
}
