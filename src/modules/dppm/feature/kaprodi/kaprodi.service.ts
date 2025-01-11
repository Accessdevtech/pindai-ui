import { KaprodiResponse } from "@/modules/kaprodi/kaprodi.interface";
import { API_ENDPOINTS_DPPM } from "@/services/api/api-config";
import { deleteData, getData, postData, putData } from "@/services/api/http";
import { KaprodiType } from "./kaprodi.schema";
import { KaprodiData } from "./kaprodi.interface";
import { DppmResponse } from "../../dashboard.interface";

export async function getKaprodi(page: number, search: string) {
  const response: DppmResponse<KaprodiData> = await getData(
    API_ENDPOINTS_DPPM.KAPRODI,
    {
      page,
      search,
    },
  );
  return response.data;
}

export async function addKaprodi(data: KaprodiType) {
  const response: KaprodiResponse = await postData(API_ENDPOINTS_DPPM.KAPRODI, {
    ...data,
    status: data.status === "true" ? true : false,
  });
  return response;
}

export async function updateKaprodi(id: string, data: KaprodiType) {
  const response: KaprodiResponse = await putData(
    `${API_ENDPOINTS_DPPM.KAPRODI}/${id}`,
    {
      ...data,
      status: data.status === "true" ? true : false,
    },
  );
  return response;
}

export async function deleteKaprodi(id: string) {
  const response: KaprodiResponse = await deleteData(
    `${API_ENDPOINTS_DPPM.KAPRODI}/${id}`,
  );
  return response;
}
