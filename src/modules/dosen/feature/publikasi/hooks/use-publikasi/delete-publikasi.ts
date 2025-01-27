import { DosenResponse } from "@/modules/dosen/dosen.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Publikasi } from "../../publikasi-interface"
import { deletePublikasi } from "../../publikasi-service"

interface UseDeletePublikasiProps {
  onSuccess: (res: DosenResponse<Publikasi>) => void
  onError: (err: AxiosError<DosenResponse<Publikasi>>) => void
}

export const useDeletePublikasi = ({
  onSuccess,
  onError,
}: UseDeletePublikasiProps) => {
  return useMutation<
    DosenResponse<Publikasi>,
    AxiosError<DosenResponse<Publikasi>>,
    { id: string }
  >({
    mutationFn: ({ id }) => deletePublikasi(id),
    onSuccess,
    onError,
  })
}
