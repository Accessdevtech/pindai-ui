"use client"
import DetailPengabdianDppmPage from "@/modules/dppm/feature/pengabdian/dppm.detail.pengabdian"
import { useParams } from "next/navigation"

export default function PengabdianDetail() {
  const { id } = useParams()
  if (!id) return null
  return <DetailPengabdianDppmPage id={id as string} />
}
