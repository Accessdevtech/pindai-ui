"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import DokumentPage from "@/modules/dppm/feature/configurasi/dokumen/dokumen"

export default function Page() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <DokumentPage />
}
