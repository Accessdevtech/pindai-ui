import { KaprodiResponse } from "@/modules/kaprodi/kaprodi.interface";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteKaprodi } from "../../kaprodi.service";

interface Props {
  onSuccess: (response: KaprodiResponse) => void;
  onError: (error: AxiosError<KaprodiResponse>) => void;
}

export const useDeleteKaprodi = ({ onSuccess, onError }: Props) => {
  return useMutation<
    KaprodiResponse,
    AxiosError<KaprodiResponse>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteKaprodi(id),
    onSuccess,
    onError,
  });
};
