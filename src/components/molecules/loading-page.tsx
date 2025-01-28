import { BookOpen, FileText, Users } from "lucide-react"

import type React from "react"

export default function LoadingPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50'>
      <div className='rounded-2xl bg-white/80 p-8 text-center shadow-2xl backdrop-blur-sm'>
        <div className='mb-8'>
          <div className='relative mx-auto h-32 w-32'>
            <div className='absolute inset-0 rounded-full border-8 border-blue-200'></div>
            <div
              className='animate-spin-slow absolute inset-0 rounded-full border-8 border-blue-600'
              style={{
                borderTopColor: "transparent",
                borderLeftColor: "transparent",
              }}
            ></div>
            <div className='absolute inset-4 animate-pulse rounded-full border-4 border-red-400'></div>
          </div>
        </div>
        <h1 className='mb-2 text-4xl font-bold tracking-wide text-blue-800'>
          Universitas Pelita Bangsa
        </h1>
        <h2 className='mb-8 text-xl font-semibold text-gray-600'>
          Memuat Konten Akademik
        </h2>
        <div className='mb-8 grid grid-cols-3 gap-8'>
          <InfoCard icon={BookOpen} title='Penelitian' color='blue' delay={0} />
          <InfoCard icon={Users} title='Pengabdian' color='green' delay={0.2} />
          <InfoCard icon={FileText} title='Publikasi' color='red' delay={0.4} />
        </div>
        <div className='animate-pulse text-gray-500'>
          <span>Menyiapkan informasi terkini...</span>
        </div>
      </div>
    </div>
  )
}

interface InfoCardProps {
  icon: React.ElementType
  title: string
  color: string
  delay: number
}

function InfoCard({ icon: Icon, title, color, delay }: InfoCardProps) {
  return (
    <div
      className={`flex flex-col items-center rounded-lg p-4 bg-${color}-50 hover:animate-float transition-all duration-300 ease-in-out hover:shadow-md`}
    >
      <Icon
        className={`h-12 w-12 text-${color}-600 mb-2 animate-bounce`}
        style={{ animationDelay: `${delay}s` }}
      />
      <span className='text-sm font-medium'>{title}</span>
    </div>
  )
}
