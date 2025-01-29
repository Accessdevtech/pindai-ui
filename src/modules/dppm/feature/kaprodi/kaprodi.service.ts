import { KaprodiResponse } from "@/modules/kaprodi/kaprodi.interface"
import { API_ENDPOINTS_DPPM } from "@/services/api/api-config"
import { deleteData, getData, postData, putData } from "@/services/api/http"
import { DppmResponse } from "../../dashboard.interface"
import { KaprodiData } from "./kaprodi.interface"
import { KaprodiType } from "./kaprodi.schema"

export async function getKaprodi(
  page: number,
  perPage?: number,
  search?: string,
) {
  const params: Record<string, string | number> = { page }
  if (perPage) params.per_page = perPage
  if (search) params.search = search
  const response: DppmResponse<KaprodiData> = await getData(
    API_ENDPOINTS_DPPM.KAPRODI,
    params,
  )
  return response.data
}

export async function addKaprodi(data: KaprodiType) {
  const response: KaprodiResponse = await postData(API_ENDPOINTS_DPPM.KAPRODI, {
    ...data,
    status: data.status === "true" ? true : false,
  })
  return response
}

export async function updateKaprodi(id: string, data: KaprodiType) {
  const response: KaprodiResponse = await putData(
    `${API_ENDPOINTS_DPPM.KAPRODI}/${id}`,
    {
      ...data,
      status: data.status === "true" ? true : false,
    },
  )
  return response
}

export async function deleteKaprodi(id: string) {
  const response: KaprodiResponse = await deleteData(
    `${API_ENDPOINTS_DPPM.KAPRODI}/${id}`,
  )
  return response
}
