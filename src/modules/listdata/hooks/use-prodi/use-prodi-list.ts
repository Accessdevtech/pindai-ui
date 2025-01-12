import { useQuery } from "@tanstack/react-query"
import { getProdiList } from "../../prodi.list.service"

export const useGetProdiList = (id: string) => {
  return useQuery({
    queryKey: ["prodi-list", id],
    queryFn: async () => await getProdiList(id),
    enabled: !!id,
  })
}
