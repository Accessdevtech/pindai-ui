"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import Tooltip from "@/components/atom/tooltip"
import { DataTablePagination } from "@/components/molecules/data-table-pagination"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Meta } from "@/interface/type"
import { cn } from "@/lib/utils"
import { EachUtil } from "@/utils/each-utils"
import { RefreshCcwIcon } from "lucide-react"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  meta?: Meta
  search?: boolean
  currentPage?: number
  setPerPage: (perPage: number) => void
  perPage: number
  value?: string
  isLoading?: boolean
  filtering?: {
    status?: boolean
    tahunAkademik?: boolean
  }
  refetch?: () => void
  setValue?: (value: string) => void
  onPaginationChange?: (page: number) => void
}

export function DataTableLuaran<TData, TValue>({
  columns,
  data,
  meta,
  currentPage,
  value,
  isLoading,
  search = false,
  perPage,
  refetch,
  setValue,
  setPerPage,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      pagination: {
        pageIndex: currentPage ? currentPage - 1 : 0,
        pageSize: meta?.per_page || perPage,
      },
    },
    pageCount: meta?.last_page,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
  })

  // Function to calculate row spans for categories
  const calculateCategorySpans = () => {
    const spans: { [key: string]: number } = {}
    const skipRows: { [key: string]: boolean } = {}

    table.getRowModel().rows.forEach((row, rowIndex) => {
      const category = (row.original as any).category

      if (
        rowIndex === 0 ||
        category !==
          (table.getRowModel().rows[rowIndex - 1].original as any).category
      ) {
        // Count how many rows have the same category
        let span = 1
        for (let i = rowIndex + 1; i < table.getRowModel().rows.length; i++) {
          if (
            (table.getRowModel().rows[i].original as any).category === category
          ) {
            span++
            skipRows[i] = true
          } else {
            break
          }
        }
        spans[rowIndex] = span
      }
    })

    return { spans, skipRows }
  }

  const { spans, skipRows } = calculateCategorySpans()

  return (
    <div className='space-y-4'>
      <div className='flex items-end justify-between xl:items-center'>
        {search && (
          <div className='flex flex-1 items-center space-x-2'>
            <Input
              placeholder='Search data...'
              value={value}
              onChange={event => setValue && setValue(event.target.value)}
              className='h-8 w-[150px] lg:w-[250px]'
            />
          </div>
        )}
        <div className='flex flex-col-reverse items-end gap-4 xl:flex-row xl:items-center'>
          <div className='flex gap-2'>
            <Tooltip contentText='Refresh Halaman / Data'>
              {!refetch ? null : (
                <Button
                  size='icon'
                  variant='outline'
                  className='border-primary p-4 text-primary hover:bg-primary hover:text-primary-foreground'
                  onClick={() => {
                    refetch && refetch()
                    setValue && setValue("")
                    onPaginationChange && onPaginationChange(1)
                  }}
                >
                  <RefreshCcwIcon className='h-4 w-4' />
                </Button>
              )}
            </Tooltip>
          </div>
        </div>
      </div>
      <div className='flex-1 overflow-auto rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                <EachUtil
                  of={headerGroup.headers}
                  render={header => (
                    <TableHead key={header.id} className='border-r text-center'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )}
                />
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  Loading ...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              <EachUtil
                of={table.getRowModel().rows}
                render={(row, rowIndex) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map(cell => {
                      // Skip rendering cell if it's part of a rowspan
                      if (cell.column.id === "category" && skipRows[rowIndex]) {
                        return null
                      }

                      return (
                        <TableCell
                          key={cell.id}
                          rowSpan={
                            cell.column.id === "category"
                              ? spans[rowIndex]
                              : undefined
                          }
                          className={cn("border-r", {
                            "text-center align-middle":
                              cell.column.id === "category",
                          })}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )}
              />
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!onPaginationChange ? null : (
        <DataTablePagination
          table={table}
          onPaginationChange={onPaginationChange}
          meta={meta || ({} as Meta)}
          serPerPage={setPerPage}
          perPage={perPage}
        />
      )}
    </div>
  )
}
