import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PeriodeType } from "../schema"
import { createPeriode } from "../service"

interface Props {
  onSuccess: (response: Response<PeriodeType>) => void
  onError: (error: AxiosError<Response<PeriodeType>>) => void
}
export const useCreatePeriode = ({ onSuccess, onError }: Props) => {
  return useMutation<
    Response<PeriodeType>,
    AxiosError<Response<PeriodeType>>,
    PeriodeType
  >({
    mutationFn: async (data: PeriodeType) => await createPeriode(data),
    onSuccess,
    onError
  })
}
