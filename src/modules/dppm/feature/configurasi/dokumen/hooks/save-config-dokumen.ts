import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { saveConfigDokumen } from "../service"
import { Payload } from "../type"

interface Props {
  onSuccess: (response: Response) => void
  onError: (error: AxiosError<Response>) => void
}

export const useSaveConfigDokumen = ({ onSuccess, onError }: Props) => {
  return useMutation<Response, AxiosError<Response>, { data: Payload }>({
    mutationFn: async ({ data }) => await saveConfigDokumen(data),
    onSuccess,
    onError
  })
}
