import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { IProdi } from "../../prodi.interface"
import { deleteProdi } from "../../prodi.service"

interface Props {
  onSuccess: (response: Response<IProdi>) => void
  onError: (error: AxiosError<Response<IProdi>>) => void
}
export const useDeleteProdi = ({ onSuccess, onError }: Props) => {
  return useMutation<
    Response<IProdi>,
    AxiosError<Response<IProdi>>,
    { id: string }
  >({
    mutationFn: async ({ id }) => await deleteProdi(id),
    onSuccess,
    onError,
  })
}
