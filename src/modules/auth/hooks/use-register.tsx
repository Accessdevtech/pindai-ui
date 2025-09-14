import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { register } from "../auth.service"
import { RegisterType } from "../schema/register.schema"

interface Props {
  onSuccess: (response: Response) => void
  onError: (error: AxiosError<Response>) => void
}

export const useRegister = ({ onSuccess, onError }: Props) => {
  return useMutation<Response, AxiosError<Response>, RegisterType>({
    mutationFn: async (data: RegisterType) => await register(data),
    onSuccess,
    onError
  })
}
