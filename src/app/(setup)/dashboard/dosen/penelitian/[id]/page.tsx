"use client"

import DetailPenelitianPage from "@/modules/dosen/feature/penelitian/detail-penelitian"
import { useParams } from "next/navigation"

export default function DetailPenelitian() {
  const { id } = useParams()

  if (!id) {
    return null
  }

  return <DetailPenelitianPage id={id as string} />
}
