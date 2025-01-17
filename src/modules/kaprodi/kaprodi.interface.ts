import { Response, User } from "@/interface/type"

export interface IKaprodiProfile extends Kaprodi {
  fakultas_id: string
}

export interface Kaprodi extends User {
  fakultas: string
}

export interface KaprodiResponse<T = any> extends Response {
  data: T
}

export interface ProfileKaprodi {
  user: string
}
