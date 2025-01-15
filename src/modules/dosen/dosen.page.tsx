import CardStatus from "@/components/atom/card-status"
import { Breadcrumb, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { penelitian, pengabdian } from "@/constant/dummy"
import { Role } from "@/interface/type"
import { EachUtil } from "@/utils/each-utils"
import InfoPenelitianCard from "./components/info-penelitian"
import InfoPengabdianCard from "./components/info-pengabdian"

export default function DosenPage({ role }: { role: Role | undefined }) {
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
            of={penelitian}
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
            of={pengabdian}
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

      <div className='flex flex-col gap-4 lg:flex-row lg:items-start'>
        <InfoPenelitianCard role={role} />
        <InfoPengabdianCard role={role} />
      </div>
    </div>
  )
}
