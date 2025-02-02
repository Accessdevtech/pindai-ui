"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import MasterLuaranPage from "@/modules/dppm/feature/master-luaran/dashboard-master-luaran"

export default function DashboardMasterLuaran() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <MasterLuaranPage />
}
