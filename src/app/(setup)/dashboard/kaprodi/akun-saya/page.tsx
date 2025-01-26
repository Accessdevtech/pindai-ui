"use client"
import { useUserProfile } from "@/modules/dosen/hooks/use-profile/get-profile"
import { IKaprodiProfile } from "@/modules/kaprodi/kaprodi.interface"
import ProfileKaprodi from "@/modules/kaprodi/kaprodi.profile"

export default function Profile() {
  const { data: user } = useUserProfile()
  if (!user) return null

  return <ProfileKaprodi user={user as IKaprodiProfile} />
}
