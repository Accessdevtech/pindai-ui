import { useQuery } from "@tanstack/react-query"
import { getListPengabdian } from "../../pengabdian-dosen.service"

export const useGetListPengabdian = () => {
  return useQuery({
    queryKey: ["jenis-pengabdian"],
    queryFn: async () => await getListPengabdian(),
  })
}
