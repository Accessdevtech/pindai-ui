import { useMutation } from "@tanstack/react-query";
import { activeDosen } from "../../kaprodi.dosen.service";
import { AxiosError } from "axios";
import { DosenResponse } from "@/modules/dppm/feature/dosen/dosen.interface";

interface Props {
  onSuccess: (response: DosenResponse) => void;
  onError: (error: AxiosError<DosenResponse>) => void;
}

export const useActiveDosen = ({ onSuccess, onError }: Props) => {
  return useMutation<
    DosenResponse,
    AxiosError<DosenResponse>,
    { id: string; is_active: boolean }
  >({
    mutationFn: async ({ id, is_active }) => await activeDosen(id, is_active),
    onSuccess,
    onError,
  });
};
