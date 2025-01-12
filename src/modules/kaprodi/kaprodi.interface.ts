import { Response, User } from "@/interface/type"

export interface Kaprodi extends User {
  fakultas: string
}

export interface KaprodiResponse<T = null> extends Response {
  data?: T
}
