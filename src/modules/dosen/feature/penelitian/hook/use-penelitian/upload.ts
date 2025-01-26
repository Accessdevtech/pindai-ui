import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ResponseUploadPenelitian } from "../../penelitian-dosen.interface"
import { uploadPenelitian } from "../../penelitian-dosen.service"

interface Props {
  onSuccess: (res: ResponseUploadPenelitian) => void
  onError: (err: AxiosError<ResponseUploadPenelitian>) => void
}

export const useUploadPenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    ResponseUploadPenelitian,
    AxiosError<ResponseUploadPenelitian>,
    { id: string; file: string; category: string; jenis_dokumen?: string }
  >({
    mutationFn: async ({ id, file, category, jenis_dokumen }) =>
      await uploadPenelitian(id, file, category, jenis_dokumen),
    onSuccess,
    onError,
  })
}
