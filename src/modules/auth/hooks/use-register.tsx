import { Response } from "@/interface/type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { register } from "../auth.service";
import { RegisterType } from "../schema/register.schema";

interface Props {
  onSuccess: (response: AxiosResponse<Response>) => void;
  onError: (error: any) => void;
}

export const useRegister = ({ onSuccess, onError }: Props) => {
  return useMutation<AxiosResponse, AxiosError<Response>, RegisterType>({
    mutationFn: async (data: RegisterType) => await register(data),
    onSuccess,
    onError,
  });
};
