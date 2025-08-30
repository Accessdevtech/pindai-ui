import { type PenelitianCompleteDraftType } from "@/schema/penelitian-comprehensive"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PenelitianDosenResponse } from "../../penelitian-dosen.interface"
import { createDraftPenelitian } from "../../penelitian-dosen.service"

interface Props {
  onSuccess: (response: PenelitianDosenResponse) => void
  onError: (error: AxiosError<PenelitianDosenResponse>) => void
}

export const useCreateDraftPenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    PenelitianDosenResponse,
    AxiosError<PenelitianDosenResponse>,
    PenelitianCompleteDraftType
  >({
    mutationFn: async (data: PenelitianCompleteDraftType) =>
      await createDraftPenelitian(data),
    onSuccess,
    onError
  })
}
