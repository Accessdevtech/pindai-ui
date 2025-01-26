import { API_ENDPOINTS, API_ENDPOINTS_DOSEN } from "@/services/api/api-config"
import { getData, postData } from "@/services/api/http"
import { DosenData, DosenResponse } from "../../dosen.interface"
import {
  DetailPenelitian,
  PenelitianDosenData,
  PenelitianDosenResponse,
  ResponseDownloadPenelitian,
} from "./penelitian-dosen.interface"

import { ListIndeksasiResponse } from "@/modules/listdata/indeksasi.list.interface"
import { listLuaranResponse } from "@/modules/listdata/luaran.list.interface"
import { ListPenelitianResponse } from "@/modules/listdata/penelitian.list.interface"
import { PenelitianType } from "./schema/penelitian-schema"

export async function getPenelitianDosen(
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
  const response: DosenResponse<PenelitianDosenData> = await getData(
    API_ENDPOINTS_DOSEN.PENELITIAN,
    params,
  )
  return response.data
}

export async function getDetailPenelitianDosen(id: string) {
  const response: DosenResponse<DetailPenelitian> = await getData(
    `${API_ENDPOINTS_DOSEN.PENELITIAN}/${id}`,
  )
  return response.data
}

export async function createPenelitianDosen(data: PenelitianType) {
  const response: PenelitianDosenResponse = await postData(
    API_ENDPOINTS_DOSEN.PENELITIAN,
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

export async function getListPenelitian() {
  const response: ListPenelitianResponse = await getData(
    API_ENDPOINTS.LIST_PENELITIAN,
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

export async function downloadPenelitian(
  id: string,
  jenis_dokumen: string,
  category: string,
) {
  const response: ResponseDownloadPenelitian = await postData(
    `${API_ENDPOINTS_DOSEN.DOWNLOAD_PENELITIAN}/${id}`,
    { jenis_dokumen, category },
  )
  return response
}

export async function uploadPenelitian(
  id: string,
  file: string,
  category: string,
  jenis_dokumen?: string,
) {
  const response: ResponseDownloadPenelitian = await postData(
    `${API_ENDPOINTS_DOSEN.UPLOAD_PENELITIAN}/${id}`,
    { file, category, jenis_dokumen },
  )
  return response
}
