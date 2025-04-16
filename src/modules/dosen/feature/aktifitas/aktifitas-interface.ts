import { Meta } from "@/interface/type"

export interface AktifitasList {
  id: string
  title: string
  date: string
}

export interface Aktifitas extends AktifitasList {
  steps: Step[]
}

export interface AktifitasData {
  track: Aktifitas[]
  meta: Meta
}

export interface Step {
  name: string
  description: string
  date: string
  time: string
}
