import { API_ENDPOINTS_DPPM } from "@/services/api/api-config"
import { getData } from "@/services/api/http"
import { DppmResponse } from "../../dashboard.interface"
import { DosenData } from "./dosen.interface"

export async function getDosen(page: number, search: string) {
  const response: DppmResponse<DosenData> = await getData(
    API_ENDPOINTS_DPPM.DOSEN,
    {
      page,
      search,
    },
  )

  return response.data
}
