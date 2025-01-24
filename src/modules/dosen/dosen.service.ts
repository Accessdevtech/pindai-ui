import { API_ENDPOINTS, API_ENDPOINTS_DOSEN } from "@/services/api/api-config"
import { getData, putData } from "@/services/api/http"
import { DosenResponse, ProfileDosenUser } from "./dosen.interface"
import { ProfileType } from "./profile.schema"

export async function getDashboard() {
  const response = await getData(API_ENDPOINTS_DOSEN.DASHBOARD)
  return response.data
}

export async function updateProfile(data: ProfileType) {
  const response: DosenResponse<ProfileDosenUser> = await putData(
    API_ENDPOINTS.PROFILE,
    data,
  )
  return response
}
