"use client"
import DashboardLoader from "@/components/atom/dashboard-loader"
import { Breadcrumb, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"
import InfoPenelitian from "./components/info-penelitian"
import InfoPengabdian from "./components/info-pengabdian"
import InfoPublikasi from "./components/info-publikasi"
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
      <section
        className={cn({
          "grid gap-4 xl:grid-cols-3 xl:items-start":
            data?.penelitian && data?.pengabdian && data?.publikasi,
          "grid gap-4 xl:grid-cols-2 xl:items-start":
            data?.penelitian && data?.pengabdian && !data?.publikasi,
          "grid gap-4":
            data?.penelitian && !data?.pengabdian && !data?.publikasi,
        })}
      >
        <InfoPenelitian
          status={data?.penelitian.status || []}
          news={data?.penelitian.news || []}
        />
        <InfoPengabdian
          status={data?.pengabdian.status || []}
          news={data?.pengabdian.news || []}
        />
        <InfoPublikasi
          status={data?.publikasi.status || []}
          news={data?.publikasi.news || []}
        />
      </section>
    </div>
  )
}
