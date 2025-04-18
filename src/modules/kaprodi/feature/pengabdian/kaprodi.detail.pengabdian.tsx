"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import FileView from "@/components/atom/file-view"
import Modal from "@/components/atom/modal"
import KeteranganDitolak from "@/components/molecules/keterangan-ditolak"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useViewDocs, useViewLaporanKemajuan } from "@/hooks/use-view-docs"
import { LaporanKemajuan, ViewDocs } from "@/interface/type"
import { cn } from "@/lib/utils"
import { columnsIdentitas } from "@/modules/dosen/feature/pengabdian/components/column-identitas"
import { IdentitasTable } from "@/modules/dosen/feature/pengabdian/components/identitas-table"
import { ROUTE } from "@/services/route"
import { EachUtil } from "@/utils/each-utils"
import { CheckIcon, Loader2Icon, Undo2Icon, X } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useApprovePengabdian } from "./hooks/use-pengabdian/approved-pengabdian"
import { useCanclePengabdian } from "./hooks/use-pengabdian/cancle-pengabdian"
import { useGetDetailPengabdian } from "./hooks/use-pengabdian/get-detail-pengabdian"
import { useReturnedPengabdian } from "./hooks/use-pengabdian/returned-pengabdian"

export default function DetailPengabdianKaprodiPage({ id }: { id: string }) {
  const [resDocs, setResDocs] = useState<{
    proposal?: ViewDocs
    laporanKemajuan?: LaporanKemajuan[]
    laporan?: ViewDocs
  }>()
  const [keterangan, setKeterangan] = useState("")
  const { data, refetch } = useGetDetailPengabdian(id)
  const { mutate: approved } = useApprovePengabdian({
    onSuccess(res) {
      if (res.status) {
        toast.success(res.message)
      }

      if (!res.status) {
        toast.error(res.message)
      }
      refetch()
    },

    onError(error) {
      toast.error(error.response?.data.message)
    },
  })

  const { mutate: reject } = useCanclePengabdian({
    onSuccess(res) {
      if (res.status) {
        toast.success(res.message)
      }

      if (!res.status) {
        toast.error(res.message)
      }
      refetch()
    },

    onError(error) {
      toast.error(error.response?.data.message)
    },
  })

  const { mutate: returned } = useReturnedPengabdian({
    onSuccess(res) {
      if (res.status) {
        toast.success(res.message)
      }

      if (!res.status) {
        toast.error(res.message)
      }
      refetch()
    },

    onError(error) {
      toast.error(error.response?.data.message)
    },
  })

  const { mutateAsync: viewDocs, isPending } = useViewDocs()
  const { mutateAsync: viewLaporanKemajuan } = useViewLaporanKemajuan()

  const viewFile = async (jenis_dokument: string) => {
    const response = await viewDocs({
      id,
      category: "pengabdian",
      jenis_dokumen: jenis_dokument.split(" ").join("_"),
    })
    return response
  }

  const viewFileLaporanKemajuan = async () => {
    const response = await viewLaporanKemajuan({
      id,
      category: "pengabdian",
    })

    return response
  }

  useEffect(() => {
    Promise.allSettled([
      viewFile("proposal"),
      viewFileLaporanKemajuan(),
      viewFile("laporan"),
    ]).then(response => {
      const [proposal, laporanKemajuan, laporan] = response
      setResDocs({
        proposal: proposal.status === "fulfilled" ? proposal.value : undefined,
        laporanKemajuan:
          laporanKemajuan.status === "fulfilled"
            ? Array.isArray(laporanKemajuan.value)
              ? laporanKemajuan.value
              : [laporanKemajuan.value]
            : undefined,
        laporan: laporan.status === "fulfilled" ? laporan.value : undefined,
      })
    })
  }, [])

  const columnsIdentity = columnsIdentitas({ status: data?.status })
  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb
        href={`${ROUTE.DASHBOARD}/kaprodi`}
        data={[
          {
            name: "Pengabdian",
            href: `${ROUTE.DASHBOARD}/kaprodi/pengabdian`,
          },
          {
            name: "Detail",
          },
        ]}
      >
        {data?.title}
      </Breadcrumb>

      {data?.status.kaprodi === "rejected" &&
        data?.status.dppm === "rejected" &&
        data?.status.keuangan === "rejected" && (
          <KeteranganDitolak title='Pengabdian ditolak oleh kaprodi'>
            {data.keterangan}
          </KeteranganDitolak>
        )}

      {data?.status.kaprodi === "accepted" &&
        data?.status.dppm === "rejected" &&
        data?.status.keuangan === "rejected" && (
          <KeteranganDitolak title='Pengabdian ditolak oleh dppm'>
            {data.keterangan}
          </KeteranganDitolak>
        )}

      {data?.status.kaprodi === "accepted" &&
        data?.status.dppm === "accepted" &&
        data?.status.keuangan === "rejected" && (
          <KeteranganDitolak title='Pengabdian ditolak oleh keuangan'>
            {data.keterangan}
          </KeteranganDitolak>
        )}

      <div className='flex flex-col gap-4 lg:flex-row'>
        <Card className='grow'>
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

        {data?.status.kaprodi === "pending" && (
          <Card>
            <CardContent className='flex gap-2 p-6 capitalize text-muted-foreground'>
              <Button
                variant='outline'
                className='grow border-green-500 text-green-500 hover:bg-green-500 hover:text-primary-foreground lg:w-fit'
                onClick={() => approved({ id })}
              >
                <CheckIcon />
                Setuju
              </Button>
              <Modal
                title='Kembalikan Pengabdian'
                name='Kembalikan'
                Icon={Undo2Icon}
                tooltipContent='Kembalikan Pengabdian'
                btnStyle='grow border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-primary-foreground lg:w-fit'
                variant='outline'
                description='Berikan keterangan pengembalian pengabdian'
              >
                <Textarea onChange={e => setKeterangan(e.target.value)} />

                <Button onClick={() => returned({ id, keterangan })}>
                  Simpan
                </Button>
              </Modal>

              <Modal
                title='Tolak Pengabdian'
                name='Tolak'
                Icon={X}
                tooltipContent='Tolak Pengabdian'
                btnStyle='grow border-red-500 text-red-500 hover:bg-red-500 hover:text-primary-foreground lg:w-fit'
                variant='outline'
                description='Berikan keterangan penolakan pengabdian'
              >
                <Textarea
                  defaultValue={
                    data?.keterangan === null ? "" : data?.keterangan
                  }
                  onChange={e => setKeterangan(e.target.value)}
                />

                <Button onClick={() => reject({ id, keterangan })}>
                  Simpan
                </Button>
              </Modal>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardContent className='space-y-4 p-6 capitalize text-muted-foreground'>
          <EachUtil
            of={[
              { label: "Ketua Kelompok", value: data?.leader.name },
              { label: "Judul Pengabdian", value: data?.title },
              { label: "Bidang", value: data?.bidang || "-" },
              { label: "Jenis Pengabdian", value: data?.jenis_pengabdian },
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
            title={`${resDocs?.proposal ? resDocs?.proposal.file_name.split("-").join(" ").replace(".pdf", "") : "Sedang Mendapatkan File Proposal"}`}
            name='Lihat Proposal'
            btnStyle='w-full'
            tooltipContent='Lihat Proposal'
          >
            {isPending ? (
              <Loader2Icon className='animate-spin' />
            ) : resDocs?.proposal ? (
              <FileView resDocs={resDocs?.proposal as ViewDocs} scale={1} />
            ) : (
              <div className='capitalize'>
                File tidak tersedia / belum di unggah
              </div>
            )}
          </Modal>
        </CardContent>
      </Card>

      {/* Identitas Kelompok */}
      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <CardTitle className='capitalize tracking-wide'>
            Identitas Kelompok
          </CardTitle>
          <CardDescription>
            Tabel berisi identitas kelompok Pengabdian
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

      <div className='flex items-start gap-4'>
        <Card className='shrink-0 grow'>
          <CardHeader className='flex items-center justify-between p-6'>
            <CardTitle className='capitalize tracking-wide'>
              Laporan Kemajuan
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
            {isPending ? (
              <Loader2Icon className='animate-spin' />
            ) : resDocs?.laporanKemajuan ? (
              <EachUtil
                of={resDocs.laporanKemajuan}
                render={(laporanKemajuan, index) => (
                  <div key={index}>
                    <div className='flex items-center justify-between'>
                      <span>
                        <h1 className='font-semibold'>
                          {laporanKemajuan.file_name
                            .split("-")
                            .join(" ")
                            .replace(".pdf", "")}
                        </h1>
                        <p>{laporanKemajuan.date}</p>
                      </span>

                      <Modal
                        title={laporanKemajuan.file_name
                          .split("-")
                          .join(" ")
                          .replace(".pdf", "")}
                        description={laporanKemajuan.date}
                        name='Lihat Laporan Kemajuan'
                        tooltipContent='Lihat Laporan Kemajuan'
                      >
                        <FileView
                          resDocs={laporanKemajuan as LaporanKemajuan}
                          scale={1}
                        />
                      </Modal>
                    </div>
                    <Separator />
                  </div>
                )}
              />
            ) : (
              <div className='capitalize'>
                File tidak tersedia / belum di unggah
              </div>
            )}
          </CardContent>
        </Card>

        <Card
          className={cn({
            grow: !resDocs?.laporan,
          })}
        >
          <CardHeader className='flex items-center justify-between p-6'>
            <CardTitle className='capitalize tracking-wide'>Laporan</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
            {isPending ? (
              <Loader2Icon className='animate-spin' />
            ) : resDocs?.laporan ? (
              <FileView resDocs={resDocs?.laporan as ViewDocs} />
            ) : (
              <div className='capitalize'>
                File tidak tersedia / belum di unggah
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
