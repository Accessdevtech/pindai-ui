"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type Document = {
  cover: string
  suratPengajuan: string
  suratRekomendasi: string
  proposal: string
  kontrakPengabdian: string
  suratKeteranganSelesai: string
  laporanKemajuan: string
  laporan: string
}

const data: Document[] = [
  {
    cover: "cover",
    suratPengajuan: "surat pengajuan",
    suratRekomendasi: "surat rekomendasi",
    proposal: "proposal",
    kontrakPengabdian: "kontrak pengabdian",
    suratKeteranganSelesai: "surat keterangan selesai",
    laporanKemajuan: "laporan kemajuan",
    laporan: "laporan",
  },
]
export default function DokumenTable({
  columns,
}: {
  columns: ColumnDef<Document>[]
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            {table.getAllColumns().map(column => (
              <TableHead
                key={column.id}
                className='whitespace-nowrap text-center'
              >
                {column.columnDef.header as string}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} className='text-center'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
