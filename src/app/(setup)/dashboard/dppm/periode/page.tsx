"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import Periode from "@/modules/dppm/feature/periode/periode"

export default function () {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <Periode role={user.role} />
}
