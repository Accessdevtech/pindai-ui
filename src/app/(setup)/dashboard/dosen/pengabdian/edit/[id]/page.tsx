"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import EditPengabdian from "@/modules/dosen/feature/pengabdian/edit-pengabdian"
import { useParams } from "next/navigation"

export default function EditPage() {
  const { user } = useRequiredAuth()
  const params = useParams()
  const { id } = useParams()

  if (!id || !user) {
    return null
  }
  return <EditPengabdian id={id as string} />
}
