import { LaporanKemajuan, Response, ResponseViewDocs } from "@/interface/type"
import { viewDocs, viewLaporanKemajuan } from "@/services/get-document"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useViewDocs = () => {
  return useMutation<
    ResponseViewDocs,
    AxiosError<ResponseViewDocs>,
    { id: string; category: string; jenis_dokumen: string }
  >({
    mutationFn: async ({ id, category, jenis_dokumen }) =>
      await viewDocs(id, category, jenis_dokumen),
  })
}

export const useViewLaporanKemajuan = () => {
  return useMutation<
    Response<LaporanKemajuan>,
    AxiosError<Response<LaporanKemajuan>>,
    { id: string; category: string }
  >({
    mutationFn: async ({ id, category }) =>
      await viewLaporanKemajuan(id, category),
  })
}
