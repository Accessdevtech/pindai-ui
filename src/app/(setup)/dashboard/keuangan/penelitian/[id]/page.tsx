"use client"
import { useAuthContext } from "@/contexts/auth-context"
import DetailPenelitianKeuanganPage from "@/modules/keuangan/feature/penelitian/keuangan.detail.penelitian"
import { useParams } from "next/navigation"

export default function DashboardPenelitianKeuangan() {
  const { id } = useParams()
  const { user } = useAuthContext()

  if (!id) return null

  return <DetailPenelitianKeuanganPage id={id as string} user={user!} />
}
