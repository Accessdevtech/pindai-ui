import Alert from "@/components/atom/alert"
import StatusBadge from "@/components/atom/status-badge"
import Tooltip from "@/components/atom/tooltip"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ROUTE } from "@/services/route"
import { Every } from "@/utils/each-utils"
import { ColumnDef } from "@tanstack/react-table"
import { InfoIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useDeletePengabdian } from "../hook/use-pengabdian/delete-penelitian"
import { PengabdianDosen } from "../pengabdian-dosen.interface"

export const columnPengabdian = ({
  refetch,
}: {
  refetch: () => void
}): ColumnDef<PengabdianDosen>[] => {
  return [
    {
      id: "title",
      accessorKey: "title",
      header: "Judul Pengabdian",
    },
    {
      id: "leader",
      accessorKey: "leader",
      header: "Penanggung Jawab",
    },
    {
      id: "academic_year",
      accessorKey: "academic_year",
      header: "Tahun Akademik",
    },
    {
      id: "created_date",
      accessorKey: "created_date",
      header: "tanggal dibuat",
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
          ),
        },
        {
          id: "status_dppm",
          accessorKey: "status_dppm",
          header: "Dppm",
          cell: ({ row }) => <StatusBadge status={row.original.status.dppm} />,
        },
        {
          id: "status_keuangan",
          accessorKey: "status_keuangan",
          header: "Keuangan",
          cell: ({ row }) => (
            <StatusBadge status={row.original.status.keuangan} />
          ),
        },
      ],
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
          },
        })

        const isStatusPending = Every(
          [row.original.status.kaprodi, row.original.status.dppm],
          status => status === "pending",
        )

        return (
          <span className='flex items-center justify-center gap-2'>
            <Tooltip contentText='Detail Pengabdian'>
              <Link
                href={`${ROUTE.DASHBOARD}/dosen/pengabdian/${row.original.id}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                  "border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground",
                )}
              >
                <InfoIcon />
              </Link>
            </Tooltip>
            {isStatusPending && (
              <>
                {/* <Tooltip contentText='Edit penelitian'>
                  <Link
                    href={`${ROUTE.DASHBOARD}/dosen/penelitian/edit/${row.original.id}`}
                    className={cn(buttonVariants({ size: "icon" }))}
                  >
                    <EditIcon />
                  </Link>
                </Tooltip> */}
                {!row.original.existFile && (
                  <Alert
                    Icon={TrashIcon}
                    open={alert}
                    setOpen={setAlert}
                    title='Hapus Penelitian'
                    size='icon'
                    variant='destructive'
                    tooltipContentText='Hapus Penelitian'
                    description='Apakah anda yakin ingin menghapus penelitian ini?'
                    onClick={() => {
                      deletePengabdian({ id: row.original.id })
                    }}
                  />
                )}
              </>
            )}
          </span>
        )
      },
    },
  ]
}
