import { useQuery } from "@tanstack/react-query"
import { getPublikasi } from "../../publikasi-service"

export const useGetPublikasi = (page: number, search?: string) => {
  return useQuery({
    queryKey: ["publikasi", page, search],
    queryFn: async () => await getPublikasi(page, search),
    staleTime: 2000,
    refetchOnWindowFocus: false,
  })
}
