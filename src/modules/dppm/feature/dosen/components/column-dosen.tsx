import Modal from "@/components/atom/modal"
import Tooltip from "@/components/atom/tooltip"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { Check, InfoIcon, X } from "lucide-react"
import { IDosen } from "../dosen.interface"
import DetailDosen from "./detail-dosen"

interface ColumnDosenProps {
  refetch: () => void
}

export const columnDosen = ({
  refetch
}: ColumnDosenProps): ColumnDef<IDosen>[] => {
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
      id: "nidn",
      accessorKey: "nidn",
      header: "NIDN"
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Nama"
    },
    {
      id: "name_with_title",
      accessorKey: "name_with_title",
      header: "Nama dengan Gelar"
    },
    {
      id: "email",
      accessorKey: "email",
      header: "Email"
    },
    {
      id: "prodi",
      accessorKey: "prodi",
      header: "Prodi"
    },
    {
      id: "affiliate_campus",
      accessorKey: "affiliate_campus",
      header: "Afiliasi"
    },
    {
      id: "is_active",
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => {
        const item = row.original
        return (
          <Tooltip
            contentText={item.is_active ? "Dosen Aktif" : "Dosen Tidak Aktif"}
            side='left'
          >
            <Badge
              variant='outline'
              className={cn("p-2 hover:text-primary-foreground", {
                "border-green-500 text-green-500 hover:bg-green-500":
                  item.is_active,
                "border-red-500 text-red-500 hover:bg-red-500": !item.is_active
              })}
            >
              {item.is_active ? (
                <Check className='h-4 w-4' />
              ) : (
                <X className='h-4 w-4' />
              )}
            </Badge>
          </Tooltip>
        )
      }
    },
    {
      id: "action",
      header: "Aksi",
      cell: ({ row }) => {
        const item = row.original

        return (
          <span className='flex justify-center gap-2'>
            <Modal
              title='Detail Dosen'
              description={`Informasi lengkap mengenai dosen bernama ${item.name}.`}
              Icon={InfoIcon}
              size='icon'
              side='left'
              tooltipContent='Detail Dosen'
              btnStyle='bg-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground'
            >
              <DetailDosen dosen={item} />
            </Modal>
          </span>
        )
      }
    }
  ]
}
