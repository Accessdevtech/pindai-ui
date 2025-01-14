"use client"
import { useAuthContext } from "@/contexts/auth-context"
import { IProfileDosen } from "@/modules/dosen/dosen.interface"
import ProfileDosen from "@/modules/dosen/dosen.profile"

export default function Profile() {
  const { user } = useAuthContext()
  if (!user) return null
  return <ProfileDosen user={user as IProfileDosen} />
}
