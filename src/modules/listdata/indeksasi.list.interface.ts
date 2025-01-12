import { Response } from "@/interface/type"

export interface IndeksasiData {
  id: string
  name: string
  kriteria: string[]
  keterangan: string
}

export interface ListIndeksasiResponse extends Response {
  data: IndeksasiData[]
}
