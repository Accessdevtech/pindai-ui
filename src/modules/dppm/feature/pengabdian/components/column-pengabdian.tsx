import Alert from "@/components/atom/alert"
import StatusBadge from "@/components/atom/status-badge"
import Tooltip from "@/components/atom/tooltip"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PengabdianDosen } from "@/modules/dosen/feature/pengabdian/pengabdian-dosen.interface"
import { ROUTE } from "@/services/route"
import { ColumnDef } from "@tanstack/react-table"
import { InfoIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useDeletePengabdian } from "../hooks/use-pengabdian/delete-pengabdian"

interface ColumnPengabdianProps {
  refetch: () => void
}

export const columnPengabdian = ({
  refetch
}: ColumnPengabdianProps): ColumnDef<PengabdianDosen>[] => {
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

        const { mutate: deletePengabdian } = useDeletePengabdian({
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
            <Tooltip contentText='Detail Pengabdian'>
              <Link
                href={`${ROUTE.DASHBOARD}/dppm/pengabdian/${row.original.id}`}
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
              title='Hapus Pengabdian'
              size='icon'
              variant='destructive'
              tooltipContentText='Hapus Pengabdian'
              description='Apakah anda yakin ingin menghapus pengabdian ini?'
              onClick={() => {
                deletePengabdian({ id: row.original.id })
              }}
            />
          </span>
        )
      }
    },
    {
      id: "title",
      accessorKey: "title",
      header: "Judul Pengabdian"
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
