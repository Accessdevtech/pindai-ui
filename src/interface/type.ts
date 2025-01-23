export type Role = "kaprodi" | "dppm" | "dosen" | "keuangan"

export interface Response<T = any> {
  data: T
  message: string
  status: string
  errors?: string
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  path: string
  per_page: number
  to: number
  total: number
}

export interface User {
  id: string
  nidn: string
  name: string
  email: string
  address: string
  role: Role
}

export type Status = "accepted" | "rejected" | "pending"

export interface StatusData {
  kaprodi: Status
  dppm: Status
  keuangan: Status
}
