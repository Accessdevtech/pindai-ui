"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { downloadDocxFile, uploadPdfFile } from "@/utils/files"

import Breadcrumb from "@/components/atom/bradcrumb"
import { FileInput } from "@/components/atom/file-input"
import Modal from "@/components/atom/modal"
import KeteranganDikembalikan from "@/components/molecules/keterangan-dikembalikan"
import KeteranganDitolak from "@/components/molecules/keterangan-ditolak"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ROUTE } from "@/services/route"
import { laporanAtom, laporanKemajuanAtom, proposalAtom } from "@/state/store"
import { EachUtil, Every, Reduce } from "@/utils/each-utils"
import { useAtom, useSetAtom } from "jotai"
import { FileOutput, UploadIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"
import { Dosen } from "../../dosen.interface"
import { columnsDokumen } from "./components/column-dokumen"
import { columnsIdentitas } from "./components/column-identitas"
import DokumenTable from "./components/dokumen-table"
import { IdentitasTable } from "./components/identitas-table"
import { useDownloadPenelitian } from "./hook/use-download"
import { useGetDetailPenelitian } from "./hook/use-penelitian/get-detail-penelitian"
import { useUploadPenelitian } from "./hook/use-penelitian/upload"

export default function DetailPenelitianPage({
  id,
  user,
}: {
  id: string
  user: Dosen
}) {
  const { refresh } = useRouter()
  const setLaporanKemajuan = useSetAtom(laporanKemajuanAtom)
  const setLaporan = useSetAtom(laporanAtom)
  const [proposal, setProposal] = useAtom(proposalAtom)
  const { data } = useGetDetailPenelitian(id)
  const searchParams = useSearchParams().get("new")
  const isNew = searchParams === "true"

  useEffect(() => {
    isNew === true
      ? toast.info("Data berhasil disubmit", {
          description: "Silahkan unggah proposal penelitian anda",
          duration: 5000,
        })
      : toast.dismiss()
  }, [isNew])

  const { mutate, isPending } = useDownloadPenelitian({
    onSuccess(res) {
      downloadDocxFile(res.base64, res.file_name)
      toast.dismiss()
    },
    onError(err) {
      toast.error(err.response?.data.message)
      toast.dismiss()
    },
  })

  const { mutate: upload } = useUploadPenelitian({
    onSuccess(res) {
      toast.success(res.message)
      setProposal(null)
      setLaporanKemajuan(null)
      setLaporan(null)
      refresh()
    },
    onError(err) {
      toast.error(err.response?.data.message)
    },
  })

  const handleFileUpload = async (file: File, jenis_dokumen?: string) => {
    const fileEncode = await uploadPdfFile(file)

    upload({
      id,
      file: fileEncode,
      category: "penelitian",
      jenis_dokumen: jenis_dokumen?.split(" ").join("_"),
    })
  }

  const handleDownload = (jenis_Dokumen: string) => {
    mutate({
      id,
      jenis_dokumen: jenis_Dokumen.split(" ").join("_"),
      category: "penelitian",
    })
  }

  const isLeader = data?.anggota.some(
    anggota => anggota.is_leader === 1 && anggota.nidn === user.nidn,
  )

  const columnsIdentity = columnsIdentitas({ status: data?.status })
  const columnsDocuments = columnsDokumen({
    isLeader,
    status: data?.status,
    handleFileUpload,
    handleDownload,
  })

  if (isPending) toast.loading("Sedang Mengunduh Dokumen")

  const statusArray = [
    data?.status.kaprodi,
    data?.status.dppm,
    data?.status.keuangan,
  ]

  const isRejectedDppm = Reduce(statusArray, status => status === "rejected")

  const isRejectedKaprodi = Every(statusArray, status => status === "rejected")

  const isReturnedKaprodi = Every(statusArray, status => status === "returned")

  const isReturnedDppm = Reduce(statusArray, status => status === "returned")

  const isFileExist = data?.existFile === true
  const isDisabled = !(
    (!isFileExist &&
      data?.status.kaprodi === "pending" &&
      data.status.dppm === "pending") ||
    (isFileExist &&
      data?.status.kaprodi === "accepted" &&
      data.status.dppm === "returned") ||
    (isFileExist &&
      data.status.kaprodi === "returned" &&
      data.status.dppm === "pending")
  )

  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb
        href={`${ROUTE.DASHBOARD}/dosen`}
        data={[
          {
            name: "Penelitian",
            href: `${ROUTE.DASHBOARD}/dosen/penelitian`,
          },
          {
            name: "Detail",
          },
        ]}
      >
        {data?.title}
      </Breadcrumb>

      {isRejectedKaprodi && (
        <KeteranganDitolak title='Penelitian ditolak oleh kaprodi'>
          {data?.keterangan}
        </KeteranganDitolak>
      )}

      {isReturnedKaprodi && (
        <KeteranganDitolak title='Penelitian dikembalikan oleh kaprodi'>
          {data?.keterangan}
        </KeteranganDitolak>
      )}

      {isRejectedDppm && (
        <KeteranganDikembalikan title='Penelitian ditolak oleh dppm'>
          {data?.keterangan}
        </KeteranganDikembalikan>
      )}

      {isReturnedDppm && (
        <KeteranganDikembalikan title='Penelitian dikembalikan oleh dppm'>
          {data?.keterangan}
        </KeteranganDikembalikan>
      )}

      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <CardTitle className='capitalize tracking-wide'>
            Informasi Penelitian: {data?.title}
          </CardTitle>
          <CardDescription>
            Kaprodi dapat menyetujui / menolak penelitian yang diajukan oleh
            dosen.
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='space-y-4 p-6 capitalize text-muted-foreground'>
          <EachUtil
            of={[
              { label: "Ketua Kelompok", value: data?.leader.name },
              { label: "Judul Penelitian", value: data?.title },
              { label: "Bidang", value: data?.bidang || "-" },
              { label: "Jenis Penelitian", value: data?.jenis_penelitian },
              { label: "Kriteria", value: data?.jenis_kriteria },
              { label: "Semester", value: data?.semester },
              { label: "Tahun", value: data?.academic_year },
              { label: "Abstrak", value: data?.deskripsi },
            ]}
            render={(item, index) => (
              <div className='flex flex-col gap-2' key={index}>
                <span>
                  {item.label}: {item.value}
                </span>
                <Separator />
              </div>
            )}
          />
          <div className='flex gap-4'>
            <div className='flex w-full flex-col gap-2'>
              <Modal
                name='Unggah Proposal Penelitian'
                Icon={UploadIcon}
                title='Unggah Proposal Penelitian'
                disabled={!isLeader || isDisabled}
                btnStyle='w-full'
                description='Unggah penelitian Anda dalam format PDF menggunakan form ini.'
                className={cn({
                  "max-h-fit max-w-2xl": proposal,
                })}
              >
                <ScrollArea className='max-h-[70vh]'>
                  <FileInput
                    file={proposal as File}
                    setFile={setProposal}
                    accept='.pdf'
                    variant='outline'
                    size='sm'
                  />
                </ScrollArea>
                <Button
                  onClick={() => handleFileUpload(proposal as File, "proposal")}
                  disabled={!proposal}
                >
                  Simpan
                </Button>
              </Modal>
              <p className='text-sm font-semibold text-muted-foreground'>
                {isFileExist
                  ? `Anda telah mengunggah proposal penelitian: ${data.title}`
                  : "Anda belum mengunggah proposal penelitian"}
              </p>
            </div>
            <Button
              variant='outline'
              disabled={!isLeader}
              className='w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground'
              onClick={() => handleDownload("proposal")}
            >
              <FileOutput />
              Unduh Template Proposal
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dokumen Penelitian */}
      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <CardTitle className='capitalize tracking-wide'>
            dokumen penelitian
          </CardTitle>
          <CardDescription>
            Tabel berisi dokumen penelitian yang harus dilengkapi.
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <DokumenTable columns={columnsDocuments} />
        </CardContent>
      </Card>

      {/* Identitas Kelompok */}
      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <CardTitle className='capitalize tracking-wide'>
            Identitas Kelompok
          </CardTitle>
          <CardDescription>
            Tabel berisi identitas kelompok penelitian
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <IdentitasTable
            data={data?.anggota || []}
            columns={columnsIdentity}
          />
        </CardContent>
      </Card>
    </div>
  )
}
