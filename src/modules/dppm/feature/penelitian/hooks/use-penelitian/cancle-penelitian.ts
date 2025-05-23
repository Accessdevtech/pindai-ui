import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { canclePenelitian } from "../../dppm.penelitian.service"

interface Props {
  onSuccess: (response: Response) => void
  onError: (error: AxiosError<Response>) => void
}

export const useCanclePenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    Response,
    AxiosError<Response>,
    { id: string; keterangan: string }
  >({
    mutationFn: ({ id, keterangan }) => canclePenelitian(id, keterangan),
    onSuccess,
    onError,
  })
}
