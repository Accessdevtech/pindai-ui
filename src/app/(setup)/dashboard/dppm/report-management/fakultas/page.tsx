"use client"

import { useRequiredAuth } from "@/hooks/use-required-auth"

export default function ReportManagementFakultas() {
  const { user } = useRequiredAuth()
  if (!user) return null
  return (
    <div>
      <div>Report Management Fakultas</div>
    </div>
  )
}
