"use client"
import DetailPenelitianDppmPage from "@/modules/dppm/feature/penelitian/dppm.detail.penelitian"
import { useParams } from "next/navigation"

export default function DashboardPenelitianDppm() {
  const { id } = useParams()

  if (!id) return null

  return <DetailPenelitianDppmPage id={id as string} />
}
