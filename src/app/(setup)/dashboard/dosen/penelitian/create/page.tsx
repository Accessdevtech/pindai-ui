"use client"
import { useRequiredAuth } from "@/hooks/use-required-auth"
import CreatePenelitian from "@/modules/dosen/feature/penelitian/create-penelitian"

export default function CreatePagePenelitian() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return <CreatePenelitian />
}
