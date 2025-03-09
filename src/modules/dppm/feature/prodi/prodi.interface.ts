import { Meta } from "@/interface/type"

export interface IProdi {
  id: string
  name: string
  fakultas: {
    id: string
    name: string
  }
}

export interface ProdiData {
  prodi: IProdi[]
  meta: Meta
}
