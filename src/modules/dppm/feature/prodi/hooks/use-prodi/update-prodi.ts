import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { IProdi } from "../../prodi.interface"
import { ProdiType } from "../../prodi.schema"
import { updateProdi } from "../../prodi.service"

interface Props {
  onSuccess: (response: Response<IProdi>) => void
  onError: (error: AxiosError<Response<IProdi>>) => void
}
export const useUpdateProdi = ({ onSuccess, onError }: Props) => {
  return useMutation<
    Response<IProdi>,
    AxiosError<Response<IProdi>>,
    { id: string; data: ProdiType }
  >({
    mutationFn: async ({ id, data }) => await updateProdi(id, data),
    onSuccess,
    onError,
  })
}
