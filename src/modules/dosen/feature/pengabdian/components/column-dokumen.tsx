"use client"

import { Download, FileOutput, UploadIcon } from "lucide-react"

import { FileInput } from "@/components/atom/file-input"
import Modal from "@/components/atom/modal"
import { Button } from "@/components/ui/button"
import { StatusData } from "@/interface/type"
import { cn } from "@/lib/utils"
import { fileAtom } from "@/state/store"
import { ColumnDef } from "@tanstack/react-table"
import { useAtomValue } from "jotai"
import { Document } from "./dokumen-table"

export const columnsDokumen = ({
  status,
  isLeader,
  handleDownload,
  handleFileUpload,
}: {
  handleDownload: (jenis_Dokumen: string) => void
  handleFileUpload: (file: File) => void
  status?: StatusData
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
      accessorKey: "kontrakPengabdian",
      header: "KONTRAK PENGABDIAN",
      cell: ({ row }) => (
        <Button
          size='sm'
          variant='outline'
          disabled={!isLeader || status?.dppm !== "accepted"}
          onClick={() => handleDownload("kontrak_pengabdian")}
        >
          <FileOutput />
          Unduh Kontrak Pengabdian
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
        const file = useAtomValue(fileAtom)
        const onFileUpload = async () => {
          try {
            // const base64String = await uploadPdfFile(file)
            handleFileUpload(file!)
          } catch (error) {
            console.error("Error uploading file:", error)
            // You might want to show an error message to the user here
          }
        }
        return (
          <Modal
            name='Unggah Laporan'
            Icon={UploadIcon}
            variant='outline'
            size='sm'
            title='Unggah Laporan'
            disabled={
              !isLeader ||
              status?.kaprodi !== "accepted" ||
              status?.dppm !== "accepted" ||
              status?.keuangan !== "accepted"
            }
            description='Unggah laporan pengabdian Anda dalam format PDF menggunakan form ini.'
            className={cn({
              "max-w-4xl": file,
            })}
          >
            <div className='overflow-auto'>
              <FileInput accept='.pdf' variant='outline' size='sm' />
            </div>
            <Button onClick={onFileUpload} disabled={!file}>
              Simpan
            </Button>
          </Modal>
        )
      },
    },
  ]
}
