import { Meta } from "@/interface/type"

export interface PenelitianDosenData {
  penelitian: PenelitianDosen[]
  meta: Meta
}

export type Status = "accepted" | "rejected" | "pending" | "draft"

export interface StatusPenelitian {
  kaprodi: Status
  dppm: Status
  keuangan: Status
}

export interface PenelitianDosen {
  id: string
  title: string
  leader: string
  academic_year: string
  created_date: Date
  status: StatusPenelitian
}

export interface PenelitianDosenResponse<T> extends Response {
  data: T
}
