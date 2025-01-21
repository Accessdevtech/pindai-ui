import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { EachUtil } from "@/utils/each-utils"
import { ExternalLinkIcon } from "lucide-react"
import Link from "next/link"

export default function InfoPengabdian() {
  return (
    <div className='flex grow flex-col gap-4'>
      <Card className='grow space-y-4'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <Badge
            variant='outline'
            className='size-fit bg-cyan-500/30 font-bold uppercase tracking-wide text-cyan-500'
          >
            pengabdian
          </Badge>
        </CardHeader>
        <CardContent>
          <div className='flex gap-1.5'>
            <p className='capitalize text-muted-foreground'>data:</p>
            <Badge
              variant='outline'
              className='bg-green-500/30 font-semibold uppercase tracking-wide text-green-500'
            >
              10 diterima
            </Badge>
            /
            <Badge
              variant='outline'
              className='bg-red-500/30 font-semibold uppercase tracking-wide text-red-500'
            >
              5 ditolak
            </Badge>
          </div>
        </CardContent>
      </Card>
      <Card className='grow gap-4 text-muted-foreground'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <h5 className='font-semibold capitalize'>Pengabdian Terbaru</h5>
        </CardHeader>
        <CardContent>
          <EachUtil
            of={[1, 2, 3, 4, 5, 6, 7, 8]}
            render={(item, index) => (
              <div className='flex items-center justify-between' key={index}>
                <div className='flex items-center gap-3'>
                  <Badge
                    variant='outline'
                    className='flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/30 font-bold text-cyan-500'
                  >
                    {index + 1}
                  </Badge>
                  <div className='flex flex-col capitalize text-muted-foreground'>
                    <p className='text-xs'>Ketua penelitian</p>
                    <p className='font-bold'>
                      Sistem Pendukung Keputusan Berbasis Fuzzy Logic untuk
                      Penentuan Beasiswa Mahasiswa Berprestasi
                    </p>
                  </div>
                </div>
                <Button
                  size='icon'
                  variant='outline'
                  className='border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                >
                  <ExternalLinkIcon />
                </Button>
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
