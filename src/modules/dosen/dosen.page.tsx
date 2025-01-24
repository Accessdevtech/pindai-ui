import CardStatus from "@/components/atom/card-status"
import { Breadcrumb, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { Role } from "@/interface/type"
import { EachUtil } from "@/utils/each-utils"
import ActionCard from "./components/ActionCard"
import InfoCard from "./components/InfoCard"
import { useGetDashboard } from "./hooks/use-dashboard"

export default function DosenPage({ role }: { role: Role | undefined }) {
  const { data } = useGetDashboard()
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
                  penelitian.status === "accepted"
                    ? "penelitian disetujui"
                    : "penelitian ditolak"
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
        <span className='font-semibold capitalize'>dashboard dosen</span>
        <span>
          Anda dapat melakukan penelitian dan pengabdian kepada masyarakat.
        </span>
      </Card>

      <ActionCard role={role} />
      <InfoCard role={role} />
    </div>
  )
}
