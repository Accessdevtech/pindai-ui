import { Meta, Response } from "@/interface/type"

export interface PenelitianDosenData {
  penelitian: PenelitianDosen[]
  meta: Meta
}

export type Status = "accepted" | "rejected" | "pending"

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

export interface PenelitianDosenResponse extends Response {
  data: PenelitianDosen
}

export interface DetailPenelitian {
  title: string
  leader: Leader
  bidang: string
  jenis_penelitian: string
  semester: string
  keterangan: string
  jenis_indeksasi: string
  academic_year: string
  status: StatusPenelitian
  anggota: Anggota[]
}

export interface Leader {
  name: string
  prodi: string
}

export interface Anggota {
  nidn?: string
  name: string
  name_with_title?: string
  prodi: string
  phone_number: string
  email: string
  scholar_id: string
  scopus_id: string
  job_functional: string
  affiliate_campus: string
  is_leader: number
}
