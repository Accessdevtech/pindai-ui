import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { deletePengabdian } from "../../dppm.pengabdian.service"

interface Props {
  onSuccess: (res: Response) => void
  onError: (err: AxiosError<Response>) => void
}

export const useDeletePengabdian = ({ onSuccess, onError }: Props) => {
  return useMutation<Response, AxiosError<Response>, { id: string }>({
    mutationFn: async ({ id }) => await deletePengabdian(id),
    onSuccess,
    onError
  })
}
