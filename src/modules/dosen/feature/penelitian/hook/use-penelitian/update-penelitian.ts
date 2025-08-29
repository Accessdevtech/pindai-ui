import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PenelitianDosenResponse } from "../../penelitian-dosen.interface"
import { updatePenelitianDosen } from "../../penelitian-dosen.service"
import { PenelitianType } from "../../schema/penelitian-schema"

interface Props {
  onSuccess: (response: PenelitianDosenResponse) => void
  onError: (error: AxiosError<PenelitianDosenResponse>) => void
}

export const useUpdatePenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    PenelitianDosenResponse,
    AxiosError<PenelitianDosenResponse>,
    { id: string; data: PenelitianType }
  >({
    mutationFn: async ({ id, data }: { id: string; data: PenelitianType }) =>
      await updatePenelitianDosen(id, data),
    onSuccess,
    onError
  })
}
