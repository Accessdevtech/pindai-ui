"use client"
import { User } from "@/interface/type"
import { decrypt } from "@/lib/crypto"
import { getCurrentUser } from "@/modules/auth/auth.service"
import { LoginType } from "@/modules/auth/schema/login.schema"
import { API_ENDPOINTS } from "@/services/api/api-config"
import { postData } from "@/services/api/http"
import {
  getCookie,
  removeCookie,
  setCookie,
} from "@/services/storage/cookie-storage-service"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user
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
      } catch (err: any) {
        if (err.response?.data.errors) {
          for (const [key, value] of Object.entries(err.response.data.errors)) {
            toast.error(value as string)
          }
        }
        toast.error(err.response?.data?.message)
      } finally {
        if (!isAuthenticated) return
        router.push(`/dashboard/${user.role}`)
      }
    },
    [router],
  )

  const logout = useCallback(async () => {
    try {
      const res = await postData(API_ENDPOINTS.LOGOUT, {})
      setUser(null)
      await removeCookie("token")
      await removeCookie("user")
      toast.success(res.message)
      router.push("/")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to logout.")
    } finally {
      if (!isAuthenticated) {
        router.push("/")
      }
    }
  }, [router])

  const checkAuth = useCallback(async () => {
    const token = await getCookie("token")
    if (token) {
      try {
        const user = await getCurrentUser()
        if (user) {
          setUser(user)
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        logout()
      }
    }
  }, [logout])

  useEffect(() => {
    const authenticate = async () => {
      await checkAuth()
    }
    if (!isAuthenticated) {
      authenticate()
    }
  }, [getCurrentUser])

  return {
    user,
    isAuthenticated,
    login,
    logout,
  }
}
