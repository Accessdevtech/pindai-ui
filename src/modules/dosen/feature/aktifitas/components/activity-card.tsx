"use client"
import Modal from "@/components/atom/modal"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { Aktifitas } from "../aktifitas-interface"
import Tracker from "./tracker"

interface ActivityCardProps {
  data: Aktifitas
}

export default function ActivityCard({ data }: ActivityCardProps) {
  return (
    <Card className='mb-4'>
      <CardContent className='p-6'>
        <div className='flex items-start justify-between'>
          <div className='space-y-1'>
            <h3 className='text-xl font-semibold'>{data.title}</h3>
            <div className='flex items-center text-sm text-muted-foreground'>
              <CalendarIcon className='mr-2 h-4 w-4' />
              {data.date}
            </div>
          </div>

          <Modal
            title='Detail Aktifitas'
            description='Berisi informasi detail tentang aktifitas yang diikuti, mulai dari judul, tanggal, deskripsi, hingga file yang diupload'
            variant='ghost'
            name='Lihat Detail'
          >
            <Tracker data={data} />
          </Modal>
        </div>
      </CardContent>
    </Card>
  )
}
