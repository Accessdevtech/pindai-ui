
import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { returnedPengabdian } from "../../keuangan.pengabdian.service"

interface Props {
  onSuccess: (response: Response) => void
  onError: (error: AxiosError<Response>) => void
}

export const useReturnedPengabdian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    Response,
    AxiosError<Response>,
    { id: string; keterangan: string }
  >({
    mutationFn: ({ id, keterangan }) => returnedPengabdian(id, keterangan),
    onSuccess,
    onError
  })
}