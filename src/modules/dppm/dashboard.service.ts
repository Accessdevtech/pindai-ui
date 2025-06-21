import { UserType } from "@/schema/user"
import { API_ENDPOINTS, API_ENDPOINTS_DPPM } from "@/services/api/api-config"
import { getData, postData, putData } from "@/services/api/http"
import { ResponseDownload } from "../kaprodi/kaprodi.interface"
import { DppmDashboardResopnse, DppmResponse } from "./dashboard.interface"

export async function getDashboard() {
  const response: DppmDashboardResopnse = await getData(
    API_ENDPOINTS_DPPM.DASHBOARD,
  )
  return response.data
}

export async function updateProfile(data: UserType) {
  const response: DppmResponse<UserType> = await putData(
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
