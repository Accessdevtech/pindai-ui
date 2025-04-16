"use client"

import { useAuthContext } from "@/contexts/auth-context"
import DetailPenelitianKaprodiPage from "@/modules/kaprodi/feature/penelitian/kaprodi.detail.penelitian"
import { useParams } from "next/navigation"

export default function DashboardPenelitianKaprodi() {
  const { id } = useParams()
  const { user } = useAuthContext()

  if (!id || !user) return null

  return <DetailPenelitianKaprodiPage id={id as string} />
}
