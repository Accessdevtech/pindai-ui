"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import EditPenelitian from "@/modules/dosen/feature/penelitian/edit-penelitian"
import { useParams } from "next/navigation"

export default function EditPage() {
  const { user } = useRequiredAuth()
  const { id } = useParams()

  if (!id || !user) {
    return null
  }
  return <EditPenelitian id={id as string} />
}
