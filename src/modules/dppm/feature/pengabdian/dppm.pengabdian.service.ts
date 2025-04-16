import {
  DetailPengabdian,
  PengabdianDosenData,
} from "@/modules/dosen/feature/pengabdian/pengabdian-dosen.interface"
import { API_ENDPOINTS_DPPM } from "@/services/api/api-config"
import { getData, postData } from "@/services/api/http"
import { DppmResponse } from "../../dashboard.interface"

export async function getPengabdianDppm(
  page: number,
  perPage?: number,
  search?: string,
  tahun_akademik?: string,
  status_kaprodi?: string,
  status_dppm?: string,
  status_keuangan?: string,
) {
  const params: Record<string, string | number> = { page }
  if (status_keuangan) params.status_keuangan = status_keuangan
  if (status_kaprodi) params.status_kaprodi = status_kaprodi
  if (tahun_akademik) params.tahun_akademik = tahun_akademik
  if (status_dppm) params.status_dppm = status_dppm
  if (perPage) params.per_page = perPage
  if (search) params.search = search
  const response: DppmResponse<PengabdianDosenData> = await getData(
    API_ENDPOINTS_DPPM.PENGABDIAN,
    params,
  )
  return response.data
}

export async function getDetailPengabdian(id: string) {
  const response: DppmResponse<DetailPengabdian> = await getData(
    `${API_ENDPOINTS_DPPM.PENGABDIAN}/${id}`,
  )
  return response.data
}

export async function approvePengabdian(id: string) {
  const response = await postData(
    `${API_ENDPOINTS_DPPM.APPROVED_PENGABDIAN}/${id}`,
    {},
  )
  return response
}

export async function canclePengabdian(id: string, keterangan: string) {
  const response = await postData(
    `${API_ENDPOINTS_DPPM.CANCELED_PENGABDIAN}/${id}`,
    { keterangan },
  )
  return response
}

export async function returnedPengabdian(id: string, keterangan: string) {
  const response = await postData(
    `${API_ENDPOINTS_DPPM.RETURNED_PENGABDIAN}/${id}`,
    { keterangan },
  )
  return response
}
