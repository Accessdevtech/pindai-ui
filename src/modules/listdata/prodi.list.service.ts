import { API_ENDPOINTS } from "@/services/api/api-config";
import { getData } from "@/services/api/http";
import { ProdiResponse } from "./prodi.interface";

export async function getProdiList(id: string) {
  const response: ProdiResponse = await getData(
    `${API_ENDPOINTS.LIST_PRODI}/${id}`,
  );
  return response;
}
