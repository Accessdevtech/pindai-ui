"use client"
import Breadcrumb from "@/components/atom/bradcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ROUTE } from "@/services/route"
import { EachUtil } from "@/utils/each-utils"
import { columnsDokumen } from "./components/column-dokumen"
import { columnsIdentitas } from "./components/column-identitas"
import DokumenTable from "./components/dokumen-table"
import HasilPublikasiTable from "./components/hasil-publikasi-table"
import { IdentitasTable } from "./components/identitas-table"
import { useGetDetailPenelitian } from "./hook/use-penelitian/get-detail-penelitian"

export default function DetailPenelitianPage({ id }: { id: string }) {
  const { data } = useGetDetailPenelitian(id)
  // console.log(data)

  const columnsIdentity = columnsIdentitas({ status: data?.status })
  const columnsDocuments = columnsDokumen({ status: data?.status })

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

      {/* Hasil Publikasi */}
      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <CardTitle className='capitalize tracking-wide'>
            hasil publikasi
          </CardTitle>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='space-y-2 p-6 capitalize text-muted-foreground'>
          <HasilPublikasiTable />
        </CardContent>
      </Card>
    </div>
  )
}
