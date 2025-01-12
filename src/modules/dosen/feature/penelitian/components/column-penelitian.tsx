import Tooltip from "@/components/molecules/tooltip"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ROUTE } from "@/services/route"
import { ColumnDef } from "@tanstack/react-table"
import { InfoIcon } from "lucide-react"
import Link from "next/link"
import { PenelitianDosen } from "../penelitian-dosen.interface"
import StatusBadge from "./status-badge"

export const columnPenelitian = (): ColumnDef<PenelitianDosen>[] => {
  return [
    {
      header: "judul",
      columns: [
        {
          accessorKey: "title",
        },
      ],
    },
    {
      header: "Penanggung Jawab",
      columns: [
        {
          accessorKey: "leader",
        },
      ],
    },
    {
      header: "Tahun Akademik",
      columns: [
        {
          accessorKey: "academic_year",
        },
      ],
    },
    {
      header: "tanggal dibuat",
      columns: [
        {
          accessorKey: "created_date",
        },
      ],
    },
    {
      accessorKey: "status",
      header: "status",
      columns: [
        {
          // id: "status.kaprodi",
          accessorKey: "status.kaprodi",
          header: "Kaprodi",
          cell: ({ row }) => (
            <StatusBadge status={row.original.status.kaprodi} />
          ),
        },
        {
          // id: "status.dppm",
          accessorKey: "status.dppm",
          header: "Dppm",
          cell: ({ row }) => <StatusBadge status={row.original.status.dppm} />,
        },
        {
          // id: "status.keuangan",
          accessorKey: "status.keuangan",
          header: "Keuangan",
          cell: ({ row }) => (
            <StatusBadge status={row.original.status.keuangan} />
          ),
        },
      ],
    },
    {
      header: "aksi",
      columns: [
        {
          accessorKey: "action",
          cell: ({ row }) => {
            return (
              <Tooltip contentText='Detail penelitian'>
                <Link
                  href={`${ROUTE.DASHBOARD}/dosen/penelitian/${row.original.id}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-primary-foreground",
                  )}
                >
                  <InfoIcon />
                </Link>
              </Tooltip>
            )
          },
        },
      ],
    },
  ]
}
