import { Response } from "@/interface/type"
import { UserType } from "@/schema/user"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { KeuanganResponse } from "../keuangan.interface"
import { updateProfile } from "../keuangan.service"

interface Props {
  onSuccess?: (data: KeuanganResponse<UserType>) => void
  onError?: (error: AxiosError<Response>) => void
}

export const useUpdateProfile = ({ onSuccess, onError }: Props) => {
  return useMutation<
    KeuanganResponse<UserType>,
    AxiosError<Response>,
    UserType
  >({
    mutationFn: data => updateProfile(data),
    onSuccess,
    onError,
  })
}
