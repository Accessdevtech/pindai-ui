import { API_ENDPOINTS_DPPM } from "@/services/api/api-config"
import { getData } from "@/services/api/http"
import { DppmDashboardResopnse } from "./dashboard.interface"

export async function getDashboard() {
  const response: DppmDashboardResopnse = await getData(
    API_ENDPOINTS_DPPM.DASHBOARD,
  )
  return response.data
}
