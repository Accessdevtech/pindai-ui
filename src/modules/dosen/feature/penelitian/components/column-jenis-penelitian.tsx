import { PenelitianData } from "@/modules/listdata/penelitian.list.interface"
import { ColumnDef } from "@tanstack/react-table"

export const columnJenisPenelitian = (): ColumnDef<PenelitianData>[] => {
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
