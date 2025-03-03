import { API_ENDPOINTS } from "./api/api-config"
import { postData } from "./api/http"

export const downloadExcel = async (category: string) => {
  const response = await postData(API_ENDPOINTS.DOWNLOAD_EXCEL, { category })
  return response
}
