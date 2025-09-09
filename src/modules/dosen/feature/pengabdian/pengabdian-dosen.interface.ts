import { Meta, Response, StatusData } from "@/interface/type"

export interface PengabdianDosenData {
  pengabdian: PengabdianDosen[]
  meta: Meta
}

export interface PengabdianDosen {
  id: string
  title: string
  leader: string
  academic_year: string
  is_draft: boolean
  is_leader: boolean
  created_date: Date
  status: StatusData
  existFile: boolean
}

export interface PengabdianDosenResponse extends Response {
  data: PengabdianDosen
}

export interface DetailPengabdian {
  title: string
  leader: Leader
  bidang: string
  jenis_pengabdian: string
  semester: string
  deskripsi: string
  keterangan: string
  jenis_kriteria: string
  academic_year: string
  status: StatusData
  anggota: Anggota[]
  existFile: boolean
  created_date: string
}

export interface Leader {
  name: string
  prodi: string
}

export interface Anggota {
  nidn?: string
  name: string
  name_with_title?: string
  fakultas: string
  prodi: string
  phone_number: string
  email: string
  scholar_id: string
  scopus_id: string
  job_functional: string
  affiliate_campus: string
  is_leader: number
}

export interface ResponseDownloadPengabdian extends Response {
  base64: string
  file_name: string
}

export interface ResponseUploadPengabdian extends Response {}
