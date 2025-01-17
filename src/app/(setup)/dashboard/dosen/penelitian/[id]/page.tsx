"use client"

import { useAuthContext } from "@/contexts/auth-context"
import { Dosen } from "@/modules/dosen/dosen.interface"
import DetailPenelitianPage from "@/modules/dosen/feature/penelitian/detail-penelitian"
import { useParams } from "next/navigation"

export default function DetailPenelitian() {
  const { user } = useAuthContext()
  const { id } = useParams()

  if (!id || !user) {
    return null
  }

  return <DetailPenelitianPage id={id as string} user={user as Dosen} />
}
