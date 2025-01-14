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

export type DocumentStatus = "pending" | "available" | "not_available"
export type Document = {
  cover: string
  suratPengajuan: string
  suratRekomendasi: string
  proposal: DocumentStatus
  kontrakPenelitian: DocumentStatus
  suratKeteranganSelesai: DocumentStatus
  laporan: DocumentStatus
}

const data: Document[] = [
  {
    cover: "cover.pdf",
    suratPengajuan: "surat.pdf",
    suratRekomendasi: "rekomendasi.pdf",
    proposal: "not_available",
    kontrakPenelitian: "not_available",
    suratKeteranganSelesai: "not_available",
    laporan: "not_available",
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
