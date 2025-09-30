import { Response } from "@/interface/type"
import { API_ENDPOINTS_DPPM } from "@/services/api/api-config"
import { deleteData, getData, postData, putData } from "@/services/api/http"
import { PeriodeType } from "./schema"
import { PeriodeList } from "./type"

export const getPeriode = async ({
  page,
  perPage,
  search
}: {
  page: number
  perPage?: number
  search?: string
}) => {
  const params: Record<string, string | number> = { page }
  if (perPage) params.per_page = perPage
  if (search) params.search = search
  const response: Response<PeriodeList> = await getData(
    API_ENDPOINTS_DPPM.PERIODE,
    params
  )
  console.log(response)
  return response.data
}

export const createPeriode = async (data: PeriodeType) => {
  return await postData(API_ENDPOINTS_DPPM.PERIODE, data)
}

export const updatePeriode = async (id: string, data: PeriodeType) => {
  return await putData(`${API_ENDPOINTS_DPPM.PERIODE}/${id}`, data)
}

export const deletePeriode = async (id: string) => {
  return await deleteData(`${API_ENDPOINTS_DPPM.PERIODE}/${id}`)
}
