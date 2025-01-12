import { AxiosHeaders, AxiosInstance, InternalAxiosRequestConfig } from "axios"

import serialize from "@/utils/serialize"
import unserialize from "@/utils/unserialize"
import CryptoJS from "crypto-js"

interface InterceptorInstances {
  request: AxiosInstance["interceptors"]["request"]
  response: AxiosInstance["interceptors"]["response"]
}

interface Encrypted {
  ciphertext: CryptoJS.lib.WordArray
  iv: CryptoJS.lib.WordArray
}

const handleError = (error: Error) => {
  return Promise.reject(error)
}

class EncryptRequestResponse {
  private key: string
  private headers: Record<string, unknown>
  private interceptorInstances: InterceptorInstances | undefined

  constructor(base64Key: string) {
    if (!base64Key) {
      throw new Error("Encryption key is required")
    }

    // Decode base64 key
    this.key = base64Key.replace("base64:", "")
    this.headers = {}
  }

  private format(encrypted: Encrypted): string {
    const value = encrypted.ciphertext.toString(CryptoJS.enc.Base64)
    const iv = encrypted.iv.toString(CryptoJS.enc.Base64)
    const params = {
      value,
      iv,
      mac: CryptoJS.HmacSHA256(
        iv + value,
        CryptoJS.enc.Base64.parse(this.key),
      ).toString(),
    }

    return btoa(JSON.stringify(params))
  }

  // Encrypt data
  private encryptData(data: object): string {
    const payload = serialize(data)

    const encrypted = CryptoJS.AES.encrypt(
      payload,
      CryptoJS.enc.Base64.parse(this.key),
      {
        iv: CryptoJS.lib.WordArray.random(16),
      },
    )

    return this.format({
      ciphertext: encrypted.ciphertext,
      iv: encrypted.iv,
    })
  }

  // Decrypt data
  private decryptData(cipherText: string) {
    const dataEncrypted = JSON.parse(atob(cipherText))
    const decrypted = CryptoJS.AES.decrypt(
      dataEncrypted.value,
      CryptoJS.enc.Base64.parse(this.key),
      {
        iv: CryptoJS.enc.Base64.parse(dataEncrypted.iv),
      },
    ).toString(CryptoJS.enc.Utf8)

    return unserialize(decrypted)
  }

  // Inject interceptors to Axios instance
  injectInterceptors(axiosInstance: AxiosInstance): void {
    this.interceptorInstances = {
      request: axiosInstance.interceptors.request,
      response: axiosInstance.interceptors.response,
    }

    // Create interceptor instances request
    this.interceptorInstances?.request.use(
      (request: InternalAxiosRequestConfig) => {
        request.headers = new AxiosHeaders({
          ...request.headers,
          ...this.headers,
        })

        // Encrypt payload
        if (request.data) {
          // if (request.data.anggota && Array.isArray(request.data.anggota)) {
          // request.data.anggota = request.data.anggota.map((anggota: AnggotaType) => this.encryptData(anggota));
          // request.data.anggota = JSON.stringify(request.data.anggota);
          // request.data.anggota = this.encryptData(request.data.anggota);
          // }
          // request.data = { payload: this.encryptData(request.data) };
        }

        return request
      },
      handleError,
    )

    // Create interceptor instances response
    this.interceptorInstances?.response.use(response => {
      if (response.data.data) {
        response.data = {
          ...response.data,
          data: this.decryptData(response.data.data),
        }
      }

      return response
    }, handleError)
  }
}

export default EncryptRequestResponse
