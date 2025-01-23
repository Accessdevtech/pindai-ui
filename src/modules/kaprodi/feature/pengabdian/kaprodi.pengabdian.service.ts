import {
  DetailPengabdian,
  PengabdianDosenData,
} from "@/modules/dosen/feature/pengabdian/pengabdian-dosen.interface"
import { API_ENDPOINTS_KAPRODI } from "@/services/api/api-config"
import { getData, postData } from "@/services/api/http"
import { KaprodiResponse } from "../../kaprodi.interface"

export async function getPengabdianKaprodi(
  page: number,
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
  if (search) params.search = search
  const response: KaprodiResponse<PengabdianDosenData> = await getData(
    API_ENDPOINTS_KAPRODI.PENGABDIAN,
    params,
  )
  return response.data
}

export async function getDetailPengabdian(id: string) {
  const response: KaprodiResponse<DetailPengabdian> = await getData(
    `${API_ENDPOINTS_KAPRODI.PENGABDIAN}/${id}`,
  )
  return response.data
}

export async function approvePengabdian(id: string) {
  const response = await postData(
    `${API_ENDPOINTS_KAPRODI.APPROVED_PENGABDIAN}/${id}`,
    {},
  )
  return response
}

export async function canclePengabdian(id: string, keterangan: string) {
  const response = await postData(
    `${API_ENDPOINTS_KAPRODI.CANCELED_PENGABDIAN}/${id}`,
    { keterangan },
  )
  return response
}
