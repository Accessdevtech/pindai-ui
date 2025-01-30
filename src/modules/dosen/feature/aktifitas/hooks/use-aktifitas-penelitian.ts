import { useQuery } from "@tanstack/react-query"
import { getAktifitasPenelitian } from "../aktifitas-service"

export const useGetAktifitasPenelitian = (page: number, search?: string) => {
  return useQuery({
    queryKey: ["aktifitas-penelitian", page, search],
    queryFn: async () => await getAktifitasPenelitian(page, search),
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })
}
