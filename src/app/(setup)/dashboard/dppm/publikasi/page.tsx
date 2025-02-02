"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import DppmPublikasi from "@/modules/dppm/feature/publikasi/dppm-publikasi"

export default function DashboardPublikasi() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <DppmPublikasi />
}
