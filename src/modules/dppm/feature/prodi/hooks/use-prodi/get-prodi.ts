import { useQuery } from "@tanstack/react-query"
import { getProdi } from "../../prodi.service"

export const useGetProdi = (
  page: number,
  perPage?: number,
  search?: string,
) => {
  return useQuery({
    queryKey: ["fakultas", page, perPage, search],
    queryFn: async () => await getProdi(page, perPage, search),
    placeholderData: previouseData => previouseData,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })
}
