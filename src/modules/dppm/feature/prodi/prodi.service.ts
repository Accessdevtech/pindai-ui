import { Response } from "@/interface/type"
import { API_ENDPOINTS_DPPM } from "@/services/api/api-config"
import { deleteData, getData, postData, putData } from "@/services/api/http"
import { IProdi, ProdiData } from "./prodi.interface"
import { ProdiType } from "./prodi.schema"

export async function getProdi(
  page: number,
  perPage?: number,
  search?: string,
) {
  const params: Record<string, string | number> = { page }
  if (perPage) params.per_page = perPage
  if (search) params.search = search
  const response: Response<ProdiData> = await getData(
    API_ENDPOINTS_DPPM.PRODI,
    params,
  )
  return response.data
}

export async function addProdi(data: ProdiType) {
  const response: Response<IProdi> = await postData(
    API_ENDPOINTS_DPPM.PRODI,
    data,
  )
  return response
}

export async function updateProdi(id: string, data: ProdiType) {
  const response: Response<IProdi> = await putData(
    `${API_ENDPOINTS_DPPM.PRODI}/${id}`,
    data,
  )
  return response
}

export async function deleteProdi(id: string) {
  const response: Response<IProdi> = await deleteData(
    `${API_ENDPOINTS_DPPM.PRODI}/${id}`,
  )
  return response
}
