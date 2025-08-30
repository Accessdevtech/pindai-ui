import { PenelitianDraftType } from "@/schema/penelitian-base"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PenelitianDosenResponse } from "../../penelitian-dosen.interface"
import { updatePenelitianDosen } from "../../penelitian-dosen.service"

interface Props {
  onSuccess: (response: PenelitianDosenResponse) => void
  onError: (error: AxiosError<PenelitianDosenResponse>) => void
}

export const useUpdatePenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    PenelitianDosenResponse,
    AxiosError<PenelitianDosenResponse>,
    { id: string; data: PenelitianDraftType }
  >({
    mutationFn: async ({
      id,
      data
    }: {
      id: string
      data: PenelitianDraftType
    }) => await updatePenelitianDosen(id, data),
    onSuccess,
    onError
  })
}
