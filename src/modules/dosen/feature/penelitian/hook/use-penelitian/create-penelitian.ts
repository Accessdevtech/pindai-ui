import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Response } from "@/interface/type";
import { PenelitianType } from "../../schema/penelitian-schema";
import { createPenelitianDosen } from "../../penelitian-dosen.service";

interface Props {
  onSuccess: (response: Response) => void;
  onError: (error: AxiosError<Response>) => void;
}

export const useCreatePenelitian = ({ onSuccess, onError }: Props) => {
  return useMutation<Response, AxiosError<Response>, PenelitianType>({
    mutationFn: async (data: PenelitianType) =>
      await createPenelitianDosen(data),
    onSuccess,
    onError,
  });
};
