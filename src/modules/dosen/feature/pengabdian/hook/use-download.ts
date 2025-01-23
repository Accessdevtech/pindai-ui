import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ResponseDownloadPengabdian } from "../pengabdian-dosen.interface"
import { downloadPengabdian } from "../pengabdian-dosen.service"

interface Props {
  onSuccess: (res: ResponseDownloadPengabdian) => void
  onError: (err: AxiosError<ResponseDownloadPengabdian>) => void
}

export const useDownloadPengabdian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    ResponseDownloadPengabdian,
    AxiosError<ResponseDownloadPengabdian>,
    { id: string; jenis_dokumen: string }
  >({
    mutationFn: async ({ id, jenis_dokumen }) =>
      await downloadPengabdian(id, jenis_dokumen),
    onSuccess,
    onError,
  })
}
