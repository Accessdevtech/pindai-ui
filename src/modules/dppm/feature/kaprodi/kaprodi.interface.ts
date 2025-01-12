import { Meta } from "@/interface/type"
import { Kaprodi } from "@/modules/kaprodi/kaprodi.interface"

export interface IKaprodi extends Kaprodi {
  fakultas_id: string
  status: "true" | "false"
}

export interface KaprodiData {
  kaprodi: IKaprodi[]
  meta: Meta
}
