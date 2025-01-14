"use client"
import { useAuthContext } from "@/contexts/auth-context"
import { Dosen } from "@/modules/dosen/dosen.interface"
import ScholarPage from "@/modules/dosen/feature/scholar/scholar.page"

export default function DashboardScholar() {
  const { user } = useAuthContext()
  if (!user) return null
  return <ScholarPage scholarId={(user as Dosen)?.scholar_id} />
}
