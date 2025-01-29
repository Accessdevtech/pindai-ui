import { useQuery } from "@tanstack/react-query"
import { getDosen } from "../../dosen.service"

export const useGetDosen = (
  page: number,
  perPage?: number,
  search?: string,
) => {
  return useQuery({
    queryKey: ["dosen", page, perPage, search],
    queryFn: async () => await getDosen(page, perPage, search),
    placeholderData: previouseData => previouseData,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })
}
