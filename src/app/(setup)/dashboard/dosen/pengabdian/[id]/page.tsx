"use client"

import { useAuthContext } from "@/contexts/auth-context"
import { Dosen } from "@/modules/dosen/dosen.interface"
import DetailPengabdianPage from "@/modules/dosen/feature/pengabdian/detail-pengabdian"
import { useParams } from "next/navigation"

export default function PengabdianDetail() {
  const { user } = useAuthContext()
  const { id } = useParams()

  if (!id || !user) {
    return null
  }
  return <DetailPengabdianPage id={id as string} user={user as Dosen} />
}
