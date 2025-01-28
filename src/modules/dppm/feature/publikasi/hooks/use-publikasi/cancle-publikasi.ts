import { DppmResponse } from "@/modules/dppm/dashboard.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PublikasiData } from "../../publikasi-interface"
import { canclePublikasi } from "../../publikasi-service"

interface Props {
  onSuccess: (response: DppmResponse<PublikasiData>) => void
  onError: (error: AxiosError<DppmResponse<PublikasiData>>) => void
}

export const useCanclePublikasi = ({ onSuccess, onError }: Props) => {
  return useMutation<
    DppmResponse<PublikasiData>,
    AxiosError<DppmResponse<PublikasiData>>,
    { id: string; keterangan: string }
  >({
    mutationFn: ({ id, keterangan }) => canclePublikasi(id, keterangan),
    onSuccess,
    onError,
  })
}
