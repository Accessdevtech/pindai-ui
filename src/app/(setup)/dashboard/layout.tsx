"use client"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { useAuthContext } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { PropsWithChildren, useEffect } from "react"

export default function Layout({ children }: PropsWithChildren) {
  const { isAuthenticated, user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && !user) {
      router.push(`/`)
    }
  }, [router, isAuthenticated, user])
  return <DashboardLayout>{children}</DashboardLayout>
}
