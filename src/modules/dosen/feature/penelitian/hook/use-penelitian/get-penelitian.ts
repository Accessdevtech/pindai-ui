import { useQuery } from "@tanstack/react-query"
import { getPenelitianDosen } from "../../penelitian-dosen.service"

export const useGetPenelitian = (page: number, search: string) => {
  return useQuery({
    queryKey: ["anggota", page, search],
    queryFn: async () => await getPenelitianDosen(page, search),
    placeholderData: previouseData => previouseData,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })
}
