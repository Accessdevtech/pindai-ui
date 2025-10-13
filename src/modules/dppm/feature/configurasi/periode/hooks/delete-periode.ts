import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PeriodeType } from "../schema"
import { deletePeriode } from "../service"

interface Props {
  onSuccess: (response: Response<PeriodeType>) => void
  onError: (error: AxiosError<Response<PeriodeType>>) => void
}
export const useDeletePeriode = ({ onSuccess, onError }: Props) => {
  return useMutation<
    Response<PeriodeType>,
    AxiosError<Response<PeriodeType>>,
    { id: string }
  >({
    mutationFn: async ({ id }) => await deletePeriode(id),
    onSuccess,
    onError
  })
}
