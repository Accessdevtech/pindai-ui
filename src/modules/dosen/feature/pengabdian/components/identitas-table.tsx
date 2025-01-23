"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EachUtil } from "@/utils/each-utils"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Fragment } from "react"
import { Anggota } from "../pengabdian-dosen.interface"

interface IdentitasTableProps<TData extends Anggota, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
}

export function IdentitasTable<TData extends Anggota, TValue>({
  data,
  columns,
}: IdentitasTableProps<TData, TValue>) {
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
              <TableHead key={column.id} className='text-center'>
                {column.columnDef.header as string}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <EachUtil
            of={table.getRowModel().rows}
            render={(row, index) => {
              {
                // Add section headers
                const showKetuaHeader = index === 0
                const showAnggotaHeader =
                  row.original.is_leader === 0 &&
                  (index === 0 ||
                    table.getRowModel().rows[index - 1].original.is_leader ===
                      1)

                return (
                  <Fragment key={row.id}>
                    {showKetuaHeader && (
                      <TableRow className='text-center'>
                        <TableCell
                          colSpan={columns.length}
                          className='bg-gray-50 font-medium'
                        >
                          Ketua Kelompok
                        </TableCell>
                      </TableRow>
                    )}
                    {showAnggotaHeader && (
                      <TableRow className='text-center'>
                        <TableCell
                          colSpan={columns.length}
                          className='bg-gray-50 font-medium'
                        >
                          Anggota Kelompok
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <EachUtil
                        of={row.getVisibleCells()}
                        render={cell => (
                          <TableCell key={cell.id} className='text-center'>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        )}
                      />
                    </TableRow>
                  </Fragment>
                )
              }
            }}
          />
        </TableBody>
      </Table>
    </div>
  )
}
