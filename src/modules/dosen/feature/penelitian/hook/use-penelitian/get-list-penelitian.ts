import { useQuery } from "@tanstack/react-query"
import { getListPenelitian } from "../../penelitian-dosen.service"

export const useGetListPenelitian = () => {
  return useQuery({
    queryKey: ["jenis-penelitian"],
    queryFn: async () => await getListPenelitian(),
  })
}
