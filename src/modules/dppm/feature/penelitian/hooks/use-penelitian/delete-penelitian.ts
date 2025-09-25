import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { deletePenelitian } from "../../dppm.penelitian.service"

interface Props {
  onSuccess: (res: Response) => void
  onError: (err: AxiosError<Response>) => void
}

export const useDeletePenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<Response, AxiosError<Response>, { id: string }>({
    mutationFn: async ({ id }) => await deletePenelitian(id),
    onSuccess,
    onError
  })
}
