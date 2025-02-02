"use client"
import { useAuthContext } from "@/contexts/auth-context"
import KaprodiDashboard from "@/modules/kaprodi/dashboard.kaprodi"

export default function Dashboard() {
  const { user } = useAuthContext()
  if (!user) return null
  return <KaprodiDashboard role={user.role} />
}
