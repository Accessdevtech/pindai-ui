import Alert from "@/components/atom/alert"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { TrashIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useDeletePeriode } from "../hooks/delete-periode"
import { Periode } from "../type"
import PeriodeFormModal from "./periode-form-modal"

export const columnPeriode = ({
  refetch
}: {
  refetch: () => void
}): ColumnDef<Periode>[] => {
  return [
    {
      id: "no",
      header: "No",
      cell: ({ row, table }) => {
        const page = table.getState().pagination.pageIndex
        const pageSize = table.getState().pagination.pageSize
        const start = page * pageSize + 1
        const end = start + row.index

        return <div>{end}</div>
      }
    },
    {
      id: "action",
      header: "Aksi",
      cell: ({ row }) => {
        const [open, setOpen] = useState(false)
        const [alertOpen, setAlertOpen] = useState(false)
        const item = row.original
        const isDraft = item.status === "draft"

        const { mutate: deletePeriode } = useDeletePeriode({
          onSuccess: response => {
            toast.success(response.message || "Periode berhasil dihapus")
            refetch()
          },
          onError: error => {
            toast.error(
              error.response?.data?.message || "Gagal menghapus periode"
            )
          }
        })

        const onDelete = () => {
          deletePeriode({ id: item.id })
        }

        return (
          <span className='flex justify-center gap-2'>
            <PeriodeFormModal
              mode='update'
              isOpen={open}
              setIsOpen={setOpen}
              periode={item}
              refetch={refetch}
            />
            {isDraft && (
              <Alert
                Icon={TrashIcon}
                open={alertOpen}
                setOpen={setAlertOpen}
                title={`hapus data ${item.name} ini`}
                description={`apakah anda yakin ingin menghapus ${item.name} ini?`}
                className={cn(
                  "bg-red-500/30 text-red-500 hover:bg-red-500 hover:text-primary-foreground",
                  {
                    "cursor-not-allowed": !item.can_delete
                  }
                )}
                onClick={onDelete}
                disabled={!item.can_delete}
                tooltipContentText='hapus'
                triggerAction='Hapus'
                size='icon'
                side='right'
              />
            )}
          </span>
        )
      }
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Nama Periode"
    },
    {
      id: "start_date",
      accessorKey: "start_date",
      header: "Tanggal Mulai"
    },
    {
      id: "end_date",
      accessorKey: "end_date",
      header: "Tanggal Selesai"
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const item = row.original
        return item.status === "draft" ? (
          <Badge
            variant='outline'
            className='bg-gray-500/30 uppercase text-gray-500'
          >
            draft
          </Badge>
        ) : item.status === "active" ? (
          <Badge
            variant='outline'
            className='bg-green-500/30 uppercase text-green-500'
          >
            active
          </Badge>
        ) : (
          <Badge
            variant='outline'
            className='bg-red-500/30 uppercase text-red-500'
          >
            close
          </Badge>
        )
      }
    }
  ]
}
