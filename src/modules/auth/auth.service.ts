import { API_ENDPOINTS } from "@/services/api/api-config"
import { postData } from "@/services/api/http"
import {
  getCookieDecrypted,
  removeCookie,
} from "@/services/storage/cookie-storage-service"
import { RegisterType } from "./schema/register.schema"

export async function register(data: RegisterType) {
  return await postData(API_ENDPOINTS.REGISTER, data)
}

export async function logoutAction() {
  const response = await postData(API_ENDPOINTS.LOGOUT, {})
  await removeCookie("token")
  await removeCookie("user")
  return response.data
}

export async function getCurrentUser() {
  const userCookie = await getCookieDecrypted("user")
  if (!userCookie) return null

  try {
    return userCookie
  } catch (error) {
    return null
  }
}
