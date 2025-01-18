import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PenelitianDosenResponse } from "../../penelitian-dosen.interface"
import { createPenelitianDosen } from "../../penelitian-dosen.service"
import { PenelitianType } from "../../schema/penelitian-schema"

interface Props {
  onSuccess: (response: PenelitianDosenResponse) => void
  onError: (error: AxiosError<PenelitianDosenResponse>) => void
}

export const useCreatePenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    PenelitianDosenResponse,
    AxiosError<PenelitianDosenResponse>,
    PenelitianType
  >({
    mutationFn: async (data: PenelitianType) =>
      await createPenelitianDosen(data),
    onSuccess,
    onError,
  })
}
