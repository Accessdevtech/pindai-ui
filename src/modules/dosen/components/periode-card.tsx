"use client"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { PeriodeType } from "@/modules/dppm/feature/configurasi/periode/schema"
import { periodeActiveAtom } from "@/state/store"
import { daysBetween } from "@/utils/day-between"
import { formatDate } from "date-fns"
import { useSetAtom } from "jotai"
import { useEffect, useState } from "react"

export default function PeriodeCard({ periode }: { periode: PeriodeType }) {
  const setPeriodeActive = useSetAtom(periodeActiveAtom)
  const [now, setNow] = useState<Date>(() => new Date())

  useEffect(() => {
    setPeriodeActive(!!periode)
    const id = setInterval(() => setNow(new Date()), 60_000) // 1 minute
    return () => clearInterval(id)
  }, [])
  if (!periode) {
    return (
      <Card className='bg-card text-card-foreground'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div className='min-w-0'>
              <CardTitle className='text-balance'>Periode Saat Ini</CardTitle>
              <CardDescription className='text-muted-foreground'>
                Pengajuan proposal
              </CardDescription>
            </div>
            <Badge variant='secondary' className='w-fit'>
              Tidak Ada Periode Aktif
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-2'>
            <p className='text-muted-foreground'>
              Saat ini tidak ada periode pengajuan yang aktif. Silakan cek
              kembali nanti atau pantau pengumuman.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const start = new Date(periode.start_date)
  const end = new Date(periode.end_date)
  const daysRemaining = daysBetween(now, end)
  return (
    <Card className='flex grow flex-col p-6 text-muted-foreground'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='min-w-0'>
            <CardTitle className='text-balance'>Periode Saat Ini</CardTitle>
            <CardDescription className='text-muted-foreground'>
              Pengajuan proposal
            </CardDescription>
          </div>
          <Badge
            className={cn(
              periode.status === "active"
                ? "bg-primary text-primary-foreground"
                : "bg-destructive text-destructive-foreground"
            )}
            aria-live='polite'
            aria-label={`Status: ${periode.status}`}
          >
            {periode.status === "active" ? "Aktif" : "Tutup"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div className='space-y-1'>
          <p className='font-medium'>{periode.name}</p>
          <p className='text-sm text-muted-foreground'>
            {formatDate(start, "PP")} — {formatDate(end, "PP")}
          </p>
        </div>

        {periode.status === "active" ? (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div
              className={cn("rounded-md border border-border p-3", {
                "border-destructive text-destructive": daysRemaining <= 3,
                "text-muted-foreground": daysRemaining > 3
              })}
            >
              <p className='text-xs'>Hari Tersisa</p>
              <p className='font-medium'>
                {daysRemaining > 1
                  ? `${daysRemaining} hari`
                  : daysRemaining === 1
                    ? "1 hari"
                    : "Ends today"}
              </p>
            </div>
            <div className='rounded-md border border-border p-3'>
              <p className='text-xs text-muted-foreground'>Deadline</p>
              <p className='font-medium'>{formatDate(end, "PP")}</p>
            </div>
          </div>
        ) : (
          <div className='rounded-md border border-border p-3'>
            <p className='text-xs text-muted-foreground'>Status</p>
            <p className='font-medium'>Tutup</p>
          </div>
        )}

        <span className='sr-only' aria-live='polite'>
          {periode.status === "active"
            ? `Pendaftaran dibuka. ${daysRemaining > 1 ? `${daysRemaining} hari tersisa.` : daysRemaining === 1 ? "1 hari tersisa." : "Ends today."} Deadline ${formatDate(end, "PP")}.`
            : `Pendaftaran ditutup.`}
        </span>
      </CardContent>
    </Card>
  )
}
