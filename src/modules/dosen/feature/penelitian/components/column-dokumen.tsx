"use client"
import { FileInput } from "@/components/atom/file-input"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Download, FileOutput, UploadIcon } from "lucide-react"
import { StatusPenelitian } from "../penelitian-dosen.interface"
import { Document } from "./dokumen-table"

export const columnsDokumen = ({
  status,
  isLeader,
  handleDownload,
  handleFileUpload,
}: {
  handleDownload: (jenis_Dokumen: string) => void
  handleFileUpload: (file: File) => void
  status?: StatusPenelitian
  isLeader?: boolean
}): ColumnDef<Document>[] => {
  return [
    {
      accessorKey: "cover",
      header: "COVER",
      cell: ({ row }) => (
        <Button
          variant='outline'
          size='sm'
          disabled={!isLeader || status?.kaprodi !== "accepted"}
          onClick={() => handleDownload("cover")}
        >
          <Download />
          Unduh Cover
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
          disabled={!isLeader || status?.kaprodi !== "accepted"}
          onClick={() => handleDownload("surat_pengajuan")}
        >
          <FileOutput />
          Unduh Surat Pengajuan
        </Button>
      ),
    },
    {
      accessorKey: "suratRekomendasi",
      header: "SURAT REKOMENDASI",
      cell: ({ row }) => {
        return (
          <Button
            variant='outline'
            size='sm'
            disabled={!isLeader || status?.kaprodi !== "accepted"}
            onClick={() => handleDownload("surat_rekomendasi")}
          >
            <FileOutput />
            Unduh Surat Rekomendasi
          </Button>
        )
      },
    },
    {
      accessorKey: "proposal",
      header: "PROPOSAL",
      cell: ({ row }) => (
        <Button
          variant='outline'
          size='sm'
          disabled={!isLeader || status?.kaprodi !== "accepted"}
          onClick={() => handleDownload("proposal")}
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
          disabled={!isLeader || status?.dppm !== "accepted"}
          onClick={() => handleDownload("kontrak_penelitian")}
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
            !isLeader ||
            status?.keuangan !== "accepted" ||
            status?.dppm !== "accepted"
          }
          onClick={() => handleDownload("surat_keterangan_selesai")}
        >
          <FileOutput />
          Unduh Surat Keterangan
        </Button>
      ),
    },
    {
      accessorKey: "laporan",
      header: "LAPORAN",
      cell: ({ row }) => {
        return (
          <FileInput
            onFileUpload={handleFileUpload}
            buttonText='Unggah Laporan'
            variant='outline'
            size='sm'
            Icon={UploadIcon}
            disabled={
              !isLeader ||
              status?.kaprodi !== "accepted" ||
              status?.dppm !== "accepted" ||
              status?.keuangan !== "accepted"
            }
          />
        )
      },
    },
  ]
}
