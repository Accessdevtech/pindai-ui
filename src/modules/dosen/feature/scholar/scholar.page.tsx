"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn, getInitials } from "@/lib/utils"
import { ROUTE } from "@/services/route"
import { EachUtil } from "@/utils/each-utils"
import Link from "next/link"
import { useProfileScholar } from "./hooks/use-scholar"

export default function ScholarPage({ scholarId }: { scholarId: string }) {
  const { data } = useProfileScholar(scholarId)

  if (scholarId === null) {
    return (
      <Card>
        <CardContent className='p-6'>
          Silahkan update data diri anda terlebih dahulu sebelum mengakses fitur
          ini
          <Link
            href={`${ROUTE.DASHBOARD}/dosen/akun-saya`}
            className={cn(buttonVariants({ variant: "default" }), "mt-4 w-fit")}
          >
            update data diri
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      <Card>
        <CardContent className='p-6'>
          <div className='flex w-full items-center gap-4'>
            <Avatar>
              <AvatarImage src={data?.photo} alt='@shadcn' />
              <AvatarFallback>{getInitials(data?.name || "")}</AvatarFallback>
            </Avatar>
            <div className='flex w-full items-center justify-between'>
              <div>
                <p className='font-bold'>{data?.name}</p>
                <p className='text-sm font-medium text-muted-foreground'>
                  {data?.affiliation}
                </p>
              </div>
              <div className=''>
                <p className='text-sm font-medium text-muted-foreground'>
                  Citied By
                </p>

                <p className='text-sm capitalize text-muted-foreground'>
                  citations: {data?.total_citations}
                </p>
                <p className='text-sm capitalize text-muted-foreground'>
                  h-index: {data?.h_index}
                </p>
                <p className='text-sm capitalize text-muted-foreground'>
                  i10-index: {data?.i10_index}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <EachUtil
        of={data?.publications || []}
        render={(item, index) => (
          <Link href={item.link} key={index} target='_blank'>
            <Card className='overflow-auto'>
              <CardContent className='flex flex-col gap-0.5 p-6'>
                <p className='text-lg font-bold'>{item.title}</p>
                <p className='text-sm font-medium text-muted-foreground'>
                  {item?.author}
                </p>
                <p className='text-sm font-medium text-muted-foreground'>
                  {item?.journal}
                </p>
                <p className='text-sm font-medium text-muted-foreground'>
                  {item?.citation}
                </p>
              </CardContent>
            </Card>
          </Link>
        )}
      />
    </div>
  )
}
