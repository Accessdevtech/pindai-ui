import {
  FakultasData,
  FakultasResponse,
} from "@/modules/listdata/fakultas.interface"
import { API_ENDPOINTS_DPPM } from "@/services/api/api-config"
import { deleteData, getData, postData, putData } from "@/services/api/http"
import { DppmResponse } from "../../dashboard.interface"
import { FakultasType } from "./fakultas.schema"

export async function getFakultas(
  page: number,
  perPage?: number,
  search?: string,
) {
  const params: Record<string, string | number> = { page }
  if (perPage) params.per_page = perPage
  if (search) params.search = search
  const response: DppmResponse<FakultasData> = await getData(
    API_ENDPOINTS_DPPM.FAKULTAS,
    params,
  )
  return response.data
}

export async function addFakultas(data: FakultasType) {
  const response: FakultasResponse = await postData(
    API_ENDPOINTS_DPPM.FAKULTAS,
    data,
  )
  return response
}

export async function updateFakultas(id: string, data: FakultasType) {
  const response: FakultasResponse = await putData(
    `${API_ENDPOINTS_DPPM.FAKULTAS}/${id}`,
    data,
  )
  return response
}

export async function deleteFakultas(id: string) {
  const response: FakultasResponse = await deleteData(
    `${API_ENDPOINTS_DPPM.FAKULTAS}/${id}`,
  )
  return response
}
