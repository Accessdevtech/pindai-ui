import { API_ENDPOINTS, API_ENDPOINTS_DOSEN } from "@/services/api/api-config"
import { deleteData, getData, postData, putData } from "@/services/api/http"
import { DosenData, DosenResponse } from "../../dosen.interface"
import {
  DetailPenelitian,
  PenelitianDosenData,
  PenelitianDosenResponse,
  ResponseDownloadPenelitian
} from "./penelitian-dosen.interface"

import { ListPenelitianResponse } from "@/modules/listdata/penelitian.list.interface"
import { PenelitianDraftType } from "@/schema/penelitian-base"
import { PenelitianType } from "./schema/penelitian-schema"

export async function getPenelitianDosen(
  page: number,
  perPage?: number,
  search?: string,
  tahun_akademik?: string,
  status_kaprodi?: string,
  status_dppm?: string,
  status_keuangan?: string
) {
  const params: Record<string, string | number> = { page }
  if (status_keuangan) params.status_keuangan = status_keuangan
  if (status_kaprodi) params.status_kaprodi = status_kaprodi
  if (tahun_akademik !== undefined) params.tahun_akademik = tahun_akademik
  if (status_dppm) params.status_dppm = status_dppm
  if (perPage) params.per_page = perPage
  if (search) params.search = search
  const response: DosenResponse<PenelitianDosenData> = await getData(
    API_ENDPOINTS_DOSEN.PENELITIAN,
    params
  )
  return response.data
}

export async function getDetailPenelitianDosen(id: string) {
  const response: DosenResponse<DetailPenelitian> = await getData(
    `${API_ENDPOINTS_DOSEN.PENELITIAN}/${id}`
  )
  return response.data
}

export async function getDraftPenelitian(id: string) {
  const response: DosenResponse<DetailPenelitian> = await getData(
    `${API_ENDPOINTS_DOSEN.DRAFT_PENELITIAN}/${id}`
  )
  return response.data
}
export async function createDraftPenelitian(data: PenelitianDraftType) {
  const response: PenelitianDosenResponse = await postData(
    API_ENDPOINTS_DOSEN.DRAFT_PENELITIAN,
    data
  )
  return response
}

export async function createPenelitianDosen(data: PenelitianType) {
  const response: PenelitianDosenResponse = await postData(
    API_ENDPOINTS_DOSEN.PENELITIAN,
    data
  )
  return response
}

export async function updatePenelitianDosen(
  id: string,
  data: PenelitianDraftType
) {
  const response: PenelitianDosenResponse = await putData(
    `${API_ENDPOINTS_DOSEN.PENELITIAN}/${id}`,
    data
  )
  return response
}

export async function deletePenelitian(id: string) {
  const response: PenelitianDosenResponse = await deleteData(
    `${API_ENDPOINTS_DOSEN.PENELITIAN}/${id}`
  )
  return response
}

export async function getAnggota(
  page: number,
  perPage?: number,
  search?: string
) {
  const params: Record<string, string | number> = { page }
  if (perPage) params.per_page = perPage
  if (search) params.search = search
  const response: DosenResponse<DosenData> = await getData(
    API_ENDPOINTS.ANGGOTA,
    params
  )
  return response.data
}

export async function getListPenelitian() {
  const response: ListPenelitianResponse = await getData(
    API_ENDPOINTS.LIST_PENELITIAN
  )
  return response
}

export async function downloadPenelitian(
  id: string,
  jenis_dokumen: string,
  category: string
) {
  const response: ResponseDownloadPenelitian = await postData(
    `${API_ENDPOINTS_DOSEN.DOWNLOAD_PENELITIAN}/${id}`,
    { jenis_dokumen, category }
  )
  return response
}

export async function uploadPenelitian(
  id: string,
  file: string,
  category: string,
  jenis_dokumen?: string
) {
  const response: ResponseDownloadPenelitian = await postData(
    `${API_ENDPOINTS_DOSEN.UPLOAD_PENELITIAN}/${id}`,
    { file, category, jenis_dokumen }
  )
  return response
}

export async function getEditKembalikan(id: string) {
  const response: DosenResponse<DetailPenelitian> = await getData(
    `${API_ENDPOINTS_DOSEN.DIKEMBALIKAN_PENELITIAN}/${id}`
  )
  return response.data
}
