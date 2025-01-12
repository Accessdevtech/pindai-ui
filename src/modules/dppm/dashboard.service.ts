import { API_ENDPOINTS_DPPM } from "@/services/api/api-config"
import { getData } from "@/services/api/http"
import { DppmDashboardFakultasResopnse } from "./dashboard.interface"

export async function getDashboardFakultas() {
  const response: DppmDashboardFakultasResopnse = await getData(
    API_ENDPOINTS_DPPM.DASHBOARD,
  )
  return response.data
}
