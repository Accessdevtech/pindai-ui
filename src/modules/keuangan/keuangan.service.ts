import { API_ENDPOINTS_KEUANGAN } from "@/services/api/api-config"
import { getData } from "@/services/api/http"
import { KeuanganDashboard, KeuanganResponse } from "./keuangan.interface"

export async function getDashboard() {
  const response: KeuanganResponse<KeuanganDashboard> = await getData(
    API_ENDPOINTS_KEUANGAN.DASHBOARD,
  )
  return response.data
}
