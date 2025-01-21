"use client"
import { useAuthContext } from "@/contexts/auth-context"
import KaprodiDashboard from "@/modules/kaprodi/dashboard.kaprodi"

export default function Dashboard() {
  const { user } = useAuthContext()
  return <KaprodiDashboard role={user?.role} />
}
