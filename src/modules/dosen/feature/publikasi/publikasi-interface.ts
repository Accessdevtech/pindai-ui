import { Meta, StatusData } from "@/interface/type"

export interface Publikasi {
  id: string
  judul: string
  jenis_publikasi: string
  tanggal_publikasi: string
  tahun: string
  author: string
  jurnal: string
  link_publikasi: string
  luaran_kriteria: string
}

export interface PublikasiDosen extends Publikasi {
  status: StatusData
}

export interface PublikasiList {
  id: string
  name: string
  kriteria: Kriteria[]
}

export interface Kriteria {
  id: string
  name: string
  keterangan: string
  nominal: number
}

export interface PublikasiData {
  publikasi: PublikasiDosen[]
  meta: Meta
}
