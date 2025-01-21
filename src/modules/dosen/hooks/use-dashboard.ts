import { useQuery } from "@tanstack/react-query"
import { getDashboard } from "../dosen.service"

export const useGetDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => await getDashboard(),
    staleTime: 1000,
    refetchOnWindowFocus: false,
  })
}
