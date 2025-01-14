"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Download, FileOutput, UploadIcon } from "lucide-react"
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
        <FileOutput />
        Surat Pengajuan
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
        Unduh Surat Rekomendasi
      </Button>
    ),
  },
  {
    accessorKey: "proposal",
    header: "PROPOSAL",
    cell: ({ row }) => (
      <Button
        variant='outline'
        size='sm'
        disabled={status?.kaprodi !== "accepted"}
      >
        <FileOutput />
        Unduh Proposal
      </Button>
    ),
  },
  {
    accessorKey: "kontrakPenelitian",
    header: "KONTRAK PENELITIAN",
    cell: ({ row }) => (
      <Button
        size='sm'
        variant='outline'
        disabled={status?.dppm !== "accepted"}
      >
        <FileOutput />
        Unduh Kontrak Penelitian
      </Button>
    ),
  },
  {
    accessorKey: "suratKeteranganSelesai",
    header: "SURAT KETERANGAN SELESAI",
    cell: ({ row }) => (
      <Button
        size='sm'
        variant='outline'
        disabled={
          status?.keuangan !== "accepted" && status?.dppm !== "accepted"
        }
      >
        <FileOutput />
        Unduh Surat Keterangan
      </Button>
    ),
  },
  {
    accessorKey: "laporan",
    header: "LAPORAN",
    cell: ({ row }) => (
      <Button
        size='sm'
        variant='outline'
        disabled={
          status?.keuangan !== "accepted" &&
          status?.dppm !== "accepted" &&
          status?.kaprodi !== "accepted"
        }
      >
        <UploadIcon />
        Unggah Laporan
      </Button>
    ),
  },
]
