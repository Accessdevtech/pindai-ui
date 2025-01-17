import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ResponseDownloadPenelitian } from "../penelitian-dosen.interface"
import { downloadPenelitian } from "../penelitian-dosen.service"

interface Props {
  onSuccess: (res: ResponseDownloadPenelitian) => void
  onError: (err: AxiosError<ResponseDownloadPenelitian>) => void
}

export const useDownloadPenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    ResponseDownloadPenelitian,
    AxiosError<ResponseDownloadPenelitian>,
    { id: string; jenis_dokumen: string }
  >({
    mutationFn: async ({ id, jenis_dokumen }) =>
      await downloadPenelitian(id, jenis_dokumen),
    onSuccess,
    onError,
  })
}
