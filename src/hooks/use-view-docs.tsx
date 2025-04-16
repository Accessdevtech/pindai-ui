import { ResponseViewDocs } from "@/interface/type"
import { viewDocs } from "@/services/get-document"
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
