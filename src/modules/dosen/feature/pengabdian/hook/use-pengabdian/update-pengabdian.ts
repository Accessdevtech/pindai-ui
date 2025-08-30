import { PengabdianDraftType } from "@/schema/pengabdian-base"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PengabdianDosenResponse } from "../../pengabdian-dosen.interface"
import { updatePengabdianDosen } from "../../pengabdian-dosen.service"

interface Props {
  onSuccess: (response: PengabdianDosenResponse) => void
  onError: (error: AxiosError<PengabdianDosenResponse>) => void
}

export const useUpdatePengabdian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    PengabdianDosenResponse,
    AxiosError<PengabdianDosenResponse>,
    { id: string; data: PengabdianDraftType }
  >({
    mutationFn: async ({
      id,
      data
    }: {
      id: string
      data: PengabdianDraftType
    }) => await updatePengabdianDosen(id, data),
    onSuccess,
    onError
  })
}
