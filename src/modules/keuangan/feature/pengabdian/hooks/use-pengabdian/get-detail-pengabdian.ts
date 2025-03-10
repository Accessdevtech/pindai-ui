import { useQuery } from "@tanstack/react-query"
import { getDetailPegabdian } from "../../keuangan.pengabdian.service"

export const useGetDetailPengabdian = (id: string) => {
  return useQuery({
    queryKey: ["detail-pengabdian", id],
    queryFn: async () => await getDetailPegabdian(id),
    placeholderData: previouseData => previouseData,
  })
}
