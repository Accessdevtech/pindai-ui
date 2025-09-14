import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { forgotPasswordEmail, forgotPasswordReset } from "../auth.service"
import {
  ForgotPasswordEmailType,
  ForgotPasswordResetType
} from "../schema/forgot-password.schema"

interface Props {
  onSuccess: (response: Response) => void
  onError: (error: AxiosError<Response>) => void
}

export const useForgotPasswordEmail = ({ onSuccess, onError }: Props) => {
  return useMutation<Response, AxiosError<Response>, ForgotPasswordEmailType>({
    mutationFn: async (data: ForgotPasswordEmailType) =>
      await forgotPasswordEmail(data),
    onSuccess,
    onError
  })
}

export const useForgotPasswordReset = ({ onSuccess, onError }: Props) => {
  return useMutation<Response, AxiosError<Response>, ForgotPasswordResetType>({
    mutationFn: async (data: ForgotPasswordResetType) =>
      await forgotPasswordReset(data),
    onSuccess,
    onError
  })
}
