"use client"
import { UploadIcon } from "lucide-react"

import { FileInput } from "@/components/atom/file-input"
import Modal from "@/components/atom/modal"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatusData } from "@/interface/type"
import { cn } from "@/lib/utils"
import {
  coverAtom,
  kontrakPenelitianAtom,
  laporanAtom,
  laporanKemajuanAtom,
  suratKeteranganSelesaiAtom,
  suratPengajuanAtom,
  suratRekomendasiAtom,
} from "@/state/store"
import { Every } from "@/utils/each-utils"
import { ColumnDef } from "@tanstack/react-table"
import { useAtom } from "jotai"
import { toast } from "sonner"
import { Document } from "./dokumen-table"

export const columnsDokumenManual = ({
  status,
  isLeader,
  handleFileUpload,
}: {
  handleFileUpload: (file: File, jenis_dokumen?: string) => void
  status?: StatusData
  isLeader?: boolean
}): ColumnDef<Document>[] => {
  return [
    {
      accessorKey: "cover",
      header: "COVER",
      cell: ({ row }) => {
        const [cover, setCover] = useAtom(coverAtom)
        const onFileUpload = async (file: File, jenis_dokumen?: string) => {
          try {
            handleFileUpload(file, jenis_dokumen)
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
            name={`Unggah ${row.original.cover}`}
            Icon={UploadIcon}
            variant='outline'
            size='sm'
            title={`Unggah ${row.original.cover}`}
            disabled={!isLeader || isStatusNotAccepted}
            description={`Unggah ${row.original.cover} penelitian Anda dalam format PDF menggunakan form ini.`}
            className={cn({
              "max-w-2xl": cover,
            })}
          >
            <ScrollArea className='max-h-[70vh]'>
              <FileInput
                file={cover as File}
                setFile={setCover}
                accept='.pdf'
                variant='outline'
                size='sm'
              />
            </ScrollArea>
            <Button
              onClick={() => onFileUpload(cover as File, row.original.cover)}
              disabled={!cover}
            >
              Simpan
            </Button>
          </Modal>
        )
      },
    },
    // {
    //   accessorKey: "proposal",
    //   header: "PROPOSAL",
    //   cell: ({ row }) => {
    //     const [proposal, setProposal] = useAtom(proposalAtom)

    //     const onFileUpload = async (file: File, jenis_dokumen?: string) => {
    //       try {
    //         handleFileUpload(file, jenis_dokumen)
    //       } catch (error) {
    //         toast.error(`Error uploading file ${error}`)
    //       }
    //     }

    //     const isStatusNotAccepted = Every(
    //       [status?.kaprodi, status?.dppm, status?.keuangan],
    //       status => status !== "accepted",
    //     )
    //     return (
    //       <Modal
    //         name={`Unggah ${row.original.proposal}`}
    //         Icon={UploadIcon}
    //         variant='outline'
    //         size='sm'
    //         title={`Unggah ${row.original.proposal}`}
    //         disabled={!isLeader || isStatusNotAccepted}
    //         description={`Unggah ${row.original.proposal} penelitian Anda dalam format PDF menggunakan form ini.`}
    //         className={cn({
    //           "max-w-2xl": proposal,
    //         })}
    //       >
    //         <ScrollArea className='max-h-[70vh]'>
    //           <FileInput
    //             file={proposal as File}
    //             setFile={setProposal}
    //             accept='.pdf'
    //             variant='outline'
    //             size='sm'
    //           />
    //         </ScrollArea>
    //         <Button
    //           onClick={() =>
    //             onFileUpload(proposal as File, row.original.proposal)
    //           }
    //           disabled={!proposal}
    //         >
    //           Simpan
    //         </Button>
    //       </Modal>
    //     )
    //   },
    // },
    {
      accessorKey: "suratPengajuan",
      header: "SURAT PENGAJUAN",
      cell: ({ row }) => {
        const [suratPengajuan, setSuratPengajuan] = useAtom(suratPengajuanAtom)

        const onFileUpload = async (file: File, jenis_dokumen?: string) => {
          try {
            handleFileUpload(file, jenis_dokumen)
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
            name={`Unggah ${row.original.suratPengajuan}`}
            Icon={UploadIcon}
            variant='outline'
            size='sm'
            title={`Unggah ${row.original.suratPengajuan}`}
            disabled={!isLeader || isStatusNotAccepted}
            description={`Unggah ${row.original.suratPengajuan} penelitian Anda dalam format PDF menggunakan form ini.`}
            className={cn({
              "max-w-2xl": suratPengajuan,
            })}
          >
            <ScrollArea className='max-h-[70vh]'>
              <FileInput
                file={suratPengajuan as File}
                setFile={setSuratPengajuan}
                accept='.pdf'
                variant='outline'
                size='sm'
              />
            </ScrollArea>
            <Button
              onClick={() =>
                onFileUpload(
                  suratPengajuan as File,
                  row.original.suratPengajuan,
                )
              }
              disabled={!suratPengajuan}
            >
              Simpan
            </Button>
          </Modal>
        )
      },
    },
    {
      accessorKey: "suratRekomendasi",
      header: "SURAT REKOMENDASI",
      cell: ({ row }) => {
        const [suratRekomendasi, setSuratRekomendasi] =
          useAtom(suratRekomendasiAtom)

        const onFileUpload = async (file: File, jenis_dokumen?: string) => {
          try {
            handleFileUpload(file, jenis_dokumen)
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
            name={`Unggah ${row.original.suratRekomendasi}`}
            Icon={UploadIcon}
            variant='outline'
            size='sm'
            title={`Unggah ${row.original.suratRekomendasi}`}
            disabled={!isLeader || isStatusNotAccepted}
            description={`Unggah ${row.original.suratRekomendasi} penelitian Anda dalam format PDF menggunakan form ini.`}
            className={cn({
              "max-w-2xl": suratRekomendasi,
            })}
          >
            <ScrollArea className='max-h-[70vh]'>
              <FileInput
                file={suratRekomendasi as File}
                setFile={setSuratRekomendasi}
                accept='.pdf'
                variant='outline'
                size='sm'
              />
            </ScrollArea>
            <Button
              onClick={() =>
                onFileUpload(
                  suratRekomendasi as File,
                  row.original.suratRekomendasi,
                )
              }
              disabled={!suratRekomendasi}
            >
              Simpan
            </Button>
          </Modal>
        )
      },
    },
    {
      accessorKey: "kontrakPenelitian",
      header: "KONTRAK PENGABDIAN",
      cell: ({ row }) => {
        const [kontrakPenelitian, setKontrakPenelitian] = useAtom(
          kontrakPenelitianAtom,
        )

        const onFileUpload = async (file: File, jenis_dokumen?: string) => {
          try {
            handleFileUpload(file, jenis_dokumen)
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
            name={`Unggah ${row.original.kontrakPenelitian}`}
            Icon={UploadIcon}
            variant='outline'
            size='sm'
            title={`Unggah ${row.original.kontrakPenelitian}`}
            disabled={!isLeader || isStatusNotAccepted}
            description={`Unggah ${row.original.kontrakPenelitian} Anda dalam format PDF menggunakan form ini.`}
            className={cn({
              "max-w-2xl": kontrakPenelitian,
            })}
          >
            <ScrollArea className='max-h-[70vh]'>
              <FileInput
                file={kontrakPenelitian as File}
                setFile={setKontrakPenelitian}
                accept='.pdf'
                variant='outline'
                size='sm'
              />
            </ScrollArea>
            <Button
              onClick={() =>
                onFileUpload(
                  kontrakPenelitian as File,
                  row.original.kontrakPenelitian,
                )
              }
              disabled={!kontrakPenelitian}
            >
              Simpan
            </Button>
          </Modal>
        )
      },
    },
    {
      accessorKey: "suratKeteranganSelesai",
      header: "SURAT KETERANGAN SELESAI",
      cell: ({ row }) => {
        const [suratKeteranganSelesai, setSuratKeteranganSelesai] = useAtom(
          suratKeteranganSelesaiAtom,
        )

        const onFileUpload = async (file: File, jenis_dokumen?: string) => {
          try {
            handleFileUpload(file, jenis_dokumen)
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
            name={`Unggah ${row.original.suratKeteranganSelesai}`}
            Icon={UploadIcon}
            variant='outline'
            size='sm'
            title={`Unggah ${row.original.suratKeteranganSelesai}`}
            disabled={!isLeader || isStatusNotAccepted}
            description={`Unggah ${row.original.suratKeteranganSelesai} penelitian Anda dalam format PDF menggunakan form ini.`}
            className={cn({
              "max-w-2xl": suratKeteranganSelesai,
            })}
          >
            <ScrollArea className='max-h-[70vh]'>
              <FileInput
                file={suratKeteranganSelesai as File}
                setFile={setSuratKeteranganSelesai}
                accept='.pdf'
                variant='outline'
                size='sm'
              />
            </ScrollArea>
            <Button
              onClick={() =>
                onFileUpload(
                  suratKeteranganSelesai as File,
                  row.original.suratKeteranganSelesai,
                )
              }
              disabled={!suratKeteranganSelesai}
            >
              Simpan
            </Button>
          </Modal>
        )
      },
    },
    {
      accessorKey: "laporan_kemajuan",
      header: "LAPORAN KEMAJUAN",
      cell: ({ row }) => {
        const [laporanKemajuan, setLaporanKemajuan] =
          useAtom(laporanKemajuanAtom)

        const onFileUpload = async (file: File, jenis_dokumen?: string) => {
          try {
            handleFileUpload(file, jenis_dokumen)
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
            handleFileUpload(file, jenis_dokumen)
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
            disabled={!isLeader || isStatusNotAccepted}
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
