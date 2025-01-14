import { Response } from "@/interface/type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { KaprodiResponse, ProfileKaprodi } from "../../kaprodi.interface"
import { ProfileType } from "../../kaprodi.profile.schema"
import { updateProfile } from "../../kaprodi.service"

interface Props {
  onSuccess: (response: KaprodiResponse<ProfileKaprodi>) => void
  onError: (error: AxiosError<Response>) => void
}

export const useUpdateProfile = ({ onSuccess, onError }: Props) => {
  return useMutation<
    KaprodiResponse<ProfileKaprodi>,
    AxiosError<Response>,
    ProfileType
  >({
    mutationFn: (data: ProfileType) => updateProfile(data),
    onSuccess,
    onError,
  })
}
