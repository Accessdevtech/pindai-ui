import { Badge } from "@/components/ui/badge"
import { PengabdianData } from "@/modules/listdata/pengabdian.list.interface"
import { EachUtil } from "@/utils/each-utils"
import { formatRupiah } from "@/utils/format-rupiah"
import { ColumnDef } from "@tanstack/react-table"

export const columnJenisPengabdian = (): ColumnDef<PengabdianData>[] => {
  return [
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "kriteria",
      header: "",
      columns: [
        {
          header: "Kriteria",
          cell: ({ row }) => {
            const kriteria = row.original.kriteria
            return (
              <EachUtil
                of={kriteria}
                render={({ name }, index) => (
                  <span className='flex w-fit flex-col text-start' key={index}>
                    <Badge>{name}</Badge>
                  </span>
                )}
              />
            )
          },
        },
        {
          header: "Besaran",
          cell: ({ row }) => {
            const kriteria = row.original.kriteria
            return (
              <EachUtil
                of={kriteria}
                render={({ nominal }, index) => (
                  <span
                    className='flex flex-col items-end justify-end'
                    key={index}
                  >
                    {formatRupiah(nominal)}
                  </span>
                )}
              />
            )
          },
        },
        {
          header: "Keterangan",
          cell: ({ row }) => {
            const kriteria = row.original.kriteria
            return (
              <EachUtil
                of={kriteria}
                render={({ keterangan }, index) => (
                  <span
                    className='flex flex-col items-start justify-start'
                    key={index}
                  >
                    {keterangan}
                  </span>
                )}
              />
            )
          },
        },
      ],
    },
  ]
}
