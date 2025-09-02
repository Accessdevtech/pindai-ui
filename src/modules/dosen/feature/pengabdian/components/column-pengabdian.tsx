import Alert from "@/components/atom/alert"
import StatusBadge from "@/components/atom/status-badge"
import Tooltip from "@/components/atom/tooltip"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ROUTE } from "@/services/route"
import { Every } from "@/utils/each-utils"
import { ColumnDef } from "@tanstack/react-table"
import { EditIcon, InfoIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useDeletePengabdian } from "../hook/use-pengabdian/delete-pengabdian"
import { PengabdianDosen } from "../pengabdian-dosen.interface"

export const columnPengabdian = ({
  refetch
}: {
  refetch: () => void
}): ColumnDef<PengabdianDosen>[] => {
  return [
    {
      id: "no",
      header: "No",
      cell: ({ row }) => <div>{row.index + 1}</div>
    },
    {
      id: "action",
      accessorKey: "action",
      header: "aksi",

      cell: ({ row }) => {
        const [alert, setAlert] = useState(false)

        const isDraft = row.original.is_draft

        const { mutate: deletePengabdian } = useDeletePengabdian({
          onSuccess: res => {
            toast.success(res.message)
            refetch()
          },
          onError: err => {
            toast.error(err.response?.data.message)
          }
        })

        const isStatusPending = Every(
          [row.original.status.kaprodi, row.original.status.dppm],
          status => status === "pending"
        )

        const isStatusReturn = [
          row.original.status.kaprodi,
          row.original.status.dppm
        ].some(status => status === "returned")

        const baseRoute = `${ROUTE.DASHBOARD}/dosen/pengabdian/edit/`
        const routeDikembalikan = `${baseRoute}/dikembalikan/${row.original.id}`

        return (
          <span className='flex items-center justify-center gap-2'>
            {!isDraft && (
              <Tooltip
                contentText={
                  isStatusReturn
                    ? "Unggah ulang proposal pengabdian"
                    : "Detail Pengabdian"
                }
              >
                <Link
                  href={`${ROUTE.DASHBOARD}/dosen/pengabdian/${row.original.id}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground"
                  )}
                >
                  <InfoIcon />
                </Link>
              </Tooltip>
            )}
            {(isStatusPending || isStatusReturn) && (
              <>
                {isStatusReturn ? (
                  <Tooltip contentText='Edit pengabdian dikembalikan'>
                    <Link
                      href={routeDikembalikan}
                      className={cn(
                        buttonVariants({
                          size: "icon",
                          variant: "outline"
                        }),
                        "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      )}
                    >
                      <EditIcon />
                    </Link>
                  </Tooltip>
                ) : (
                  <Tooltip
                    contentText={
                      isDraft ? "Edit Draft pengabdian" : "Edit pengabdian"
                    }
                  >
                    <Link
                      href={`${baseRoute}/${row.original.id}`}
                      className={cn(
                        buttonVariants({
                          size: "icon",
                          variant: "outline"
                        }),
                        "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      )}
                    >
                      <EditIcon />
                    </Link>
                  </Tooltip>
                )}
                {!row.original.existFile && !isStatusReturn && (
                  <Alert
                    Icon={TrashIcon}
                    open={alert}
                    setOpen={setAlert}
                    title='Hapus Pengabdian'
                    triggerAction='Hapus'
                    size='icon'
                    variant='destructive'
                    tooltipContentText='Hapus Pengabdian'
                    description='Apakah anda yakin ingin menghapus pengabdian ini?'
                    onClick={() => {
                      deletePengabdian({ id: row.original.id })
                    }}
                  />
                )}
              </>
            )}
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
      id: "proposal",
      accessorKey: "proposal",
      header: "Proposal",
      cell: ({ row }) => {
        const isFileExist = row.original.existFile
        return isFileExist ? (
          "Telah diunggah"
        ) : (
          <Link
            href={`${ROUTE.DASHBOARD}/dosen/pengabdian/${row.original.id}`}
            className={buttonVariants({ variant: "link" })}
          >
            Silahkan unggah
          </Link>
        )
      }
    },
    {
      id: "created_date",
      accessorKey: "created_date",
      header: "tanggal dibuat"
    },

    {
      accessorKey: "status",
      header: "status",
      cell: ({ row }) => {
        // Show "Draft" text if the row is a draft
        if (row.original.is_draft) {
          return <span className='font-medium text-gray-500'>Draft</span>
        }

        // Show status columns for non-draft items
        return (
          <div className='flex justify-between gap-2'>
            <div className='flex flex-col items-center'>
              <span className='mb-1 text-xs text-gray-600'>Kaprodi</span>
              <StatusBadge status={row.original.status.kaprodi} />
            </div>
            <div className='flex flex-col items-center'>
              <span className='mb-1 text-xs text-gray-600'>Dppm</span>
              <StatusBadge status={row.original.status.dppm} />
            </div>
            <div className='flex flex-col items-center'>
              <span className='mb-1 text-xs text-gray-600'>Keuangan</span>
              <StatusBadge status={row.original.status.keuangan} />
            </div>
          </div>
        )
      }
    }
  ]
}
