import { DppmResponse } from "@/modules/dppm/dashboard.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Luaran } from "../../luaran.interface"
import { createMasterLuaran } from "../../master-luaran.service"
import { MasterLuaranType } from "../../schema/luaran"

interface ICreateLuaran {
  onSuccess: (res: DppmResponse<Luaran>) => void
  onError: (err: AxiosError<DppmResponse<Luaran>>) => void
}

export const useCreateLuaran = ({ onSuccess, onError }: ICreateLuaran) => {
  return useMutation<
    DppmResponse<Luaran>,
    AxiosError<DppmResponse<Luaran>>,
    MasterLuaranType
  >({
    mutationFn: async data => await createMasterLuaran(data),
    onSuccess,
    onError,
  })
}
