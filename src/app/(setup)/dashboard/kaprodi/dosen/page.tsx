"use client"

import { useAuthContext } from "@/contexts/auth-context"
import KaprodiDashboardDosen from "@/modules/kaprodi/feature/dosen/kaprodi.dosen"

export default function DashboardDosen() {
  const { user } = useAuthContext()

  if (!user) return null
  return <KaprodiDashboardDosen role={user.role} />
}
