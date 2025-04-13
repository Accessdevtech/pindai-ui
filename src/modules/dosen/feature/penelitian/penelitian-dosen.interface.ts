import { Meta, Response, StatusData } from "@/interface/type"

export interface PenelitianDosenData {
  penelitian: PenelitianDosen[]
  meta: Meta
}

export interface PenelitianDosen {
  id: string
  title: string
  leader: string
  academic_year: string
  created_date: Date
  status: StatusData
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
  deskripsi: string
  keterangan: string
  jenis_kriteria: string
  academic_year: string
  status: StatusData
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

export interface ResponseDownloadPenelitian extends Response {
  base64: string
  file_name: string
}

export interface ResponseUploadPenelitian extends Response {}
