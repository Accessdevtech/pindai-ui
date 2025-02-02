"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import PenelitianKaprodiPage from "@/modules/kaprodi/feature/penelitian/kaprodi.penelitian.page"

export default function DashboardPenelitian() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <PenelitianKaprodiPage />
}
