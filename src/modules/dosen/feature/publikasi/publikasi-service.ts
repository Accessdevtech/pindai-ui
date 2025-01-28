import { API_ENDPOINTS, API_ENDPOINTS_DOSEN } from "@/services/api/api-config"
import { deleteData, getData, postData, putData } from "@/services/api/http"
import { DosenResponse } from "../../dosen.interface"
import { Publikasi, PublikasiData, PublikasiList } from "./publikasi-interface"
import { PublikasiType } from "./schema/publikasi-schema"

export const getPublikasi = async (
  page: number,
  search?: string,
  status_kaprodi?: string,
  status_dppm?: string,
  status_keuangan?: string,
) => {
  const params: Record<string, string | number> = { page }
  if (status_kaprodi) params.status_kaprodi = status_kaprodi
  if (status_dppm) params.status_dppm = status_dppm
  if (status_keuangan) params.status_keuangan = status_keuangan
  if (search) params.search = search
  const response: DosenResponse<PublikasiData> = await getData(
    API_ENDPOINTS_DOSEN.PUBLIKASI,
    params,
  )
  return response.data
}

export const getListPublikasi = async () => {
  const response: DosenResponse<PublikasiList[]> = await getData(
    API_ENDPOINTS.LIST_PUBLIKASI,
  )
  return response
}

export const createPublikasi = async (data: PublikasiType) => {
  const response: DosenResponse<Publikasi> = await postData(
    API_ENDPOINTS_DOSEN.PUBLIKASI,
    data,
  )
  return response
}

export const updatePublikasi = async (id: string, data: PublikasiType) => {
  const response: DosenResponse<Publikasi> = await putData(
    `${API_ENDPOINTS_DOSEN.PUBLIKASI}/${id}`,
    data,
  )
  return response
}

export const deletePublikasi = async (id: string) => {
  const resopnse: DosenResponse<Publikasi> = await deleteData(
    `${API_ENDPOINTS_DOSEN.PUBLIKASI}/${id}`,
  )
  return resopnse
}
