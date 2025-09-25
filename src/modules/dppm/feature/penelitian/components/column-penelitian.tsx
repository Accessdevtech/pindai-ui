import Alert from "@/components/atom/alert"
import StatusBadge from "@/components/atom/status-badge"
import Tooltip from "@/components/atom/tooltip"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PenelitianDosen } from "@/modules/dosen/feature/penelitian/penelitian-dosen.interface"
import { ROUTE } from "@/services/route"
import { ColumnDef } from "@tanstack/react-table"
import { InfoIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useDeletePenelitian } from "../hooks/use-penelitian/delete-penelitian"

interface ColumnPenelitianProps {
  refetch: () => void
}

export const columnPenelitian = ({
  refetch
}: ColumnPenelitianProps): ColumnDef<PenelitianDosen>[] => {
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
      accessorKey: "action",
      header: "aksi",

      cell: ({ row }) => {
        const [alert, setAlert] = useState(false)

        const { mutate: deletePenelitian } = useDeletePenelitian({
          onSuccess: res => {
            toast.success(res.message)
            refetch()
          },
          onError: err => {
            toast.error(err.response?.data.message)
          }
        })
        return (
          <span className='flex gap-2 justify-center items-center'>
            <Tooltip contentText='Detail penelitian'>
              <Link
                href={`${ROUTE.DASHBOARD}/dppm/penelitian/${row.original.id}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                  "border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground"
                )}
              >
                <InfoIcon />
              </Link>
            </Tooltip>

            <Alert
              Icon={TrashIcon}
              open={alert}
              setOpen={setAlert}
              triggerAction='hapus'
              title='Hapus Penelitian'
              size='icon'
              variant='destructive'
              tooltipContentText='Hapus Penelitian'
              description='Apakah anda yakin ingin menghapus penelitian ini?'
              onClick={() => {
                deletePenelitian({ id: row.original.id })
              }}
            />
          </span>
        )
      }
    },
    {
      id: "title",
      accessorKey: "title",
      header: "Judul Penelitian"
    },
    {
      id: "leader",
      accessorKey: "leader",
      header: "Penanggung Jawab"
    },
    {
      id: "academic_year",
      accessorKey: "academic_year",
      header: "Tahun Akademik"
    },
    {
      id: "created_date",
      accessorKey: "created_date",
      header: "tanggal dibuat"
    },
    {
      accessorKey: "status",
      header: "status",
      columns: [
        {
          id: "status_kaprodi",
          accessorKey: "status_kaprodi",
          header: "Kaprodi",
          cell: ({ row }) => (
            <StatusBadge status={row.original.status.kaprodi} />
          )
        },
        {
          id: "status_dppm",
          accessorKey: "status_dppm",
          header: "Dppm",
          cell: ({ row }) => <StatusBadge status={row.original.status.dppm} />
        },
        {
          id: "status_keuangan",
          accessorKey: "status_keuangan",
          header: "Keuangan",
          cell: ({ row }) => (
            <StatusBadge status={row.original.status.keuangan} />
          )
        }
      ]
    }
  ]
}
