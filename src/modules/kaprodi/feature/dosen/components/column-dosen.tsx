import Modal from "@/components/atom/modal"
import Tooltip from "@/components/atom/tooltip"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import {
  DosenResponse,
  IDosen
} from "@/modules/dppm/feature/dosen/dosen.interface"
import { UseMutateFunction } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { AxiosError } from "axios"
import { Check, InfoIcon } from "lucide-react"
import DetailDosen from "./detail-dosen"

interface ColumnDosenProps {
  refetch: () => void
  onApprove: UseMutateFunction<
    DosenResponse,
    AxiosError<DosenResponse>,
    { id: string }
  >
  onActive: UseMutateFunction<
    DosenResponse,
    AxiosError<DosenResponse>,
    { id: string; is_active: boolean }
  >
}

export const columnDosen = ({
  refetch,
  onApprove,
  onActive
}: ColumnDosenProps): ColumnDef<IDosen>[] => {
  return [
    {
      id: "no",
      header: "No",
      cell: ({ row }) => <div>{row.index + 1}</div>
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
        const handleActive = () => {
          onActive({ id: item.id, is_active: !item.is_active })
        }
        return (
          <Tooltip
            contentText={item.is_active ? "Dosen Aktif" : "Dosen Tidak Aktif"}
            side='left'
          >
            <Switch
              checked={item.is_active}
              onCheckedChange={handleActive}
              className={cn("rounded-full", {
                "bg-green-500": item.is_active,
                "bg-red-500": !item.is_active
              })}
            />
          </Tooltip>
        )
      }
    },
    {
      id: "action",
      header: "Aksi",
      cell: ({ row }) => {
        const item = row.original

        const handleApprove = () => {
          onApprove({ id: item.id })
        }

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

            {!item.is_approved && (
              <Tooltip contentText='Approve' side='right'>
                <Button
                  variant='outline'
                  size='icon'
                  className='border-green-500 text-green-500 hover:bg-green-500 hover:text-primary-foreground'
                  onClick={handleApprove}
                >
                  <Check />
                </Button>
              </Tooltip>
            )}
          </span>
        )
      }
    }
  ]
}
