import { API_ENDPOINTS_KAPRODI } from "@/services/api/api-config";
import { getData, postData } from "@/services/api/http";
import { KaprodiResponse } from "../../kaprodi.interface";
import { DosenData } from "@/modules/dppm/feature/dosen/dosen.interface";
import axiosInstance from "@/services/api/axios-instance";

export async function getDosen(page: number, search: string) {
  const response: KaprodiResponse<DosenData> = await getData(
    API_ENDPOINTS_KAPRODI.DOSEN,
    {
      page,
      search,
    },
  );

  return response.data;
}
export async function approveDosen(id: string) {
  const response = await axiosInstance.post(
    `${API_ENDPOINTS_KAPRODI.APPROVED}/${id}`,
    {},
  );
  return response.data;
}

export async function activeDosen(id: string, is_active: boolean) {
  const response = await axiosInstance.post(
    `${API_ENDPOINTS_KAPRODI.ACTIVE}/${id}`,
    { is_active },
  );
  return response.data;
}
