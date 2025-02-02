"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import DashboardDppm from "@/modules/dppm/dashboard.dppm"

export default function Dashboard() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <DashboardDppm />
}
