import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { approvePenelitian } from "../../kaprodi.penelitian.service"

interface Props {
  onSuccess: (response: Response) => void
  onError: (error: AxiosError<Response>) => void
}

export const useApprovePenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<Response, AxiosError<Response>, { id: string }>({
    mutationFn: ({ id }) => approvePenelitian(id),
    onSuccess,
    onError,
  })
}
