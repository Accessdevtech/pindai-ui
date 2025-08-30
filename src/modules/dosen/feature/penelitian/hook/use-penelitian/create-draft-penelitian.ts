import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PenelitianDosenResponse } from "../../penelitian-dosen.interface"
import { createDraftPenelitian } from "../../penelitian-dosen.service"
import { PenelitianType } from "../../schema/penelitian-schema"

interface Props {
  onSuccess: (response: PenelitianDosenResponse) => void
  onError: (error: AxiosError<PenelitianDosenResponse>) => void
}

export const useCreateDraftPenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    PenelitianDosenResponse,
    AxiosError<PenelitianDosenResponse>,
    PenelitianType
  >({
    mutationFn: async (data: PenelitianType) =>
      await createDraftPenelitian(data),
    onSuccess,
    onError
  })
}
