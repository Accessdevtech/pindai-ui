"use client"
import { useAuthContext } from "@/contexts/auth-context"
import { IKaprodiProfile } from "@/modules/kaprodi/kaprodi.interface"
import ProfileKaprodi from "@/modules/kaprodi/kaprodi.profile"

export default function Profile() {
  const { user } = useAuthContext()
  if (!user) return null

  return <ProfileKaprodi user={user as IKaprodiProfile} />
}
