import { KaprodiResponse } from "@/modules/kaprodi/kaprodi.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { KaprodiType } from "../../kaprodi.schema"
import { addKaprodi } from "../../kaprodi.service"

interface Props {
  onSuccess: (response: KaprodiResponse) => void
  onError: (error: AxiosError<KaprodiResponse>) => void
}

export const useAddKaprodi = ({ onSuccess, onError }: Props) => {
  return useMutation<KaprodiResponse, AxiosError<KaprodiResponse>, KaprodiType>(
    {
      mutationFn: (data: KaprodiType) => addKaprodi(data),
      onSuccess,
      onError,
    },
  )
}
