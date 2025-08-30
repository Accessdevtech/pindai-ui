import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PengabdianDosenResponse } from "../../pengabdian-dosen.interface"
import { createDraftPengabdian } from "../../pengabdian-dosen.service"
import { PengabdianType } from "../../schema/pengabdian-schema"

interface Props {
  onSuccess: (response: PengabdianDosenResponse) => void
  onError: (error: AxiosError<PengabdianDosenResponse>) => void
}

export const useCreateDraftPengabdian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    PengabdianDosenResponse,
    AxiosError<PengabdianDosenResponse>,
    PengabdianType
  >({
    mutationFn: async (data: PengabdianType) =>
      await createDraftPengabdian(data),
    onSuccess,
    onError
  })
}
