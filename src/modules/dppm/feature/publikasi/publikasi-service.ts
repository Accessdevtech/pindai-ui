import { API_ENDPOINTS, API_ENDPOINTS_DPPM } from "@/services/api/api-config"
import { getData, postData } from "@/services/api/http"
import { DppmResponse } from "../../dashboard.interface"
import { PublikasiData, PublikasiList } from "./publikasi-interface"

export const getPublikasi = async (
  page: number,
  perPage?: number,
  search?: string,
  statusKaprodi?: string,
  statusDppm?: string,
  statusKeuangan?: string,
) => {
  const params: Record<string, string | number> = { page }
  if (statusKeuangan) params.status_keuangan = statusKeuangan
  if (statusDppm) params.status_dppm = statusDppm
  if (statusKaprodi) params.status_kaprodi = statusKaprodi
  if (perPage) params.per_page = perPage
  if (search) params.search = search
  const response: DppmResponse<PublikasiData> = await getData(
    API_ENDPOINTS_DPPM.PUBLIKASI,
    params,
  )
  return response.data
}

export const getListPublikasi = async () => {
  const response: DppmResponse<PublikasiList[]> = await getData(
    API_ENDPOINTS.LIST_PUBLIKASI,
  )
  return response
}

export const approvePublikasi = async (id: string) => {
  const response: DppmResponse<PublikasiData> = await postData(
    `${API_ENDPOINTS_DPPM.APPROVED_PUBLIKASI}/${id}`,
    {},
  )
  return response
}

export const canclePublikasi = async (id: string, keterangan: string) => {
  const response: DppmResponse<PublikasiData> = await postData(
    `${API_ENDPOINTS_DPPM.CANCELED_PUBLIKASI}/${id}`,
    { keterangan },
  )
  return response
}
