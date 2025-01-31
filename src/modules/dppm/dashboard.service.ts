import { API_ENDPOINTS, API_ENDPOINTS_DPPM } from "@/services/api/api-config"
import { getData, postData } from "@/services/api/http"
import { ResponseDownload } from "../kaprodi/kaprodi.interface"
import { DppmDashboardResopnse } from "./dashboard.interface"

export async function getDashboard() {
  const response: DppmDashboardResopnse = await getData(
    API_ENDPOINTS_DPPM.DASHBOARD,
  )
  return response.data
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
