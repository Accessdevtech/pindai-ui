"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import PenelitianDosenPage from "@/modules/dosen/feature/penelitian/penelitian-page-dosen"

export default function DashboardPenelitian() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <PenelitianDosenPage />
}
