import { ResponseDownload } from "@/modules/kaprodi/kaprodi.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { downloadDokumen } from "../keuangan.service"

interface Props {
  onSuccess: (res: ResponseDownload) => void
  onError: (err: AxiosError<ResponseDownload>) => void
}
export const useDownload = ({ onSuccess, onError }: Props) => {
  return useMutation<
    ResponseDownload,
    AxiosError<ResponseDownload>,
    { id: string; jenis_dokumen: string; category: string }
  >({
    mutationFn: async ({ id, jenis_dokumen, category }) =>
      await downloadDokumen(id, jenis_dokumen, category),
    onSuccess,
    onError,
  })
}
