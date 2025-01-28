import {
  API_ENDPOINTS,
  API_ENDPOINTS_KEUANGAN,
} from "@/services/api/api-config"
import { getData, postData } from "@/services/api/http"
import { KeuanganResponse } from "../../keuangan.interface"
import { PublikasiData, PublikasiList } from "./publikasi-interface"

export const getPublikasi = async (page: number, search?: string) => {
  const params: Record<string, string | number> = { page }
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
