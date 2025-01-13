"use client"
import {
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
import { columnsHasilPublikasi } from "./column-hasil-publikasi"

export type HasilPublikasi = {
  id: string
  title: string
  link: string
  jenis_publikasi: string
  tanggal_publikasi: string
  indeksasi: string
}

const data: HasilPublikasi[] = [
  {
    id: "1",
    title: "Mengabdikan Diri",
    link: "#",
    jenis_publikasi: "penelitian",
    tanggal_publikasi: "2023-05-31",
    indeksasi: "Belum set",
  },
]
export default function HasilPublikasiTable() {
  const table = useReactTable({
    data,
    columns: columnsHasilPublikasi,
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
