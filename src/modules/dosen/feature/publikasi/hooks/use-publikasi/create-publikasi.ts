import { DosenResponse } from "@/modules/dosen/dosen.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Publikasi } from "../../publikasi-interface"
import { createPublikasi } from "../../publikasi-service"
import { PublikasiType } from "../../schema/publikasi-schema"

interface UseCreatePublikasiProps {
  onSuccess: (res: DosenResponse<Publikasi>) => void
  onError: (err: AxiosError<DosenResponse<Publikasi>>) => void
}

export const useCreatePublikasi = ({
  onSuccess,
  onError,
}: UseCreatePublikasiProps) => {
  return useMutation<
    DosenResponse<Publikasi>,
    AxiosError<DosenResponse<Publikasi>>,
    PublikasiType
  >({
    mutationFn: async (data: PublikasiType) => await createPublikasi(data),
    onSuccess,
    onError,
  })
}
