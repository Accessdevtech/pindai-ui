import { useQuery } from "@tanstack/react-query"
import { getDashboard } from "../../kaprodi.service"

export const useGetDashboard = () => {
  return useQuery({
    queryKey: ["dashboard-kaprodi"],
    queryFn: async () => await getDashboard(),
  })
}
