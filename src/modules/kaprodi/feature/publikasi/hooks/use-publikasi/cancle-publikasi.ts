import { KaprodiResponse } from "@/modules/kaprodi/kaprodi.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PublikasiData } from "../../publikasi-interface"
import { canclePublikasi } from "../../publikasi-service"

interface Props {
  onSuccess: (response: KaprodiResponse<PublikasiData>) => void
  onError: (error: AxiosError<KaprodiResponse<PublikasiData>>) => void
}

export const useCanclePublikasi = ({ onSuccess, onError }: Props) => {
  return useMutation<
    KaprodiResponse<PublikasiData>,
    AxiosError<KaprodiResponse<PublikasiData>>,
    { id: string; keterangan: string }
  >({
    mutationFn: ({ id, keterangan }) => canclePublikasi(id, keterangan),
    onSuccess,
    onError,
  })
}
