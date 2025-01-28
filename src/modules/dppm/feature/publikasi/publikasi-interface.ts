import { Meta, StatusData } from "@/interface/type"

export interface Publikasi {
  id: string
  judul: string
  jenis_publikasi: string
  jenis_publikasi_label: string
  tanggal_publikasi: string
  tahun: string
  author: string
  jurnal: string
  link_publikasi: string
  luaran_kriteria: string
  luaran_kriteria_label: string
  keterangan: string
}

export interface PublikasiDppm extends Publikasi {
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
  publikasi: PublikasiDppm[]
  meta: Meta
}
