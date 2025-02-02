"use client"

import { useAuthContext } from "@/contexts/auth-context"
import DetailPengabdianKaprodiPage from "@/modules/kaprodi/feature/pengabdian/kaprodi.detail.pengabdian"
import { Kaprodi } from "@/modules/kaprodi/kaprodi.interface"
import { useParams } from "next/navigation"

export default function PengabdianDetail() {
  const { id } = useParams()
  const { user } = useAuthContext()

  if (!id || !user) return null

  return (
    <DetailPengabdianKaprodiPage id={id as string} user={user as Kaprodi} />
  )
}
