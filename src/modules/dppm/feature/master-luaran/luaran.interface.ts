import { Meta } from "@/interface/type"

export interface ILuaran {
  luaran: Luaran[]
  meta: Meta
}

export interface Luaran {
  id: string
  name: string
  category: string
  kriteria: Kriteria[]
}

export interface LuaranShorted {
  category: string
  items: Luaran[]
}

export interface Kriteria {
  id?: string
  name: string
  nominal: number
  keterangan: string
}
