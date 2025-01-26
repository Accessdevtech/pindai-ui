import { DppmResponse } from "@/modules/dppm/dashboard.interface"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Luaran } from "../../luaran.interface"
import { updateMasterLuaran } from "../../master-luaran.service"
import { MasterLuaranType } from "../../schema/luaran"

interface IUpdateLuaran {
  onSuccess: (res: DppmResponse<Luaran>) => void
  onError: (err: AxiosError<DppmResponse<Luaran>>) => void
}

export const useUpdateLuaran = ({ onSuccess, onError }: IUpdateLuaran) => {
  return useMutation<
    DppmResponse<Luaran>,
    AxiosError<DppmResponse<Luaran>>,
    { id: string; data: MasterLuaranType }
  >({
    mutationFn: async ({ id, data }) => await updateMasterLuaran(id, data),
    onSuccess,
    onError,
  })
}
