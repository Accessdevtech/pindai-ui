import { KeuanganResponse } from "@/modules/keuangan/keuangan.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PublikasiData } from "../../publikasi-interface"
import { approvePublikasi } from "../../publikasi-service"

interface Props {
  onSuccess: (res: KeuanganResponse<PublikasiData>) => void
  onError: (error: AxiosError<KeuanganResponse<PublikasiData>>) => void
}

export const useApprovePublikasi = ({ onSuccess, onError }: Props) => {
  return useMutation<
    KeuanganResponse<PublikasiData>,
    AxiosError<KeuanganResponse<PublikasiData>>,
    { id: string }
  >({
    mutationFn: async ({ id }) => await approvePublikasi(id),
    onSuccess,
    onError,
  })
}
