"use client"
import ComingSoon from "@/components/molecules/coming-soon"
import { useRequiredAuth } from "@/hooks/use-required-auth"

export default function EditPage() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <ComingSoon />
}
