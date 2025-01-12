import { useQuery } from "@tanstack/react-query"
import { getFakultas } from "../../fakultas.service"

export const useGetFakultas = (page: number, search: string) => {
  return useQuery({
    queryKey: ["fakultas", page, search],
    queryFn: async () => await getFakultas(page, search),
    placeholderData: previouseData => previouseData,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })
}
