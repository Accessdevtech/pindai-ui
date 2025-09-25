import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { deletePublikasi } from "../../publikasi-service"

interface Props {
  onSuccess: (res: Response) => void
  onError: (err: AxiosError<Response>) => void
}

export const useDeletePublikasi = ({ onSuccess, onError }: Props) => {
  return useMutation<Response, AxiosError<Response>, { id: string }>({
    mutationFn: async ({ id }) => await deletePublikasi(id),
    onSuccess,
    onError
  })
}
