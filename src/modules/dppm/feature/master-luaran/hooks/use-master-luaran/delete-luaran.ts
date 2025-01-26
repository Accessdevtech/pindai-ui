import { DppmResponse } from "@/modules/dppm/dashboard.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Luaran } from "../../luaran.interface"
import { deleteMasterLuaran } from "../../master-luaran.service"

interface IDeleteLuaran {
  onSuccess: (res: DppmResponse<Luaran>) => void
  onError: (err: AxiosError<Luaran>) => void
}

export const useDeleteLuaran = ({ onSuccess, onError }: IDeleteLuaran) => {
  return useMutation<DppmResponse<Luaran>, AxiosError<Luaran>, { id: string }>({
    mutationFn: async ({ id }) => await deleteMasterLuaran(id),
    onSuccess,
    onError,
  })
}
