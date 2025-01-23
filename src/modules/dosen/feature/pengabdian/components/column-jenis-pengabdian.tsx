import { PengabdianData } from "@/modules/listdata/pengabdian.list.interface"
import { ColumnDef } from "@tanstack/react-table"

export const columnJenisPengabdian = (): ColumnDef<PengabdianData>[] => {
  return [
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "kriteria",
      header: "Kriteria",
    },
    {
      accessorKey: "keterangan",
      header: "Keterangan",
    },
  ]
}
