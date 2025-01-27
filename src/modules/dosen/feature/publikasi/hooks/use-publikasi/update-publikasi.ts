import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PublikasiResponse } from "../../publikasi-interface"
import { updatePublikasi } from "../../publikasi-service"
import { PublikasiType } from "../../schema/publikasi-schema"

interface UseUpdatePublikasiProps {
  onSuccess: (res: PublikasiResponse) => void
  onError: (err: AxiosError<PublikasiResponse>) => void
}

export const useUpdatePublikasi = ({
  onSuccess,
  onError,
}: UseUpdatePublikasiProps) => {
  return useMutation<
    PublikasiResponse,
    AxiosError<PublikasiResponse>,
    { id: string; data: PublikasiType }
  >({
    mutationFn: async ({ id, data }) => await updatePublikasi(id, data),
    onSuccess,
    onError,
  })
}
