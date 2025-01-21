"use client"
import { useAuthContext } from "@/contexts/auth-context"
import DosenPage from "@/modules/dosen/dosen.page"

export default function DashboardDosen() {
  const { user } = useAuthContext()
  return <DosenPage role={user?.role} />
}
