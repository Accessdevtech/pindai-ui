import { PengabdianDraftType } from "@/schema/pengabdian-base"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PengabdianDosenResponse } from "../../pengabdian-dosen.interface"
import { createDraftPengabdian } from "../../pengabdian-dosen.service"

interface Props {
  onSuccess: (response: PengabdianDosenResponse) => void
  onError: (error: AxiosError<PengabdianDosenResponse>) => void
}

export const useCreateDraftPengabdian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    PengabdianDosenResponse,
    AxiosError<PengabdianDosenResponse>,
    PengabdianDraftType
  >({
    mutationFn: async (data: PengabdianDraftType) =>
      await createDraftPengabdian(data),
    onSuccess,
    onError
  })
}
