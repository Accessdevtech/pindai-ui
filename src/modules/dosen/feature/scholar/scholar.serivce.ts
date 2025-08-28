import { API_ENDPOINTS } from "@/services/api/api-config"
import { getData } from "@/services/api/http"
import {
  ScholarData,
  ScholarProfileResponse,
  ScholarResponse
} from "./scholar.interface"

export async function getScholarId(search?: string) {
  const params: Record<string, string | number> = {}
  if (search) params.search = search

  const response: ScholarResponse<ScholarData> = await getData(
    API_ENDPOINTS.LIST_SCHOLAR,
    params
  )
  return response
}

export async function getScholarProfile(id: string) {
  const response: ScholarProfileResponse = await getData(
    `${API_ENDPOINTS.LIST_SCHOLAR}/${id}`
  )
  return response.data
}
