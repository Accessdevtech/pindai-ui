import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { deleteFakultas } from "../../fakultas.service";
import { FakultasResponse } from "../../../../../listdata/fakultas.interface";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: FakultasResponse) => void;
  onError: (error: AxiosError<FakultasResponse>) => void;
}
export const useDeleteFakultas = ({ onSuccess, onError }: Props) => {
  return useMutation<
    FakultasResponse,
    AxiosError<FakultasResponse>,
    { id: string }
  >({
    mutationFn: async ({ id }) => await deleteFakultas(id),
    onSuccess,
    onError,
  });
};
