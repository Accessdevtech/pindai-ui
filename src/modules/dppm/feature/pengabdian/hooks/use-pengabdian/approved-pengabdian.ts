import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { approvePengabdian } from "../../dppm.pengabdian.service"

interface Props {
  onSuccess: (response: Response) => void
  onError: (error: AxiosError<Response>) => void
}

export const useApprovePengabdian = ({ onSuccess, onError }: Props) => {
  return useMutation<Response, AxiosError<Response>, { id: string }>({
    mutationFn: ({ id }) => approvePengabdian(id),
    onSuccess,
    onError,
  })
}
