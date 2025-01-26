import { Meta } from "@/interface/type"

export interface ILuaran {
  luaran: Luaran[]
  meta: Meta
}

export interface Luaran {
  id: string
  name: string
  nominal: number
  terbilang: string
}
