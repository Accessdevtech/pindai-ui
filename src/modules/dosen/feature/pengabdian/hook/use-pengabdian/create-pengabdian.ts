import { PengabdianFinalType } from "@/schema/pengabdian-base"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PengabdianDosenResponse } from "../../pengabdian-dosen.interface"
import { createPengabdianDosen } from "../../pengabdian-dosen.service"

interface Props {
  onSuccess: (response: PengabdianDosenResponse) => void
  onError: (error: AxiosError<PengabdianDosenResponse>) => void
}

export const useCreatePengabdian = ({ onSuccess, onError }: Props) => {
  return useMutation<
    PengabdianDosenResponse,
    AxiosError<PengabdianDosenResponse>,
    PengabdianFinalType
  >({
    mutationFn: async (data: PengabdianFinalType) =>
      await createPengabdianDosen(data),
    onSuccess,
    onError
  })
}
