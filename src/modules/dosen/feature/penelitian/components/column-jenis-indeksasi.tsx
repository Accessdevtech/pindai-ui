import { IndeksasiData } from "@/modules/listdata/indeksasi.list.interface"
import { ColumnDef } from "@tanstack/react-table"

export const columnJenisIndeksasi = (): ColumnDef<IndeksasiData>[] => {
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
