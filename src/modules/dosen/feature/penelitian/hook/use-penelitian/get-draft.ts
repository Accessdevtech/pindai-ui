import { useQuery } from "@tanstack/react-query"
import { getDraftPenelitian } from "../../penelitian-dosen.service"

export const useGetDraftPenelitian = (id: string) => {
  return useQuery({
    queryKey: ["draft", id],
    queryFn: async () => await getDraftPenelitian(id),
    placeholderData: previouseData => previouseData
  })
}
