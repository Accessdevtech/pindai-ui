"use client"
import Tooltip from "@/components/atom/tooltip"
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { CheckIcon, RefreshCcwIcon } from "lucide-react"
import { Anggota, StatusPenelitian } from "../penelitian-dosen.interface"
import StatusBadge from "./status-badge"

interface Props {
  status?: StatusPenelitian
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

        return (
          <div className='flex items-center justify-center gap-2'>
            {isLeader ? (
              <div className='flex gap-2'>
                {status?.kaprodi && <StatusBadge status={status.kaprodi} />}
                {status?.dppm && <StatusBadge status={status.dppm} />}
                {status?.keuangan && <StatusBadge status={status.keuangan} />}
              </div>
            ) : status?.kaprodi === "accepted" &&
              status.dppm === "accepted" &&
              status.keuangan === "accepted" ? (
              <Tooltip contentText='Status Mengikuti Ketua Kelompok'>
                <Badge
                  variant='outline'
                  className='h-9 w-9 border-green-500 text-center text-green-500'
                >
                  <CheckIcon />
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
