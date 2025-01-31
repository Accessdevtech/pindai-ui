import { API_ENDPOINTS, API_ENDPOINTS_KAPRODI } from "@/services/api/api-config"
import { getData, postData, putData } from "@/services/api/http"
import {
  KaprodiResponse,
  ProfileKaprodi,
  ResponseDownload,
} from "./kaprodi.interface"
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

export async function downloadDokumen(
  id: string,
  jenis_dokumen: string,
  category: string,
) {
  const response: ResponseDownload = await postData(
    `${API_ENDPOINTS.DOWNLOAD_DOKUMEN}/${id}`,
    { jenis_dokumen, category },
  )
  return response
}
