import { Meta, Response, User } from "@/interface/type"

export interface IDosen extends Dosen {
  is_approved: boolean
  is_active: boolean
}

export interface Dosen extends User {
  affiliate_campus: string
  name_with_title: string
  job_functional: string
  phone_number: string
  scholar_id: string
  scopus_id: string
  prodi: string
}

export interface DosenData {
  dosen: IDosen[]
  meta: Meta
}

export interface DosenResponse extends Response {
  data: Dosen[]
}
