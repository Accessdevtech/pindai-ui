import { useQuery } from "@tanstack/react-query"
import { getDetailPenelitian } from "../../keuangan.penelitian.service"

export const useGetDetailPenelitian = (id: string) => {
  return useQuery({
    queryKey: ["anggota", id],
    queryFn: async () => await getDetailPenelitian(id),
    placeholderData: previouseData => previouseData,
  })
}
