import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PengabdianDosenResponse } from "../../pengabdian-dosen.interface"
import { updatePengabdianDosen } from "../../pengabdian-dosen.service"
import { PengabdianType } from "../../schema/pengabdian-schema"

interface Props {
  onSuccess: (response: PengabdianDosenResponse) => void
  onError: (error: AxiosError<PengabdianDosenResponse>) => void
}

export const useUpdatePengabdian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    PengabdianDosenResponse,
    AxiosError<PengabdianDosenResponse>,
    { id: string; data: PengabdianType }
  >({
    mutationFn: async ({ id, data }: { id: string; data: PengabdianType }) =>
      await updatePengabdianDosen(id, data),
    onSuccess,
    onError
  })
}
