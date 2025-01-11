import { useQuery } from "@tanstack/react-query";
import { getListPengabdian } from "../../penelitian-dosen.service";

export const useGetListPengabdian = () => {
  return useQuery({
    queryKey: ["jenis-pengabdian"],
    queryFn: async () => await getListPengabdian,
  });
};
