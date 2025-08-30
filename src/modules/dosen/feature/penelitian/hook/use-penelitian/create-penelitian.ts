import { type PenelitianCompleteFinalType } from "@/schema/penelitian-comprehensive"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PenelitianDosenResponse } from "../../penelitian-dosen.interface"
import { createPenelitianDosen } from "../../penelitian-dosen.service"

interface Props {
  onSuccess: (response: PenelitianDosenResponse) => void
  onError: (error: AxiosError<PenelitianDosenResponse>) => void
}

export const useCreatePenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    PenelitianDosenResponse,
    AxiosError<PenelitianDosenResponse>,
    PenelitianCompleteFinalType
  >({
    mutationFn: async (data: PenelitianCompleteFinalType) =>
      await createPenelitianDosen(data),
    onSuccess,
    onError
  })
}
