import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ROUTE } from "@/services/route"
import { EachUtil } from "@/utils/each-utils"
import { ExternalLinkIcon } from "lucide-react"
import Link from "next/link"
import { Penelitian } from "../keuangan.interface"

export default function InfoPenelitian({
  penelitian,
}: {
  penelitian: Penelitian
}) {
  return (
    <div className='flex grow flex-col gap-4'>
      <Card className='grow space-y-4'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <Badge
            variant='outline'
            className='size-fit bg-green-500/30 font-bold uppercase tracking-wide text-green-500'
          >
            penelitian
          </Badge>
        </CardHeader>
        <CardContent>
          <div className='flex gap-1.5'>
            <p className='capitalize text-muted-foreground'>data:</p>
            <EachUtil
              of={penelitian.status}
              render={(item, index) => (
                <Badge
                  key={index}
                  variant='outline'
                  className={cn({
                    "space-x-1 bg-green-500/30 font-semibold uppercase tracking-wide text-green-500":
                      item.status === "accepted",
                    "space-x-1 bg-red-500/30 font-semibold uppercase tracking-wide text-red-500":
                      item.status === "rejected",
                  })}
                >
                  <span>{item.count}</span>
                  <span>
                    {item.status === "accepted" && "diterima"}
                    {item.status === "rejected" && "ditolak"}
                  </span>
                </Badge>
              )}
            />
          </div>
        </CardContent>
      </Card>
      <Card className='grow gap-4 text-muted-foreground'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <h5 className='font-semibold capitalize'>Penelitian Terbaru</h5>
        </CardHeader>
        <CardContent>
          <EachUtil
            of={penelitian.news}
            render={(item, index) => (
              <div className='flex items-center justify-between' key={index}>
                <div className='flex items-center gap-3'>
                  <Badge
                    variant='outline'
                    className='flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/30 font-bold text-cyan-500'
                  >
                    {index + 1}
                  </Badge>
                  <div className='flex max-w-md flex-col capitalize text-muted-foreground'>
                    <p className='text-xs'>{item.leader}</p>
                    <p className='font-bold'>{item.title}</p>
                  </div>
                </div>
                <Link
                  href={`${ROUTE.DASHBOARD}/dppm/penelitian/${item.id}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
                  )}
                >
                  <ExternalLinkIcon />
                </Link>
              </div>
            )}
          />
        </CardContent>
        <CardFooter>
          <Link
            href={`dppm/penelitian`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-primary text-primary hover:bg-accent",
            )}
          >
            Lihat Semua
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
