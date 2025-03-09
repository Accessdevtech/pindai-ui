"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import PageProdi from "@/modules/dppm/feature/prodi/page.prodi"

export default function ProdiPage() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <PageProdi role={user.role} />
}
