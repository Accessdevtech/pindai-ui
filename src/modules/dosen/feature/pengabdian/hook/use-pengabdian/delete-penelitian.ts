import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PenelitianDosenResponse } from "../../../penelitian/penelitian-dosen.interface"
import { deletePengabdian } from "../../pengabdian-dosen.service"

interface Props {
  onSuccess: (res: PenelitianDosenResponse) => void
  onError: (err: AxiosError<PenelitianDosenResponse>) => void
}

export const useDeletePengabdian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    PenelitianDosenResponse,
    AxiosError<PenelitianDosenResponse>,
    { id: string }
  >({
    mutationFn: async ({ id }) => await deletePengabdian(id),
    onSuccess,
    onError,
  })
}
