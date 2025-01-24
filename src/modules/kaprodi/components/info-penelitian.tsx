import { Card } from "@/components/ui/card"
import { useAuthContext } from "@/contexts/auth-context"
import { Role } from "@/interface/type"
import InfoRow from "./info-row"

export default function InfoPenelitianCard({
  role,
}: {
  role: Role | undefined
}) {
  const { user } = useAuthContext()
  if (!user) return null

  return (
    <div className='flex grow flex-col gap-4'>
      <Card className='flex grow flex-col p-6 text-muted-foreground'>
        <h5 className='font-semibold capitalize'>informasi kaprodi</h5>
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
    </div>
  )
}
