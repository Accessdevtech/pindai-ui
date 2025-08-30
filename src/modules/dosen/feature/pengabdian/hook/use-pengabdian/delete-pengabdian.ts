import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PengabdianDosenResponse } from "../../pengabdian-dosen.interface"
import { deletePengabdian } from "../../pengabdian-dosen.service"

interface Props {
  onSuccess: (res: PengabdianDosenResponse) => void
  onError: (err: AxiosError<PengabdianDosenResponse>) => void
}

export const useDeletePengabdian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    PengabdianDosenResponse,
    AxiosError<PengabdianDosenResponse>,
    { id: string }
  >({
    mutationFn: async ({ id }) => await deletePengabdian(id),
    onSuccess,
    onError,
  })
}
