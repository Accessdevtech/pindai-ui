import { formatRupiah } from "@/utils/format-rupiah"
import { ColumnDef } from "@tanstack/react-table"
import { Kriteria } from "../luaran.interface"

export const columnsDetailMasterLuaran: ColumnDef<Kriteria>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "nominal",
    header: "Nominal",
    cell: ({ row }) => {
      return <span>{formatRupiah(row.original.nominal)}</span>
    },
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
  },
]
