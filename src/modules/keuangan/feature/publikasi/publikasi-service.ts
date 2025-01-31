import {
  API_ENDPOINTS,
  API_ENDPOINTS_KEUANGAN,
} from "@/services/api/api-config"
import { getData, postData } from "@/services/api/http"
import { KeuanganResponse } from "../../keuangan.interface"
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
  const response: KeuanganResponse<PublikasiData> = await getData(
    API_ENDPOINTS_KEUANGAN.PUBLIKASI,
    params,
  )
  return response.data
}

export const getListPublikasi = async () => {
  const response: KeuanganResponse<PublikasiList[]> = await getData(
    API_ENDPOINTS.LIST_PUBLIKASI,
  )
  return response
}

export const approvePublikasi = async (id: string) => {
  const response: KeuanganResponse<PublikasiData> = await postData(
    `${API_ENDPOINTS_KEUANGAN.APPROVED_PUBLIKASI}/${id}`,
    {},
  )
  return response
}
