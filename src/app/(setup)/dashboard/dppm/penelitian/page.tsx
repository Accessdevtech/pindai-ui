"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import PenelitianDppmPage from "@/modules/dppm/feature/penelitian/dppm.penelitian.page"

export default function DashboardPenelitian() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <PenelitianDppmPage />
}
