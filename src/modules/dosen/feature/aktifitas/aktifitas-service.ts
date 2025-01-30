import { API_ENDPOINTS_DOSEN } from "@/services/api/api-config"
import { getData } from "@/services/api/http"
import { DosenResponse } from "../../dosen.interface"
import { AktifitasData } from "./aktifitas-interface"

export async function getAktifitasPenelitian(page: number, search?: string) {
  const params: Record<string, string | number> = { page }
  if (search) params.search = search
  const response: DosenResponse<AktifitasData> = await getData(
    API_ENDPOINTS_DOSEN.TRACKING_PENELITIAN,
    params,
  )
  return response.data
}

export async function getAktifitasPengabdian(page: number, search?: string) {
  const params: Record<string, string | number> = { page }
  if (search) params.search = search
  const response: DosenResponse<AktifitasData> = await getData(
    API_ENDPOINTS_DOSEN.TRACKING_PENGABDIAN,
    params,
  )
  return response.data
}

export async function getAktifitasPublikasi(page: number, search?: string) {
  const params: Record<string, string | number> = { page }
  if (search) params.search = search
  const response: DosenResponse<AktifitasData> = await getData(
    API_ENDPOINTS_DOSEN.TRACKING_PUBLIKASI,
    params,
  )
  return response.data
}
