import { Meta } from "@/interface/type"

export type Periode = {
  id: string
  name: string
  start_date: string
  end_date: string
  status: "active" | "close" | "draft"
  can_update: boolean
  can_delete: boolean
}

export type PeriodeList = {
  periode: Periode[]
  meta: Meta
}
