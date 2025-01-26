import { API_ENDPOINTS, API_ENDPOINTS_DOSEN } from "@/services/api/api-config"
import { getData, postData } from "@/services/api/http"
import { DosenData, DosenResponse } from "../../dosen.interface"
import {
  DetailPengabdian,
  PengabdianDosenData,
  PengabdianDosenResponse,
  ResponseDownloadPengabdian,
} from "./pengabdian-dosen.interface"

import { ListIndeksasiResponse } from "@/modules/listdata/indeksasi.list.interface"
import { listLuaranResponse } from "@/modules/listdata/luaran.list.interface"
import { ListPengabdianResponse } from "@/modules/listdata/pengabdian.list.interface"
import { PengabdianType } from "./schema/pengabdian-schema"

export async function getPengabdianDosen(
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
  const response: DosenResponse<PengabdianDosenData> = await getData(
    API_ENDPOINTS_DOSEN.PENGABDIAN,
    params,
  )
  return response.data
}

export async function getDetailPengabdianDosen(id: string) {
  const response: DosenResponse<DetailPengabdian> = await getData(
    `${API_ENDPOINTS_DOSEN.PENGABDIAN}/${id}`,
  )
  return response.data
}

export async function createPengabdianDosen(data: PengabdianType) {
  const response: PengabdianDosenResponse = await postData(
    API_ENDPOINTS_DOSEN.PENGABDIAN,
    data,
  )
  return response
}

export async function getAnggota(page: number, search: string) {
  const response: DosenResponse<DosenData> = await getData(
    API_ENDPOINTS.ANGGOTA,
    { page, search },
  )
  return response.data
}

export async function getListPengabdian() {
  const response: ListPengabdianResponse = await getData(
    API_ENDPOINTS.LIST_PENGABDIAN,
  )
  return response
}

export async function getListIndeksasi() {
  const response: ListIndeksasiResponse = await getData(
    API_ENDPOINTS.LIST_INDEKSASI,
  )
  return response
}

export async function getListLuaran(id: string) {
  const response: listLuaranResponse = await getData(
    `${API_ENDPOINTS.LIST_LUARAN}/${id}`,
  )
  return response
}

export async function downloadPengabdian(
  id: string,
  jenis_dokumen: string,
  category: string,
) {
  const response: ResponseDownloadPengabdian = await postData(
    `${API_ENDPOINTS_DOSEN.DOWNLOAD_PENGABDIAN}/${id}`,
    { jenis_dokumen, category },
  )
  return response
}

export async function uploadPengabdian(
  id: string,
  file: string,
  category: string,
) {
  const response: ResponseDownloadPengabdian = await postData(
    `${API_ENDPOINTS_DOSEN.UPLOAD_PENGABDIAN}/${id}`,
    { file, category },
  )
  return response
}
