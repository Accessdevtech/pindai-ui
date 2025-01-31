import StatusBadge from "@/components/atom/status-badge"
import Tooltip from "@/components/atom/tooltip"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PengabdianDosen } from "@/modules/dosen/feature/pengabdian/pengabdian-dosen.interface"
import { ROUTE } from "@/services/route"
import { ColumnDef } from "@tanstack/react-table"
import { InfoIcon } from "lucide-react"
import Link from "next/link"

export const columnPengabdian = (): ColumnDef<PengabdianDosen>[] => {
  return [
    {
      id: "action",
      accessorKey: "action",
      header: "aksi",

      cell: ({ row }) => {
        return (
          <Tooltip contentText='Detail Pengabdian'>
            <Link
              href={`${ROUTE.DASHBOARD}/dppm/pengabdian/${row.original.id}`}
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
  ]
}
