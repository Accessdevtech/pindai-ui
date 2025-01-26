import { Response } from "@/interface/type"

export interface PenelitianData {
  id: string
  name: string
  kriteria: Kriteria[]
}

interface Kriteria {
  name: string
  keterangan: string
  nominal: number
}

export interface ListPenelitianResponse extends Response {
  data: PenelitianData[]
}
