import { useQuery } from "@tanstack/react-query"
import { getKaprodi } from "../../kaprodi.service"

export const useGetKaprodi = (
  page: number,
  perPage?: number,
  search?: string,
) => {
  return useQuery({
    queryKey: ["kaprodi", page, perPage, search],
    queryFn: async () => await getKaprodi(page, perPage, search),
    placeholderData: previouseData => previouseData,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  })
}
