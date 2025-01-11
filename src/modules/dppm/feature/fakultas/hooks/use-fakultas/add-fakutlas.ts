import { useMutation } from "@tanstack/react-query";
import { FakultasType } from "../../fakultas.schema";
import { addFakultas } from "../../fakultas.service";
import { FakultasResponse } from "../../../../../listdata/fakultas.interface";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: FakultasResponse) => void;
  onError: (error: AxiosError<FakultasResponse>) => void;
}
export const useAddFakultas = ({ onSuccess, onError }: Props) => {
  return useMutation<
    FakultasResponse,
    AxiosError<FakultasResponse>,
    FakultasType
  >({
    mutationFn: async (data: FakultasType) => await addFakultas(data),
    onSuccess,
    onError,
  });
};
