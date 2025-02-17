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
}: {
  handleDownload: (jenis_Dokumen: string) => void
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
          onClick={() => handleDownload(row.original.proposal)}
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
          onClick={() => handleDownload(row.original.kontrakPenelitian)}
        >
          <FileOutput />
          Unduh {row.original.kontrakPenelitian}
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
            handleDownload(row.original.laporanKemajuan)
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
            description={`Unggah ${row.original.laporanKemajuan} penelitian Anda dalam format PDF menggunakan form ini.`}
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
            handleDownload(row.original.laporan)
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
            title={`Unggah ${row.original.laporan}`}
            description={`Unggah ${row.original.laporan} penelitian Anda dalam format PDF menggunakan form ini.`}
            className={cn({
              "max-h-fit max-w-2xl": laporan,
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
            >
              Simpan
            </Button>
          </Modal>
        )
      },
    },
  ]
}
