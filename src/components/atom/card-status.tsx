import BadgeStatus from "@/components/atom/badge-status"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CardStatus({
  data,
  message,
}: {
  data: any
  message: string
}) {
  return (
    <Card className='grow'>
      <CardHeader className='flex flex-row items-center justify-between text-xs uppercase tracking-wide'>
        <BadgeStatus status={data.status} message={message} />
      </CardHeader>
      <CardContent className='flex flex-col items-start gap-4 text-muted-foreground'>
        <p className='flex items-start gap-2 capitalize'>
          <span className='text-2xl'>{data.count}</span> data
        </p>
      </CardContent>
    </Card>
  )
}
