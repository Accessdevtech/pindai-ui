"use client"
import ComingSoon from "@/components/molecules/coming-soon"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import { useParams } from "next/navigation"

export default function EditPage() {
  const { user } = useRequiredAuth()
  const { id } = useParams()

  if (!id || !user) {
    return null
  }
  return <ComingSoon />
}
