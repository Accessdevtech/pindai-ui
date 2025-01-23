import { Response, Status } from "@/interface/type"

export interface DppmDashboardResopnse extends Response {
  data: DppmDashboard
}

export interface DppmDashboard {
  fakultas: Fakultas[]
  penelitian: Penelitian
}

export interface News {
  id: string
  title: string
  leader: string
}

export interface StatusPenelitian {
  status: Status
  count: number
}

export interface Penelitian {
  news: News[]
  status: StatusPenelitian[]
}

export interface Fakultas {
  id: string
  name: string
  dosen_count?: number
}

export interface DppmResponse<T> extends Response {
  data: T
}
