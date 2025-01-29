import { useQuery } from "@tanstack/react-query"
import { getMasterLuaran } from "../../master-luaran.service"

export const useGetLuaran = (
  page: number,
  search?: string,
  perPage?: number,
) => {
  return useQuery({
    queryKey: ["master-luaran", page, search, perPage],
    queryFn: async () => await getMasterLuaran(page, search, perPage),
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })
}
