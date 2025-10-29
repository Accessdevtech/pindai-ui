import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { returnedPenelitian } from "../../keuangan.penelitian.service"

interface Props {
  onSuccess: (response: Response) => void
  onError: (error: AxiosError<Response>) => void
}

export const useReturnedPenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    Response,
    AxiosError<Response>,
    { id: string; keterangan: string }
  >({
    mutationFn: ({ id, keterangan }) => returnedPenelitian(id, keterangan),
    onSuccess,
    onError
  })
}
