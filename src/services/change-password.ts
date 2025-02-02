import { ChangePasswordType } from "@/schema/user"
import { API_ENDPOINTS } from "./api/api-config"
import { putData } from "./api/http"

export const changePassword = (data: ChangePasswordType) => {
  const response = putData(API_ENDPOINTS.CHANGE_PASSWORD, data)
  return response
}
