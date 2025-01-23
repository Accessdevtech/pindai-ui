import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ResponseUploadPengabdian } from "../../pengabdian-dosen.interface"
import { uploadPengabdian } from "../../pengabdian-dosen.service"

interface Props {
  onSuccess: (res: ResponseUploadPengabdian) => void
  onError: (err: AxiosError<ResponseUploadPengabdian>) => void
}

export const useUploadPengabdian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    ResponseUploadPengabdian,
    AxiosError<ResponseUploadPengabdian>,
    { id: string; file: { base64: string; type: string } }
  >({
    mutationFn: async ({ id, file }) => await uploadPengabdian(id, file),
    onSuccess,
    onError,
  })
}
