import { profileUser } from "@/modules/auth/auth.service"
import { useQuery } from "@tanstack/react-query"

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => await profileUser(),
    staleTime: 1000,
    refetchOnWindowFocus: false,
  })
}
