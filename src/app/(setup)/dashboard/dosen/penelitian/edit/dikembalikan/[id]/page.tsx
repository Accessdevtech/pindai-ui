"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import EditDikembalikanPenelitian from "@/modules/dosen/feature/penelitian/edit-dikembalikan"
import { useParams } from "next/navigation"

export default function EditPage() {
  const { user } = useRequiredAuth()
  const { id } = useParams()

  if (!id || !user) {
    return null
  }
  return <EditDikembalikanPenelitian id={id as string} />
}
