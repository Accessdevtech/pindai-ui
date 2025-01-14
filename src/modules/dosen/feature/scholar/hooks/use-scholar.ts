import { useQuery } from "@tanstack/react-query"
import { getScholarId, getScholarProfile } from "../scholar.serivce"

export const useListScholarId = (search?: string) => {
  return useQuery({
    queryKey: ["scholar", search],
    queryFn: async () => await getScholarId(search),
    // staleTime: 1000,
    refetchOnWindowFocus: false,
  })
}

export const useProfileScholar = (id: string) => {
  return useQuery({
    queryKey: ["scholar", id],
    queryFn: async () => await getScholarProfile(id),
    // staleTime: 1000,
    refetchOnWindowFocus: false,
  })
}
