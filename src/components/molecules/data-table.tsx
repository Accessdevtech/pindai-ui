"use client"
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Meta, Role } from "@/interface/type"
import { cn } from "@/lib/utils"
import {
  statusDppmAtom,
  statusKaprodiAtom,
  statusKeuanganAtom,
} from "@/modules/dosen/feature/penelitian/state/store"
import { EachUtil } from "@/utils/each-utils"
import { generateAcademicYears } from "@/utils/tahun-akademik"
import { useAtom } from "jotai"
import { RefreshCcwIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Combobox } from "../atom/combobox"
import Tooltip from "../atom/tooltip"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { DataTablePagination } from "./data-table-pagination"
import FilterStatus from "./filter-status"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  meta?: Meta
  role?: Role
  search?: boolean
  currentPage?: number
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

export default function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  currentPage,
  value,
  role,
  isLoading,
  search = false,
  filtering = { status: false, tahunAkademik: false },
  refetch,
  setValue,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [tahunAkademik, setTahunAkademik] = useState<string[]>([])
  const [statusKaprodi, setStatusKaprodi] = useAtom(statusKaprodiAtom)
  const [statusDppm, setStatusDppm] = useAtom(statusDppmAtom)
  const [statusKeuangan, setStatusKeuangan] = useAtom(statusKeuanganAtom)

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      pagination: {
        pageIndex: currentPage ? currentPage - 1 : 0,
        pageSize: meta?.per_page || 10,
      },
    },
    pageCount: meta?.last_page,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
  })

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const akademikYears = generateAcademicYears(
      currentYear - 5,
      currentYear + 5,
    )
    setTahunAkademik(akademikYears)
  }, [])

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
          {filtering.tahunAkademik && (
            <div className='flex flex-1 items-center space-x-2'>
              <Combobox
                options={tahunAkademik.map(item => ({
                  id: item.split("/").join(""),
                  name: item,
                }))}
              />
            </div>
          )}
          {filtering.status && (
            <div className='flex flex-1 items-center space-x-2'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='border-neutral-300 capitalize text-muted-foreground'
                  >
                    filter Status
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='flex w-fit items-center justify-between gap-4'>
                  <FilterStatus
                    status={["pending", "accepted", "rejected"]}
                    onValueChange={setStatusKaprodi}
                    checked={statusKaprodi}
                    label='Kaprodi'
                  />
                  <FilterStatus
                    status={["pending", "accepted", "rejected"]}
                    onValueChange={setStatusDppm}
                    checked={statusDppm}
                    label='Dppm'
                  />
                  <FilterStatus
                    status={["pending", "accepted", "rejected"]}
                    onValueChange={setStatusKeuangan}
                    checked={statusKeuangan}
                    label='Keuangan'
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
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
                    setStatusKaprodi("")
                    setStatusDppm("")
                    setStatusKeuangan("")
                  }}
                >
                  <RefreshCcwIcon className='h-4 w-4' />
                </Button>
              )}
            </Tooltip>
            {/* {["dppm", "kaprodi"].includes(role as string) && (
              <Tooltip contentText='Export Excel'>
                <Button
                  size='icon'
                  variant='outline'
                  className='border-green-500 p-4 text-green-500 hover:bg-green-500 hover:text-white'
                >
                  <UploadIcon className='h-4 w-4' />
                </Button>
              </Tooltip>
            )} */}
          </div>
        </div>
      </div>
      <div className='flex-1 overflow-auto rounded-md border'>
        <Table className='w-max min-w-full'>
          <TableHeader>
            <EachUtil
              of={table.getHeaderGroups()}
              render={headerGroup => (
                <TableRow key={headerGroup.id}>
                  <EachUtil
                    of={headerGroup.headers}
                    render={header => {
                      return (
                        <TableHead
                          key={header.id}
                          className={cn("border-r text-center capitalize", {})}
                          colSpan={header.colSpan}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      )
                    }}
                  />
                </TableRow>
              )}
            />
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  className='h-24 text-center'
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              <EachUtil
                of={table.getRowModel().rows}
                render={row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className='text-center'
                  >
                    <EachUtil
                      of={row.getVisibleCells()}
                      render={cell => (
                        <TableCell
                          key={cell.id}
                          className='max-w-xs text-wrap border-r capitalize'
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      )}
                    />
                  </TableRow>
                )}
              />
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  className='h-24 text-center capitalize'
                >
                  tidak ada data
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
        />
      )}
    </div>
  )
}
