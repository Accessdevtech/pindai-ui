"use client"
import Alert from "@/components/atom/alert"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { formatRupiah, parseRupiah } from "@/utils/format-rupiah"
import type { ColumnDef } from "@tanstack/react-table"
import { TrashIcon } from "lucide-react"
import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"

export function createEditableColumns<TData>(
  form: UseFormReturn<any>,
  name: string,
  fields: (keyof TData & string)[],
): ColumnDef<TData>[] {
  const columns: ColumnDef<TData>[] = fields.map(field => ({
    accessorKey: field,
    header: field.charAt(0).toUpperCase() + field.slice(1),
    cell: ({ row }) => {
      return (
        <FormField
          control={form.control}
          name={`${name}.${row.index}.${field}`}
          render={({ field: formField }) => (
            <FormItem>
              <FormControl>
                {field === "keterangan" ? (
                  <Textarea
                    {...formField}
                    onChange={e => {
                      formField.onChange(e.target.value)
                    }}
                  />
                ) : (
                  <Input
                    {...formField}
                    value={
                      field === "nominal"
                        ? formatRupiah(formField.value)
                        : formField.value
                    }
                    onChange={e => {
                      const value =
                        field === "nominal"
                          ? parseRupiah(e.target.value)
                          : e.target.value
                      formField.onChange(value)
                    }}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    },
  }))

  columns.push({
    id: "actions",
    cell: ({ row, table }) => {
      const [open, setOpen] = useState<boolean>(false)
      const meta = table.options.meta as
        | { removeRow: (index: number) => void }
        | undefined
      return (
        <Alert
          Icon={TrashIcon}
          variant='destructive'
          size='icon'
          title='Hapus Kriteria'
          description='Apakah anda yakin ingin menghapus data ini?'
          tooltipContentText='hapus kriteria'
          onClick={() => meta?.removeRow(row.index)}
          open={open}
          setOpen={setOpen}
        />
      )
    },
  })

  return columns
}
