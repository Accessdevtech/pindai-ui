import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { canclePenelitian } from "../../kaprodi.penelitian.service"

interface Props {
  onSuccess: (response: Response) => void
  onError: (error: AxiosError<Response>) => void
}

export const useCanclePenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<Response, AxiosError<Response>, { id: string }>({
    mutationFn: ({ id }) => canclePenelitian(id),
    onSuccess,
    onError,
  })
}
