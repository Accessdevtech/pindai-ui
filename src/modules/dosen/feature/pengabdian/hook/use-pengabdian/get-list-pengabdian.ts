import { useQuery } from "@tanstack/react-query"
import { getListPengabdian } from "../../pengabdian-dosen.service"

export const useGetListPengabdian = () => {
  return useQuery({
    queryKey: ["jenis-penelitian"],
    queryFn: async () => await getListPengabdian(),
  })
}
