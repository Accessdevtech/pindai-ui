import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { updateProfile } from "../../dosen.service"
import { ProfileType } from "../../profile.schema"

interface Props {
  onSuccess: (response: Response) => void
  onError: (error: AxiosError<Response>) => void
}

export const useUpdateProfile = ({ onSuccess, onError }: Props) => {
  return useMutation<Response, AxiosError<Response>, ProfileType>({
    mutationFn: (data: ProfileType) => updateProfile(data),
    onSuccess,
    onError,
  })
}
