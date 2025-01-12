import { Response } from "@/interface/type"

export interface PenelitianData {
  id: string
  name: string
  kriteria: string[]
  keterangan: string
}

export interface ListPenelitianResponse extends Response {
  data: PenelitianData[]
}
