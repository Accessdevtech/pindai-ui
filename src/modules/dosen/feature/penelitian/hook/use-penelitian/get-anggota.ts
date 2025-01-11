import { useQuery } from "@tanstack/react-query";
import { getAnggota } from "../../penelitian-dosen.service";

export const useGetAnggota = (page: number, search: string) => {
  return useQuery({
    queryKey: ["anggota", page, search],
    queryFn: async () => await getAnggota(page, search),
    placeholderData: (previouseData) => previouseData,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });
};
