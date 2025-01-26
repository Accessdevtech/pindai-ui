import { useQuery } from "@tanstack/react-query"
import { getMasterLuaran } from "../../master-luaran.service"

export const useGetLuaran = (page: number, search: string) => {
  return useQuery({
    queryKey: ["master-luaran"],
    queryFn: async () => await getMasterLuaran(page, search),
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })
}
