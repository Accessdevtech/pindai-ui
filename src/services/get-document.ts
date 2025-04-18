import { LaporanKemajuan, ViewDocs } from "@/interface/type"
import { API_ENDPOINTS } from "./api/api-config"
import { postData } from "./api/http"

export const viewDocs = async (
  id: string,
  category: string,
  jenis_dokumen: string,
) => {
  const response: ViewDocs = await postData(
    `${API_ENDPOINTS.VIEW_DOKUMEN}/${id}`,
    {
      category,
      jenis_dokumen,
    },
  )
  return response
}

export const viewLaporanKemajuan = async (id: string, category: string) => {
  const response: LaporanKemajuan = await postData(
    `${API_ENDPOINTS.VIEW_LAPORAN_KEMAJUAN}/${id}`,
    {
      category,
    },
  )
  return response
}
