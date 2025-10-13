import { useQuery } from "@tanstack/react-query"
import { getPeriode } from "../service"

export const useGetPeriodes = ({
  page,
  perPage = 10,
  search = ""
}: {
  page: number
  perPage?: number
  search?: string
}) => {
  return useQuery({
    queryKey: ["periode", page, perPage, search],
    queryFn: async () => await getPeriode({ page, perPage, search }),
    placeholderData: previouseData => previouseData,
    staleTime: 5000,
    refetchOnWindowFocus: false
  })
}
