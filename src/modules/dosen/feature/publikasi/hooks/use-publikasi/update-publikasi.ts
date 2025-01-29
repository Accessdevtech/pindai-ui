import { DosenResponse } from "@/modules/dosen/dosen.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Publikasi } from "../../publikasi-interface"
import { updatePublikasi } from "../../publikasi-service"
import { PublikasiType } from "../../schema/publikasi-schema"

interface UseUpdatePublikasiProps {
  onSuccess: (res: DosenResponse<Publikasi>) => void
  onError: (err: AxiosError<DosenResponse<Publikasi>>) => void
}

export const useUpdatePublikasi = ({
  onSuccess,
  onError,
}: UseUpdatePublikasiProps) => {
  return useMutation<
    DosenResponse<Publikasi>,
    AxiosError<DosenResponse<Publikasi>>,
    { id: string; data: PublikasiType }
  >({
    mutationFn: async ({ id, data }) => await updatePublikasi(id, data),
    onSuccess,
    onError,
  })
}
