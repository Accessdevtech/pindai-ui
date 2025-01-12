import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { EllipsisVerticalIcon } from "lucide-react"
import Link from "next/link"
import { Fakultas } from "../dashboard.interface"

interface CardFakultasProps {
  data: Fakultas
  index: number
}

export default function CardFakultas({ data, index }: CardFakultasProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between text-sm'>
        <Badge
          variant='outline'
          className='flex h-9 w-9 items-center justify-center rounded-lg bg-primary/30 font-bold text-primary'
        >
          {index + 1}
        </Badge>
        <Popover>
          <PopoverTrigger>
            <EllipsisVerticalIcon className='h-5 w-5 text-muted-foreground' />
          </PopoverTrigger>
          <PopoverContent className='w-36 overflow-hidden p-0' align='end'>
            <Link
              href='dppm/fakultas'
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full items-start justify-start capitalize",
              )}
            >
              fakultas
            </Link>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className='flex flex-col items-start gap-4 text-muted-foreground'>
        <h1 className='text-lg capitalize leading-none'>{data.name}</h1>
        <p className='flex items-start gap-2 capitalize'>
          <span className='text-2xl'>{data.dosen_count}</span> dosen
        </p>
      </CardContent>
    </Card>
  )
}
