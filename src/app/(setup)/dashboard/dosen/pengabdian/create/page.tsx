"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import CreatePengabdian from "@/modules/dosen/feature/pengabdian/create-pengabdian"

export default function CreatePagePengabdian() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <CreatePengabdian />
}
