import { useQuery } from "@tanstack/react-query"
import { getDetailPengabdianDosen } from "../../pengabdian-dosen.service"

export const useGetDetailPengabdian = (id: string) => {
  return useQuery({
    queryKey: ["anggota-pengabdian", id],
    queryFn: async () => await getDetailPengabdianDosen(id),
    placeholderData: previouseData => previouseData,
  })
}
