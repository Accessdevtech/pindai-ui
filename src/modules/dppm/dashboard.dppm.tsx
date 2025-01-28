import DashboardLoader from "@/components/atom/dashboard-loader"
import { Breadcrumb, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { EachUtil } from "@/utils/each-utils"
import CardFakultas from "./components/card-fakultas"
import InfoPenelitian from "./components/info-penelitian"
import InfoPengabdian from "./components/info-pengabdian"
import { Fakultas } from "./dashboard.interface"
import { useGetDashboard } from "./hooks/use-dashboard"

export default function DashboardDppm() {
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
        <div className='grid grid-cols-2 gap-4 xl:grid-cols-4'>
          <EachUtil
            of={data?.fakultas || []}
            render={(fakultas: Fakultas, index) => (
              <CardFakultas data={fakultas} index={index} key={index} />
            )}
          />
        </div>
      </section>
      <section className='flex flex-col gap-3'>
        <Breadcrumb>
          <BreadcrumbPage className='text-muted-foreground'>
            Penelitian / Pengabdian
          </BreadcrumbPage>
        </Breadcrumb>
        <div className='flex flex-col gap-4 xl:flex-row xl:items-start'>
          <InfoPenelitian
            status={data?.penelitian.status || []}
            news={data?.penelitian.news || []}
          />
          <InfoPengabdian
            status={data?.pengabdian.status || []}
            news={data?.pengabdian.news || []}
          />
          {/* <InfoPublikasi publikasi={data?.publikasi || ({} as Publikasi)} /> */}
        </div>
      </section>
    </div>
  )
}
