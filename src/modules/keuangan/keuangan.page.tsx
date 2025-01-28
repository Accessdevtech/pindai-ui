"use client"
import DashboardLoader from "@/components/atom/dashboard-loader"
import { Breadcrumb, BreadcrumbPage } from "@/components/ui/breadcrumb"
import InfoPenelitian from "./components/info-penelitian"
import InfoPengabdian from "./components/info-pengabdian"
import { useGetDashboard } from "./hooks/use-dashboard"

export default function KeuanganPage() {
  const { data, isLoading } = useGetDashboard()

  if (isLoading) return <DashboardLoader />

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
        <InfoPenelitian
          status={data?.penelitian.status || []}
          news={data?.penelitian.news || []}
        />
        <InfoPengabdian
          status={data?.penelitian.status || []}
          news={data?.penelitian.news || []}
        />
        {/* <InfoPublikasi publikasi={data?.publikasi || {} as Publikasi} /> */}
      </section>
    </div>
  )
}
