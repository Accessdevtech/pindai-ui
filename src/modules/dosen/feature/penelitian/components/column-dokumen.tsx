"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Download, FileOutput, FileText, Users, X } from "lucide-react"
import { StatusPenelitian } from "../penelitian-dosen.interface"
import { Document } from "./dokumen-table"

export const columnsDokumen = ({
  status,
}: {
  status?: StatusPenelitian
}): ColumnDef<Document>[] => [
  {
    accessorKey: "cover",
    header: "COVER",
    cell: ({ row }) => (
      <Button
        variant='outline'
        size='sm'
        className='w-[100px]'
        onClick={() => {
          console.log(row.original)
        }}
        disabled={status?.kaprodi !== "accepted"}
      >
        <Download />
        Cover
      </Button>
    ),
  },
  {
    accessorKey: "suratPengajuan",
    header: "SURAT PENGAJUAN",
    cell: ({ row }) => (
      <Button
        variant='outline'
        size='sm'
        disabled={status?.kaprodi !== "accepted"}
      >
        <FileText />
        Surat
      </Button>
    ),
  },
  {
    accessorKey: "suratRekomendasi",
    header: "SURAT REKOMENDASI",
    cell: ({ row }) => (
      <Button
        variant='outline'
        size='sm'
        disabled={status?.kaprodi !== "accepted"}
      >
        <FileOutput />
        Generate
      </Button>
    ),
  },
  {
    accessorKey: "proposal",
    header: "PROPOSAL",
    cell: ({ row }) => (
      <Button
        variant='secondary'
        size='sm'
        className='text-destructive'
        disabled={status?.kaprodi !== "accepted"}
      >
        <X />
        Belum Ada
      </Button>
    ),
  },
  {
    accessorKey: "kontrakPenelitian",
    header: "KONTRAK PENELITIAN",
    cell: ({ row }) => (
      <Button
        size='sm'
        variant='secondary'
        className='text-destructive'
        disabled={status?.dppm !== "accepted"}
      >
        <X className='mr-2 h-4 w-4' />
        Belum Ada
      </Button>
    ),
  },
  {
    accessorKey: "kelompokPenelitian",
    header: "KELOMPOK PENELITIAN",
    cell: ({ row }) => (
      <Button
        variant='outline'
        size='sm'
        className='w-[130px] border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700'
      >
        <Users />
        Lihat Kelompok
      </Button>
    ),
  },
  {
    accessorKey: "suratKeteranganSelesai",
    header: "SURAT KETERANGAN SELESAI",
    cell: ({ row }) => (
      <Button
        size='sm'
        variant='secondary'
        className='text-destructive'
        disabled={
          status?.keuangan !== "accepted" && status?.dppm !== "accepted"
        }
      >
        <X />
        Belum Ada
      </Button>
    ),
  },
  {
    accessorKey: "laporan",
    header: "LAPORAN",
    cell: ({ row }) => (
      <Button
        size='sm'
        variant='secondary'
        className='text-destructive'
        disabled={
          status?.keuangan !== "accepted" && status?.dppm !== "accepted"
        }
      >
        <X />
        Belum Ada
      </Button>
    ),
  },
]
