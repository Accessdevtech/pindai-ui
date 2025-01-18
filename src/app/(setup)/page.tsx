"use client"
import { useAuthContext } from "@/contexts/auth-context"
import AuthPage from "@/modules/auth/auth.page"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Auth() {
  const { isAuthenticated, user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(`/dashboard/${user.role}`)
    }
  }, [isAuthenticated, router])
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <AuthPage />
    </div>
  )
}
