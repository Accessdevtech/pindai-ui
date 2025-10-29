"use client"
import Alert from "@/components/atom/alert"
import Breadcrumb from "@/components/atom/bradcrumb"
import Modal from "@/components/atom/modal"
import KeteranganDitolak from "@/components/molecules/keterangan-ditolak"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { columnsIdentitas } from "@/modules/dosen/feature/pengabdian/components/column-identitas"
import { IdentitasTable } from "@/modules/dosen/feature/pengabdian/components/identitas-table"
import { ROUTE } from "@/services/route"
import { EachUtil } from "@/utils/each-utils"
import { CheckIcon, Undo2Icon, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useApprovePengabdian } from "./hooks/use-pengabdian/approved-pengabdian"
import { useCanclePengabdian } from "./hooks/use-pengabdian/cancle-pengabdian"
import { useGetDetailPengabdian } from "./hooks/use-pengabdian/get-detail-pengabdian"
import { useReturnedPengabdian } from "./hooks/use-pengabdian/return-pengabdian"

export default function DetailPengabdianKeuanganPage({ id }: { id: string }) {
  const [alert, setAlert] = useState(false)
  const { data, refetch } = useGetDetailPengabdian(id)
  const [keterangan, setKeterangan] = useState("")

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
    }
  })

  const { mutate: reject } = useCanclePengabdian({
    onSuccess(res) {
      if (res.status) {
        toast.success(res.message)
      }

      if (!res.status) {
        toast.error(res.message)
      }
      setKeterangan("")
      refetch()
    },

    onError(error) {
      toast.error(error.response?.data.message)
    }
  })

  const { mutate: returned } = useReturnedPengabdian({
    onSuccess(res) {
      if (res.status) {
        toast.success(res.message)
      }

      if (!res.status) {
        toast.error(res.message)
      }
      setKeterangan("")
      refetch()
    },

    onError(error) {
      toast.error(error.response?.data.message)
    }
  })

  const columnsIdentity = columnsIdentitas({ status: data?.status })

  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb
        href={`${ROUTE.DASHBOARD}/keuangan`}
        data={[
          {
            name: "Pengabdian",
            href: `${ROUTE.DASHBOARD}/keuangan/pengabdian`
          },
          {
            name: "Detail"
          }
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

        {data?.existFile && data?.status.keuangan === "pending" && (
          <Card>
            <CardContent className='flex gap-2 p-6 capitalize text-muted-foreground'>
              <Alert
                open={alert}
                setOpen={setAlert}
                title='Setujui Pengabdian'
                variant='outline'
                Icon={CheckIcon}
                tooltipContentText='Setujui Pengabdian'
                triggerContent='Setuju'
                triggerAction='Setuju'
                className='grow border-green-500 text-green-500 hover:bg-green-500 hover:text-primary-foreground lg:w-fit'
                description='Apakah anda yakin ingin menyetujui pengabdian ini?'
                onClick={() => approved({ id })}
              />

              <Modal
                title='Kembalikan Pengabdian'
                name='Kembalikan'
                Icon={Undo2Icon}
                tooltipContent='Kembalikan Pengabdian'
                btnStyle={cn(
                  "grow border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-primary-foreground lg:w-fit"
                )}
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
                <Input
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
              {
                label: "Jenis Kriteria",
                value: `${data?.jenis_kriteria} (${data?.nominal.formatted})`
              },
              { label: "Terbilang", value: data?.nominal.in_words },
              { label: "Semester", value: data?.semester },
              { label: "Tahun", value: data?.academic_year },
              { label: "Abstrak", value: data?.deskripsi }
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
