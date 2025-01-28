import CardStatus from "@/components/atom/card-status"
import DashboardLoader from "@/components/atom/dashboard-loader"
import { Breadcrumb, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { Role } from "@/interface/type"
import { EachUtil } from "@/utils/each-utils"
import ActionCard from "./components/action-card"
import InfoPenelitianCard from "./components/info-penelitian"
import { useGetDashboard } from "./hooks/use-dashboard/get-dashboard"

interface KaprodiDashboardProps {
  role: Role | undefined
}

export default function KaprodiDashboard({ role }: KaprodiDashboardProps) {
  const { data, isLoading } = useGetDashboard()

  if (isLoading) return <DashboardLoader />
  return (
    <div className='flex flex-col gap-4'>
      <section className='flex flex-col gap-3'>
        <Breadcrumb>
          <BreadcrumbPage className='text-muted-foreground'>
            Dashboard
          </BreadcrumbPage>
        </Breadcrumb>
        <div className='grid grid-cols-2 gap-4 xl:grid-cols-4'>
          <EachUtil
            of={data?.penelitian || []}
            render={(penelitian: any, index) => (
              <CardStatus
                data={penelitian}
                message={
                  penelitian.status === "rejected"
                    ? "penelitian ditolak"
                    : "penelitian disetujui"
                }
                key={index}
              />
            )}
          />
          <EachUtil
            of={data?.pengabdian || []}
            render={(pengabdian: any, index) => (
              <CardStatus
                data={pengabdian}
                message={
                  pengabdian.status === "rejected"
                    ? "pengabdian ditolak"
                    : "pengabdian disetujui"
                }
                key={index}
              />
            )}
          />
        </div>
      </section>

      <Card className='flex grow flex-col p-6 text-muted-foreground'>
        <span className='font-semibold capitalize'>dashboard kaprodi</span>
        <span>
          Anda dapat melakukan penelitian dan pengabdian kepada masyarakat.
        </span>
      </Card>

      <ActionCard role={role} />
      <InfoPenelitianCard role={role} />
    </div>
  )
}
