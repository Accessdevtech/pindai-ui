import { DosenResponse } from "@/modules/dppm/feature/dosen/dosen.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { activeDosen } from "../../kaprodi.dosen.service"

interface Props {
  onSuccess: (response: DosenResponse) => void
  onError: (error: AxiosError<DosenResponse>) => void
}

export const useActiveDosen = ({ onSuccess, onError }: Props) => {
  return useMutation<
    DosenResponse,
    AxiosError<DosenResponse>,
    { id: string; is_active: boolean }
  >({
    mutationFn: async ({ id, is_active }) => await activeDosen(id, is_active),
    onSuccess,
    onError,
  })
}
