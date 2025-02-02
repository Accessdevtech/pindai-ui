import { Response } from "@/interface/type"
import { ChangePasswordType } from "@/schema/user"
import { changePassword } from "@/services/change-password"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface Props {
  onSuccess?: (data: Response) => void
  onError?: (error: AxiosError<Response>) => void
}

export const useChangePassword = ({ onSuccess, onError }: Props) => {
  return useMutation<Response, AxiosError<Response>, ChangePasswordType>({
    mutationFn: data => changePassword(data),
    onSuccess,
    onError,
  })
}
