import { useQuery } from "@tanstack/react-query"
import { getAnggota } from "../../pengabdian-dosen.service"

export const useGetAnggota = (
  page: number,
  perPage?: number,
  search?: string,
) => {
  return useQuery({
    queryKey: ["anggota", page, perPage, search],
    queryFn: async () => await getAnggota(page, perPage, search),
    placeholderData: previouseData => previouseData,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })
}
