import { useQuery } from "@tanstack/react-query"
import { getListLuaran } from "../../pengabdian-dosen.service"

export const useGetListLuaran = (id: string) => {
  return useQuery({
    queryKey: ["jenis-luaran", id],
    queryFn: async () => await getListLuaran(id),
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })
}
