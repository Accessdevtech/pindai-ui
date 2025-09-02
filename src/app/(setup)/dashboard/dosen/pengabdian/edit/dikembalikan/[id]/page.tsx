"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import EditDikembalikanPengabdian from "@/modules/dosen/feature/pengabdian/edit-dikembalikan"
import { useParams } from "next/navigation"

export default function EditPage() {
  const { user } = useRequiredAuth()
  const { id } = useParams()

  if (!id || !user) {
    return null
  }
  return <EditDikembalikanPengabdian id={id as string} />
}
