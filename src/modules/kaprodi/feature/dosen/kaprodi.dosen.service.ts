import { DosenData } from "@/modules/dppm/feature/dosen/dosen.interface"
import { API_ENDPOINTS_KAPRODI } from "@/services/api/api-config"
import axiosInstance from "@/services/api/axios-instance"
import { getData } from "@/services/api/http"
import { KaprodiResponse } from "../../kaprodi.interface"

export async function getDosen(
  page: number,
  perPage?: number,
  search?: string,
) {
  const params: Record<string, string | number> = { page }
  if (perPage) params.per_page = perPage
  if (search) params.search = search
  const response: KaprodiResponse<DosenData> = await getData(
    API_ENDPOINTS_KAPRODI.DOSEN,
    params,
  )

  return response.data
}
export async function approveDosen(id: string) {
  const response = await axiosInstance.post(
    `${API_ENDPOINTS_KAPRODI.APPROVED}/${id}`,
    {},
  )
  return response.data
}

export async function activeDosen(id: string, is_active: boolean) {
  const response = await axiosInstance.post(
    `${API_ENDPOINTS_KAPRODI.ACTIVE}/${id}`,
    { is_active },
  )
  return response.data
}
