import { API_ENDPOINTS } from "@/services/api/api-config"
import { putData } from "@/services/api/http"
import { DosenResponse, ProfileDosen } from "./dosen.interface"
import { ProfileType } from "./profile.schema"

export async function updateProfile(data: ProfileType) {
  const response: DosenResponse<ProfileDosen> = await putData(
    API_ENDPOINTS.PROFILE,
    data,
  )
  return response
}
