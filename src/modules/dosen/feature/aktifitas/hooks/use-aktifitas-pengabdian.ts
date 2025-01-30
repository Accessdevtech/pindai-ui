import { useQuery } from "@tanstack/react-query"
import { getAktifitasPengabdian } from "../aktifitas-service"

export const useGetAktifitasPengabdian = (page: number, search?: string) => {
  return useQuery({
    queryKey: ["aktifitas-pengabdian", page, search],
    queryFn: async () => await getAktifitasPengabdian(page, search),
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })
}
