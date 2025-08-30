"use client"

import { usePathname, useRouter } from "next/navigation"
import React, { useEffect } from "react"

import LoadingPage from "@/components/molecules/loading-page"
import { useAuthContext } from "@/contexts/auth-context"

function withAuth<T extends React.JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<T>
) {
  const Wrapper: React.FC<T> = props => {
    const { user, isLoading, isAuthenticated } = useAuthContext()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
      //  have session
      if (
        !isLoading &&
        isAuthenticated &&
        user?.role &&
        (pathname === `/dashboard` || pathname === "/")
      ) {
        router.push(`/dashboard/${user.role}`)
        return
      }
      // no session
      if (!isLoading && !isAuthenticated && pathname !== "/forgot-password") {
        router.push("/")
        return
      }
    }, [user, router, isLoading, isAuthenticated, pathname])

    if (isLoading) return <LoadingPage />

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default withAuth
