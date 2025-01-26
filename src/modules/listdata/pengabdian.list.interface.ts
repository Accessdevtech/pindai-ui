import { Response } from "@/interface/type"

export interface PengabdianData {
  id: string
  name: string
  kriteria: Kriteria[]
}

export interface Kriteria {
  id: string
  name: string
  keterangan: string
  nominal: string
}

export interface ListPengabdianResponse extends Response {
  data: PengabdianData[]
}
