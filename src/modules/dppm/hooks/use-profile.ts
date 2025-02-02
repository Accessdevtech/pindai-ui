import { Response } from "@/interface/type"
import { UserType } from "@/schema/user"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { DppmResponse } from "../dashboard.interface"
import { updateProfile } from "../dashboard.service"

interface Props {
  onSuccess?: (data: DppmResponse<UserType>) => void
  onError?: (error: AxiosError<Response>) => void
}

export const useUpdateProfile = ({ onSuccess, onError }: Props) => {
  return useMutation<DppmResponse<UserType>, AxiosError<Response>, UserType>({
    mutationFn: data => updateProfile(data),
    onSuccess,
    onError,
  })
}
