"use client"
import { useAuthContext } from "@/contexts/auth-context"
import DetailPengabdianDppmPage from "@/modules/dppm/feature/pengabdian/dppm.detail.pengabdian"
import { useParams } from "next/navigation"

export default function PengabdianDetail() {
  const { id } = useParams()
  const { user } = useAuthContext()
  if (!id || !user) return null
  return <DetailPengabdianDppmPage id={id as string} user={user!} />
}
