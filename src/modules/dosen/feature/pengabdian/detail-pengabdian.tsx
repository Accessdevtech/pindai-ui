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
import KeteranganDitolak from "@/components/molecules/keterangan-ditolak"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ROUTE } from "@/services/route"
import { laporanAtom, laporanKemajuanAtom, proposalAtom } from "@/state/store"
import { EachUtil, Every, Reduce } from "@/utils/each-utils"
import { useAtom, useSetAtom } from "jotai"
import { UploadIcon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"
import { Dosen } from "../../dosen.interface"
import { columnsDokumen } from "./components/column-dokumen"
import { columnsIdentitas } from "./components/column-identitas"
import DokumenTable from "./components/dokumen-table"
import { IdentitasTable } from "./components/identitas-table"
import { useDownloadPengabdian } from "./hook/use-download"
import { useGetDetailPengabdian } from "./hook/use-pengabdian/get-detail-pengabdian"
import { useUploadPengabdian } from "./hook/use-pengabdian/upload"

export default function DetailPengabdianPage({
  id,
  user,
}: {
  id: string
  user: Dosen
}) {
  const setLaporanKemajuan = useSetAtom(laporanKemajuanAtom)
  const setLaporan = useSetAtom(laporanAtom)
  const [proposal, setProposal] = useAtom(proposalAtom)
  const { data } = useGetDetailPengabdian(id)

  const searchParams = useSearchParams().get("new")
  const isNew = searchParams === "true"

  useEffect(() => {
    isNew === true
      ? toast.info("Data berhasil disubmit", {
          description: "Silahkan unggah proposal pengabdian anda",
          duration: 5000,
        })
      : toast.dismiss()
  }, [isNew])

  const { mutate, isPending } = useDownloadPengabdian({
    onSuccess(res) {
      downloadDocxFile(res.base64, res.file_name)
      toast.dismiss()
    },
    onError(err) {
      toast.error(err.response?.data.message)
      toast.dismiss()
    },
  })

  const { mutate: upload } = useUploadPengabdian({
    onSuccess(res) {
      toast.success(res.message)
      setProposal(null)
      setLaporanKemajuan(null)
      setLaporan(null)
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
      category: "pengabdian",
      jenis_dokumen: jenis_dokumen?.split(" ").join("_"),
    })
  }

  const handleDownload = (jenis_Dokumen: string) => {
    mutate({ id, jenis_dokumen: jenis_Dokumen, category: "pengabdian" })
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
            name: "Pengabdian",
            href: `${ROUTE.DASHBOARD}/dosen/pengabdian`,
          },
          {
            name: "Detail",
          },
        ]}
      >
        {data?.title}
      </Breadcrumb>

      {isRejectedKaprodi && (
        <KeteranganDitolak title='Pengabdian ditolak oleh kaprodi'>
          {data?.keterangan}
        </KeteranganDitolak>
      )}

      {isRejectedDppm && (
        <KeteranganDitolak title='Pengabdian ditolak oleh dppm'>
          {data?.keterangan}
        </KeteranganDitolak>
      )}

      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <CardTitle className='capitalize tracking-wide'>
            Informasi Pengabdian: {data?.title}
          </CardTitle>
          <CardDescription>
            Kaprodi dapat menyetujui / menolak pengabdian yang diajukan oleh
            dosen.
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='space-y-4 p-6 capitalize text-muted-foreground'>
          <EachUtil
            of={[
              { label: "Ketua Kelompok", value: data?.leader.name },
              { label: "Judul pengabdian", value: data?.title },
              { label: "Bidang", value: data?.bidang || "-" },
              { label: "Jenis pengabdian", value: data?.jenis_pengabdian },
              { label: "Jenis Kriteria", value: data?.jenis_kriteria },
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
          <Modal
            name='Unggah Proposal Pengabdian'
            Icon={UploadIcon}
            title='Unggah Proposal Pengabdian'
            btnStyle='w-full'
            disabled={!isLeader || isDisabled}
            description='Unggah pengabdian Anda dalam format PDF menggunakan form ini.'
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
        </CardContent>
      </Card>

      {/* Dokumen Pengabdian */}
      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <CardTitle className='capitalize tracking-wide'>
            dokumen pengabdian
          </CardTitle>
          <CardDescription>
            Tabel berisi dokumen pengabdian yang harus dilengkapi.
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <DokumenTable columns={columnsDocuments} />
        </CardContent>
      </Card>
      {/* <Tabs defaultValue='manual'>
        <TabsList>
          <TabsTrigger value='generate'>Generate</TabsTrigger>
          <TabsTrigger value='manual'>Manual</TabsTrigger>
        </TabsList>
        <TabsContent value='generate'>
          <Card>
            <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
              <DokumenTable columns={columnsDocuments} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='manual'>
          <Card>
            <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
              <DokumenTable columns={columnsDocumentsManual} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs> */}

      {/* Identitas Kelompok */}
      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <CardTitle className='capitalize tracking-wide'>
            Identitas Kelompok
          </CardTitle>
          <CardDescription>
            Tabel berisi identitas kelompok pengabdian
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
