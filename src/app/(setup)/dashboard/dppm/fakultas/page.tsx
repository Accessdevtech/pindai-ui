"use client"
import { useAuthContext } from "@/contexts/auth-context"
import FakultasPage from "@/modules/dppm/feature/fakultas/fakultas.page"

export default function DashboardFakultas() {
  const { user } = useAuthContext()
  if (!user) return null
  return <FakultasPage role={user.role} />
}
