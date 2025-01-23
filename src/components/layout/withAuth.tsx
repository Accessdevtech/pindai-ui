"use client"

import { usePathname, useRouter } from "next/navigation"
import React, { useEffect } from "react"

import LoadingPage from "@/components/atom/loading-page"
import { useAuthContext } from "@/contexts/auth-context"

function withAuth<T extends React.JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<T>,
) {
  const Wrapper: React.FC<T> = props => {
    const { user, isLoading, isAuthenticated } = useAuthContext()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
      // not have session
      if (!isLoading && !isAuthenticated && pathname !== "/") {
        router.push("/")
        return
      }

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
    }, [user, router, isLoading, isAuthenticated, pathname])

    if (isLoading) return <LoadingPage />

    // if (!user) {
    //   return null // Optionally render a loading spinner or fallback UI
    //   //   return <div>Loading...</div>;
    // }

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default withAuth
