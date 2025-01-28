import { DppmResponse } from "@/modules/dppm/dashboard.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PublikasiData } from "../../publikasi-interface"
import { approvePublikasi } from "../../publikasi-service"

interface Props {
  onSuccess: (res: DppmResponse<PublikasiData>) => void
  onError: (error: AxiosError<DppmResponse<PublikasiData>>) => void
}

export const useApprovePublikasi = ({ onSuccess, onError }: Props) => {
  return useMutation<
    DppmResponse<PublikasiData>,
    AxiosError<DppmResponse<PublikasiData>>,
    { id: string }
  >({
    mutationFn: async ({ id }) => await approvePublikasi(id),
    onSuccess,
    onError,
  })
}
