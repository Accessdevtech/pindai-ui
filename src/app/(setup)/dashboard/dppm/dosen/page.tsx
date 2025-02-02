"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import DosenPageDppm from "@/modules/dppm/feature/dosen/dppm.dosen.page"

export default function DashboardDosen() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <DosenPageDppm />
}
