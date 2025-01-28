import { KaprodiResponse } from "@/modules/kaprodi/kaprodi.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PublikasiData } from "../../publikasi-interface"
import { approvePublikasi } from "../../publikasi-service"

interface Props {
  onSuccess: (res: KaprodiResponse<PublikasiData>) => void
  onError: (error: AxiosError<KaprodiResponse<PublikasiData>>) => void
}

export const useApprovePublikasi = ({ onSuccess, onError }: Props) => {
  return useMutation<
    KaprodiResponse<PublikasiData>,
    AxiosError<KaprodiResponse<PublikasiData>>,
    { id: string }
  >({
    mutationFn: async ({ id }) => await approvePublikasi(id),
    onSuccess,
    onError,
  })
}
