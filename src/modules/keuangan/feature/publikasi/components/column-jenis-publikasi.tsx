import { Badge } from "@/components/ui/badge"
import { EachUtil } from "@/utils/each-utils"
import { ColumnDef } from "@tanstack/react-table"
import { PublikasiList } from "../publikasi-interface"

export const columnJenisPublikasi = (): ColumnDef<PublikasiList>[] => {
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
