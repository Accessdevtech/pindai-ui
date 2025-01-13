"use client"
import Tooltip from "@/components/atom/tooltip"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { FileTextIcon, LinkIcon } from "lucide-react"
import Link from "next/link"
import { HasilPublikasi } from "./hasil-publikasi-table"

export const columnsHasilPublikasi: ColumnDef<HasilPublikasi>[] = [
  {
    accessorKey: "title",
    header: "Judul Publikasi",
  },
  {
    accessorKey: "link",
    header: "Link Publikasi",
    cell: ({ row }) => (
      <Link
        href={row.original.link}
        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
      >
        <LinkIcon />
        Link Publikasi
      </Link>
    ),
  },
  {
    accessorKey: "jenis_publikasi",
    header: "Jenis Publikasi",
  },
  {
    accessorKey: "tanggal_publikasi",
    header: "Tanggal Publikasi",
  },
  {
    accessorKey: "indeksasi",
    header: "Indeksasi",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      return (
        <Tooltip contentText='Lihat Hasil Publikasi'>
          <Link
            href={`/dosen/penelitian/${row.original.id}/publikasi`}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <FileTextIcon />
          </Link>
        </Tooltip>
      )
    },
  },
]
