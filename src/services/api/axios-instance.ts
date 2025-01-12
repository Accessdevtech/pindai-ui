import EncryptRequestResponse from "@/lib/encrypted"
import axios from "axios"
import { getCookie, removeCookie } from "../storage/cookie-storage-service"
import { API_BASE_URL } from "./api-config"

const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // Gunakan .env
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

const encryptRequestResponse = new EncryptRequestResponse(
  process.env.NEXT_PUBLIC_SECURE_REQUEST_KEY as string,
)
encryptRequestResponse.injectInterceptors(axiosInstance)

// Tambahkan interceptor untuk menyisipkan token
axiosInstance.interceptors.request.use(async config => {
  const token = await getCookie("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Tambahkan interceptor untuk error handling
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (!error.response) {
      return Promise.reject(error)
    }

    if (
      error.response.status === 401 &&
      error.response.data.message === "Unauthenticated."
    ) {
      await removeCookie("access_token")
      await removeCookie("user")

      window.location.href = "/"
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
