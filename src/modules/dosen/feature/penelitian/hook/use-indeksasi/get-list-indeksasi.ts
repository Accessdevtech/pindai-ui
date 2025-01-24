import { useQuery } from "@tanstack/react-query"
import { getListIndeksasi } from "../../penelitian-dosen.service"

export const useGetListIndeksasi = () => {
  return useQuery({
    queryKey: ["jenis-indeksasi"],
    queryFn: async () => await getListIndeksasi(),
  })
}
