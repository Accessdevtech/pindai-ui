import { useQuery } from "@tanstack/react-query"
import { getFakultas } from "../../fakultas.service"

export const useGetFakultas = (
  page: number,
  perPage?: number,
  search?: string,
) => {
  return useQuery({
    queryKey: ["fakultas", page, perPage, search],
    queryFn: async () => await getFakultas(page, perPage, search),
    placeholderData: previouseData => previouseData,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })
}
