"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import KeteranganDitolak from "@/components/molecules/keterangan-ditolak"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User } from "@/interface/type"
import { columnsIdentitas } from "@/modules/dosen/feature/penelitian/components/column-identitas"
import { IdentitasTable } from "@/modules/dosen/feature/penelitian/components/identitas-table"
import { ROUTE } from "@/services/route"
import { EachUtil } from "@/utils/each-utils"
import { downloadDocxFile } from "@/utils/files"
import { CheckIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useDownload } from "../../hooks/use-download"
import { columnsDokumen } from "./components/column-dokumen"
import DokumenTable from "./components/dokumen-table"
import { useApprovePenelitian } from "./hooks/use-penelitian/approved-penelitian"
import { useCanclePenelitian } from "./hooks/use-penelitian/cancle-penelitian"
import { useGetDetailPenelitian } from "./hooks/use-penelitian/get-detail-penelitian"

export default function DetailPenelitianKeuanganPage({
  id,
  user,
}: {
  id: string
  user: User
}) {
  const [keterangan, setKeterangan] = useState("")
  const { data, refetch } = useGetDetailPenelitian(id)
  const { mutate: approved } = useApprovePenelitian({
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

  const { mutate: reject } = useCanclePenelitian({
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

  const { mutate: download } = useDownload({
    onSuccess(res) {
      downloadDocxFile(res.base64, res.file_name)
      toast.dismiss()
    },
    onError(err) {
      toast.error(err.response?.data.message)
      toast.dismiss()
    },
  })

  const handleDownload = (jenis_Dokumen: string) => {
    download({
      id,
      jenis_dokumen: jenis_Dokumen.split(" ").join("_"),
      category: "penelitian",
    })
  }

  const columnsDocuments = columnsDokumen({
    isLeader: data?.anggota.some(
      anggota => anggota.is_leader === 1 && anggota.nidn === user.nidn,
    ),
    status: data?.status,
    handleDownload,
  })
  const columnsIdentity = columnsIdentitas({ status: data?.status })

  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb
        href={`${ROUTE.DASHBOARD}/keuangan`}
        data={[
          {
            name: "Penelitian",
            href: `${ROUTE.DASHBOARD}/keuangan/penelitian`,
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
          <KeteranganDitolak title='Penelitian ditolak oleh kaprodi'>
            {data.keterangan}
          </KeteranganDitolak>
        )}

      {data?.status.kaprodi === "accepted" &&
        data?.status.dppm === "rejected" &&
        data?.status.keuangan === "rejected" && (
          <KeteranganDitolak title='Penelitian ditolak oleh dppm'>
            {data.keterangan}
          </KeteranganDitolak>
        )}

      {data?.status.kaprodi === "accepted" &&
        data?.status.dppm === "accepted" &&
        data?.status.keuangan === "rejected" && (
          <KeteranganDitolak title='Penelitian ditolak oleh keuangan'>
            {data.keterangan}
          </KeteranganDitolak>
        )}

      <div className='flex flex-col gap-4 lg:flex-row'>
        <Card className='grow'>
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

        {data?.status.keuangan === "pending" && (
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
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardContent className='space-y-4 p-6 capitalize text-muted-foreground'>
          <EachUtil
            of={[
              { label: "Ketua Kelompok", value: data?.leader.name },
              { label: "Judul Penelitian", value: data?.title },
              { label: "Bidang", value: data?.bidang || "-" },
              { label: "Jenis Penelitian", value: data?.jenis_penelitian },
              { label: "Jenis Kriteria", value: data?.jenis_kriteria },
              { label: "Semester", value: data?.semester },
              { label: "Tahun", value: data?.academic_year },
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
    </div>
  )
}
