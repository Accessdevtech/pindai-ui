"use client"

import DetailPengabdianKaprodiPage from "@/modules/kaprodi/feature/pengabdian/kaprodi.detail.pengabdian"
import { useParams } from "next/navigation"

export default function PengabdianDetail() {
  const { id } = useParams()

  if (!id) return null

  return <DetailPengabdianKaprodiPage id={id as string} />
}
