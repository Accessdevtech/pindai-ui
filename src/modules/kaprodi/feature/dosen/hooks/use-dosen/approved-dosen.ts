import { useMutation } from "@tanstack/react-query";
import { approveDosen } from "../../kaprodi.dosen.service";
import { AxiosError } from "axios";
import { DosenResponse } from "@/modules/dppm/feature/dosen/dosen.interface";

interface Props {
  onSuccess: (response: DosenResponse) => void;
  onError: (error: AxiosError<DosenResponse>) => void;
}

export const useApprovedDosen = ({ onSuccess, onError }: Props) => {
  return useMutation<DosenResponse, AxiosError<DosenResponse>, { id: string }>({
    mutationFn: async ({ id }) => await approveDosen(id),
    onSuccess,
    onError,
  });
};
