import { API_ENDPOINTS } from "@/services/api/api-config"
import { getData } from "@/services/api/http"
import { FakultasResponse } from "./fakultas.interface"

export async function getFakultasList() {
  const response: FakultasResponse = await getData(API_ENDPOINTS.LIST_FAKULTAS)
  return response
}
