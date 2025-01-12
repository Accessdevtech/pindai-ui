import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { createPenelitianDosen } from "../../penelitian-dosen.service"
import { PenelitianType } from "../../schema/penelitian-schema"

interface Props {
  onSuccess: (response: Response) => void
  onError: (error: AxiosError<Response>) => void
}

export const useCreatePenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<Response, AxiosError<Response>, PenelitianType>({
    mutationFn: async (data: PenelitianType) =>
      await createPenelitianDosen(data),
    onSuccess,
    onError,
  })
}
