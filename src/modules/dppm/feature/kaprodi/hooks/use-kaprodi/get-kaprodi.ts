import { useQuery } from "@tanstack/react-query";
import { getKaprodi } from "../../kaprodi.service";

export const useGetKaprodi = (page: number, search: string) => {
  return useQuery({
    queryKey: ["kaprodi", page, search],
    queryFn: async () => await getKaprodi(page, search),
    placeholderData: (previouseData) => previouseData,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });
};
