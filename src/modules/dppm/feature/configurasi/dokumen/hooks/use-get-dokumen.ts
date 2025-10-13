import { useQuery } from "@tanstack/react-query"
import { getConfigDokumen } from "../service"

export const useGetDokumen = () => {
  return useQuery({
    queryKey: ["get-dokumen"],
    queryFn: async () => await getConfigDokumen(),
    staleTime: 5000,
    refetchOnWindowFocus: false
  })
}
