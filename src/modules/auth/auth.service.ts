import { Response, User } from "@/interface/type"
import { API_ENDPOINTS } from "@/services/api/api-config"
import { getData, postData } from "@/services/api/http"
import {
  getCookieDecrypted,
  removeCookie
} from "@/services/storage/cookie-storage-service"
import {
  ForgotPasswordEmailType,
  ForgotPasswordResetType
} from "./schema/forgot-password.schema"
import { RegisterType } from "./schema/register.schema"

export async function register(data: RegisterType) {
  const response = await postData(API_ENDPOINTS.REGISTER, data)
  return response
}

export async function logoutAction() {
  const response = await postData(API_ENDPOINTS.LOGOUT, {})
  await removeCookie("token")
  await removeCookie("user")
  return response.data
}

export async function profileUser() {
  const response: Response<User> = await getData(API_ENDPOINTS.PROFILE)
  return response.data
}

export async function getCurrentUser() {
  const user: User = await getCookieDecrypted("user")

  return user
}

export async function forgotPasswordEmail(data: ForgotPasswordEmailType) {
  const response = await postData(API_ENDPOINTS.FORGOT_PASSWORD, data)
  return response
}

export async function forgotPasswordReset(data: ForgotPasswordResetType) {
  const response = await postData(API_ENDPOINTS.RESET_PASSWORD, data)
  return response
}
