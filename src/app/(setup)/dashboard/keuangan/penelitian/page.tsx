"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import PenelitianKeuanganPage from "@/modules/keuangan/feature/penelitian/keuangan.penelitian"

export default function DashboardPenelitian() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <PenelitianKeuanganPage />
}
