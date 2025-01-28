import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ResponseUploadPenelitian } from "../../penelitian-dosen.interface"
import { deletePenelitian } from "../../penelitian-dosen.service"

interface Props {
  onSuccess: (res: ResponseUploadPenelitian) => void
  onError: (err: AxiosError<ResponseUploadPenelitian>) => void
}

export const useDeletePenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    ResponseUploadPenelitian,
    AxiosError<ResponseUploadPenelitian>,
    { id: string }
  >({
    mutationFn: async ({ id }) => await deletePenelitian(id),
    onSuccess,
    onError,
  })
}
