import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { FakultasType } from "../../fakultas.schema";
import { updateFakultas } from "../../fakultas.service";
import { FakultasResponse } from "../../../../../listdata/fakultas.interface";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: FakultasResponse) => void;
  onError: (error: AxiosError<FakultasResponse>) => void;
}
export const useUpdateFakultas = ({ onSuccess, onError }: Props) => {
  return useMutation<
    FakultasResponse,
    AxiosError<FakultasResponse>,
    { id: string; data: FakultasType }
  >({
    mutationFn: async ({ id, data }) => await updateFakultas(id, data),
    onSuccess,
    onError,
  });
};
