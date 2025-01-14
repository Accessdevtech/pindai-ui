"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { columnsIdentitas } from "@/modules/dosen/feature/penelitian/components/column-identitas"
import { IdentitasTable } from "@/modules/dosen/feature/penelitian/components/identitas-table"
import { ROUTE } from "@/services/route"
import { EachUtil } from "@/utils/each-utils"
import { CheckIcon, X } from "lucide-react"
import { toast } from "sonner"
import { useApprovePenelitian } from "./hooks/use-penelitian/approved-penelitian"
import { useCanclePenelitian } from "./hooks/use-penelitian/cancle-penelitian"
import { useGetDetailPenelitian } from "./hooks/use-penelitian/get-detail-penelitian"

export default function DetailPenelitianKaprodiPage({ id }: { id: string }) {
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

  const columnsIdentity = columnsIdentitas({ status: data?.status })

  return (
    <div className='flex flex-col gap-4'>
      <Breadcrumb
        href={`${ROUTE.DASHBOARD}/kaprodi`}
        data={[
          {
            name: "Penelitian",
            href: `${ROUTE.DASHBOARD}/kaprodi/penelitian`,
          },
          {
            name: "Detail",
          },
        ]}
      >
        {data?.title}
      </Breadcrumb>
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
              <Button
                variant='outline'
                className='grow border-red-500 text-red-500 hover:bg-red-500 hover:text-primary-foreground lg:w-fit'
                onClick={() => reject({ id })}
              >
                <X />
                Tolak
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
              { label: "Target Indeksasi", value: data?.jenis_indeksasi },
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

      {/* Hasil Publikasi */}
      {/* <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <CardTitle className='capitalize tracking-wide'>
            hasil publikasi
          </CardTitle>
        </CardContent>
      </Card> */}

      {/* <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <HasilPublikasiTable />
        </CardContent>
      </Card> */}
    </div>
  )
}
