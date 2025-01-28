"use client"

import { Download, FileOutput, UploadIcon } from "lucide-react"

import { FileInput } from "@/components/atom/file-input"
import Modal from "@/components/atom/modal"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatusData } from "@/interface/type"
import { cn } from "@/lib/utils"
import { laporanAtom, laporanKemajuanAtom } from "@/state/store"
import { Every } from "@/utils/each-utils"
import { ColumnDef } from "@tanstack/react-table"
import { useAtom } from "jotai"
import { toast } from "sonner"
import { Document } from "./dokumen-table"

export const columnsDokumen = ({
  status,
  isLeader,
  handleDownload,
  handleFileUpload,
}: {
  handleDownload: (jenis_Dokumen: string) => void
  handleFileUpload: (file: File, jenis_dokumen?: string) => void
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
          onClick={() => handleDownload(row.original.cover)}
        >
          <Download />
          Unduh {row.original.cover}
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
          onClick={() => handleDownload(row.original.suratPengajuan)}
        >
          <FileOutput />
          Unduh {row.original.suratPengajuan}
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
            onClick={() => handleDownload(row.original.suratRekomendasi)}
          >
            <FileOutput />
            Unduh {row.original.suratRekomendasi}
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
          onClick={() => handleDownload(row.original.proposal)}
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
          onClick={() => handleDownload(row.original.kontrakPengabdian)}
        >
          <FileOutput />
          Unduh {row.original.kontrakPengabdian}
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
          onClick={() => handleDownload(row.original.suratKeteranganSelesai)}
        >
          <FileOutput />
          Unduh {row.original.suratKeteranganSelesai}
        </Button>
      ),
    },
    {
      accessorKey: "laporan_kemajuan",
      header: "LAPORAN KEMAJUAN",
      cell: ({ row }) => {
        const [laporanKemajuan, setLaporanKemajuan] =
          useAtom(laporanKemajuanAtom)

        const onFileUpload = async (file: File, jenis_dokumen?: string) => {
          try {
            handleFileUpload(file!, jenis_dokumen)
          } catch (error) {
            toast.error(`Error uploading file ${error}`)
          }
        }
        const isStatusNotAccepted = Every(
          [status?.kaprodi, status?.dppm, status?.keuangan],
          status => status !== "accepted",
        )
        return (
          <Modal
            name={`Unggah ${row.original.laporanKemajuan}`}
            Icon={UploadIcon}
            variant='outline'
            size='sm'
            title={`Unggah ${row.original.laporanKemajuan}`}
            disabled={!isLeader || isStatusNotAccepted}
            description={`Unggah ${row.original.laporanKemajuan} pengabdian Anda dalam format PDF menggunakan form ini.`}
            className={cn({
              "max-w-2xl": laporanKemajuan,
            })}
          >
            <ScrollArea className='max-h-[70vh]'>
              <FileInput
                file={laporanKemajuan as File}
                setFile={setLaporanKemajuan}
                accept='.pdf'
                variant='outline'
                size='sm'
              />
            </ScrollArea>
            <Button
              onClick={() =>
                onFileUpload(
                  laporanKemajuan as File,
                  row.original.laporanKemajuan,
                )
              }
              disabled={!laporanKemajuan}
            >
              Simpan
            </Button>
          </Modal>
        )
      },
    },
    {
      accessorKey: "laporan",
      header: "LAPORAN",
      cell: ({ row }) => {
        const [laporan, setLaporan] = useAtom(laporanAtom)

        const onFileUpload = async (file: File, jenis_dokumen?: string) => {
          try {
            handleFileUpload(file!, jenis_dokumen)
          } catch (error) {
            toast.error(`Error uploading file ${error}`)
          }
        }

        const isStatusNotAccepted = Every(
          [status?.kaprodi, status?.dppm, status?.keuangan],
          status => status !== "accepted",
        )
        return (
          <Modal
            name={`Unggah ${row.original.laporan}`}
            Icon={UploadIcon}
            variant='outline'
            size='sm'
            title={row.original.laporan}
            disabled={!isLeader || isStatusNotAccepted}
            description={`Unggah ${row.original.laporan} pengabdian Anda dalam format PDF menggunakan form ini.`}
            className={cn({
              "max-w-2xl": laporan,
            })}
          >
            <ScrollArea className='max-h-[70vh]'>
              <FileInput
                file={laporan as File}
                setFile={setLaporan}
                accept='.pdf'
                variant='outline'
                size='sm'
              />
            </ScrollArea>
            <Button
              onClick={() =>
                onFileUpload(laporan as File, row.original.laporan)
              }
              disabled={!laporan}
            >
              Simpan
            </Button>
          </Modal>
        )
      },
    },
  ]
}
