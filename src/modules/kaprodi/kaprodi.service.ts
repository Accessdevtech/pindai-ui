import { API_ENDPOINTS, API_ENDPOINTS_KAPRODI } from "@/services/api/api-config"
import { getData, putData } from "@/services/api/http"
import { KaprodiResponse, ProfileKaprodi } from "./kaprodi.interface"
import { ProfileType } from "./kaprodi.profile.schema"

export async function getDashboard() {
  const response = await getData(API_ENDPOINTS_KAPRODI.DASHBOARD)
  return response.data
}

export async function updateProfile(data: ProfileType) {
  const response: KaprodiResponse<ProfileKaprodi> = await putData(
    API_ENDPOINTS.PROFILE,
    data,
  )
  return response
}
