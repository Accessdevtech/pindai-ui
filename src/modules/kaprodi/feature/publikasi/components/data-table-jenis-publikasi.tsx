import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { EachUtil } from "@/utils/each-utils"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

interface DataTableProps<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  isLoading: boolean
}

export default function DataTableJenisPublikasi<TData, TValue>({
  data,
  columns,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
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
                      className='max-w-xs space-y-2 text-wrap border-r capitalize'
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
  )
}
