"use client"

import DetailPenelitianKaprodiPage from "@/modules/kaprodi/feature/penelitian/kaprodi.detail.penelitian"
import { useParams } from "next/navigation"

export default function DashboardPenelitianKaprodi() {
  const { id } = useParams()

  if (!id) return null

  return <DetailPenelitianKaprodiPage id={id as string} />
}
