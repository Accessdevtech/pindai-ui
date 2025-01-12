import { useQuery } from "@tanstack/react-query"
import { getFakultasList } from "../../fakultas.list.service"

export const useGetFakultasList = () => {
  return useQuery({
    queryKey: ["fakultas-list"],
    queryFn: async () => await getFakultasList(),
  })
}
