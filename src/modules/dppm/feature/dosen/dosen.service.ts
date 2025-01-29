import { API_ENDPOINTS_DPPM } from "@/services/api/api-config"
import { getData } from "@/services/api/http"
import { DppmResponse } from "../../dashboard.interface"
import { DosenData } from "./dosen.interface"

export async function getDosen(
  page: number,
  perPage?: number,
  search?: string,
) {
  const params: Record<string, string | number> = { page }
  if (perPage) params.per_page = perPage
  if (search) params.search = search
  const response: DppmResponse<DosenData> = await getData(
    API_ENDPOINTS_DPPM.DOSEN,
    params,
  )

  return response.data
}
