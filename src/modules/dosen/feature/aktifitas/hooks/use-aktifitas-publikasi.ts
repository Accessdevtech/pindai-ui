import { useQuery } from "@tanstack/react-query"
import { getAktifitasPublikasi } from "../aktifitas-service"

export const useGetAktifitasPublikasi = (page: number, search?: string) => {
  return useQuery({
    queryKey: ["aktifitas-publikasi", page, search],
    queryFn: async () => await getAktifitasPublikasi(page, search),
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })
}
