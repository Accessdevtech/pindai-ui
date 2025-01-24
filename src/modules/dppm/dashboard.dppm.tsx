import LoadingPage from "@/components/atom/loading-page"
import { Breadcrumb, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { EachUtil } from "@/utils/each-utils"
import CardFakultas from "./components/card-fakultas"
import InfoPenelitian from "./components/info-penelitian"
import InfoPengabdian from "./components/info-pengabdian"
import { Fakultas, Penelitian, Pengabdian } from "./dashboard.interface"
import { useDashboard } from "./hooks/use-dashboard"

export default function DashboardDppm() {
  const { data, isLoading } = useDashboard()

  if (isLoading) return <LoadingPage />

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
          <InfoPenelitian penelitian={data?.penelitian || ({} as Penelitian)} />
          <InfoPengabdian pengabdian={data?.pengabdian || ({} as Pengabdian)} />
          {/* <InfoPublikasi publikasi={data?.publikasi || ({} as Publikasi)} /> */}
        </div>
      </section>
    </div>
  )
}
