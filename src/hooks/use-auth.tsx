"use client"

import {
  getCookie,
  removeCookie,
  setCookie
} from "@/services/storage/cookie-storage-service"
import { useCallback, useEffect, useState } from "react"

import { User } from "@/interface/type"
import { decrypt } from "@/lib/crypto"
import { getCurrentUser } from "@/modules/auth/auth.service"
import { LoginType } from "@/modules/auth/schema/login.schema"
import { API_ENDPOINTS } from "@/services/api/api-config"
import { postData } from "@/services/api/http"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true) // State loadig
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user
  const pathname = usePathname()
  const router = useRouter()

  const login = useCallback(
    async (data: LoginType) => {
      try {
        const res = await postData(API_ENDPOINTS.LOGIN, data)
        const decryptedUser = JSON.parse(decrypt(res.data.user).data as string)

        setUser(decryptedUser)
        await setCookie("token", res.data.access_token)
        await setCookie("user", res.data.user)

        toast.success(res.message)

        router.push(`/dashboard`)
      } catch (err: any) {
        const errors = err.response?.data.errors
        if (errors) {
          Object.values(errors).forEach(value => toast.error(value as string))
        }
        toast.error(err.response?.data?.message || "Login failed.")
      }
    },
    [router]
  )

  const logout = useCallback(async () => {
    try {
      const res = await postData(API_ENDPOINTS.LOGOUT, {})
      setUser(null)

      await removeCookie("token")
      await removeCookie("user")

      toast.success(res.message)
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to logout.")
    } finally {
      router.push("/")
    }
  }, [router])

  const checkAuth = useCallback(async () => {
    setIsLoading(true) // Mulai loading
    const token = await getCookie("token")
    if (!token && pathname !== "/forgot-password") router.push("/")
    if (token) {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Error checking authentication:", error)
        logout()
      }
    }
    setIsLoading(false) // Selesai loading
  }, [logout, pathname])

  useEffect(() => {
    const initAuth = async () => {
      const userFromCookie = await getCookie("user") // Ambil user dari cookie
      if (userFromCookie) {
        const decryptedUser = JSON.parse(decrypt(userFromCookie).data as string)
        setUser(decryptedUser) // Set user ke state dari cookie
      }
      checkAuth() // Lakukan cek autentikasi
    }
    initAuth()
    // checkAuth()
  }, [checkAuth])

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  }
}
