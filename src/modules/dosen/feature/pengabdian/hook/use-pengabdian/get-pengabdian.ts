import { useQuery } from "@tanstack/react-query"
import { getPengabdianDosen } from "../../pengabdian-dosen.service"

export const useGetPengabdian = (
  page: number,
  perPage?: number,
  search?: string,
  tahun_akademik?: string,
  status_kaprodi?: string,
  status_dppm?: string,
  status_keuangan?: string,
) => {
  return useQuery({
    queryKey: [
      "pengabdian",
      page,
      perPage,
      search,
      tahun_akademik,
      status_kaprodi,
      status_dppm,
      status_keuangan,
    ],
    queryFn: async () =>
      await getPengabdianDosen(
        page,
        perPage,
        search,
        tahun_akademik,
        status_kaprodi,
        status_dppm,
        status_keuangan,
      ),
    placeholderData: previouseData => previouseData,
    staleTime: 2000,
    refetchOnWindowFocus: false,
  })
}
