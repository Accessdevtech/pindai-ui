import { KaprodiResponse } from "@/modules/kaprodi/kaprodi.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { KaprodiType } from "../../kaprodi.schema"
import { updateKaprodi } from "../../kaprodi.service"

interface Props {
  onSuccess: (response: KaprodiResponse) => void
  onError: (error: AxiosError<KaprodiResponse>) => void
}

export const useUpdateKaprodi = ({ onSuccess, onError }: Props) => {
  return useMutation<
    KaprodiResponse,
    AxiosError<KaprodiResponse>,
    { id: string; data: KaprodiType }
  >({
    mutationFn: ({ id, data }) => updateKaprodi(id, data),
    onSuccess,
    onError,
  })
}
