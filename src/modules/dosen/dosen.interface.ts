import { Meta, Response, User } from "@/interface/type"

export interface IProdi {
  id: string
  name: string
}
export interface IProfileDosen extends Dosen {
  fakultas_id: string
  prodi_id: string
}

export interface Dosen extends User {
  affiliate_campus: string
  name_with_title: string
  job_functional: string
  phone_number: string
  scholar_id: string
  scopus_id: string
  prodi: string
  fakultas: string
}

export interface DosenData {
  dosen: Dosen[]
  meta: Meta
}

export interface ProfileDosen {
  user: string
}

export interface DosenResponse<T> extends Response {
  data: T
}
