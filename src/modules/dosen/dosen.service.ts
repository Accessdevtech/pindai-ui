import { Response } from "@/interface/type"
import { API_ENDPOINTS } from "@/services/api/api-config"
import axiosInstance from "@/services/api/axios-instance"
import { ProfileType } from "./profile.schema"

export async function updateProfile(data: ProfileType) {
  const response: Response = await axiosInstance.put(
    API_ENDPOINTS.PROFILE,
    data,
  )
  return response
}
