import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { IProdi } from "../../prodi.interface"
import { ProdiType } from "../../prodi.schema"
import { addProdi } from "../../prodi.service"

interface Props {
  onSuccess: (response: Response<IProdi>) => void
  onError: (error: AxiosError<Response<IProdi>>) => void
}
export const useAddProdi = ({ onSuccess, onError }: Props) => {
  return useMutation<Response<IProdi>, AxiosError<Response<IProdi>>, ProdiType>(
    {
      mutationFn: async (data: ProdiType) => await addProdi(data),
      onSuccess,
      onError,
    },
  )
}
