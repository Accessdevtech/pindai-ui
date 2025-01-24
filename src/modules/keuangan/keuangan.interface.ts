import { Response, Status } from "@/interface/type"

export interface KeuanganResponse<T> extends Response {
  data: T
}

export interface News {
  id: string
  title: string
  leader: string
}

export interface StatusData {
  status: Status
  count: number
}

export interface Penelitian {
  news: News[]
  status: StatusData[]
}

export interface Pengabdian {
  news: News[]
  status: StatusData[]
}

export interface Publikasi {
  news: News[]
  status: StatusData[]
}

export interface KeuanganDashboard {
  penelitian: Penelitian
  pengabdian: Pengabdian
  publikasi: Publikasi
}
