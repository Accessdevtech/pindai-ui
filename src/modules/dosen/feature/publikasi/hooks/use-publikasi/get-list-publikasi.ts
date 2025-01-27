import { useQuery } from "@tanstack/react-query"
import { getListPublikasi } from "../../publikasi-service"

export const useGetListPublikasi = () => {
  return useQuery({
    queryKey: ["list-publikasi"],
    queryFn: async () => await getListPublikasi(),
  })
}
