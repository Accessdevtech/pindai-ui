import { Response } from "@/interface/type"
import { API_ENDPOINTS_DPPM } from "@/services/api/api-config"
import { getData, putData } from "@/services/api/http"
import { FieldConfig, Payload } from "./type"

export const getConfigDokumen = async () => {
  const response: Response<FieldConfig[]> = await getData(
    API_ENDPOINTS_DPPM.CONIG_DOKUMEN
  )
  return response.data
}

export const saveConfigDokumen = async (payload: Payload) => {
  const response: Response = await putData(
    API_ENDPOINTS_DPPM.CONIG_DOKUMEN,
    payload.fields
  )
  return response
}
