"use client"
import { useAuthContext } from "@/contexts/auth-context"
import DetailPenelitianDppmPage from "@/modules/dppm/feature/penelitian/dppm.detail.penelitian"
import { useParams } from "next/navigation"

export default function DashboardPenelitianDppm() {
  const { id } = useParams()

  const { user } = useAuthContext()

  if (!id || !user) return null

  return <DetailPenelitianDppmPage id={id as string} user={user!} />
}
