"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon } from "lucide-react"
import React, { useCallback } from "react"
import { FieldValues, useFieldArray, type UseFormReturn } from "react-hook-form"

interface EditableFormTableProps<TForm extends FieldValues> {
  form: UseFormReturn<TForm>
  name: string
  columns: ColumnDef<any>[]
  defaultRow: any
}

export function EditableFormTable<TForm extends FieldValues>({
  form,
  name,
  columns,
  defaultRow,
}: EditableFormTableProps<TForm>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: name as any,
  })

  const removeRow = useCallback(
    (index: number) => {
      remove(index)
    },
    [remove],
  )
  const table = useReactTable({
    data: fields,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    meta: {
      removeRow,
    },
  })

  return (
    <div className='space-y-4'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: <ArrowUpNarrowWideIcon className='ml-2 h-4 w-4' />,
                        desc: (
                          <ArrowDownNarrowWideIcon className='ml-2 h-4 w-4' />
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex items-center justify-between'>
        <Button type='button' onClick={() => append(defaultRow)}>
          Tambah Baris
        </Button>
        {/* <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Sebelumnya
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Selanjutnya
          </Button>
        </div> */}
      </div>
    </div>
  )
}
