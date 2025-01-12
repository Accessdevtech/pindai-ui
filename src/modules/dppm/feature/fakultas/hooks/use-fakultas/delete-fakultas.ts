import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { FakultasResponse } from "../../../../../listdata/fakultas.interface"
import { deleteFakultas } from "../../fakultas.service"

interface Props {
  onSuccess: (response: FakultasResponse) => void
  onError: (error: AxiosError<FakultasResponse>) => void
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
  })
}
