import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PeriodeType } from "../schema"
import { updatePeriode } from "../service"

interface Props {
  onSuccess: (response: Response<PeriodeType>) => void
  onError: (error: AxiosError<Response<PeriodeType>>) => void
}
export const useUpdatePeriode = ({ onSuccess, onError }: Props) => {
  return useMutation<
    Response<PeriodeType>,
    AxiosError<Response<PeriodeType>>,
    { id: string; data: PeriodeType }
  >({
    mutationFn: async ({ id, data }) => await updatePeriode(id, data),
    onSuccess,
    onError
  })
}
