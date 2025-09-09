import { ResponseDownloadExcel } from "@/interface/type"
import { downloadExcel } from "@/services/download-excel"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface Props {
  onSuccess: (res: ResponseDownloadExcel) => void
  onError: (err: AxiosError<ResponseDownloadExcel>) => void
}

export const useDownloadExcel = ({ onSuccess, onError }: Props) => {
  return useMutation<
    ResponseDownloadExcel,
    AxiosError<ResponseDownloadExcel>,
    { category: string; rangeDate: { from: Date; to: Date | undefined } }
  >({
    mutationFn: async ({ category, rangeDate }) =>
      await downloadExcel(category, rangeDate),
    onSuccess,
    onError
  })
}
