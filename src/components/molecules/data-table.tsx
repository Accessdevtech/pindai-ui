"use client";

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
} from "@tanstack/react-table";

import { Input } from "../ui/input";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RefreshCcwIcon, UploadIcon } from "lucide-react";
import { Meta, Role } from "@/interface/type";
import Tooltip from "./tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { useAtom, useSetAtom } from "jotai";
import { anggota } from "@/modules/dosen/feature/penelitian/state/store";
import { AnggotaType } from "@/modules/dosen/feature/penelitian/schema/anggota-schema";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta?: Meta;
  role?: Role;
  currentPage?: number;
  value?: string;
  isLoading?: boolean;
  refetch?: () => void;
  setValue?: (value: string) => void;
  onPaginationChange?: (page: number) => void;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  currentPage,
  value,
  role,
  isLoading,
  refetch,
  setValue,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

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
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search data..."
            value={value}
            onChange={(event) => setValue && setValue(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          <Button variant="outline" onClick={() => setValue && setValue("")}>
            Reset
          </Button>
        </div>
        <div className="flex gap-4">
          <Tooltip contentText="Refresh Halaman / Data">
            {!refetch ? null : (
              <Button
                size="icon"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground p-4"
                onClick={() => refetch()}
              >
                <RefreshCcwIcon className="h-4 w-4" />
              </Button>
            )}
          </Tooltip>
          {(role === "kaprodi" || role === "dosen") && (
            <Tooltip contentText="Export Excel">
              <Button
                size="icon"
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white p-4"
              >
                <UploadIcon className="h-4 w-4" />
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="rounded-md border flex-1 overflow-auto">
        <Table className="min-w-full w-max">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="capitalize">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="capitalize">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
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
        />
      )}
    </div>
  );
}
