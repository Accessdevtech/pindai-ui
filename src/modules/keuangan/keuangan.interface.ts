import { Response } from "@/interface/type"

export interface KeuanganResponse<T> extends Response {
  data: T
}
