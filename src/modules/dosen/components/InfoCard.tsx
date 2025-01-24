import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuthContext } from "@/contexts/auth-context"
import { Role } from "@/interface/type"
import { ArrowRightIcon } from "lucide-react"
import InfoRow from "./info-row"

export default function InfoCard({ role }: { role: Role | undefined }) {
  const { user } = useAuthContext()
  if (!user) return null

  return (
    <div className='flex grow flex-col items-start gap-4 lg:flex-row'>
      <Card className='flex grow flex-col p-6 text-muted-foreground'>
        <h5 className='font-semibold capitalize'>informasi dosen</h5>
        <p>Berisikan informasi tentang data diri anda.</p>
        {Object.entries(user).map(([key, value]) => {
          if (
            key === "id" ||
            key === "fakultas_id" ||
            key === "prodi_id" ||
            key === "role"
          )
            return null
          return <InfoRow key={key} label={key} value={value as string} />
        })}
      </Card>
      <Card className='flex grow flex-col p-6 text-muted-foreground'>
        <h5 className='font-semibold capitalize'>informasi dosen</h5>
        <p>Berisikan informasi tentang data diri anda.</p>
        <Separator className='my-4 bg-neutral-400' />
        <div className='flex items-center justify-between'>
          <span className='font-semibold capitalize'>Penelitian</span>
          <span>
            <ArrowRightIcon className='h-4 w-4' />
          </span>
        </div>

        <Separator className='my-4 bg-neutral-400' />
        <div className='flex items-center justify-between'>
          <span className='font-semibold capitalize'>Pengabdian</span>
          <span>
            <ArrowRightIcon className='h-4 w-4' />
          </span>
        </div>
      </Card>
    </div>
  )
}
