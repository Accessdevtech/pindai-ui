"use client"

import DetailPengabdianKeuanganPage from "@/modules/keuangan/feature/pengabdian/keuangan.detail.pengabdian"
import { useParams } from "next/navigation"

export default function PengabdianDetail() {
  const { id } = useParams()
  if (!id) return null
  return <DetailPengabdianKeuanganPage id={id as string} />
}
