"use client"
import LoadingPage from "@/components/atom/loading-page"
import { Breadcrumb, BreadcrumbPage } from "@/components/ui/breadcrumb"
import InfoPenelitian from "./components/info-penelitian"
import InfoPengabdian from "./components/info-pengabdian"
import { useGetDashboard } from "./hooks/use-dashboard"
import { Penelitian, Pengabdian } from "./keuangan.interface"

export default function KeuanganPage() {
  const { data, isLoading } = useGetDashboard()

  if (isLoading) return <LoadingPage />

  return (
    <div className='space-y-4'>
      <section className='flex flex-col gap-3'>
        <Breadcrumb>
          <BreadcrumbPage className='text-muted-foreground'>
            Dashboard
          </BreadcrumbPage>
        </Breadcrumb>
      </section>
      <section className='flex flex-col gap-4 xl:flex-row xl:items-start'>
        <InfoPenelitian penelitian={data?.penelitian || ({} as Penelitian)} />
        <InfoPengabdian pengabdian={data?.pengabdian || ({} as Pengabdian)} />
        {/* <InfoPublikasi publikasi={data?.publikasi || {} as Publikasi} /> */}
      </section>
    </div>
  )
}
