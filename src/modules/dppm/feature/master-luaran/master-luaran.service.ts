import { API_ENDPOINTS_DPPM } from "@/services/api/api-config"
import { deleteData, getData, postData, putData } from "@/services/api/http"
import { DppmResponse } from "../../dashboard.interface"
import { ILuaran } from "./luaran.interface"
import { MasterLuaranType } from "./schema/luaran"

export async function getMasterLuaran(page: number, search: string) {
  const response: DppmResponse<ILuaran> = await getData(
    API_ENDPOINTS_DPPM.LUARAN,
    {
      page,
      search,
    },
  )
  return response.data
}

export async function createMasterLuaran(data: MasterLuaranType) {
  const response = await postData(API_ENDPOINTS_DPPM.LUARAN, data)
  return response
}

export async function updateMasterLuaran(id: string, data: MasterLuaranType) {
  const response = await putData(`${API_ENDPOINTS_DPPM.LUARAN}/${id}`, data)
  return response
}

export async function deleteMasterLuaran(id: string) {
  const response = await deleteData(`${API_ENDPOINTS_DPPM.LUARAN}/${id}`)
  return response
}
