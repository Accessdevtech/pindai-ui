import { Meta, Response } from "@/interface/type"

export interface FakultasData {
  fakultas: IFakultas[]
  meta: Meta
}

export interface Fakultas extends Omit<IFakultas, "id"> {
  dosen_count: number
}

export interface IFakultas {
  id: string
  name: string
}
export interface FakultasResponse extends Response {
  data: IFakultas[]
}
