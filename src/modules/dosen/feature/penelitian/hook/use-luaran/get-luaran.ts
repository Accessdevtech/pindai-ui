import { useQuery } from "@tanstack/react-query"
import { getListLuaran } from "../../penelitian-dosen.service"

export const useGetListLuaran = () => {
  return useQuery({
    queryKey: ["jenis-luaran"],
    queryFn: async () => await getListLuaran(),
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })
}
