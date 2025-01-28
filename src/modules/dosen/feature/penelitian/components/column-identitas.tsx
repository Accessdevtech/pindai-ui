"use client"
import Tooltip from "@/components/atom/tooltip"
import { Badge } from "@/components/ui/badge"
import { StatusData } from "@/interface/type"
import { Every } from "@/utils/each-utils"
import { ColumnDef } from "@tanstack/react-table"
import { CheckIcon, RefreshCcwIcon, X } from "lucide-react"
import StatusBadge from "../../../../../components/atom/status-badge"
import { Anggota } from "../penelitian-dosen.interface"

interface Props {
  status?: StatusData
}

export const columnsIdentitas = ({ status }: Props): ColumnDef<Anggota>[] => {
  return [
    {
      accessorKey: "nidn",
      header: "NIDN",
    },
    {
      accessorKey: "name",
      header: "NAMA DOSEN",
    },
    {
      accessorKey: "prodi",
      header: "PRODI",
    },
    {
      accessorKey: "affiliate_campus",
      header: "AFILIASI UNIV",
    },
    {
      accessorKey: "job_functional",
      header: "JAB FUNGSIONAL",
    },
    {
      accessorKey: "scholar_id",
      header: "SCHOLAR ID",
    },
    {
      accessorKey: "scopus_id",
      header: "SCOPUS ID",
    },
    {
      id: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const isLeader = row.original.is_leader

        const isStatusAccepted = Every(
          [status?.kaprodi, status?.dppm, status?.keuangan],
          status => status === "accepted",
        )

        const isStatusRejected = Every(
          [status?.kaprodi, status?.dppm, status?.keuangan],
          status => status === "rejected",
        )

        return (
          <div className='flex items-center justify-center gap-2'>
            {isLeader ? (
              <div className='flex gap-4'>
                {status?.kaprodi && (
                  <div className='flex flex-col items-center gap-2'>
                    <span>Kaprodi</span>
                    <StatusBadge status={status.kaprodi} />
                  </div>
                )}
                {status?.dppm && (
                  <div className='flex flex-col items-center gap-2'>
                    <span>DPPM</span>
                    <StatusBadge status={status.dppm} />
                  </div>
                )}
                {status?.keuangan && (
                  <div className='flex flex-col items-center gap-2'>
                    <span>Keuangan</span>
                    <StatusBadge status={status.keuangan} />
                  </div>
                )}
              </div>
            ) : isStatusAccepted ? (
              <Tooltip contentText='Status Mengikuti Ketua Kelompok'>
                <Badge
                  variant='outline'
                  className='h-9 w-9 border-green-500 text-center text-green-500'
                >
                  <CheckIcon />
                </Badge>
              </Tooltip>
            ) : isStatusRejected ? (
              <Tooltip contentText='Status Mengikuti Ketua Kelompok'>
                <Badge
                  variant='outline'
                  className='h-9 w-9 border-red-500 text-center text-red-500'
                >
                  <X />
                </Badge>
              </Tooltip>
            ) : (
              <Tooltip contentText='Status Mengikuti Ketua Kelompok'>
                <Badge
                  variant='outline'
                  className='h-9 w-9 border-blue-500 text-center text-blue-500'
                >
                  <RefreshCcwIcon />
                </Badge>
              </Tooltip>
            )}
          </div>
        )
      },
    },
  ]
}
