import { useQuery } from "@tanstack/react-query";
import { getDosen } from "../../dosen.service";

export const useGetDosen = (page: number, search: string) => {
  return useQuery({
    queryKey: ["dosen", page, search],
    queryFn: async () => await getDosen(page, search),
    placeholderData: (previouseData) => previouseData,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });
};
