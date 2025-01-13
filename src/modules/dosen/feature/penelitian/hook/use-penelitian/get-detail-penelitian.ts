import { useQuery } from "@tanstack/react-query"
import { getDetailPenelitianDosen } from "../../penelitian-dosen.service"

export const useGetDetailPenelitian = (id: string) => {
  return useQuery({
    queryKey: ["anggota", id],
    queryFn: async () => await getDetailPenelitianDosen(id),
    placeholderData: previouseData => previouseData,
  })
}
