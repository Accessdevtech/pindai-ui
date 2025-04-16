import { API_ENDPOINTS } from "./api/api-config"
import { postData } from "./api/http"

export const viewDocs = async (
  id: string,
  category: string,
  jenis_dokumen: string,
) => {
  const response = await postData(`${API_ENDPOINTS.VIEW_DOKUMEN}/${id}`, {
    category,
    jenis_dokumen,
  })
  return response
}
