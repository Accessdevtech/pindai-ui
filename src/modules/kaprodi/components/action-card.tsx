import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Role } from "@/interface/type"
import { cn } from "@/lib/utils"
import { ROUTE } from "@/services/route"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export default function ActionCard({ role }: { role: Role | undefined }) {
  return (
    <div className='flex grow flex-col gap-4 lg:flex-row'>
      <Card className='flex grow flex-col p-6 text-muted-foreground'>
        <Link
          href={`${ROUTE.DASHBOARD}/${role}/penelitian`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
          )}
        >
          <ArrowRightIcon className='h-4 w-4' />
          <span className='capitalize'>lihat ajuan penelitian</span>
        </Link>
      </Card>
      <Card className='flex grow flex-col p-6 text-muted-foreground'>
        <Link
          href={`${ROUTE.DASHBOARD}/${role}/pengabdian`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
          )}
        >
          <ArrowRightIcon className='h-4 w-4' />
          <span className='capitalize'>lihat ajuan pengabdian</span>
        </Link>
      </Card>
      <Card className='flex grow flex-col p-6 text-muted-foreground'>
        <Link
          href={`${ROUTE.DASHBOARD}/${role}/publikasi`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
          )}
        >
          <ArrowRightIcon className='h-4 w-4' />
          <span className='capitalize'>lihat ajuan publikasi</span>
        </Link>
      </Card>
    </div>
  )
}
