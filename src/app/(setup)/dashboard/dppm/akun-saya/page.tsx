"use client"
import { IProfileDosen } from "@/modules/dosen/dosen.interface"
import ProfileDosen from "@/modules/dosen/dosen.profile"
import { useUserProfile } from "@/modules/dosen/hooks/use-profile/get-profile"

export default function Profile() {
  const { data: user, refetch } = useUserProfile()
  if (!user) return null
  return <ProfileDosen user={user as IProfileDosen} refetch={refetch} />
}
