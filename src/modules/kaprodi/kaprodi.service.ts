import { API_ENDPOINTS } from "@/services/api/api-config"
import { putData } from "@/services/api/http"
import { KaprodiResponse, ProfileKaprodi } from "./kaprodi.interface"
import { ProfileType } from "./kaprodi.profile.schema"

export async function updateProfile(data: ProfileType) {
  const response: KaprodiResponse<ProfileKaprodi> = await putData(
    API_ENDPOINTS.PROFILE,
    data,
  )
  return response
}
