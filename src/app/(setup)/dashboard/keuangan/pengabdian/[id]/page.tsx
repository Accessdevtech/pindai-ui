"use client"

import { useAuthContext } from "@/contexts/auth-context"
import DetailPengabdianKeuanganPage from "@/modules/keuangan/feature/pengabdian/keuangan.detail.pengabdian"
import { useParams } from "next/navigation"

export default function PengabdianDetail() {
  const { id } = useParams()
  const { user } = useAuthContext()
  if (!id || !user) return null
  return <DetailPengabdianKeuanganPage id={id as string} user={user!} />
}
