"use client"
import DetailPenelitianKeuanganPage from "@/modules/keuangan/feature/penelitian/keuangan.detail.penelitian"
import { useParams } from "next/navigation"

export default function DashboardPenelitianKeuangan() {
  const { id } = useParams()

  if (!id) return null

  return <DetailPenelitianKeuanganPage id={id as string} />
}
