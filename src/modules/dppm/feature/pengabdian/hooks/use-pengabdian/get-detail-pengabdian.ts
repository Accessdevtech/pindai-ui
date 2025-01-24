import { useQuery } from "@tanstack/react-query"
import { getDetailPengabdian } from "../../dppm.pengabdian.service"

export const useGetDetailPengabdian = (id: string) => {
  return useQuery({
    queryKey: ["detail-pengabdian", id],
    queryFn: async () => await getDetailPengabdian(id),
    placeholderData: previouseData => previouseData,
  })
}
