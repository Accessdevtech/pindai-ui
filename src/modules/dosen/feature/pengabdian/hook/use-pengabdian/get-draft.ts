import { useQuery } from "@tanstack/react-query"
import { getDraftPengabdian } from "../../pengabdian-dosen.service"

export const useGetDraftPengabdian = (id: string) => {
  return useQuery({
    queryKey: ["draft", id],
    queryFn: async () => await getDraftPengabdian(id),
    placeholderData: previouseData => previouseData
  })
}
