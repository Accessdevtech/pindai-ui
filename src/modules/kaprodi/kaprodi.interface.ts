import { Response, User } from "@/interface/type"

export interface IKaprodiProfile extends Kaprodi {
  fakultas_id: string
  prodi_id: string
}

export interface Kaprodi extends User {
  fakultas: string
  prodi: string
}

export interface KaprodiResponse<T = any> extends Response {
  data: T
}

export interface ProfileKaprodi {
  user: string
}

export interface ResponseDownload extends Response {
  base64: string
  file_name: string
}
