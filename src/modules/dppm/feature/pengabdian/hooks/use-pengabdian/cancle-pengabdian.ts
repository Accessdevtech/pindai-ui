import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { canclePengabdian } from "../../dppm.pengabdian.service"

interface Props {
  onSuccess: (response: Response) => void
  onError: (error: AxiosError<Response>) => void
}

export const useCanclePengabdian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    Response,
    AxiosError<Response>,
    { id: string; keterangan: string }
  >({
    mutationFn: ({ id, keterangan }) => canclePengabdian(id, keterangan),
    onSuccess,
    onError,
  })
}
